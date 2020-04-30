"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Excepcion_1 = require("../Excepcion/Excepcion");
class Arreglo extends Node_1.Node {
    constructor(tipo, dimensiones, fila, columna) {
        super(tipo, fila, columna);
        this.dimensiones = dimensiones;
    }
    // integer[] a = new integer[5*4+7]
    analizar(tabla, arbol) {
        const result = this.dimensiones[0].analizar(tabla, arbol);
        if (result instanceof Excepcion_1.Excepcion) {
            return result;
        }
        // Validar que el tipo sea numerico
        if (result.toString() !== 'numeric') {
            const excepcion = new Excepcion_1.Excepcion('Semantico', `El tipo de la dimension debe ser numerico.`, this.fila, this.columna);
            arbol.errores.push(excepcion);
            return excepcion;
        }
        return this.tipo;
    }
    getC3D(tabla, arbol) {
        let codigo = '';
        let defaultValue = '';
        if (this.tipo.toString() === 'string') {
            defaultValue = '-1';
        }
        else {
            defaultValue = '0';
        }
        // Posicion inicial del arreglo
        let temp1 = tabla.getTemporal();
        codigo += `${temp1} = h\n`;
        tabla.AgregarTemporal(temp1);
        // Tamaño del arreglo
        const size = this.dimensiones[0];
        codigo += size.getC3D(tabla, arbol);
        const temp2 = tabla.getTemporalActual();
        codigo += `heap[${temp1}] = ${temp2}\n`;
        codigo += `h = h + 1\n`; // aumentamos el puntero h
        // creamos cada posicion y adicionalmente guardamos su valor por defecto
        const temp3 = tabla.getTemporal(); // Temporal contador auxiliar
        const label = tabla.getEtiqueta();
        const label2 = tabla.getEtiqueta();
        codigo += `${temp3} = 0\n`;
        tabla.AgregarTemporal(temp3);
        codigo += `${label2}:\n`;
        codigo += `if(${temp3} >= ${temp2}) goto ${label}\n`;
        tabla.QuitarTemporal(temp3);
        tabla.QuitarTemporal(temp2);
        codigo += `heap[h] = ${defaultValue}\n`; // Asignamos valor por defecto
        codigo += `h = h + 1\n`; // aumentamos el puntero h
        codigo += `${temp3} = ${temp3} + 1\n`;
        codigo += `goto ${label2}\n`;
        codigo += `${label}:\n`;
        codigo += `${tabla.getTemporal()} = ${temp1}\n`;
        tabla.QuitarTemporal(temp1);
        return codigo;
    }
}
exports.Arreglo = Arreglo;
