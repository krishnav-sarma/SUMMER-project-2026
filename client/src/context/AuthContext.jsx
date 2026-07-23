import { createContext, useContext, useEffect, useState } from "react";
import { api, getToken, setToken } from "../utils/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on page load if a token is already saved.
  useEffect(() => {
    async function restore() {
      if (!getToken()) {
        setLoading(false);
        return;
      }
      try {
        const { user } = await api.get("/auth/me");
        setUser(user);
      } catch {
        setToken(null); // stale/invalid token
      } finally {
        setLoading(false);
      }
    }
    restore();
  }, []);

  const login = async (email, password) => {
    const { token, user } = await api.post("/auth/login", { email, password });
    setToken(token);
    setUser(user);
  };

  const register = async (name, email, password) => {
    const { token, user } = await api.post("/auth/register", { name, email, password });
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    if (!getToken()) return;
    const { user } = await api.get("/auth/me");
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
