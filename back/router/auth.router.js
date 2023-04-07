const express = require("express");
const authController = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const User = require("../models/user.model");
const { authenticateGitHub, authenticateGoogle, authenticateGoogleCallback, authenticateGitHubCallback, verifyToken } = require('../controller/auth.controller');
const passport = require('../services/auth.service');


const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get("/protected", authMiddleware.protect, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "test" });
    }
    const userId = req.user.id;
    console.log("id :", userId);
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/github', authenticateGitHub);
router.get('/github/callback', passport.authenticate('github', { session: false }), authenticateGitHubCallback);
router.get('/google', authenticateGoogle);
router.get('/google/callback', passport.authenticate('google', { session: false }), authenticateGoogleCallback);
router.get('/verify', verifyToken, (req, res) => {
  res.json({ message: 'Token is valid' });
});

module.exports = router;
