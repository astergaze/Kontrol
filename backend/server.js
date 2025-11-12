const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const app = express();
const port = 3001;

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
} = require("./controllers/controllers");
const isAuth = require("./middlewares/isAuth");

app.use(cors());
app.use(express.json());

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
app.listen(port, () => {
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Base de datos sincronizada.");
      return CreateTest();
    })
    .then(() => {
      console.log(`Servidor backend corriendo en http://localhost:${port}`);
    })
    .catch((err) => {
      console.error("Error al arrancar el servidor:", err);
    });
});
