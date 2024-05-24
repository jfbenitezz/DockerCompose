const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Simulación de base de datos en memoria
let users = {};

// Endpoint para registrarse (signUp)
app.post('/auth/signUp', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    if (users[username]) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    users[username] = { password };
    res.status(201).json({ message: 'User registered successfully.' });
});

// Endpoint para iniciar sesión (logIn)
app.post('/auth/logIn', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const user = users[username];

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid username or password.' });
    }

    res.status(200).json({ message: 'Login successful.' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Auth service is running on http://localhost:${PORT}`);
});
