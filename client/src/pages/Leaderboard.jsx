import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-[#C8D8F1] ">
      <Navbar />
      <div className="max-w-[1200px] h-screen mx-auto px-lg2 py-xl2 2">
        <div className="mb-lg2">
          <h1 className="font-display text-display-md text-[#141618] mb-xs2">
            Leaderboard
          </h1>
          <p className="font-body text-body-sm text-[#646c79]">
            Ranked by total score across all solved problems.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
