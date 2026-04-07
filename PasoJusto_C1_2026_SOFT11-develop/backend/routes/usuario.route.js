const express = require("express");
const router = express.Router(); // Crear la señal
const Usuario = require("../models/usuario.model");

// Rutas
// Post: Crear / enviar un nuevo dato a la BD
router.post("/", async (req, res) => {
    const { nombre, correo} = req.body;

    if (!nombre || !correo) {
        return res.status(400).json({ mensajeError: "Todos los datos son obligatorios." });
    }

    try {
        const nuevoUsuario = new Usuario({ nombre, correo});
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ mensajeError: error.message });
    }
});


// GET: Solicitar los datos de los empleados a la BD

router.get("/", async (req, res) => {
    try {
        const usuarios = await Usuario.find({correo: valor});
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT
router.put("/agregar-certificacion", async (req, res) => {
    const { correo, certificacionId } = req.body;

    if (!correo || !certificacionId) {
        return res.status(400).json({ mensajeError: "Correo y ID de la certificacion son obligatorios." });
    }

    try {
        // Verificar que la certificacion existe.
        const certificacion = await Certificacion.findById(certificacionId);
        if (!certificacion) {
            return res.status(404).json({ Error: "Certificacion no encontrada." })
        }

        // Buscar el usuario y agregar la certificacion
        const empleado = await Empleado.findOne({ correo });
        if (!empleado) {
            return res.status(404).json({ Error: "Usuario no encontrado." })
        }
        if (!empleado.certificaciones.includes(certificacionId)) {
            empleado.certificaciones.push(certificacionId);
            await empleado.save();
        }
        res.status(200).json({ msj: "Certificacion agregada al empleado ", empleado })


    } catch (error) {
        res.status(400).json({ mensajeError: error.message });
    }
});


module.exports = router;