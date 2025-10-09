const express = require('express');
const app = express();
const port = 3001;
app.post('/api/hello', (req, res) => {
    res.status(200).json({ message: 'Hola desde el backend!' });
});

app.listen(port, async () => {
    sequelize.sync({ force: false })
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
