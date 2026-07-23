const Problem = require("../models/Problem");

async function listProblems(req, res, next) {
  try {
    const { search, difficulty, topic, company, tag, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (search) filter.title = { $regex: search, $options: "i" };
    if (difficulty) filter.difficulty = difficulty;
    if (topic) filter.topic = topic;
    if (company) filter.companies = company;
    if (tag) filter.tags = tag;

    const skip = (Number(page) - 1) * Number(limit);
    const [problems, total] = await Promise.all([
      Problem.find(filter)
        .select("-testCases -editorial -hints") // keep list payloads light
        .skip(skip)
        .limit(Number(limit)),
      Problem.countDocuments(filter),
    ]);

    res.json({ problems, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
}

async function getProblem(req, res, next) {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ error: "Problem not found." });

    // hidden test cases and hint text aren't sent upfront — hints are fetched
    // one at a time via POST /api/hints/reveal so each reveal can be billed.
    const visible = problem.toObject();
    visible.testCases = visible.testCases.filter((tc) => !tc.hidden);
    visible.hintCount = visible.hints.length;
    delete visible.hints;

    res.json({ problem: visible });
  } catch (err) {
    next(err);
  }
}

async function createProblem(req, res, next) {
  try {
    const problem = await Problem.create(req.body);
    res.status(201).json({ problem });
  } catch (err) {
    next(err);
  }
}

async function updateProblem(req, res, next) {
  try {
    const problem = await Problem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!problem) return res.status(404).json({ error: "Problem not found." });
    res.json({ problem });
  } catch (err) {
    next(err);
  }
}

async function deleteProblem(req, res, next) {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);
    if (!problem) return res.status(404).json({ error: "Problem not found." });
    res.json({ deleted: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { listProblems, getProblem, createProblem, updateProblem, deleteProblem };
