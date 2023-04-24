const jwt = require("jsonwebtoken");
const axios = require('axios');
require("dotenv").config();
const User = require("../models/user.model");

const verifyGitHubToken = async (token) => {
  try {
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw new Error("Token not found");
    }
    if (token.startsWith("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.")) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.userId);
      if (!user) {
        throw new Error("User not found");
      }
      req.user = user;
      next();
    }
    if (token.startsWith("gho_")) {
        const isValid = await verifyGitHubToken(token);
        if (!isValid) {
          throw new Error("Invalid GitHub token");
        }
        // récupérer les données de l'utilisateur
        const response = await axios.get("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const githubUser = response.data;
        req.user = {
            name: githubUser.name || githubUser.login,
            email: githubUser.email,
        }
        next();
      } else {
        throw new Error("Invalid GitHub token");
      }
    }
    catch (error) {
    return res.status(401).json({ message: "Vous n'avez pas l'autorisation d'accéder à cette page" });
  }
};


module.exports = {
  protect
};
