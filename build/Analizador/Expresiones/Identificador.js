"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Excepcion_1 = require("../Excepcion/Excepcion");
class Identificador extends Node_1.Node {
    constructor(identificador, fila, columna) {
        super(null, fila, columna);
        this.identificador = identificador;
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla, arbol) {
        // Verificar que existe la variable
        const exists = tabla.getVariable(this.identificador);
        if (exists === null) {
            const excepcion = new Excepcion_1.Excepcion('Semantico', `No existe la variable ${this.identificador}`, this.fila, this.columna);
            arbol.errores.push(excepcion);
            return excepcion;
        }
        this.tipo = exists.tipo;
        return exists.tipo;
    }
    getC3D(tabla, arbol) {
        let codigo = '';
        let variable = tabla.getVariable(this.identificador);
        if (!tabla.ambito) {
            codigo += `${tabla.getTemporal()} = heap[${variable.posicion}]\n`;
        }
        else {
            let temp = tabla.getTemporal();
            codigo += `${temp} = P\n`;
            codigo += `${temp} = ${temp} + ${variable.posicion}\n`;
            codigo += `${tabla.getTemporal()} = stack[${temp}]\n`;
        }
        tabla.AgregarTemporal(tabla.getTemporalActual());
        return codigo;
    }
}
exports.Identificador = Identificador;
