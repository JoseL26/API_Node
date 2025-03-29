require('dotenv').config(); // Cargar las variables de entorno

const express = require('express');
const bodyParser = require('body-parser');
const verificarJWT = require('./middleware/jwt');

const app = express();
const PORT = process.env.PORT || 3000; // Usar el puerto del .env o 3000 por defecto

app.use(bodyParser.json());

// Función para calcular estadísticas de las matrices
function calcularEstadisticas(matrices) {
    let valores = matrices.flat(2);
    let maximo = Math.max(...valores);
    let minimo = Math.min(...valores);
    let suma = valores.reduce((acc, val) => acc + val, 0);
    let promedio = suma / valores.length;

    return { maximo, minimo, suma, promedio };
}

// Función para verificar si una matriz es diagonal
function esMatrizDiagonal(matriz) {
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            if (i !== j && matriz[i][j] !== 0) {
                return false;
            }
        }
    }
    return true;
}

app.post('/calcular-estadisticas', verificarJWT, (req, res) => {
    try {
        const { Q, R } = req.body;
        if (!Q || !R) {
            return res.status(400).json({ error: 'Las matrices Q y R son requeridas' });
        }
        
        const estadisticas = calcularEstadisticas([Q, R]);
        const esDiagonalQ = esMatrizDiagonal(Q);
        const esDiagonalR = esMatrizDiagonal(R);

        res.json({
            maximo: estadisticas.maximo,
            minimo: estadisticas.minimo,
            promedio: estadisticas.promedio,
            suma: estadisticas.suma,
            esDiagonalQ,
            esDiagonalR
        });
    } catch (error) {
        res.status(500).json({ error: 'Error procesando la solicitud' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
