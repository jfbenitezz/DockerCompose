const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Ruta para servir el archivo HTML
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const notas = {};

// CRUD Endpoints
app.post('/notes', (req, res) => {
    const { idEstudiante, notaEstudiante } = req.body;

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

app.get('/notes/:idEstudiante', (req, res) => {
    const { idEstudiante } = req.params;

    if (!notas[idEstudiante]) {
        return res.status(404).json({ message: 'Student not found.' });
    }

    res.status(200).json({ notas: notas[idEstudiante] });
});

app.put('/notes/:idEstudiante', (req, res) => {
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

app.delete('/notes/:idEstudiante', (req, res) => {
    const { idEstudiante } = req.params;

    if (!notas[idEstudiante]) {
        return res.status(404).json({ message: 'Student not found.' });
    }

    delete notas[idEstudiante];
    res.status(200).json({ message: 'Notes deleted successfully.' });
});

app.listen(PORT, () => {
    console.log(`Notes service is running on http://localhost:${PORT}`);
});
