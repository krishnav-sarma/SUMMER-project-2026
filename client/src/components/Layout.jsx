import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen bg-[#C8D8F1] text-ink flex flex-col">
      {!isHome && <Navbar />}
      <main className="flex-1">{children}</main>
      <footer className="px-lg2 py-xl2">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <span className="font-display text-body-sm text-ink">codewell</span>
          <span className="font-body text-caption text-ink-muted">
            © {new Date().getFullYear()} codewell. Built for practice, not production.
          </span>
        </div>
      </footer>
    </div>
  );
}
