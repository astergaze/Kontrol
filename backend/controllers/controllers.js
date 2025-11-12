const {
  Usuario,
  Cliente,
  TipoPapel,
  TipoTerminacion,
  TipoPersonalizacion,
  OrdenTrabajo,
  DetalleOrden,
  OrdenCotizacion,
  SolicitudMaterial,
  Chat,
  Mensaje,
} = require("../models/Models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = "El Psy Kongroo"; //Luego mover a un .env

const CreateTest = async () => {
  try {
    const [user, userCreated] = await Usuario.findOrCreate({
      where: { email: "Juan@31minutos.com" },
      defaults: {
        role: "jefe",
        nombre: "Juan Carlos",
        apellido: "Bodoque",
        email: "Juan@31minutos.com",
        telefono: "0123456789",
        DNI: "31313131",
        password:
          "$2b$10$3TZ13oHxppoQ4.9iHPn8o.FVxzNFiz0fr/aBzrKL20mRI9rx14uvi",
      },
    });

    if (userCreated) {
      console.log('Usuario "jefe" por defecto (Juan Carlos Bodoque) creado.');
    } else {
      console.log('El usuario "jefe" por defecto ya existe.');
    }

    const [cliente, clienteCreated] = await Cliente.findOrCreate({
      where: { nomClien: "Tulio Triviño S.A." },
      defaults: {
        nomClien: "Tulio Triviño S.A.",
        responsable: "Tulio Triviño",
        contacto: "555-1234",
        direccion: "Estudios 31 Minutos, Santiago",
      },
    });

    if (clienteCreated) {
      console.log("Cliente de prueba (Tulio Triviño S.A.) creado.");
    }

    const [ot, otCreated] = await OrdenTrabajo.findOrCreate({
      where: { id: 1 },
      defaults: {
        id: 1,
        fechaIn: new Date(),
        prioridad: "A",
        envio: "Retira",
        documento: "Fact",
        estado: "En Proceso",
        clienteId: cliente.id, 
      },
    });

    if (otCreated) {
      console.log("Orden de Trabajo de prueba (OT-001) creada.");
    }
    const [solicitud1, sol1Created] = await SolicitudMaterial.findOrCreate({
      where: { material: "Resma de papel A4 - 500 Hojas" },
      defaults: {
        material: "Resma de papel A4 - 500 Hojas",
        estado: "Pendiente",
        usuarioId: user.id,     // Asociada al usuario Bodoque
        ordenTrabajoId: ot.id, // Asociada a la OT de Tulio
      },
    });

    if (sol1Created) {
      console.log("Solicitud de material 1 (Pendiente) creada.");
    }

    const [solicitud2, sol2Created] = await SolicitudMaterial.findOrCreate({
      where: { material: "Tinta Negra HP - Modelo 664" },
      defaults: {
        material: "Tinta Negra HP - Modelo 664",
        estado: "Pendiente",   
        usuarioId: user.id,
        ordenTrabajoId: ot.id,
      },
    });

    if (sol2Created) {
      console.log("Solicitud de material 2 (Aprobada) creada.");
    }

  } catch (error) {
    console.error("Error al crear los datos de prueba:", error);
  }
};

const SignUp = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, DNI } = req.body;
    const hashedPassword = await bcrypt.hash(DNI.toString(), 10);
    const newUsuario = await Usuario.create({
      nombre,
      apellido,
      email,
      telefono,
      DNI,
      password: hashedPassword,
    });
    const userData = {
      id: newUsuario.id,
      nombre: newUsuario.nombre,
      email: newUsuario.email,
      role: newUsuario.role,
    };
    res
      .status(201)
      .json({ message: "Usuario creado con éxito", data: userData });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message:
          "Error al crear usuario: El email, teléfono o DNI ya están registrados.",
        error: error.errors.map((e) => e.message),
      });
    }
    res.status(500).json({
      message: "Error interno del servidor al crear el usuario",
      error: error.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { DNI, password } = req.body;
    const usuarioEncontrado = await Usuario.findOne({
      where: { DNI: DNI },
    });
    if (!usuarioEncontrado) {
      return res.status(401).json({ message: "DNI o contraseña incorrectos" });
    }
    const isMatch = await bcrypt.compare(password, usuarioEncontrado.password);

    if (!isMatch) {
      return res.status(401).json({ message: "DNI o contraseña incorrectos" });
    }
    const dataLoad = {
      id: usuarioEncontrado.id,
      DNI: usuarioEncontrado.DNI,
      role: usuarioEncontrado.role,
      email: usuarioEncontrado.email,
      nombre: usuarioEncontrado.nombre,
      apellido: usuarioEncontrado.apellido,
      telefono: usuarioEncontrado.telefono,
    };
    const token = jwt.sign(dataLoad, SECRET, {
      expiresIn: "30d",
    });
    res.status(200).json({
      message: "Inicio de sesion exitoso",
      token: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

const modifyUser = async (req, res) => {
  try {
    const { phone, email, DNI } = req.body;
    const usuarioEncontrado = await Usuario.findOne({
      where: { DNI: DNI },
    });

    if (!usuarioEncontrado) {
      return res
        .status(404)
        .json({ message: "Ocurrió un error al buscar el usuario" });
    }
    if (email) {
      usuarioEncontrado.email = email;
    }
    if (phone) {
      usuarioEncontrado.telefono = phone;
    }
    await usuarioEncontrado.save();
    const dataLoad = {
      id: usuarioEncontrado.id,
      DNI: usuarioEncontrado.DNI,
      role: usuarioEncontrado.role,
      email: usuarioEncontrado.email,
      nombre: usuarioEncontrado.nombre,
      apellido: usuarioEncontrado.apellido,
      telefono: usuarioEncontrado.telefono,
    };

    const token = jwt.sign(dataLoad, SECRET, {
      expiresIn: "30d",
    });

    res
      .status(200)
      .json({ message: "Datos actualizados correctamente", token: token });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message:
          "Error al actualizar: El email o teléfono ya están registrados.",
        error: error.errors.map((e) => e.message),
      });
    }
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

const changePwd = async (req, res) => {
  try {
    const { oldPwd, newPwd, DNI } = req.body;
    const usuarioEncontrado = await Usuario.findOne({
      where: { DNI: DNI },
    });
    if (!usuarioEncontrado) {
      return res.status(401).json({ message: "DNI o contraseña incorrectos" });
    }
    const isMatch = await bcrypt.compare(oldPwd, usuarioEncontrado.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña antigua incorrecta" });
    }
    const hashedPassword = await bcrypt.hash(newPwd, 10);
    usuarioEncontrado.password = hashedPassword;
    await usuarioEncontrado.save();
    res.status(200).json({ message: "Contraseña cambiada correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor al cambiar la contraseña",
      error: error.message,
    });
  }
};

const UpdatePriceAndName_Paper = async (req, res) => {
  try {
    const { id, newPrice, newName } = req.body;

    if (!id || newPrice == null || !newName) {
      return res.status(400).json({
        message: "Datos incompletos. Se requiere id, newPrice y newName.",
      });
    }

    const papel = await TipoPapel.findByPk(id);

    if (!papel) {
      return res.status(404).json({ message: "Tipo de papel no encontrado" });
    }

    papel.precio = newPrice;
    papel.nombre = newName;

    await papel.save();

    res
      .status(200)
      .json({ message: "Tipo de papel actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar tipo de papel:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const UpdatePriceAndName_Terminacion = async (req, res) => {
  try {
    const { id, newPrice, newName } = req.body;

    if (!id || newPrice == null || !newName) {
      return res.status(400).json({
        message: "Datos incompletos. Se requiere id, newPrice y newName.",
      });
    }

    const terminacion = await TipoTerminacion.findByPk(id); 

    if (!terminacion) {
      return res.status(404).json({ message: "Terminación no encontrada" });
    }

    terminacion.precio = newPrice;
    terminacion.nombre = newName;

    await terminacion.save();

    res.status(200).json({ message: "Terminación actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar terminación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const Create_Terminacion = async (req, res) => {
  try {
    const { newPrice, newName } = req.body;
    if (newPrice == null || !newName) {
      return res.status(400).json({
        message: "Datos incompletos. Se requiere 'newPrice' y 'newName'.",
      });
    }

    const newTerminacion = await TipoTerminacion.create({
      precio: newPrice,
      nombre: newName,
    });
    res.status(201).json(newTerminacion);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: "Error al crear la terminación: El nombre ya existe.",
        error: error.errors.map((e) => e.message),
      });
    }
    console.error("Error al crear la terminación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const Create_Paper = async (req, res) => {
  try {
    const { newPrice, newName } = req.body;
    if (newPrice == null || !newName) {
      return res.status(400).json({
        message: "Datos incompletos. Se requiere 'newPrice' y 'newName'.",
      });
    }

    const newPaper = await TipoPapel.create({
      precio: newPrice,
      nombre: newName,
    });
    res.status(201).json(newPaper);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: "Error al crear el tipo de papel: El nombre ya existe.",
        error: error.errors.map((e) => e.message),
      });
    }

    console.error("Error al crear el tipo de papel:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const GetAll_Papers = async (req, res) => {
  try {
    const papeles = await TipoPapel.findAll();
    res.status(200).json(papeles);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error al obtener tipos de papel" });
  }
};

const GetAll_Terminaciones = async (req, res) => {
  try {
    const terminaciones = await TipoTerminacion.findAll();
    res.status(200).json(terminaciones);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error al obtener terminaciones" });
  }
};

const Delete_Paper = async (req, res) => {
  try {
    const { id } = req.params;
    const papel = await TipoPapel.findByPk(id);
    if (!papel) {
      return res.status(404).json({ message: "Tipo de papel no encontrado" });
    }
    await papel.destroy();
    res.status(200).json({ message: "Tipo de papel eliminado" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error al eliminar tipo de papel" });
  }
};

const Delete_Terminacion = async (req, res) => {
  try {
    const { id } = req.params;
    const terminacion = await TipoTerminacion.findByPk(id);
    if (!terminacion) {
      return res.status(404).json({ message: "Terminación no encontrada" });
    }
    await terminacion.destroy();
    res.status(200).json({ message: "Terminación eliminada" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error al eliminar terminación" });
  }
};

const GetAll_MaterialRequest = async (req, res) => {
  try {
    const solicitudes = await SolicitudMaterial.findAll({
      where: {
        estado: "Pendiente",
      },
      // Quizas agregar un include para saber quien la pidio
    });

    res.status(200).json(solicitudes);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Error al traer MaterialRequest" });
  }
};

const Acept_or_decline_MaterialRequest = async (req, res) => {
  try {
    const { id, newestado } = req.body;
    const materialResponse = await SolicitudMaterial.findByPk(id); 

    if (!materialResponse) {
      return res
        .status(404)
        .json({ message: "Solicitud de material no encontrada" });
    }

    materialResponse.estado = newestado;
    await materialResponse.save();

    res.status(200).json(materialResponse);
  } catch (error) {
    console.error("Error al aceptar MaterialRequest", error);

    res.status(500).json({ message: "Error al actualizar la solicitud" });
  }
};

module.exports = {
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
};
