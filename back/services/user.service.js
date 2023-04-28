const User = require('../models/user.model');
require('dotenv').config();

// Fonction pour créer un utilisateur
async function createUser(userData) {
    return await User.create({
        name: userData.name,
        email: userData.email,
        password: userData.password
    });
}

// Fonction pour obtenir un utilisateur par son ID
async function getUserByEmail(userEmail) {
    return await User.findByPk(userEmail);
}

async function deleteUser(userEmail) {
    return await User.destroy({ where: { email: userEmail } });
}

module.exports = { createUser, getUserByEmail, deleteUser };
