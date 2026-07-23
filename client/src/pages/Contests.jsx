import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Contests() {
  return (
    <div className="min-h-screen bg-[#DEEBFB] ">
      <Navbar />
      <div className="max-w-[1200px] h-screen mx-auto px-lg2 py-xl2">
        <div className="mb-lg2">
          <h1 className="font-display text-display-md text-[#141618] mb-xs2">
            Contests
          </h1>
          <p className="font-body text-body-sm text-[#646c79]">
            Time-limited rounds, ranked by score.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}