const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require('passport');
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

    // Add the token to the response header
    const token = jwt.sign({ userId: user.id }, secret);
    res.json({ token }); // Send token in the response body
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
    res.json({ user, token }); // Send token in the response body
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Une erreur est survenue lors de la connexion." });
  }
};

function generateToken(user) {
  const payload = { id: user.id };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: '1d' };
  return jwt.sign(payload, secret, options);
}

async function verifyToken(req, res, next) {
  const token = req.query.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
async function authenticateGitHub(req, res) {
  passport.authenticate('github', { session: false }, (err, user) => {
    if (err || !user) {
      return res.redirect('/login');
    }

    const token = generateToken(user);
    res.redirect(`/dashboard?token=${token}`);
  })(req, res);
}

async function authenticateGoogle(req, res) {
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })(req, res);
}

async function authenticateGoogleCallback(req, res) {
  passport.authenticate('google', { session: false }, (err, user) => {
    if (err || !user) {
      return res.redirect('/login');
    }

    const token = generateToken(user);
    res.redirect(`/dashboard?token=${token}`);
  })(req, res);
}

async function authenticateGitHubCallback(req, res) {
  passport.authenticate('github', { session: false }, (err, user) => {
    if (err || !user) {
      return res.redirect('/login');
    }

    const token = generateToken(user);
    res.redirect(`/dashboard?token=${token}`);
  })(req, res);
}

module.exports = {
  login,
    signup,
  authenticateGitHub,
  authenticateGoogle,
  authenticateGoogleCallback,
    authenticateGitHubCallback,
  verifyToken,
};

