import { useUserStats } from "../context/UserStatsContext";

export default function EditorialPanel({ problemId, editorial }) {
  const { stats } = useUserStats();
  const isSolved = stats.solvedProblemIds.includes(problemId);

  if (!isSolved) {
    return (
      <div className="p-md2">
        <p className="font-body text-body-sm text-ink-muted">
          Solve this problem to unlock the editorial.
        </p>
      </div>
    );
  }

  return (
    <div className="p-md2 flex flex-col gap-sm2">
      <div>
        <p className="font-body text-caption text-ink-muted">Approach</p>
        <p className="font-body text-body-sm text-ink">{editorial.approach}</p>
      </div>
      <div>
        <p className="font-body text-caption text-ink-muted">Complexity</p>
        <p className="font-body text-body-sm text-ink">{editorial.complexity}</p>
      </div>
      <div>
        <p className="font-body text-caption text-ink-muted mb-xxs">Explanation</p>
        <p className="font-body text-body-sm text-ink">{editorial.explanation}</p>
      </div>
    </div>
  );
}
