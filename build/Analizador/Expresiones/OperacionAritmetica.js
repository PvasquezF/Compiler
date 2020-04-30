"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Tipo_1 = require("../utils/Tipo");
const Excepcion_1 = require("../Excepcion/Excepcion");
class OperacionAritmetica extends Node_1.Node {
    constructor(izquierdo, derecho, operador, fila, columna) {
        super(null, fila, columna);
        this.izquierdo = izquierdo;
        this.derecho = derecho;
        this.operador = operador;
    }
    analizar(tabla, arbol) {
        // -1+4
        if (this.derecho === undefined) {
            const tipoIzq = this.izquierdo.analizar(tabla, arbol);
            if (tipoIzq.constructor.name === 'Excepcion') {
                return tipoIzq;
            }
            if (tipoIzq.toString() == 'numeric') {
                this.tipo = new Tipo_1.Tipo(Tipo_1.Types.NUMERIC);
                return this.tipo;
            }
            else {
                const excepcion = new Excepcion_1.Excepcion('Semantico', `No se puede utilizar el operador ${this.operador} unario con el tipo ${tipoIzq.tipo}`, this.fila, this.columna);
                arbol.errores.push(excepcion);
                return excepcion;
            }
        }
        else {
            const tipoIzq = this.izquierdo.analizar(tabla, arbol);
            if (tipoIzq instanceof Excepcion_1.Excepcion) {
                return tipoIzq;
            }
            const tipoDer = this.derecho.analizar(tabla, arbol);
            if (tipoDer instanceof Excepcion_1.Excepcion) {
                return tipoDer;
            }
            if (this.operador === '+') {
                if (tipoIzq.toString() == 'numeric' && tipoDer.toString() == 'numeric' ||
                    tipoIzq.toString() == 'boolean' && tipoDer.toString() == 'numeric' ||
                    tipoIzq.toString() == 'numeric' && tipoDer.toString() == 'boolean' ||
                    tipoIzq.toString() == 'boolean' && tipoDer.toString() == 'boolean') {
                    this.tipo = new Tipo_1.Tipo(Tipo_1.Types.NUMERIC);
                    return this.tipo;
                }
                else if (tipoIzq.toString() == 'numeric' && tipoDer.toString() == 'string' ||
                    tipoIzq.toString() == 'string' && tipoDer.toString() == 'numeric' ||
                    tipoIzq.toString() == 'boolean' && tipoDer.toString() == 'string' ||
                    tipoIzq.toString() == 'string' && tipoDer.toString() == 'boolean') {
                    this.tipo = new Tipo_1.Tipo(Tipo_1.Types.STRING);
                    return this.tipo;
                }
                else {
                    const excepcion = new Excepcion_1.Excepcion('Semantico', `No se puede utilizar el operador ${this.operador} con los tipos ${tipoIzq.toString()} y ${tipoDer.toString()}`, this.fila, this.columna);
                    arbol.errores.push(excepcion);
                    return excepcion;
                }
            }
            else if (this.operador === '-' || this.operador === '*' || this.operador === '/') {
                if (tipoIzq.toString() == 'numeric' && tipoDer.toString() == 'numeric' ||
                    tipoIzq.toString() == 'boolean' && tipoDer.toString() == 'numeric' ||
                    tipoIzq.toString() == 'numeric' && tipoDer.toString() == 'boolean' ||
                    tipoIzq.toString() == 'boolean' && tipoDer.toString() == 'boolean') {
                    this.tipo = new Tipo_1.Tipo(Tipo_1.Types.NUMERIC);
                    return this.tipo;
                }
                else {
                    const excepcion = new Excepcion_1.Excepcion('Semantico', `No se puede utilizar el operador ${this.operador} con los tipos ${tipoIzq.toString()} y ${tipoDer.toString()}`, this.fila, this.columna);
                    arbol.errores.push(excepcion);
                    return excepcion;
                }
            }
        }
    }
    getC3D(tabla, arbol) {
        let c3d = '';
        if (this.derecho === undefined) {
            c3d += this.izquierdo.getC3D(tabla, arbol);
            const temporalIzq = tabla.getTemporalActual();
            const temporal = tabla.getTemporal();
            c3d += `${temporal} = -1 * ${temporalIzq}\n`;
            tabla.QuitarTemporal(temporalIzq);
            tabla.AgregarTemporal(temporal);
            return c3d;
        }
        else {
            // 4 * 5
            c3d += this.izquierdo.getC3D(tabla, arbol);
            // tx = 4
            const temporalIzq = tabla.getTemporalActual();
            c3d += this.derecho.getC3D(tabla, arbol);
            // ty = 5
            const temporalDer = tabla.getTemporalActual();
            // tz
            const temporal = tabla.getTemporal();
            // tz= tx * ty
            c3d += `${temporal} = ${temporalIzq} ${this.operador} ${temporalDer} \n`;
            tabla.QuitarTemporal(temporalIzq);
            tabla.QuitarTemporal(temporalDer);
            tabla.AgregarTemporal(temporal);
            return c3d;
        }
    }
}
exports.OperacionAritmetica = OperacionAritmetica;
