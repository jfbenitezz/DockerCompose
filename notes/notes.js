// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware para habilitar CORS y parsear JSON
app.use(cors());
app.use(bodyParser.json());

// Diccionario para almacenar notas en memoria
const notas = {};

// CRUD Endpoints

// Create a new student or add a note to an existing student
app.post('/', (req, res) => {
    const { idEstudiante, notaEstudiante } = req.body;
    console.log(req.body)

    if (!idEstudiante || notaEstudiante === undefined) {
        return res.status(400).json({ message: 'idEstudiante and notaEstudiante are required.' });
    }

    if (!Array.isArray(notaEstudiante)) {
        return res.status(400).json({ message: 'notaEstudiante must be an array.' });
    }

    if (!notas[idEstudiante]) {
        notas[idEstudiante] = [];
    }

    notas[idEstudiante] = notas[idEstudiante].concat(notaEstudiante);
    res.status(201).json({ message: 'Notes added successfully.', notas: notas[idEstudiante] });
});

// Read notes of a student
app.get('/:idEstudiante', (req, res) => {
    const { idEstudiante } = req.params;

    if (!notas[idEstudiante]) {
        return res.status(404).json({ message: 'Student not found.' });
    }

    res.status(200).json({ notas: notas[idEstudiante] });
});

// Update notes of a student
app.put('/:idEstudiante', (req, res) => {
    const { idEstudiante } = req.params;
    const { notaEstudiante } = req.body;

    if (!notas[idEstudiante]) {
        return res.status(404).json({ message: 'Student not found.' });
    }

    if (!Array.isArray(notaEstudiante)) {
        return res.status(400).json({ message: 'notaEstudiante must be an array.' });
    }

    notas[idEstudiante] = notaEstudiante;
    res.status(200).json({ message: 'Notes updated successfully.', notas: notas[idEstudiante] });
});

// Delete notes of a student
app.delete('/:idEstudiante', (req, res) => {
    const { idEstudiante } = req.params;

    if (!notas[idEstudiante]) {
        return res.status(404).json({ message: 'Student not found.' });
    }

    delete notas[idEstudiante];
    res.status(200).json({ message: 'Notes deleted successfully.' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
