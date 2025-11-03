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
      idUsuario: newUsuario.idUsuario,
      nombre: newUsuario.nombre,
      email: newUsuario.email,
      role: newUsuario.role,
    };
    res.status(201).json({ message: "Usuario creado con éxito", data: userData });

  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        message: "Error al crear usuario: El email, teléfono o DNI ya están registrados.",
        error: error.errors.map(e => e.message)
      });
    }
    res.status(500).json({
      message: "Error interno del servidor al crear el usuario",
      error: error.message
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
      id: usuarioEncontrado.idUsuario, 
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
      return res.status(404).json({ message: "Ocurrió un error al buscar el usuario" });
    }
    if (email) {
      usuarioEncontrado.email = email;
    }
    if (phone) {
      usuarioEncontrado.telefono = phone;
    }
    await usuarioEncontrado.save();
    const dataLoad = {
      id: usuarioEncontrado.idUsuario,
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

    res.status(200).json({ message: "Datos actualizados correctamente", token: token });

  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        message: "Error al actualizar: El email o teléfono ya están registrados.",
        error: error.errors.map(e => e.message)
      });
    }
    res.status(500).json({ 
      message: "Error interno del servidor", 
      error: error.message 
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
      error: error.message 
    });
  }
};
module.exports = {
  SignUp,
  Login,
  modifyUser,
  changePwd
};
