const express = require('express');
const cors = require('cors');
const sequelize = require("./config/db");
const app = express();
const port = 3001;
const { SignUp, Login, modifyUser, changePwd } = require('./controllers/controllers');
app.use(cors());
app.use(express.json())
app.post('/api/hello', (req, res) => {
    res.status(200).json({ message: 'Hola desde el backend!' });
});
app.post('/api/signup', SignUp);
app.post('/api/login', Login);
app.post('/api/modify', modifyUser)
app.post('/api/changePwd', changePwd)
app.listen(port, () => {
    sequelize.sync({ force: true })
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
