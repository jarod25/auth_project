const express = require("express");
const authController = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const User = require("../models/user.model");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get("/protected", authMiddleware.protect, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user.id;
    let user = await User.findByPk(userId);
    if (!user) {
      user = req.user;
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// router.get("/verify", authController.verifyToken);

module.exports = router;
