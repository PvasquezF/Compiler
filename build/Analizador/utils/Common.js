"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimboloFuncion_1 = require("../TablaSimbolos/SimboloFuncion");
const Excepcion_1 = require("../Excepcion/Excepcion");
const Declaracion_1 = require("../Instrucciones/Declaracion");
const Si_1 = require("../Instrucciones/Si");
const HacerMientras_1 = require("../Instrucciones/HacerMientras");
const Mientras_1 = require("../Instrucciones/Mientras");
/**
 *
 * @param {Tabla} tabla Contiene los metodos necesarios para agregar funciones
 * @param {arbol} arbol clase que nos ayuda a almacenar errores e instrucciones
 * @param {funcion} funcion objeto funcion que contiene los atributos necesarios para crear un nodo funcion
 */
function agregarFuncion(tabla, arbol, funcion) {
    // Para la funcion necesitamos: tipo, identificador, cantidad de parametros y tamaño de la funcion
    const tipo = funcion.tipo;
    const identificador = funcion.nombre;
    const parametros = funcion.parametros.length;
    tabla.setStack(1);
    funcion.parametros.map(m => {
        m.posicion = tabla.getStack();
    });
    // Agregamos 1 extra para el return
    // y tambien agregamos la cantidad de parametros al tamaño
    const functionSize = getFuncionSize(tabla, funcion.instrucciones) + parametros + 1;
    const simbolo = new SimboloFuncion_1.SimboloFuncion(tipo, identificador, parametros, functionSize, funcion);
    const result = tabla.setFuncion(simbolo);
    if (result != null) {
        arbol.errores.push(new Excepcion_1.Excepcion('Semantico', result, funcion.fila, funcion.columna));
    }
}
exports.agregarFuncion = agregarFuncion;
/**
 * @function getFuncionSize Devuelve el tamaño de la funcion,
 * este tamaño se calcula en base a la cantidad de variables locales de la funcion
 *
 * @param instrucciones Lista de instrucciones a evaluar y determinar si son variables locales
 */
function getFuncionSize(tabla, instrucciones) {
    let size = 0;
    for (const i in instrucciones) {
        const currentIns = instrucciones[i];
        if (currentIns instanceof Declaracion_1.Declaracion) {
            size = size + 1;
            currentIns.posicion = tabla.getStack();
        }
        else if (currentIns instanceof Si_1.Si) {
            size = size + getFuncionSize(tabla, currentIns.listaIf);
            size = size + getFuncionSize(tabla, currentIns.listaElse);
        }
        else if (currentIns instanceof HacerMientras_1.HacerMientras || currentIns instanceof Mientras_1.Mientras) {
            size = size + getFuncionSize(tabla, currentIns.instrucciones);
        }
        else {
            continue;
        }
    }
    return size;
}
exports.getFuncionSize = getFuncionSize;
