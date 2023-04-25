const { register, log } = require("../services/auth.service");

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
    const result = await log(req.body);
    const user = result.user;
    const token = result.token;
    res.json({ user, token }); // Send token in the response body
  } catch (error) {
    console.log(error)
    res.status(error.code).json({ error: error.message });
  }
};

module.exports = {
  login,
  signup,
};

