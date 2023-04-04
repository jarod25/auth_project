const userService = require('../services/user.service');

// Fonction pour créer un utilisateur
async function createUser(req, res) {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Fonction pour obtenir un utilisateur par son ID
async function getUserById(req, res) {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        if (!user) {
            res.status(404).json({ message: "L'utilisateur n'a pas été trouvé" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createUser, getUserById };
