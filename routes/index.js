// routes/index.js
const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');

// Pantalla de inicio
router.get('/', (req, res) => {
    res.render('index');
});

// Pantalla de menú
router.get('/menu', async (req, res) => {
    //const menuItems = await MenuItem.find();
    const menuItems = {};
    res.render('menu', { menuItems });
});

router.get('/contact', async (req, res) => {
    //const menuItems = await MenuItem.find();
    const menuItems = {};
    res.render('contact', { menuItems });
});
router.get('/nosotros', async (req, res) => {
    //const menuItems = await MenuItem.find();
    const menuItems = {};
    res.render('nosotros', { menuItems });
});

// Agregar algunos elementos de menú (puedes hacerlo manualmente en MongoDB o crear una ruta para ello)
router.post('/add-menu-item', async (req, res) => {
    const { name, description, price } = req.body;
    const newItem = new MenuItem({ name, description, price });
    await newItem.save();
    res.redirect('/menu');
});

module.exports = router;