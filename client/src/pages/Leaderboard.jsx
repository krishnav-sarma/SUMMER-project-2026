import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Avatar from "../components/Avatar";
import { api } from "../utils/api";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/leaderboard?limit=50")
      .then(({ leaderboard: rows }) => setLeaderboard(rows))
      .catch((err) => setError(err.message || "Couldn't load leaderboard."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#DEEBFB] flex flex-col">
      <Navbar />
      <div className="max-w-[1200px] mx-auto px-lg2 py-xl2 flex-1 w-full">
        <div className="mb-lg2">
          <h1 className="font-display text-display-md text-[#141618] mb-xs2">
            Leaderboard
          </h1>
          <p className="font-body text-body-sm text-[#646c79]">
            Ranked by total score across all solved problems.
          </p>
        </div>

        {loading && (
          <p className="font-body text-body-sm text-[#646c79]">Loading…</p>
        )}

        {error && (
          <p className="font-body text-body-sm text-gradient-coral">{error}</p>
        )}

        {!loading && !error && leaderboard.length === 0 && (
          <p className="font-body text-body-sm text-[#646c79]">
            No rankings yet — be the first to solve a problem.
          </p>
        )}

        {!loading && leaderboard.length > 0 && (
          <div className="rounded-xl overflow-hidden border border-[#D7E3F2] select-none">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#EAF1FB] text-left">
                  <th className="font-body text-caption text-black  px-md2 py-sm2 w-16">
                    Rank
                  </th>
                  <th className="font-body text-caption text-black  px-md2 py-sm2">
                    Coder
                  </th>
                  <th className="font-body text-caption text-black  px-md2 py-sm2">
                    Score
                  </th>
                  <th className="font-body text-caption text-black  px-md2 py-sm2 hidden md:table-cell">
                    Solved
                  </th>
                  <th className="font-body text-caption text-black px-md2 py-sm2 hidden md:table-cell">
                    Streak
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((u, i) => (
                  <tr
                    key={u.id}
                    className="bg-white border-t border-[#EEF3FA]"
                  >
                    <td className="px-md2 py-sm2">
                      <span className="font-body text-body-sm text-ink-muted">
                        #{i + 1}
                      </span>
                    </td>
                    <td className="px-md2 py-sm2">
                      <div className="flex items-center gap-sm2">
                        <Avatar name={u.name} size="sm" />
                        <span className="font-body text-body-sm text-ink-muted">
                          {u.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-md2 py-sm2">
                      <span className="font-body text-body-sm text-ink-muted">
                        {u.score}
                      </span>
                    </td>
                    <td className="px-md2 py-sm2 hidden md:table-cell">
                      <span className="font-body text-body-sm text-ink-muted">
                        {u.solved}
                      </span>
                    </td>
                    <td className="px-md2 py-sm2 hidden md:table-cell">
                      <span className="font-body text-body-sm text-ink-muted">
                        {u.streak > 0 ? `${u.streak} 🔥` : "—"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
