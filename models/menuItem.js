// models/menuItem.js
/*const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
});

module.exports = mongoose.model('MenuItem', menuItemSchema);*/

// Esquema usuarios
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({ // definición del esquema   
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

// Compilamos el esquema en un modelo
/*const Usuario = new mongoose.model('user', usuarioSchema);

const user = new Usuario({ 
    nombre: 'Paulo',
    apellido: 'Séptimo',
    identificacion: 1234567890,
    direccion: 'Carapungo - Roma',
    telefono: 99888552,
    email: 'paulo.septimo@vaticano.com.it',
    edad: 50,
    materias: {
        tipo: 'Virtual',
        nombres: ['Programación Religión', 'Base de Datos religiosa', 'UX Religion']
    },
    carrera: 'Religión Orientada a Objetos'
});*/

//user.save(); // guardamos el documento en la colección