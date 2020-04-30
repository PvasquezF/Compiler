"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Excepcion_1 = require("../Excepcion/Excepcion");
class HacerMientras extends Node_1.Node {
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
        let condicion = this.condicion.getC3D(tabla, arbol);
        codigo += condicion;
        let temp = tabla.getTemporalActual();
        let etiquetaV = tabla.getEtiqueta();
        let etiquetaF = tabla.getEtiqueta();
        return codigo;
    }
}
exports.HacerMientras = HacerMientras;
