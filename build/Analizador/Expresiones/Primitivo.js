"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
class Primitivo extends Node_1.Node {
    constructor(tipo, valor, fila, columna) {
        super(tipo, fila, columna);
        this.valor = valor;
    }
    analizar(tabla, arbol) {
        return this.tipo;
    }
    getC3D(tabla, arbol) {
        const temporal = tabla.getTemporal();
        let c3d = `${temporal} = ${this.valor} \n`;
        tabla.AgregarTemporal(tabla.getTemporalActual());
        return c3d;
    }
}
exports.Primitivo = Primitivo;
