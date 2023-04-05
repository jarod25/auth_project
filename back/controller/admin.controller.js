const userService = require('../services/user.service');

async function getDashboard(req, res) {
    try {
        if (!req.user.isAdmin) {
            return res.status(401).json({ message: 'Non autorisé' });
        }

        const totalUsers = await userService.getTotalUsers();

        // Envoyer les données à la vue
        res.render('admin/dashboard', { totalUsers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

async function getUsers(req, res) {
    try {
        if (!req.user.isAdmin) {
            return res.status(401).json({ message: 'Non autorisé' });
        }

        const users = await userService.getAllUsers();

        res.render('admin/users', { users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

async function getUserById(req, res) {
    try {
        if (!req.user.isAdmin) {
            return res.status(401).json({ message: 'Non autorisé' });
        }

        const user = await userService.getUserById(req.params.userId);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.render('admin/user', { user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

async function createUser(req, res) {
    try {
        if (!req.user.isAdmin) {
            return res.status(401).json({ message: 'Non autorisé' });
        }

        const user = await userService.createUser(req.body);

        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

async function updateUser(req, res) {
    try {
        if (!req.user.isAdmin) {
            return res.status(401).json({ message: 'Non autorisé' });
        }

        const user = await userService.updateUser(req.params.userId, req.body);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

async function deleteUser(req, res) {
    try {
        if (!req.user.isAdmin) {
            return res.status(401).json({ message: 'Non autorisé' });
        }

        const user = await userService.deleteUser(req.params.userId);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

module.exports = { getDashboard, getUsers, getUserById, createUser, updateUser, deleteUser };