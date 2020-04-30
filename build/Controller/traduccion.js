"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tabla_1 = require("../Analizador/TablaSimbolos/Tabla");
const Common_1 = require("../Analizador/Utils/Common");
const Declaracion_1 = require("../Analizador/Instrucciones/Declaracion");
const Funcion_1 = require("../Analizador/Instrucciones/Funcion");
const parser = require('../Analizador/Gramatica/gramatica.js');
function Traducir(req, res) {
    const { entrada } = req.body;
    if (!entrada || !entrada || /^\s*$/.test(entrada)) {
        res.status(400).json({
            success: false,
            errors: ['No se encontro la entrada en el cuerpo de la petición o posiblemente este vacia.']
        });
    }
    const arbol = parser.parse(entrada);
    if (arbol.errores.length === 0) {
        const tabla = new Tabla_1.Tabla();
        tabla.sizeActual.push(0);
        // Obteniendo funciones
        arbol.instrucciones.map(m => {
            if (m instanceof Funcion_1.Funcion) {
                tabla.setStack(0);
                Common_1.agregarFuncion(tabla, arbol, m);
            }
        });
        let cantidadGlobales = 0;
        arbol.instrucciones.map(m => {
            if (m instanceof Declaracion_1.Declaracion) {
                m.posicion = tabla.getHeap();
                cantidadGlobales++;
            }
        });
        arbol.instrucciones.map(m => {
            m.analizar(tabla, arbol);
        });
        let c3d = '';
        if (arbol.errores.length == 0) {
            for (let i = 0; i < cantidadGlobales; i++) {
                c3d += `heap[${i}] = 0\n`;
                c3d += `h = h + 1\n`;
            }
            arbol.instrucciones.map(m => {
                c3d += m.getC3D(tabla, arbol);
            });
        }
        res.status(200).json({
            success: arbol.errores.length == 0,
            c3d,
            variables: tabla.variables,
            funciones: tabla.funciones,
            error: arbol.errores
        });
    }
    else {
        res.status(200).json({
            success: false,
            error: arbol.errores
        });
    }
}
exports.Traducir = Traducir;
