import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUserStats } from "../context/UserStatsContext";
import { api } from "../utils/api";
import Avatar from "../components/Avatar";
import DifficultyBadge from "../components/DifficultyBadge";
import Submissions from "../pages/Submissions";

export default function Profile() {
  const { user, logout } = useAuth();
  const { stats, submissions } = useUserStats();
  const [rank, setRank] = useState(null);

  useEffect(() => {
    if (!user) return;
    api
      .get("/leaderboard?limit=200")
      .then(({ leaderboard }) => {
        const idx = leaderboard.findIndex(
          (u) => String(u.id) === String(user.id),
        );
        setRank(idx >= 0 ? idx + 1 : null);
      })
      .catch(() => setRank(null));
  }, [user, stats.score]);

  if (!user) {
    return (
      <div className="max-w-[600px] mx-auto px-lg2 py-section text-center">
        <h1 className="font-display text-display-md text-ink mb-xs2">
          Sign in to view your profile
        </h1>
        <p className="font-body text-body-sm text-ink-muted mb-lg2">
          Your solved problems, score, and rank live here once you're signed in.
        </p>
        <Link to="/login" className="font-body text-body-sm text-accent-blue">
          Sign in →
        </Link>
      </div>
    );
  }
  return (
    <>
      <div className="max-w-[900px] mx-auto px-lg2 py-xl2">
        <div className="flex items-center justify-between mb-xl2">
          <div className="flex items-center gap-lg2">
            <Avatar name={user.name} size="lg" />
            <div>
              <h1 className="font-display text-display-md text-ink mb-xxs">
                {user.name}
              </h1>
              <p className="font-body text-body-sm text-ink-muted">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-md2 mb-xl2">
          <StatCard label="Score" value={stats.score} />
          <StatCard label="Solved" value={stats.solvedProblemIds.length} />
          <StatCard label="Streak" value={`${stats.streak} 🔥`} />
          <StatCard label="Rank" value={rank ? `#${rank}` : "—"} />
        </div>
      </div>
      <Submissions />
      <div className="flex items-center justify-center">
        <button
          onClick={logout}
          className="font-body text-red-800 hover:text-red-600 bg-transparent border-0 cursor-pointer"
        >
          Sign out
        </button>
      </div>
    </>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-surface-1 rounded-lg p-md2 text-center">
      <p className="font-body text-display-md text-ink mb-xxs">{value}</p>
      <p className="font-body text-caption text-ink-muted">{label}</p>
    </div>
  );
}