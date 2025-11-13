const jwt = require("jsonwebtoken");
const { Usuario } = require("../models/Models");
const SECRET = "El Psy Kongroo"; //Luego mover a un .env
const isAuth = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(token);
  jwt.verify(token, SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Auth error" });

    const user = await Usuario.findByPk(decoded.id);
    if (!user)
      return res.json({
        message: "Usuario no encontrado, verifique los datos ingresados",
      });
    req.user = {
      id: user.id,
      email: user.email,
      name: user.firstName + " " + user.lastName,
    };
    next();
  });
};
module.exports = isAuth;
