"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Excepcion_1 = require("../Excepcion/Excepcion");
class Si extends Node_1.Node {
    constructor(condicion, listaIf, listaElse, fila, columna) {
        super(null, fila, columna);
        this.condicion = condicion;
        this.listaIf = listaIf;
        this.listaElse = listaElse;
        this.fila = fila;
        this.columna = columna;
    }
    // (a < b)
    analizar(tabla, arbol) {
        let cond = this.condicion.analizar(tabla, arbol);
        if (cond.constructor.name === 'Excepcion') {
            return cond;
        }
        if (cond.toString() == 'boolean') {
        }
        this.listaIf.map(m => {
            let result = m.analizar(tabla, arbol);
            if (result instanceof Excepcion_1.Excepcion) {
                return result;
                ;
            }
        });
        this.listaElse.map(m => {
            let result = m.analizar(tabla, arbol);
            if (result instanceof Excepcion_1.Excepcion) {
                return result;
                ;
            }
        });
    }
    getC3D(tabla, arbol) {
        let codigo = '';
        let condicion = this.condicion.getC3D(tabla, arbol);
        codigo += condicion;
        let temp = tabla.getTemporalActual();
        let etiquetaV = tabla.getEtiqueta();
        let etiquetaF = tabla.getEtiqueta();
        codigo += `if(${temp} == 1) goto ${etiquetaV}\n`;
        tabla.QuitarTemporal(temp);
        this.listaElse.map(m => {
            codigo += m.getC3D(tabla, arbol);
        });
        codigo += `goto ${etiquetaF}\n`;
        codigo += `${etiquetaV}:\n`;
        this.listaIf.map(m => {
            codigo += m.getC3D(tabla, arbol);
        });
        codigo += `${etiquetaF}:\n`;
        return codigo;
    }
}
exports.Si = Si;
