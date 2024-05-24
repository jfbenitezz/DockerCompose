const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();
app.use(cors());

const PORT = 4000;

// Proxy para el servidor de autenticación
const authProxy = createProxyMiddleware({
    target: 'http://localhost:3000', // URL del servidor de autenticación
    changeOrigin: true,
});
app.use('/auth', authProxy);

// Proxy para el servidor de notas
const notesProxy = createProxyMiddleware({
    target: 'http://localhost:3001', // URL del servidor de notas
    changeOrigin: true,
});
app.use('/notes', notesProxy);

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});