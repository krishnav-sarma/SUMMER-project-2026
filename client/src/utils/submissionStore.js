// Submission persistence — localStorage only, since there's no backend yet.
// Replace internals with real API calls (POST /api/submissions, GET /api/users/me) once wired.

const SUBMISSIONS_KEY = "cc_submissions";
const STATS_KEY = "cc_user_stats";

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage unavailable (e.g. private mode) — fail silently, demo-only persistence.
  }
}

export function getSubmissions() {
  return read(SUBMISSIONS_KEY, []);
}

export function getUserStats() {
  return read(STATS_KEY, {
    score: 0,
    streak: 0,
    lastSolvedDate: null,
    solvedProblemIds: [],
  });
}

function isConsecutiveDay(lastDateStr, todayStr) {
  if (!lastDateStr) return false;
  const last = new Date(lastDateStr);
  const today = new Date(todayStr);
  const diffDays = Math.round((today - last) / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}

function isSameDay(lastDateStr, todayStr) {
  return lastDateStr === todayStr;
}

const SCORE_BY_DIFFICULTY = { Easy: 10, Medium: 20, Hard: 30 };

/**
 * Records a submission and, if it was Accepted and the problem wasn't
 * already solved, updates score + streak accordingly.
 */
export function recordSubmission({ problemId, problemTitle, difficulty, language, passed, runtimeMs, memoryKb }) {
  const submissions = getSubmissions();
  const stats = getUserStats();

  const entry = {
    id: submissions.length + 1,
    problemId,
    problemTitle,
    difficulty,
    language,
    passed,
    runtimeMs,
    memoryKb,
    submittedAt: new Date().toISOString(),
  };
  submissions.unshift(entry);
  write(SUBMISSIONS_KEY, submissions);

  if (passed) {
    const alreadySolved = stats.solvedProblemIds.includes(problemId);
    const todayStr = new Date().toISOString().slice(0, 10);

    if (!alreadySolved) {
      stats.solvedProblemIds = [...stats.solvedProblemIds, problemId];
      stats.score += SCORE_BY_DIFFICULTY[difficulty] || 10;
    }

    if (!isSameDay(stats.lastSolvedDate, todayStr)) {
      stats.streak = isConsecutiveDay(stats.lastSolvedDate, todayStr) ? stats.streak + 1 : 1;
      stats.lastSolvedDate = todayStr;
    }

    write(STATS_KEY, stats);
  }

  return { entry, stats };
}

export function resetAllData() {
  localStorage.removeItem(SUBMISSIONS_KEY);
  localStorage.removeItem(STATS_KEY);
}
