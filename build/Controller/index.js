"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Index(req, res) {
    res.status(200).json({
        success: true,
        data: {
            message: 'Bienvenido, en esta parte unicamente se genera C3d, Tabla de simbolos y errores. Para hacerlo utilizar las indicaciones de abajo.',
            compilar: 'http://localhost:3000/traduccion',
            method: 'POST'
        }
    });
}
exports.Index = Index;
