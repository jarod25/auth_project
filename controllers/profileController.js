const db = require('../config/db');
const User = db.User;

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: { id: req.user.id },
      returning: true,
      plain: true,
    });

    res.status(200).json({ success: true, data: updatedUser[1] });
  } catch (error) {
    next(error);
  }
};
