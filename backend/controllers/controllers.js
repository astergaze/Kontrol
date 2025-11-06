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
const CreateTestUser = async () => {
  try {
    const [user, created] = await Usuario.findOrCreate({
      where: { email: 'Juan@31minutos.com' }, // Campo único para buscar
      defaults: {
        role: 'jefe',
        nombre: 'Juan Carlos',
        apellido: 'Bodoque',
        email: 'Juan@31minutos.com',
        telefono: '0123456789',
        DNI: '31313131',
        password: '$2b$10$3TZ13oHxppoQ4.9iHPn8o.FVxzNFiz0fr/aBzrKL20mRI9rx14uvi'
      }
    });

    if (created) {
      console.log('Usuario "jefe" por defecto (Juan Carlos Bodoque) creado.');
    } else {
      console.log('El usuario "jefe" por defecto ya existe.');
    }
  } catch (error) {
    console.error('Error al crear el usuario por defecto:', error);
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
// --- CORREGIDO: UpdatePriceAndName_Paper ---
const UpdatePriceAndName_Paper = async (req, res) => {
  try {
    const { idTipoPapel, newPrice, newName } = req.body;

    if (!idTipoPapel || newPrice == null || !newName) {
      return res.status(400).json({
        message: "Datos incompletos. Se requiere idTipoPapel, newPrice y newName."
      });
    }

    const papel = await TipoPapel.findByPk(idTipoPapel);

    if (!papel) {
      return res.status(404).json({ message: "Tipo de papel no encontrado" });
    }

    // --- ¡CAMBIO IMPORTANTE AQUÍ! ---
    papel.precio = newPrice; // Antes: papel.price
    papel.nombre = newName;   // Antes: papel.name
    // --- FIN DEL CAMBIO ---

    await papel.save();

    res.status(200).json({ message: "Tipo de papel actualizado correctamente" });

  } catch (error) {
    console.error("Error al actualizar tipo de papel:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

// --- CORREGIDO: UpdatePriceAndName_Terminacion ---
const UpdatePriceAndName_Terminacion = async (req, res) => {
  try {
    const { idTerminacion, newPrice, newName } = req.body;

    if (!idTerminacion || newPrice == null || !newName) {
      return res.status(400).json({
        message: "Datos incompletos. Se requiere idTerminacion, newPrice y newName."
      });
    }

    const Terminacion = await TipoTerminacion.findByPk(idTerminacion);

    if (!Terminacion) {
      return res.status(404).json({ message: "Terminación no encontrada" });
    }

    // --- ¡CAMBIO IMPORTANTE AQUÍ! ---
    Terminacion.precio = newPrice; // Antes: Terminacion.price
    Terminacion.nombre = newName;   // Antes: Terminacion.name
    // --- FIN DEL CAMBIO ---

    await Terminacion.save();

    res.status(200).json({ message: "Terminación actualizada correctamente" });

  } catch (error) {
    console.error("Error al actualizar terminación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
const Create_Terminacion = async (req, res) => {
  try {
    const { newPrice, newName } = req.body;
    if (newPrice == null || !newName) {
      return res.status(400).json({ 
        message: "Datos incompletos. Se requiere 'newPrice' y 'newName'." 
      });
    }

    const newTerminacion = await TipoTerminacion.create({
      precio: newPrice, // Antes: price
      nombre: newName   // Antes: name
    });
    res.status(201).json(newTerminacion);

  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        message: "Error al crear la terminación: El nombre ya existe.",
        error: error.errors.map(e => e.message)
      });
    }
    console.error("Error al crear la terminación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

const Create_Paper = async (req, res) => {
  try {
    const { newPrice, newName } = req.body;
    if (newPrice == null || !newName) {
      return res.status(400).json({ 
        message: "Datos incompletos. Se requiere 'newPrice' y 'newName'." 
      });
    }

    const newPaper = await TipoPapel.create({
      precio: newPrice, // Antes: price
      nombre: newName   // Antes: name
    });
    res.status(201).json(newPaper);

  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        message: "Error al crear el tipo de papel: El nombre ya existe.",
        error: error.errors.map(e => e.message)
      });
    }
    
    console.error("Error al crear el tipo de papel:", error); 
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
const GetAll_Papers = async (req, res) => {
  try {
    const papeles = await TipoPapel.findAll();
    res.status(200).json(papeles);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error al obtener tipos de papel" });
  }
}

const GetAll_Terminaciones = async (req, res) => {
  try {
    const terminaciones = await TipoTerminacion.findAll(); 
    res.status(200).json(terminaciones);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error al obtener terminaciones" });
  }
}

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
}

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
}
module.exports = {
  SignUp,
  Login,
  modifyUser,
  changePwd,
  CreateTestUser,
  UpdatePriceAndName_Paper,
  UpdatePriceAndName_Terminacion,
  Create_Terminacion,
  Create_Paper,
  GetAll_Papers,
  GetAll_Terminaciones,
  Delete_Paper,
  Delete_Terminacion
};
