"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Excepcion_1 = require("../Excepcion/Excepcion");
class Mientras extends Node_1.Node {
    constructor(condicion, instrucciones, fila, columna) {
        super(null, fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    analizar(tabla, arbol) {
        let cond = this.condicion.analizar(tabla, arbol);
        if (cond instanceof Excepcion_1.Excepcion) {
            return cond;
        }
        this.instrucciones.map(m => {
            let result = m.analizar(tabla, arbol);
            if (result instanceof Excepcion_1.Excepcion) {
                return result;
            }
        });
    }
    getC3D(tabla, arbol) {
        let codigo = '';
        let etiqueta = tabla.getEtiqueta();
        let condicion = this.condicion.getC3D(tabla, arbol);
        codigo += `${etiqueta}:\n`; // L1: 
        codigo += condicion;
        let temp = tabla.getTemporalActual();
        let etiqueta1 = tabla.getEtiqueta();
        let etiqueta2 = tabla.getEtiqueta();
        codigo += `if(${temp} == 1) goto ${etiqueta1}\n`;
        codigo += `goto ${etiqueta2}\n`;
        codigo += `${etiqueta1}:`;
        this.instrucciones.map(m => {
            codigo += m.getC3D(tabla, arbol);
        });
        codigo += `goto ${etiqueta}\n`;
        codigo += `${etiqueta2}:\n`;
        return codigo;
    }
}
exports.Mientras = Mientras;
