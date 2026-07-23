import { useState } from "react";
import { useUserStats } from "../context/UserStatsContext";

export default function HintsPanel({ problemId, hintCount }) {
  const { revealHint } = useUserStats();
  const [revealed, setRevealed] = useState({}); // { [index]: hintText }
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [error, setError] = useState("");

  const handleReveal = async (index) => {
    setError("");
    setLoadingIndex(index);
    try {
      const { hint } = await revealHint(problemId, index);
      setRevealed((prev) => ({ ...prev, [index]: hint }));
    } catch (err) {
      setError(err.message || "Couldn't load that hint. Try again.");
    } finally {
      setLoadingIndex(null);
    }
  };

  if (!hintCount) {
    return (
      <div className="p-md2">
        <p className="font-body text-body-sm text-ink-muted">No hints available for this problem.</p>
      </div>
    );
  }

  return (
    <div className="p-md2 flex flex-col gap-sm2">
      <p className="font-body text-caption text-ink-muted mb-xs2">
        Each hint costs 2 points the first time you reveal it.
      </p>

      {error && <p className="font-body text-caption text-gradient-coral">{error}</p>}

      {Array.from({ length: hintCount }).map((_, i) => {
        const isRevealed = revealed[i] !== undefined;
        const isNextLocked = !isRevealed && i > 0 && revealed[i - 1] === undefined;

        return (
          <div key={i} className="bg-surface-1 rounded-md p-sm2">
            <div className="flex items-center justify-between mb-xxs">
              <span className="font-body text-caption text-ink-muted">Hint {i + 1}</span>
              {!isRevealed && (
                <button
                  onClick={() => handleReveal(i)}
                  disabled={isNextLocked || loadingIndex === i}
                  className="font-body text-caption text-accent-blue disabled:text-ink-muted disabled:cursor-not-allowed"
                >
                  {loadingIndex === i
                    ? "Loading…"
                    : isNextLocked
                    ? "Reveal previous hint first"
                    : "Reveal (-2 pts)"}
                </button>
              )}
            </div>
            {isRevealed ? (
              <p className="font-body text-body-sm text-ink">{revealed[i]}</p>
            ) : (
              <p className="font-body text-body-sm text-ink-muted italic">Hidden</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
