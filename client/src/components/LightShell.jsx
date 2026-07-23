import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LightShell({ children }) {
  return (
    <div className="min-h-screen bg-[#C8D8F1] flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
