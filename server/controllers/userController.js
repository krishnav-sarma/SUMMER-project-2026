const User = require("../models/User");

async function listUsers(req, res, next) {
  try {
    const users = await User.find().select("-passwordHash").sort({ createdAt: -1 });
    res.json({ users });
  } catch (err) {
    next(err);
  }
}

async function toggleBan(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found." });

    user.banned = !user.banned;
    await user.save();

    res.json({ id: user._id, banned: user.banned });
  } catch (err) {
    next(err);
  }
}

module.exports = { listUsers, toggleBan };
