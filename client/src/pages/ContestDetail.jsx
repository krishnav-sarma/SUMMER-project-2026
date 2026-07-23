import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../utils/api";
import DifficultyBadge from "../components/DifficultyBadge";
import Avatar from "../components/Avatar";

function getStatus(contest) {
  const now = new Date();
  const start = new Date(contest.start);
  const end = new Date(contest.end);
  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "live";
  return "ended";
}

const statusStyles = { live: "text-success", upcoming: "text-accent-blue", ended: "text-ink-muted" };

export default function ContestDetail() {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/contests/${id}`)
      .then(({ contest }) => setContest(contest))
      .catch((err) => setError(err.message || "Couldn't load this contest."))
      .finally(() => setLoading(false));
  }, [id]);

  // Poll the contest leaderboard every 20s instead of a websocket push —
  // matches the simplified no-websocket contest scope.
  useEffect(() => {
    let cancelled = false;
    const fetchLeaderboard = () => {
      api
        .get(`/contests/${id}/leaderboard`)
        .then(({ leaderboard }) => {
          if (!cancelled) setLeaderboard(leaderboard);
        })
        .catch(() => {});
    };
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 20000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-[900px] mx-auto px-lg2 py-section text-center">
        <p className="font-body text-body-sm text-ink-muted">Loading contest…</p>
      </div>
    );
  }

  if (error || !contest) {
    return (
      <div className="max-w-[900px] mx-auto px-lg2 py-section text-center">
        <h1 className="font-display text-display-md text-ink mb-xs2">
          {error ? "Couldn't load this contest" : "Contest not found"}
        </h1>
        <Link to="/contests" className="font-body text-body-sm text-accent-blue">
          ← Back to contests
        </Link>
      </div>
    );
  }

  const status = getStatus(contest);

  return (
    <div className="max-w-[900px] mx-auto px-lg2 py-xl2">
      <Link to="/contests" className="font-body text-caption text-accent-blue">
        ← All contests
      </Link>

      <div className="flex items-center justify-between mt-md2 mb-lg2">
        <div>
          <h1 className="font-display text-display-md text-ink mb-xxs">{contest.title}</h1>
          <p className="font-body text-body-sm text-ink-muted">{contest.description}</p>
        </div>
        <span className={`font-body text-body-sm ${statusStyles[status]}`}>
          {status === "live" ? "Live now" : status === "upcoming" ? "Upcoming" : "Ended"}
        </span>
      </div>

      <h2 className="font-body text-headline text-ink mb-md2">Problems</h2>
      <div className="rounded-xl overflow-hidden border border-hairline mb-xl2">
        {(contest.problems || []).map((p, i) => (
          <Link
            key={p._id}
            to={status === "upcoming" ? "#" : `/problems/${p._id}`}
            className={`flex items-center justify-between px-md2 py-sm2 no-underline transition-colors ${
              i % 2 === 0 ? "bg-canvas" : "bg-surface-1/40"
            } ${status === "upcoming" ? "cursor-not-allowed opacity-50" : "hover:bg-surface-2"}`}
          >
            <span className="font-body text-body-sm text-ink">{p.title}</span>
            <DifficultyBadge level={p.difficulty} />
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-between mb-md2">
        <h2 className="font-body text-headline text-ink">
          {status === "ended" ? "Final leaderboard" : "Live leaderboard"}
        </h2>
        {status !== "ended" && (
          <span className="font-body text-micro text-ink-muted">Refreshes every 20s</span>
        )}
      </div>

      {leaderboard.length === 0 ? (
        <p className="font-body text-body-sm text-ink-muted">No solves recorded yet.</p>
      ) : (
        <div className="flex flex-col gap-sm2">
          {leaderboard.map((u, i) => (
            <div key={u.id} className="flex items-center gap-sm2 bg-surface-1 rounded-md p-sm2">
              <span className="font-body text-body-sm text-ink-muted w-6">#{i + 1}</span>
              <Avatar name={u.name} size="sm" />
              <span className="font-body text-body-sm text-ink flex-1">{u.name}</span>
              <span className="font-body text-body-sm text-ink-muted">{u.solved} solved</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
