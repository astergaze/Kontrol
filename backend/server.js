const express = require('express');
const sequelize = require("./config/db");
const app = express();
const port = 3001;
const { SignUp } = require('./controllers/controllers');
app.post('/api/hello', (req, res) => {
    res.status(200).json({ message: 'Hola desde el backend!' });
});
app.post('/api/signup', SignUp);
app.listen(port, () => {
    sequelize.sync({ force: false })
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
