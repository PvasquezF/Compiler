"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Excepcion_1 = require("../Excepcion/Excepcion");
const Tipo_1 = require("../utils/Tipo");
class OperacionRelacional extends Node_1.Node {
    constructor(izquierdo, derecho, operador, fila, columna) {
        super(null, fila, columna);
        this.izquierdo = izquierdo;
        this.derecho = derecho;
        this.operador = operador;
    }
    analizar(tabla, arbol) {
        const op1 = this.izquierdo.analizar(tabla, arbol);
        if (op1 instanceof Excepcion_1.Excepcion) {
            return op1;
        }
        const op2 = this.derecho.analizar(tabla, arbol);
        if (op2 instanceof Excepcion_1.Excepcion) {
            return op2;
        }
        if (op1.toString() == 'numeric' && op2.toString() == 'numeric') {
            this.tipo = new Tipo_1.Tipo(Tipo_1.Types.BOOLEAN);
            return this.tipo;
        }
    }
    getC3D(tabla, arbol) {
        let c3d = '';
        c3d += this.izquierdo.getC3D(tabla, arbol);
        const temporalIzq = tabla.getTemporalActual();
        c3d += this.derecho.getC3D(tabla, arbol);
        const temporalDer = tabla.getTemporalActual();
        const etiquetaV = tabla.getEtiqueta();
        const etiquetaF = tabla.getEtiqueta();
        // 3 == 3
        const temp = tabla.getTemporal();
        c3d += `if(${temporalIzq} ${this.operador} ${temporalDer}) goto ${etiquetaV} \n`;
        c3d += `${temp} = 0\n`;
        c3d += `goto ${etiquetaF}\n`;
        c3d += `${etiquetaV}: \n`;
        c3d += `${temp} = 1\n`;
        c3d += `${etiquetaF}: \n`;
        tabla.AgregarTemporal(temp);
        tabla.QuitarTemporal(temporalIzq);
        tabla.QuitarTemporal(temporalDer);
        return c3d;
    }
}
exports.OperacionRelacional = OperacionRelacional;
