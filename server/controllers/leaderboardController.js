const User = require("../models/User");

async function getLeaderboard(req, res, next) {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 200);
    const users = await User.find({ banned: false })
      .select("name score streak solvedProblemIds")
      .sort({ score: -1 })
      .limit(limit);

    const rows = users.map((u) => ({
      id: u._id,
      name: u.name,
      score: u.score,
      streak: u.streak,
      solved: u.solvedProblemIds.length,
    }));

    res.json({ leaderboard: rows });
  } catch (err) {
    next(err);
  }
}

module.exports = { getLeaderboard };
