"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Excepcion_1 = require("../Excepcion/Excepcion");
/**
 * @class Reasigna el valor de una variable existente
 */
class Asignacion extends Node_1.Node {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Asignacion
     * @param identificador nombre de la variable
     * @param valor valor de la variable
     * @param fila Linea de la sentencia
     * @param columna Columna de la sentencia
     */
    constructor(identificador, valor, fila, columna) {
        super(null, fila, columna);
        this.identificador = identificador;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla, arbol) {
        // Buscar si la variable ya existe
        const exists = tabla.getVariable(this.identificador);
        if (exists === null) {
            const excepcion = new Excepcion_1.Excepcion('Semantico', `La variable ${this.identificador} no existe.`, this.fila, this.columna);
            arbol.errores.push(excepcion);
            return excepcion;
        }
        const tipo = this.valor.analizar(tabla, arbol);
        // Verificar si el analisis del valor nos devuelve una excepcion
        if (tipo.constructor.name === 'Excepcion') {
            return tipo;
        }
        if (exists.tipo.toString() !== tipo.toString()) {
            const excepcion = new Excepcion_1.Excepcion('Semantico', `La variable con tipo ${exists.tipo.toString()} no es igual al tipo ${tipo.toString()}`, this.fila, this.columna);
            arbol.errores.push(excepcion);
            return excepcion;
        }
    }
    getC3D(tabla, arbol) {
        let codigo = '';
        let variable = tabla.getVariable(this.identificador);
        let valor3D = this.valor.getC3D(tabla, arbol);
        codigo += valor3D;
        if (!tabla.ambito) {
            codigo += `heap[${variable.posicion}] = ${tabla.getTemporalActual()}\n`;
        }
        else {
            let temp = tabla.getTemporalActual();
            let temp2 = tabla.getTemporal();
            codigo += `${temp2} = P\n`;
            codigo += `${temp2} = ${temp2} + ${variable.posicion}\n`;
            codigo += `stack[${temp2}] = ${temp}\n`;
        }
        tabla.QuitarTemporal(tabla.getTemporalActual());
        return codigo;
    }
}
exports.Asignacion = Asignacion;
