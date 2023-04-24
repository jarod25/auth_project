const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");

// Fait une fonction protect qui vérifie le token dans le header et renvoie un message d'erreur si le token n'est pas valide
const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Vous n'avez pas l'autorisation d'accéder à cette page" });
  }
};

module.exports = {
  protect,
};
