const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const saltRounds = 10;
const secret = process.env.JWT_SECRET; // Remplacer par votre clé secrète
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }

    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ userId: user.id }, secret);

    // Add the token to the response header
    res.set("Authorization", `Bearer ${token}`);
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Une erreur est survenue lors de la création de l'utilisateur.",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Identifiants invalides." });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Identifiants invalides." });
    }
    const token = jwt.sign({ userId: user.id }, secret);
    // Add the token to the response header
    res.set("Authorization", `Bearer ${token}`);
    res.json({ user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Une erreur est survenue lors de la connexion." });
  }
};

module.exports = {
  signup,
  login,
};
