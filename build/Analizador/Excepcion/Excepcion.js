"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class Nodo para almacenar errores ya sean lexicos, sintacticos o semanticos
 */
class Excepcion {
    /**
     * Devuelve un objeto con un nuevo objeto excepcion
     * @param tipo Tipo de error, e.g. (lexico, sintactico, semantico)
     * @param descripcion Descripcion del error, e.g. (No se encontro la variable X)
     * @param fila Fila donde ocurrio el error
     * @param columna Columna donde ocurrio el error
     */
    constructor(tipo, descripcion, fila, columna) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }
    toString() {
        return `${this.tipo} ${this.descripcion} ${this.fila} ${this.columna}`;
    }
}
exports.Excepcion = Excepcion;
