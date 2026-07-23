const Problem = require("../models/Problem");
const { applyHintPenalty } = require("../services/scoring");

// Tracks which (user, problem, hintIndex) combos have already been paid for,
// so re-revealing after a refresh doesn't charge twice.
const HintReveal = require("../models/HintReveal");

async function revealHint(req, res, next) {
  try {
    const { problemId, hintIndex } = req.body;
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: "Problem not found." });
    if (!problem.hints[hintIndex]) return res.status(404).json({ error: "Hint not found." });

    const existing = await HintReveal.findOne({
      user: req.user._id,
      problem: problemId,
      hintIndex,
    });

    if (existing) {
      return res.json({ hint: problem.hints[hintIndex], alreadyRevealed: true, score: req.user.score });
    }

    await HintReveal.create({ user: req.user._id, problem: problemId, hintIndex });
    applyHintPenalty(req.user);
    await req.user.save();

    res.json({ hint: problem.hints[hintIndex], alreadyRevealed: false, score: req.user.score });
  } catch (err) {
    next(err);
  }
}

module.exports = { revealHint };
