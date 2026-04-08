const express = require("express");
const router = express.Router();
const Producto = require("../models/producto.model");

router.post("/", async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto); 
    } catch (error) {
        res.status(400).json({ msj: "Error al crear el nuevo producto", error });
    }
});

/* {
"nombre": "Pan con jamon",
"puntosNecesarios": "10",
"comercio": "TacoBell"
} */

router.get("/", async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ msj: "Error al obtener los productos", error });
    }
});

module.exports = router;