const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { register, log } = require("../services/auth.service");
require("dotenv").config();

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
    const [user, token] = await log(req.body);
    res.json({ user, token }); // Send token in the response body
  } catch (error) {
    res.status(error.code).json({ error: error.message });
  }
};

module.exports = {
  login,
  signup,
};

