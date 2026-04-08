const mongoose = require("mongoose")

// Creación del esquema
const schemaProducto = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    puntosNecesarios: {
        type: Number,
        required: true
    },
    comercio: {
        type: String,
    },
});

module.exports = mongoose.model("Producto", schemaProducto); // Exportar el modelo para poder utilizarlo en el backend.