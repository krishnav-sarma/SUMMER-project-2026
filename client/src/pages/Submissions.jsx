import { Link } from "react-router-dom";
import { useUserStats } from "../context/UserStatsContext";

export default function Submissions() {
  const { submissions, stats } = useUserStats();

  return (
    <div className="max-w-[900px] mx-auto px-lg2 py-xl2">
      <div className="mb-lg2">
        <h1 className="font-display text-display-md text-ink mb-xs2">Submissions</h1>
        <p className="font-body text-body-sm text-ink-muted">
          {stats.score} pts · {stats.solvedProblemIds.length} solved · {stats.streak} day streak
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-surface-1 rounded-xl p-xl2 text-center">
          <p className="font-body text-body-sm text-ink-muted mb-md2">
            No submissions yet — solve a problem to see it here.
          </p>
          <Link to="/problems" className="font-body text-body-sm text-accent-blue">
            Browse problems →
          </Link>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-hairline">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-1 text-left">
                <th className="font-body text-caption text-ink-muted px-md2 py-sm2">Problem</th>
                <th className="font-body text-caption text-ink-muted px-md2 py-sm2">Status</th>
                <th className="font-body text-caption text-ink-muted px-md2 py-sm2 hidden md:table-cell">
                  Language
                </th>
                <th className="font-body text-caption text-ink-muted px-md2 py-sm2 hidden md:table-cell">
                  Submitted
                </th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s, i) => (
                <tr key={s._id} className={i % 2 === 0 ? "bg-canvas" : "bg-surface-1/40"}>
                  <td className="px-md2 py-sm2">
                    <Link
                      to={`/problems/${s.problem?._id}`}
                      className="font-body text-body-sm text-ink no-underline hover:text-accent-blue"
                    >
                      {s.problem?.title || "Unknown problem"}
                    </Link>
                  </td>
                  <td className="px-md2 py-sm2">
                    <span
                      className={`font-body text-body-sm ${
                        s.passed ? "text-success" : "text-gradient-coral"
                      }`}
                    >
                      {s.passed ? "Accepted" : "Wrong Answer"}
                    </span>
                  </td>
                  <td className="px-md2 py-sm2 hidden md:table-cell">
                    <span className="font-body text-body-sm text-ink-muted capitalize">
                      {s.language}
                    </span>
                  </td>
                  <td className="px-md2 py-sm2 hidden md:table-cell">
                    <span className="font-body text-caption text-ink-muted">
                      {new Date(s.createdAt).toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
