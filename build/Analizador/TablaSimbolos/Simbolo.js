"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class Esta clase me permite almacenar información relevante de variables
 */
class Simbolo {
    /**
     * @constructor Devuelve un simbolo para almacenar en mi tabla
     * @param {Tipo} type Tipo de la varible
     * @param {String} identifier Nombre de la variable
     * @param {number} posicion Posicion que ocupa la variable en el heap o stack
     */
    constructor(tipo, identificador, posicion) {
        this.tipo = tipo;
        // this.type = tipo.toString();
        this.identificador = identificador;
        this.posicion = posicion;
    }
}
exports.Simbolo = Simbolo;
