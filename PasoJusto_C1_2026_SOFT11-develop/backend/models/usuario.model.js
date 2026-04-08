const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creacion del esquema
const schemaUsuario = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        unique: false
    },
    correo: {
        type: String,
        require: true,
        unique: true
    },
    puntosDisponibles: {
        type: Number,
        required: true
    },
    puntosCanjeados: {
        type: Number,
        required: true
    },
    puntosTotales: {
        type: Number,
        required: true
    }
});

const Usuario = mongoose.model("Usuario", schemaUsuario);
module.exports = Usuario; //Exportar el model para utilizarlo en el backend.