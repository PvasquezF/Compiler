# Compilador sencillo utilizando Jison
## Información General
- Creado por [Pavel](https://github.com/PvasquezF).
- 23 de marzo 2020

## Herramientas utilizadas
- NodeJS
- Typescript
- Jison

## Caracteristicas
Actualmente cuenta con un conjunto **limitado** de instrucciones y muchos bugs:
- Tipos primitivos (Enteros, Cadenas y Boolean)
- Declaracion de variables
- Declaracion de arreglos (SOLO DECLARACIÓN)
- Asignacion de variables
- Sentencia IF 
- Sentencia While
- Sentencia DoWhile
- Funcion imprimir
- Operaciones aritmeticas, relacionales. **NO hay logicas aun**
- Comentarios
- Reporte de errores semanticos.
- Funciones simples y recursiva.

## Instalación
- npm install

Una vez instaladas las librerias se puede proceder a iniciar el programa.
Por ahora sale por el puerto 3000 en el localhost, aunque lo pueden cambiar si desean, adicionalmente para ejecutarlo tienen 3 comandos para hacerlo, recomiento hacer uso de los primeros 2 :wink:

- npm start (Compila ts y luego inicia el programa)
- npm run dev (Inicia un entorno de desarrollo)
- node build/index.js (Inicia directamente el programa)

**Notas:**
***Para hacer pruebas revisar la sintaxis con el archivo de entrada proporcionado o revisar la gramatica utilizada.*** 

Este compilador se fue desarrollando poco a poco en cada clase de laboratorio, unicamente es de refencia para saber como implementar ciertas cosas por lo que puedan existir muchos bugs, validaciones que hagan falta etc... :stuck_out_tongue_closed_eyes: :stuck_out_tongue_closed_eyes:

El funcionamiento que tiene por ahora es el de un api por lo que necesita de un cliente para ser utilizado o si desean pueden utilizar postman. 
El cliente se encuentra en el siguiente repo: [Interprete](https://github.com/PvasquezF/InterpreteC3D).

***Todos lo cambios son bienvenidos :alien: siempre, y recordemos que es para apoyar a los compañeros que actualmente estan cursando esta clase.***
