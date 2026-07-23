// Mock judge — simulates running code against test cases with a fake delay.
// Replace runCode() internals with a real Judge0 API call once the backend is wired.
// For this demo: JS code actually executes in a sandboxed Function; other languages are simulated.

function tryRunJavaScript(code, testCases) {
  return testCases.map((tc) => {
    try {
      // Extremely constrained sandbox: wrap user code + a call using the raw input string.
      // This is a DEMO ONLY judge — not secure, never do this with untrusted code in production.
      // eslint-disable-next-line no-new-func
      const wrapped = new Function(
        `${code}\nreturn (${extractFunctionName(code)})(${tc.input});`
      );
      const result = wrapped();
      const actual = JSON.stringify(result);
      const passed = actual === tc.expected.replace(/\s/g, "");
      return { ...tc, actual, passed };
    } catch (err) {
      return { ...tc, actual: `Error: ${err.message}`, passed: false };
    }
  });
}

function extractFunctionName(code) {
  const match = code.match(/function\s+(\w+)/);
  return match ? match[1] : "solve";
}

export async function runCode({ code, language, testCases }) {
  // fake network/exec delay
  await new Promise((res) => setTimeout(res, 700 + Math.random() * 500));

  if (!code || !code.trim()) {
    return {
      results: testCases.map((tc) => ({ ...tc, actual: "", passed: false })),
      runtimeMs: 0,
      memoryKb: 0,
      error: "Empty submission — write some code first.",
    };
  }

  let results;
  if (language === "javascript") {
    results = tryRunJavaScript(code, testCases);
  } else {
    // Non-JS languages: simulated pass/fail (no real sandbox in this demo).
    // Simple heuristic so the UI has something to react to: pass if code looks non-trivial.
    const looksReal = code.replace(/\s/g, "").length > 40;
    results = testCases.map((tc) => ({
      ...tc,
      actual: looksReal ? tc.expected : "(simulated — no output)",
      passed: looksReal,
    }));
  }

  return {
    results,
    runtimeMs: Math.round(20 + Math.random() * 180),
    memoryKb: Math.round(14000 + Math.random() * 6000),
    error: null,
  };
}
