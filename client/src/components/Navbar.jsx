import { Link, NavLink, useLocation } from "react-router-dom";
import Avatar from "./Avatar";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/problems", label: "Problems" },
  { to: "/contests", label: "Contests" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/discuss", label: "Discuss" },
];

export default function Navbar() {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const isHome = pathname === "/";

  const isDarkNavbar =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/admin" ||
    pathname === "/profile";

  const headerClass = isHome
    ? ""
    : isDarkNavbar
    ? "bg-[#090909] backdrop-blur"
    : "bg-[#DEEBFB] backdrop-blur";

  const linkActive =
    isHome || isDarkNavbar ? "text-white" : "text-[#141618]";

  const linkInactive =
    isHome || isDarkNavbar
      ? "text-white/70 hover:text-white"
      : "text-[#646c79] hover:text-[#141618]";

  const logoColor =
    isHome || isDarkNavbar ? "text-white" : "text-ink";

  return (
    <header className={`sticky top-0 z-50 ${headerClass}`}>
      <div className="relative max-w-[1200px] mx-auto h-[56px] px-lg2 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center min-w-[160px]">
          <Link
            to="/"
            className={`text-headline tracking-[-0.8px] no-underline ${logoColor}`}
            style={{
              fontFamily: '"EB Garamond", serif',
              fontStyle: "italic",
            }}
          >
            WellCode
          </Link>
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-xl2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-body text-body-sm no-underline transition-colors ${
                  isActive ? linkActive : linkInactive
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center justify-end gap-md2 min-w-[160px]">
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className={`font-body text-body-sm no-underline ${linkInactive}`}
            >
              Admin
            </Link>
          )}

          {user && (
            <Link to="/profile" className="no-underline">
              <Avatar name={user.name} size="sm" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}