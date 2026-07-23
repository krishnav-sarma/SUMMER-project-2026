import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "../utils/api";
import { useAuth } from "./AuthContext";

const UserStatsContext = createContext(null);

export function UserStatsProvider({ children }) {
  const { user, refreshUser } = useAuth();
  const [submissions, setSubmissions] = useState([]);

  const stats = user
    ? { score: user.score, streak: user.streak, solvedProblemIds: user.solvedProblemIds || [] }
    : { score: 0, streak: 0, solvedProblemIds: [] };

  const loadSubmissions = useCallback(async () => {
    if (!user) {
      setSubmissions([]);
      return;
    }
    try {
      const { submissions } = await api.get("/submissions/mine");
      setSubmissions(submissions);
    } catch {
      // not signed in or request failed — leave submissions empty
    }
  }, [user]);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

  // Submission itself happens via api.post("/submissions/submit", ...) directly
  // in ProblemDetail; this just re-syncs local state (user stats + history) after.
  const afterSubmit = useCallback(async () => {
    await refreshUser();
    await loadSubmissions();
  }, [refreshUser, loadSubmissions]);

  const revealHint = useCallback(
    async (problemId, hintIndex) => {
      const result = await api.post("/hints/reveal", { problemId, hintIndex });
      await refreshUser();
      return result;
    },
    [refreshUser]
  );

  return (
    <UserStatsContext.Provider value={{ stats, submissions, afterSubmit, revealHint }}>
      {children}
    </UserStatsContext.Provider>
  );
}

export function useUserStats() {
  const ctx = useContext(UserStatsContext);
  if (!ctx) throw new Error("useUserStats must be used within UserStatsProvider");
  return ctx;
}
