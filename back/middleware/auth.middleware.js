const jwt = require("jsonwebtoken");
const axios = require("axios");
require("dotenv").config();
const User = require("../models/user.model");
const jwt_decode = require("jwt-decode");

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
      return res.status(401).json({ message: "Token not found" }); // 401 = Unauthorized
    }

    if (token.startsWith("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.")) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = user;
      next();
    } else if (token.startsWith("gho_")) {
      // Ajout de else if pour vérifier le préfixe "gho_"
      const isValid = await verifyGitHubToken(token);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid GitHub token" });
      }
      // récupérer les données de l'utilisateur
      const response = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const githubUser = response.data;
      req.user = {
        name: githubUser.name || githubUser.login,
        email: githubUser.email || "Your email on Github is private",
      };
      next();
    } else if (token.startsWith("eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg2OTY5YWVjMzdhNzc4MGYxODgwNzg3NzU5M2JiYmY4Y2Y1ZGU1Y2UiLCJ0eXAiOiJKV1QifQ.")) {
        const decoded = jwt_decode(token);
        req.user = {
            name: decoded.name,
            email: decoded.email
        }
        next();
    }
    else {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Vous n'avez pas l'autorisation d'accéder à cette page",
    });
  }
};

module.exports = {
  protect,
};
