import { Link } from "react-router-dom";
import { useUserStats } from "../context/UserStatsContext";

export default function StreakBadge() {
  const { stats } = useUserStats();

  if (!stats.score && !stats.streak) return null;

  return (
    <Link
      to="/submissions"
      className="hidden lg:flex items-center gap-md2 font-body text-caption text-ink-muted no-underline hover:text-ink"
    >
      <span>
        <span className="text-ink">{stats.score}</span> pts
      </span>
      {stats.streak > 0 && (
        <span>
          🔥 <span className="text-ink">{stats.streak}</span> day{stats.streak !== 1 ? "s" : ""}
        </span>
      )}
    </Link>
  );
}
