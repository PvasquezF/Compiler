"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Types;
(function (Types) {
    Types[Types["NUMERIC"] = 0] = "NUMERIC";
    Types[Types["STRING"] = 1] = "STRING";
    Types[Types["BOOLEAN"] = 2] = "BOOLEAN";
    Types[Types["VOID"] = 3] = "VOID";
})(Types = exports.Types || (exports.Types = {}));
/**
 *
 * @class Permite llevar el control de los tipos del lenguaje
 */
class Tipo {
    /**
     *
     * @constructor Crea un nuevo tipo con el tipo primitivo indicado en el enum
     * @param {Types} type Tipo seleccionado para la variable o funcion
     * @param {Number} dimensiones Cantidad de dimensiones de arreglo (Solo soporta 1 dim :( )
     *
     */
    constructor(tipo, dimensiones = 0) {
        this.tipo = tipo;
        this.dimensiones = dimensiones;
        this.tipoExplicito = this.toString();
    }
    toString() {
        if (this.dimensiones == 0) {
            if (this.tipo === Types.BOOLEAN) {
                return 'boolean';
            }
            else if (this.tipo === Types.NUMERIC) {
                return 'numeric';
            }
            else if (this.tipo === Types.STRING) {
                return 'string';
            }
        }
        else {
            return 'arreglo_' + this.tipo;
        }
    }
}
exports.Tipo = Tipo;
