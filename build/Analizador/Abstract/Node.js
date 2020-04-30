"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    /**
     *
     * @constructor Base para cualquier instruccion o expresion, omitir tipo si fuera una instruccion
     * @param tipo Tipo de la expresion, si fuera una expresion poner valor de nulo
     * @param fila Linea de la instruccion o expresion
     * @param columna columna de la instruccion o expresion
     */
    constructor(tipo, fila, columna) {
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }
}
exports.Node = Node;
