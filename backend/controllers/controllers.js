const {
  Empresa,
  Jefe,
  Empleado,
  Cliente,
  Producto,
  OT,
  OrdenCot,
  Mensaje,
  Chat,
} = require("../models/Models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const SECRET = "El Psy Kongroo" //Luego mover a un .env
const SignUp = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, DNI } = req.body;

    const hashedPassword = await bcrypt.hash(DNI.toString(), 10);

    const newEmpleado = await Empleado.create({
      nombre,
      apellido,
      email,
      telefono,
      DNI,
      password: hashedPassword,
      isAdmin: false,
    });
    res.json({ message: "Empleado creado", token: newEmpleado });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear empleado", error: error.message });
  }
};

const Login = async (req, res) => {
  try {
    const { DNI, password } = req.body;
    const empleadoEncontrado = await Empleado.findOne({
      where: { DNI: DNI },
    });
    if (!empleadoEncontrado) {
      return res.status(404).json({ message: "DNI o contraseña incorrectos" });
    }
    const isMatch = await bcrypt.compare(password, empleadoEncontrado.password);
    if (!isMatch) {
      return res.status(401).json({ message: "DNI o contraseña incorrectos" });
    }
    const dataLoad= {
        id: empleadoEncontrado.id,
        DNI: empleadoEncontrado.DNI,
        isAdmin: empleadoEncontrado.isAdmin,
        email: empleadoEncontrado.email,
        nombre: empleadoEncontrado.nombre,
        apellido: empleadoEncontrado.apellido,
        telefono: empleadoEncontrado.telefono
    }
    const token = jwt.sign(
        dataLoad,
        SECRET, {
            expiresIn: "30d"
        }
    )
    res.status(201).json({
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
  const { phone, email, DNI } = req.body;
  const empleadoEncontrado = await Empleado.findOne({
    where: { DNI: DNI },
  });
  if (!empleadoEncontrado) {
    return res.status(404).json({ message: "Ocurrio al buscar empleado" });
  }
  if (email) {
    empleadoEncontrado.email = email;
  }
  if (phone) {
    empleadoEncontrado.telefono = phone;
  }
  const dataLoad= {
        id: empleadoEncontrado.id,
        DNI: empleadoEncontrado.DNI,
        isAdmin: empleadoEncontrado.isAdmin,
        email: empleadoEncontrado.email,
        nombre: empleadoEncontrado.nombre,
        apellido: empleadoEncontrado.apellido,
        telefono: empleadoEncontrado.telefono
    }
    const token = jwt.sign(
        dataLoad,
        SECRET, {
            expiresIn: "30d"
        }
    )
  await empleadoEncontrado.save();
  res.json({ message: "Datos actualizados correctamente", token: token });
};
module.exports = {
  SignUp,
  Login,
  modifyUser,
};
