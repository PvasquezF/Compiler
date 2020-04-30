"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
class Funcion extends Node_1.Node {
    constructor(tipo, nombre, parametros, instrucciones, fila, columna) {
        super(tipo, fila, columna);
        this.nombre = this.getNombreFuncion(nombre, parametros);
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }
    analizar(tabla, arbol) {
        // Agregar los parametros a la TS
        this.parametros.map(m => {
            m.analizar(tabla, arbol);
        });
        // validar que todas las instrucciones son validas semanticamente
        console.log(this.instrucciones);
        this.instrucciones.map(m => {
            m.analizar(tabla, arbol);
        });
    }
    getC3D(tabla, arbol) {
        const existeFuncion = tabla.getFuncion(this.nombre);
        tabla.sizeActual.push(existeFuncion.size_function);
        tabla.ambito = true;
        let codigo = `proc ${this.nombre} begin\n`;
        this.instrucciones.map(m => {
            codigo += m.getC3D(tabla, arbol);
        });
        tabla.listaReturn.map(m => {
            codigo += `${m}:\n`;
        });
        codigo += `end\n\n\n\n`;
        tabla.ambito = false;
        tabla.listaReturn = [];
        tabla.sizeActual.pop();
        tabla.tempStorage = [];
        return codigo;
    }
    getNombreFuncion(nombre, parametros) {
        // El nombre de la funcion va a estar dado por el nombre + el tipo de cada parametro
        // Esto con el fin de diferenciar mas facilmente las funciones y poder crear sobrecarga
        const tipos_parametros = [];
        parametros.map(m => {
            tipos_parametros.push(m.tipo.toString());
        });
        return tipos_parametros.length == 0 ?
            `${nombre}` :
            `${nombre}_${tipos_parametros.join('_')}`;
    }
}
exports.Funcion = Funcion;
