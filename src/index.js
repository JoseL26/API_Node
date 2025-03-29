require('dotenv').config(); 

const express = require('express');
const bodyParser = require('body-parser');
const verificarJWT = require('./middleware/jwt');
const serverless = require('serverless-http');

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(bodyParser.json());

app.use((req, res, next) => {
    if (req.apiGateway && req.apiGateway.event.body) {
        try {
            req.body = JSON.parse(req.apiGateway.event.body);
        } catch (error) {
            console.error("Error al parsear el body:", error);
            return res.status(400).json({ error: "Cuerpo de la solicitud no es un JSON válido" });
        }
    }
    next();
});

function calcularEstadisticas(matrices) {
    let valores = matrices.flat(2);
    let maximo = Math.max(...valores);
    let minimo = Math.min(...valores);
    let suma = valores.reduce((acc, val) => acc + val, 0);
    let promedio = suma / valores.length;

    return { maximo, minimo, suma, promedio };
}

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
        let { Q, R } = req.body;

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
        console.error("Error:", error);
        res.status(500).json({ error: 'Error procesando la solicitud' });
    }
});

module.exports.handler = serverless(app);
