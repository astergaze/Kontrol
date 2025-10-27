const { Empresa, Jefe, Empleado, Cliente, Producto, OT, OrdenCot, MenEmp, MenCoor, Chat} = require("../models");

const SignUp = async (req, res) => {   
    try{
    const { name, lastname, email, telefono, DNI } = req.body;

    const hashedPassword = await bcrypt.hash(DNI.toString(), 10);
    
    const newEmpleado = await Empleado.create({
        nombre,
        apellido,
        email,
        telefono,
        DNI,
        password: hashedPassword
    });
    res.json({ message: "Empleado creado", empleado: newEmpleado});
} catch (error) {
    res.status(500).json({ message: "Error al crear empleado", error: error.message });
}
}

module.exports = {
    SignUp,
};