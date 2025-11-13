const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const app = express();
const port = 3001;
const http = require("http");
const { Server } = require("socket.io");

const {
  SignUp,
  Login,
  modifyUser,
  changePwd,
  CreateTest,
  UpdatePriceAndName_Paper,
  UpdatePriceAndName_Terminacion,
  Create_Terminacion,
  Create_Paper,
  GetAll_Papers,
  GetAll_Terminaciones,
  Delete_Paper,
  Delete_Terminacion,
  GetAll_MaterialRequest,
  Acept_or_decline_MaterialRequest,
  GetMyChats,
  FindOrCreateChat,
  GetChatMessages,
} = require("./controllers/controllers");

const isAuth = require("./middlewares/isAuth");
const initializeSocket = require("./socket/socketManager");

// setear server http
const server = http.createServer(app);

// le ponemos Socket.IO al servidor HTTP
const io = new Server(server, {
  cors: {
    origin: "*", // O restringir la URL de React/Electron, quizas despues
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

initializeSocket(io);

app.post("/api/hello", (req, res) => {
  res.status(200).json({ message: "Hola desde el backend!" });
});
app.post("/api/signup", isAuth, SignUp);
app.post("/api/login", Login);
app.post("/api/modify", isAuth, modifyUser);
app.post("/api/changePwd", isAuth, changePwd);
app.post("/api/updatePaper", isAuth, UpdatePriceAndName_Paper);
app.post("/api/updateTerminacion", isAuth, UpdatePriceAndName_Terminacion);
app.post("/api/createTerminacion", isAuth, Create_Terminacion);
app.post("/api/createPaper", isAuth, Create_Paper);
app.get("/api/papers", isAuth, GetAll_Papers);
app.get("/api/terminations", isAuth, GetAll_Terminaciones);
app.delete("/api/paper/:id", isAuth, Delete_Paper);
app.delete("/api/termination/:id", isAuth, Delete_Terminacion);
app.get("/api/viewmaterialrequest", isAuth, GetAll_MaterialRequest);
app.post(
  "/api/Acept_MaterialRequest",
  isAuth,
  Acept_or_decline_MaterialRequest
);
app.get("/api/my-chats", isAuth, GetMyChats);
app.post("/api/chat/find-or-create", isAuth, FindOrCreateChat);
app.get("/api/chat/:id/messages", isAuth, GetChatMessages);

// Inicializar el servidor
server.listen(port, () => {
  sequelize
    .sync({ force:false})
    .then(() => {
      console.log("Base de datos sincronizada.");
      return CreateTest();
    })
    .then(() => {
      console.log(
        `Servidor backend y Sockets corriendo en http://localhost:${port}`
      );
    })
    .catch((err) => {
      console.error("Error al arrancar el servidor:", err);
    });
});
