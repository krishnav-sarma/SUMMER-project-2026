const { runOnJdoodle } = require("./jdoodle");

/**
 * Runs `code` against each test case's stdin and compares stdout to `expected`.
 * Test cases are expected to be in "reads from stdin, writes to stdout" form —
 * the standard contract for JDoodle (and glot.io/Judge0 before it).
 */
async function runTestCases({ code, language, testCases }) {
  const results = [];
  let maxTimeMs = 0;
  let maxMemoryKb = 0;

  for (const tc of testCases) {
    const verdict = await runOnJdoodle({ code, language, stdin: tc.input });
    const actual = (verdict.stdout || "").trim();
    const expected = (tc.expected || "").trim();
    const passed = verdict.status === "Accepted" && actual === expected;

    if (verdict.timeMs) maxTimeMs = Math.max(maxTimeMs, verdict.timeMs);
    if (verdict.memoryKb) maxMemoryKb = Math.max(maxMemoryKb, verdict.memoryKb);

    results.push({
      input: tc.input,
      expected,
      actual: verdict.status === "Accepted" ? actual : `${verdict.status}: ${verdict.stderr || ""}`.trim(),
      passed,
    });

    // stop early on first failure — mirrors how most real judges short-circuit,
    // and saves your daily free-credit quota
    if (!passed) break;
  }

  const allPassed = results.length === testCases.length && results.every((r) => r.passed);

  return {
    results,
    allPassed,
    runtimeMs: maxTimeMs || null,
    memoryKb: maxMemoryKb || null,
  };
}

module.exports = { runTestCases };
