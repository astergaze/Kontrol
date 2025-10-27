const { Empresa, Jefe, Empleado, Cliente, Producto, OT, OrdenCot, Mensaje, Chat } = require("../models/Models");
const bcrypt = require("bcrypt");
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
            salario: 0
        });
        res.json({ message: "Empleado creado", empleado: newEmpleado });
    } catch (error) {
        res.status(500).json({ message: "Error al crear empleado", error: error.message });
    }
}

module.exports = {
    SignUp,
};