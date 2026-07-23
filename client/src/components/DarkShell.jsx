import Navbar from "./Navbar";

export default function DarkShell({ children }) {
  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
