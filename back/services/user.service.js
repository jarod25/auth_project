const User = require('../models/user.model');

// Fonction pour créer un utilisateur
async function createUser(userData) {
    return await User.create(userData);
}

// Fonction pour obtenir un utilisateur par son ID
async function getUserById(userId) {
    return await User.findByPk(userId);
}

async function getTotalUsers() {
    return await User.count();
}

async function getAllUsers() {
    return await User.findAll();
}

async function updateUser(userId, userData) {
    return await User.update(userData, { where: { id: userId } });
}

async function deleteUser(userId) {
    return await User.destroy({ where: { id: userId } });
}

module.exports = { createUser, getUserById, getTotalUsers, getAllUsers, updateUser, deleteUser };
