const jwt = require("jsonwebtoken");
require("dotenv").config();

function protect(req, res, next) {
  // Récupérer le token d'authentification depuis les en-têtes de la requête
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    // Si le token n'est pas présent, renvoyer une erreur d'authentification
    return res
      .status(401)
      .json({ message: "Authorization header missing or invalid." });
  }

  try {
    // Vérifier la validité du token et récupérer les informations de l'utilisateur
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    // Si le token est invalide, renvoyer une erreur d'authentification
    return res.status(401).json({ message: "Invalid token." });
  }
}

module.exports = {
  protect,
};
