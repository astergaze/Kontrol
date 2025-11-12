const express = require('express');
const cors = require('cors');
const sequelize = require("./config/db");
const app = express();
const port = 3001;

const { SignUp, Login, modifyUser, changePwd, CreateTestUser, UpdatePriceAndName_Paper, UpdatePriceAndName_Terminacion,
  Create_Terminacion,Create_Paper,GetAll_Papers,GetAll_Terminaciones,Delete_Paper,Delete_Terminacion,GetAll_MaterialRequest,
Acept_or_decline_MaterialRequest } = require('./controllers/controllers');

app.use(cors());
app.use(express.json());

app.post('/api/hello', (req, res) => {
    res.status(200).json({ message: 'Hola desde el backend!' });
});
app.post('/api/signup', SignUp);
app.post('/api/login', Login);
app.post('/api/modify', modifyUser);
app.post('/api/changePwd', changePwd);
app.post('/api/updatePaper', UpdatePriceAndName_Paper);
app.post('/api/updateTerminacion', UpdatePriceAndName_Terminacion);
app.post('/api/createTerminacion', Create_Terminacion);
app.post('/api/createPaper', Create_Paper);
app.get('/api/papers', GetAll_Papers);
app.get('/api/terminations', GetAll_Terminaciones);
app.delete('/api/paper/:id', Delete_Paper);
app.delete('/api/termination/:id', Delete_Terminacion);
app.get('/api/viewmaterialrequest',GetAll_MaterialRequest);
app.post('/api/Acept_MaterialRequest',Acept_or_decline_MaterialRequest);
app.listen(port, () => {
    sequelize.sync({ force: false })
      .then(() => {
        console.log("Base de datos sincronizada.");
        return CreateTestUser();
      })
      .then(() => {
        console.log(`Servidor backend corriendo en http://localhost:${port}`);
      })
      .catch(err => {
        console.error("Error al arrancar el servidor:", err);
      });
});