const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');


router.get('/test', verifyToken, authController.test);

r
router.post('/register', authController.register);


router.post('/login', authController.login);

module.exports = router;