const express = require("express");
const router = express.Router(); // Crear la señal
const Usuario = require("../models/usuario.model");

// Rutas
// Post: Crear / enviar un nuevo dato a la BD
router.post("/", async (req, res) => {
    const { nombre, correo, puntosDisponibles, puntosCanjeados, puntosTotales} = req.body;

    if (!nombre || !correo || !puntosDisponibles || !puntosCanjeados || !puntosTotales) {
        return res.status(400).json({ mensajeError: "Todos los datos son obligatorios." });
    }

    try {
        const nuevoUsuario = new Usuario({ nombre, correo, puntosDisponibles, puntosCanjeados, puntosTotales});
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ mensajeError: error.message });
    }
});

/* Probar con Thunder Client
{
   "nombre": "Roberto",
   "correo": "roberto@test.com",
   "puntosDisponibles": "20",
   "puntosCanjeados": "0",
   "puntosTotales": "0"
} */


// GET: Solicitar los datos de los usuarios a la BD

router.get("/:correo", async (req, res) => {
    try {
        const { correo } = req.params;

        const usuarios = await Usuario.findOne({ correo });

        if (!usuarios) {
            return res.status(404).json({ mensajeError: "Usuario no encontrado" });
        }

        res.json(usuarios);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;