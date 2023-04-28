const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Fonction pour créer un utilisateur
async function createUser(userData) {
    try {
        return await User.create({
            name: userData.name,
            email: userData.email,
            password: userData.password
        });
    } catch (e) {
        console.log(e)
    }
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


async function getUserProfile(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return null;
        }
        return await User.findByPk(decoded.id);
    }
    catch (error) {
        return null;
    }
}

module.exports = { createUser, getUserById, getTotalUsers, getAllUsers, updateUser, deleteUser, getUserProfile };
