const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function signToken(user) {
  return jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function toPublicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    score: user.score,
    streak: user.streak,
    solvedProblemIds: user.solvedProblemIds,
  };
}

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters." });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: "An account with that email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: email.toLowerCase(), passwordHash });

    const token = signToken(user);
    res.status(201).json({ token, user: toPublicUser(user) });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: "Invalid email or password." });
    if (user.banned) return res.status(403).json({ error: "This account has been banned." });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid email or password." });

    const token = signToken(user);
    res.json({ token, user: toPublicUser(user) });
  } catch (err) {
    next(err);
  }
}

async function me(req, res) {
  res.json({ user: toPublicUser(req.user) });
}

module.exports = { register, login, me, toPublicUser };
