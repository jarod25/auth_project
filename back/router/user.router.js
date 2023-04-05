const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.post('/', userController.createUser);

router.get('/profile?:token', userController.getUserProfile);

router.get('/:id', userController.getUserById);

module.exports = router;
