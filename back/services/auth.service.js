const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createUser, getUserByEmail } = require('./user.service');
require("dotenv").config();

var secret = process.env.JWT_SECRET; // Remplacer par votre clé secrète

exports.log = async (data) => {
    try {

        const { email, password } = data;
        if (!email || !password) {
            throw {
                code: 400,
                message: "Veuillez fournir tous les champs requis."
            };
        }

        const user = await getUserByEmail(email);

        if (!user) {
            throw {
                code: 401,
                message: "Identifiants invalides."
            };
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw {
                code: 401,
                message: "Identifiants invalides."
            };
        }

        const token = jwt.sign({ name: user.name, email: user.email }, secret);
        return {
            user: user,
            token: token
        }; // Send token in the response body

    }
    catch (error) {
        if (typeof error === 'object') throw error;
        throw {
            code: 500,
            message: "Une erreur est survenue lors de la connexion."
        };
    }
};

exports.register = async (data) => {
    try {
        const saltRounds = 10;
        const { name, email, password } = data;

        if (!name || !email || !password) {
            throw {
                code: 400,
                message: "Veuillez fournir tous les champs requis."
            };
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Check if user with the same email already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            throw {
                code: 409,
                message: "User with this email already exists."
            };
        }

        const userData = {
            name: name,
            email: email,
            password: hashedPassword
        }
        const user = await createUser(userData);

        return jwt.sign({ name: user.name, email: user.email }, secret);
    }
    catch (error) {
        if (typeof error === 'object') throw error;
        throw {
            code: 500,
            message: "Une erreur est survenue lors de la création de l'utilisateur"
        };
    }
};
