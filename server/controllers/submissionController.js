const Problem = require("../models/Problem");
const Submission = require("../models/Submission");
const { runTestCases } = require("../judge/runTestCases");
const { applyAcceptedSubmission } = require("../services/scoring");

async function runCode(req, res, next) {
  try {
    const { problemId, language, code } = req.body;
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: "Problem not found." });

    // Run only exercises the visible (non-hidden) sample cases and never touches score.
    const sampleCases = problem.testCases.filter((tc) => !tc.hidden).slice(0, 2);
    const verdict = await runTestCases({ code, language, testCases: sampleCases });

    res.json({ ...verdict, kind: "run" });
  } catch (err) {
    next(err);
  }
}

async function submitCode(req, res, next) {
  try {
    const { problemId, language, code } = req.body;
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: "Problem not found." });

    const verdict = await runTestCases({ code, language, testCases: problem.testCases });

    const submission = await Submission.create({
      user: req.user._id,
      problem: problem._id,
      language,
      code,
      passed: verdict.allPassed,
      runtimeMs: verdict.runtimeMs,
      memoryKb: verdict.memoryKb,
      testResults: verdict.results,
      kind: "submit",
    });

    problem.submissionCount += 1;
    let newlySolved = false;
    if (verdict.allPassed) {
      problem.acceptanceCount += 1;
      newlySolved = applyAcceptedSubmission(req.user, problem);
      await req.user.save();
    }
    await problem.save();

    res.json({
      submission,
      newlySolved,
      userStats: {
        score: req.user.score,
        streak: req.user.streak,
        solvedProblemIds: req.user.solvedProblemIds,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function listMySubmissions(req, res, next) {
  try {
    const submissions = await Submission.find({ user: req.user._id })
      .populate("problem", "title difficulty")
      .sort({ createdAt: -1 })
      .limit(100);
    res.json({ submissions });
  } catch (err) {
    next(err);
  }
}

module.exports = { runCode, submitCode, listMySubmissions };
