const userService = require('../services/user.service');

// Fonction pour afficher le dashboard d'administration
async function getDashboard(req, res) {
    try {
        // Vérifier que l'utilisateur est un administrateur
        if (!req.user.isAdmin) {
            return res.status(401).json({ message: 'Non autorisé' });
        }

        // Récupérer le nombre total d'utilisateurs
        const totalUsers = await userService.getTotalUsers();

        // Envoyer les données à la vue
        res.render('admin/dashboard', { totalUsers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

// Fonction pour afficher la liste des utilisateurs
async function getUsers(req, res) {
    try {
        // Vérifier que l'utilisateur est un administrateur
        if (!req.user.isAdmin) {
            return res.status(401).json({ message: 'Non autorisé' });
        }

        // Récupérer la liste des utilisateurs
        const users = await userService.getAllUsers();

        // Envoyer les données à la vue
        res.render('admin/users', { users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

// Fonction pour afficher les détails d'un utilisateur
async function getUserById(req, res) {
    try {
        // Vérifier que l'utilisateur est un administrateur
        if (!req.user.isAdmin) {
            return res.status(401).json({ message: 'Non autorisé' });
        }

        // Récupérer l'utilisateur par son identifiant
        const user = await userService.getUserById(req.params.userId);

        // Vérifier si l'utilisateur existe
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Envoyer les données à la vue
        res.render('admin/user', { user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

// Fonction pour créer un nouvel utilisateur
async function createUser(req, res) {
    try {
        // Vérifier que l'utilisateur est un administrateur
        if (!req.user.isAdmin) {
            return res.status(401).json({ message: 'Non autorisé' });
        }

        // Créer l'utilisateur
        const user = await userService.createUser(req.body);

        // Envoyer les données à la vue
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

// Fonction pour mettre à jour un utilisateur
async function updateUser(req, res) {
    try {
        // Vérifier que l'utilisateur est un administrateur
        if (!req.user.isAdmin) {
            return res.status(401).json({ message: 'Non autorisé' });
        }

        // Mettre à jour l'utilisateur
        const user = await userService.updateUser(req.params.userId, req.body);

        // Vérifier si l'utilisateur existe
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Envoyer les données à la vue
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

// Fonction pour supprimer un utilisateur
async function deleteUser(req, res) {
    try {
        // Vérifier que l'utilisateur est un administrateur
        if (!req.user.isAdmin) {
            return res.status(401).json({ message: 'Non autorisé' });
        }

        // Supprimer l'utilisateur
        const user = await userService.deleteUser(req.params.userId);

        // Vérifier si l'utilisateur existe
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Envoyer les données à la vue
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

module.exports = { getDashboard, getUsers, getUserById, createUser, updateUser, deleteUser };