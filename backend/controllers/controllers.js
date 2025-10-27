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

const Login = async (req, res) => {
    try {
        const { DNI, password } = req.body;
        const empleadoEncontrado = await Empleado.findOne({ 
            where: { DNI: DNI } 
        });
        if (!empleadoEncontrado) {
            return res.status(404).json({ message: "DNI o contraseña incorrectos" });
        }
        const isMatch = await bcrypt.compare(password, empleadoEncontrado.password);
        if (!isMatch) {
            return res.status(401).json({ message: "DNI o contraseña incorrectos" });
        }
        //Usar JWT despues
        res.json({ 
            message: "Inicio de sesion exitoso",
            empleado: {
                idEmpleado: empleadoEncontrado.idEmpleado,
                nombre: empleadoEncontrado.nombre,
                email: empleadoEncontrado.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

module.exports = {
    SignUp,
    Login
};