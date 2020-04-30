"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Excepcion_1 = require("../Excepcion/Excepcion");
class Return extends Node_1.Node {
    constructor(valor, fila, columna) {
        super(null, fila, columna);
        this.valor = valor;
    }
    analizar(tabla, arbol) {
        const result = this.valor.analizar(tabla, arbol);
        if (result instanceof Excepcion_1.Excepcion) {
            return result;
        }
        this.tipo = result;
        return this.tipo;
    }
    getC3D(tabla, arbol) {
        let codigo = '';
        codigo += this.valor.getC3D(tabla, arbol);
        const etiqueta = tabla.getEtiqueta();
        codigo += `stack[P] = ${tabla.getTemporalActual()}\n`;
        tabla.QuitarTemporal(tabla.getTemporalActual());
        codigo += `goto ${etiqueta}\n`;
        tabla.listaReturn.push(etiqueta);
        return codigo;
    }
}
exports.Return = Return;
