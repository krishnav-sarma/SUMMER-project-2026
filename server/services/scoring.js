const SCORE_BY_DIFFICULTY = { Easy: 10, Medium: 20, Hard: 30 };
const HINT_PENALTY = 2;

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function isConsecutiveDay(lastDateStr, today) {
  if (!lastDateStr) return false;
  const diffDays = Math.round((new Date(today) - new Date(lastDateStr)) / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}

/**
 * Mutates `user` in place (score, streak, solvedProblemIds) for a passing
 * submission. Caller is responsible for calling user.save().
 * Returns true if this submission newly solved the problem (for acceptance-rate bookkeeping).
 */
function applyAcceptedSubmission(user, problem) {
  const alreadySolved = user.solvedProblemIds.some((id) => id.equals(problem._id));
  const today = todayStr();

  if (!alreadySolved) {
    user.solvedProblemIds.push(problem._id);
    user.score += SCORE_BY_DIFFICULTY[problem.difficulty] || 10;
  }

  if (user.lastSolvedDate !== today) {
    user.streak = isConsecutiveDay(user.lastSolvedDate, today) ? user.streak + 1 : 1;
    user.lastSolvedDate = today;
  }

  return !alreadySolved;
}

function applyHintPenalty(user) {
  user.score = Math.max(0, user.score - HINT_PENALTY);
}

module.exports = { applyAcceptedSubmission, applyHintPenalty, SCORE_BY_DIFFICULTY, HINT_PENALTY };
