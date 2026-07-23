export default function ResultPanel({ status, result }) {
  if (status === "idle") {
    return (
      <div className="p-md2">
        <p className="font-body text-body-sm text-ink-muted">
          Run your code to see test case results here.
        </p>
      </div>
    );
  }

  if (status === "running") {
    return (
      <div className="p-md2 flex items-center gap-sm2">
        <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
        <p className="font-body text-body-sm text-ink-muted">Running against test cases…</p>
      </div>
    );
  }

  if (!result) return null;

  if (result.error) {
    return (
      <div className="p-md2">
        <p className="font-body text-body-sm text-gradient-coral">{result.error}</p>
      </div>
    );
  }

  const passedCount = result.results.filter((r) => r.passed).length;
  const total = result.results.length;
  const allPassed = passedCount === total;

  return (
    <div className="p-md2 flex flex-col gap-md2">
      <div className="flex items-center justify-between">
        <span
          className={`font-body text-headline ${
            allPassed ? "text-success" : "text-gradient-coral"
          }`}
        >
          {allPassed ? "Accepted" : "Wrong Answer"}
        </span>
        <span className="font-body text-caption text-ink-muted">
          {passedCount}/{total} test cases passed
        </span>
      </div>

      {(result.runtimeMs != null || result.memoryKb != null) && (
        <div className="flex gap-lg2">
          {result.runtimeMs != null && (
            <div>
              <p className="font-body text-caption text-ink-muted">Runtime</p>
              <p className="font-body text-body-sm text-ink">{result.runtimeMs} ms</p>
            </div>
          )}
          {result.memoryKb != null && (
            <div>
              <p className="font-body text-caption text-ink-muted">Memory</p>
              <p className="font-body text-body-sm text-ink">
                {(result.memoryKb / 1000).toFixed(1)} MB
              </p>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-sm2">
        {result.results.map((tc, i) => (
          <div
            key={i}
            className={`rounded-md p-sm2 border ${
              tc.passed ? "border-success/30 bg-success/5" : "border-gradient-coral/30 bg-gradient-coral/5"
            }`}
          >
            <div className="flex items-center justify-between mb-xxs">
              <span className="font-body text-caption text-ink-muted">Case {i + 1}</span>
              <span className={`font-body text-caption ${tc.passed ? "text-success" : "text-gradient-coral"}`}>
                {tc.passed ? "Passed" : "Failed"}
              </span>
            </div>
            <p className="font-body text-caption text-ink-muted">Input: {tc.input}</p>
            <p className="font-body text-caption text-ink-muted">Expected: {tc.expected}</p>
            {!tc.passed && (
              <p className="font-body text-caption text-gradient-coral">Got: {tc.actual}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
