// modelo
const mongoose = require('mongoose'); // importamos mongoose

//esquema
require('./menuItemSchema');

// escuchar el evento SIGINT (Signal Interrupt) 
const readLine = require('readline');
if (process.platform === 'win32') {
    console.log('process.platform:', process.platform);
    const rl = readLine.Interface({
        input: process.stdin,
        output: process.stdout
    });
    // console.log(rl);
    rl.on('SIGINT', () => {
        console.log('Se recibió SIGINT: Se termina el proceso');
        process.emit("SIGINT"); // emitir el evento
    });
}

// definimos string de conexión a la base de datos
const dbURI = 'mongodb://localhost/restaurante';

// conectamos a la base de datos
mongoose.connect(dbURI, {
    family: 4,
    serverSelectionTimeoutMS: 5000,
}).catch(err => console.log('Se presentó un error en la conexión a MongoDB',err.reason));

// método para cerrar la conexión a la base de datos
const procShutdown = (msg) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose desconectado a través de: ${msg}`);

    });
 };

// eventos de conexión
mongoose.connection.on('connected', () => {
    console.log(`Mongoose se conectó a: ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose error de conexión:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose desconectado');
});

// eventos de terminación
// usuario (Ctrl+C): SIGINT
// nodemon: SIGUSR2
// Heroku: SIGTERM

// usuario (Ctrl+C): SIGINT
process.on('SIGINT', () => {
    procShutdown('Aplicación terminada por el usuario (Ctrl+C)');
    process.exit(0);
});

// nodemon: SIGUSR2
process.on('SIGUSR2', () => {
    procShutdown('Aplicación reiniciada por nodemon');
    process.kill(process.pid, 'SIGUSR2');
});

// Heroku: SIGTERM
process.on('SIGTERM', () => {
    procShutdown('Aplicación terminada por Heroku');
    process.exit(0);
});

// conexión a múltiples bases de datos
const dbURIlog = 'mongodb://localhost/MiDBlogs';
const logDB = mongoose.createConnection(dbURIlog, {
    family: 4,
    serverSelectionTimeoutMS: 5000
});

// eventos de conexión - DBlogs
logDB.on('connected', () => {
    console.log(`Mongoose se conectó a: ${dbURIlog}`);
});

logDB.on('error', err => {
    console.log('Mongoose error de conexión DBlogs:', err);
});

logDB.on('disconnected', () => {
    console.log('Mongoose desconectado DBlogs');
});