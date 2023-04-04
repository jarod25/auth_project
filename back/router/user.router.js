const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// Route pour créer un utilisateur
router.post('/users', userController.createUser);

// Route pour obtenir un utilisateur par son ID
router.get('/users/:id', userController.getUserById);

module.exports = router;
