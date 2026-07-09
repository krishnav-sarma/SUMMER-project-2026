import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "./Button";

const navLinks = [
  { to: "/problems", label: "Problems" },
  { to: "/contests", label: "Contests" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/discuss", label: "Discuss" },
];

export default function Navbar() {

  return (
    <header className="sticky top-0 z-50 ">
      <div className="max-w-[1200px] mx-auto h-[56px] px-lg2 flex items-center justify-between">
        <Link
          to="/"
          className="text-headline tracking-[-0.8px] text-ink no-underline"
          style={{
            fontFamily: '"EB Garamond", serif',
            fontStyle: "italic",
          }}
        >
          WellCode
        </Link>

        <nav className="hidden md:flex items-center gap-xl2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-body text-body-sm no-underline transition-colors ${
                  isActive ? "text-black" : "text-white hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-md2">
          <Button as={Link} to="/problems" variant="primary" size="sm">
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}
