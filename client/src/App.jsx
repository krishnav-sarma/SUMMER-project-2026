import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { useEffect } from "react";
import Home from "./pages/Home";
import Problems from "./pages/Problems";
import ProblemDetail from "./pages/ProblemDetail";
import Contests from "./pages/Contests";
import ContestDetail from "./pages/ContestDetail";
import Leaderboard from "./pages/Leaderboard";
import Discuss from "./pages/Discuss";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Submissions from "./pages/Submissions";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import DarkShell from "./components/DarkShell";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<Problems />} />
        <Route
          path="/problems/:id"
          element={
            <DarkShell>
              <ProblemDetail />
            </DarkShell>
          }
        />
        <Route path="/contests" element={<Contests />} />
        <Route
          path="/contests/:id"
          element={
            <DarkShell>
              <ContestDetail />
            </DarkShell>
          }
        />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/discuss" element={<Discuss />} />
        <Route
          path="/login"
          element={
            <DarkShell>
              <Login />
            </DarkShell>
          }
        />
        <Route
          path="/register"
          element={
            <DarkShell>
              <Register />
            </DarkShell>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DarkShell>
                <Profile />
              </DarkShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/submissions"
          element={
            <ProtectedRoute>
              <DarkShell>
                <Submissions />
              </DarkShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <DarkShell>
                <AdminDashboard />
              </DarkShell>
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
