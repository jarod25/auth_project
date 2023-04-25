const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

var secret = process.env.JWT_SECRET;

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Identifiants invalides.' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Identifiants invalides.' });
        }
        const token = jwt.sign({ userId: user.id}, secret);
        res.json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la connexion.' });
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
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw {
                code: 409,
                message: "User with this email already exists."
            };
        }

        const user = await User.create({ name, email, password: hashedPassword });

        return jwt.sign({ name: user.name, email: user.email }, secret);
      }
      catch (error) {
        console.error(error);
        throw {
            code: 500,
            message: "Une erreur est survenue lors de la création de l'utilisateur"
          };
      }
}