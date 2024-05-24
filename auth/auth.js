// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(bodyParser.json());

// Diccionario para almacenar usuarios en memoria
const users = {};

// Endpoint para registrarse (signUp)
app.post('/signUp', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    if (users[username]) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    // Guardar el nuevo usuario en el diccionario
    users[username] = { password };
    res.status(201).json({ message: 'User registered successfully.' });
});

// Endpoint para iniciar sesión (logIn)
app.post('/logIn', (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
