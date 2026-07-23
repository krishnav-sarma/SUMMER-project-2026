import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <p className="font-body text-body-sm text-ink-muted">Loading…</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return children;
}
