const jwt = require("jsonwebtoken");
const { Usuario, Mensaje } = require("../models/Models");
const SECRET = "El Psy Kongroo"; // mover a un .env

// Logica del socket
const initializeSocket = (io) => {
  //autenticar socket
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token; // Token enviado desde React
      if (!token) {
        return next(new Error("Auth error: No token provided"));
      }

      const decoded = jwt.verify(token, SECRET);
      const user = await Usuario.findByPk(decoded.id);

      if (!user) {
        return next(new Error("Auth error: User not found"));
      }

      // Adjuntar datos del usuario al socket
      socket.user = {
        id: user.id,
        nombre: `${user.nombre} ${user.apellido}`,
        DNI: user.DNI,
      };
      next();
    } catch (err) {
      console.error("Socket auth error:", err.message);
      next(new Error("Auth error: Invalid token"));
    }
  });

  // conexión de Sockets
  io.on("connection", (socket) => {
    console.log(
      `Usuario conectado: ${socket.user.nombre} (Socket ID: ${socket.id})`
    );

    // unirse a una sala de chat específica
    socket.on("join_room", (chatId) => {
      socket.join(chatId.toString());
      console.log(`${socket.user.nombre} se unió a la sala ${chatId}`);
    });

    // recibir un mensaje del cliente
    socket.on("send_message", async (data) => {
      const { chatId, contMen } = data;
      const remitenteId = socket.user.id;

      if (!chatId || !contMen) {
        return; // No procesar mensajes vacíos o sin chat
      }

      try {
        // Guardar el mensaje en la base de datos
        const nuevoMensaje = await Mensaje.create({
          contMen: contMen,
          chatId: chatId,
          remitenteId: remitenteId,
        });

        // Creamos el objeto para enviar al cliente
        const mensajeCompleto = {
          ...nuevoMensaje.toJSON(),
          remitente: {
            id: socket.user.id,
            nombre: socket.user.nombre,
          },
        };

        // Emitir el mensaje a todos en esa sala (chatId)
        // toString() para ser consistentes con la sala
        io.to(chatId.toString()).emit("receive_message", mensajeCompleto);
      } catch (error) {
        console.error("Error al guardar o emitir mensaje:", error);
      }
    });

    //desconexión
    socket.on("disconnect", () => {
      console.log(`Usuario desconectado: ${socket.user.nombre}`);
    });
  });
};
module.exports = initializeSocket;
