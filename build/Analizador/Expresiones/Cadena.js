"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Tipo_1 = require("../utils/Tipo");
class Cadena extends Node_1.Node {
    constructor(cadena, arreglo, fila, columna) {
        super(new Tipo_1.Tipo(Tipo_1.Types.STRING), fila, columna);
        this.cadena = cadena;
        this.arreglo = arreglo;
    }
    analizar(tabla, arbol) {
        return this.tipo;
    }
    getC3D(tabla, arbol) {
        let codigo = this.arreglo.getC3D(tabla, arbol);
        let temporal = tabla.getTemporalActual(); // Posicion de inicio de arreglo
        let temporal1 = tabla.getTemporal(); // TempAux
        codigo += `${temporal1} = ${temporal}\n`;
        tabla.AgregarTemporal(temporal1);
        codigo += `${temporal} = ${temporal} + 1\n`;
        tabla.QuitarTemporal(temporal);
        for (let i = 0; i < this.cadena.length; i++) {
            console.log(this.cadena[i].charCodeAt(0));
            codigo += `heap[${temporal}] = ${this.cadena[i].charCodeAt(0)}\n`;
            codigo += `${temporal} = ${temporal} + 1\n`;
        }
        return codigo;
    }
}
exports.Cadena = Cadena;
