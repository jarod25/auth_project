const userService = require('../services/user.service');

async function createUser(req, res) {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

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

async function getUserProfile(req, res) {
    const user = await userService.getUserProfile(req.query.token);
    if (!user) {
        res.status(404).json({ message: "L'utilisateur n'a pas été trouvé" });
        return;
    }
    res.status(200).json(user);
}

module.exports = { createUser, getUserById, getUserProfile };
