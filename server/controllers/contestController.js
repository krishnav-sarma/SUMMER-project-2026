const Contest = require("../models/Contest");
const User = require("../models/User");
const Submission = require("../models/Submission");

async function listContests(req, res, next) {
  try {
    const contests = await Contest.find().sort({ start: -1 });
    res.json({ contests });
  } catch (err) {
    next(err);
  }
}

async function getContest(req, res, next) {
  try {
    const contest = await Contest.findById(req.params.id).populate(
      "problems",
      "title difficulty"
    );
    if (!contest) return res.status(404).json({ error: "Contest not found." });
    res.json({ contest });
  } catch (err) {
    next(err);
  }
}

async function createContest(req, res, next) {
  try {
    const contest = await Contest.create(req.body);
    res.status(201).json({ contest });
  } catch (err) {
    next(err);
  }
}

/**
 * Live/ended leaderboard for a single contest: ranks participants by total
 * score earned on submissions to this contest's problems within its time
 * window. Meant to be polled every ~15-20s by the client rather than pushed
 * over a websocket, per the simplified contest scope.
 */
async function getContestLeaderboard(req, res, next) {
  try {
    const contest = await Contest.findById(req.params.id);
    if (!contest) return res.status(404).json({ error: "Contest not found." });

    const submissions = await Submission.find({
      problem: { $in: contest.problems },
      passed: true,
      createdAt: { $gte: contest.start, $lte: contest.end },
    }).populate("user", "name");

    const scoreByUser = new Map();
    for (const sub of submissions) {
      const key = String(sub.user._id);
      if (!scoreByUser.has(key)) {
        scoreByUser.set(key, { id: key, name: sub.user.name, solved: 0 });
      }
      scoreByUser.get(key).solved += 1;
    }

    const rows = [...scoreByUser.values()].sort((a, b) => b.solved - a.solved);
    res.json({ leaderboard: rows });
  } catch (err) {
    next(err);
  }
}

module.exports = { listContests, getContest, createContest, getContestLeaderboard };
