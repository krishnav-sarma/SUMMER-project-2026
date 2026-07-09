import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Problems from "./pages/Problems";
import Contests from "./pages/Contests";
import Leaderboard from "./pages/Leaderboard";
import Discuss from "./pages/Discuss";
import Lenis from "lenis";
import "./index.css";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  });
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/contests" element={<Contests />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/discuss" element={<Discuss />} />
      </Routes>
    </BrowserRouter>
  );
}
