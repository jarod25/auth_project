const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { register } = require("../services/auth.service");
require("dotenv").config();

const secret = process.env.JWT_SECRET; // Remplacer par votre clé secrète

async function signup(req, res) {
  try {
    const token = await register(req.body);
    res.json({ token });
  }
  catch (err) {
    res.status(err.code).json({ error: err.message });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Veuillez fournir tous les champs requis." });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Identifiants invalides." });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Identifiants invalides." });
    }
    const token = jwt.sign({ name: user.name, email: user.email }, secret);
    res.json({ user, token }); // Send token in the response body
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Une erreur est survenue lors de la connexion." });
  }
};

// async function verifyToken(req, res, next) {
//   const token = req.query.token || req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Authentication required' });
//   }

//   try {
//     // const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // req.user = await User.findByPk(decoded.id);
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findByPk(decoded.email);
//     next();
//     console.log(req.user)
//   } catch (err) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// }

module.exports = {
  login,
  signup,
  // verifyToken,
};

