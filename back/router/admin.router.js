const express = require('express');
const adminController = require('../controller/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Middleware pour protéger les routes d'administration

router.use(authMiddleware.protect);

// Routes pour l'administration
router.get('/', adminController.getDashboard);
router.get('/users', adminController.getUsers);
router.get('/users/:userId', adminController.getUserById);
router.post('/users', adminController.createUser);
router.put('/users/:userId', adminController.updateUser);
router.delete('/users/:userId', adminController.deleteUser);

module.exports = router;
