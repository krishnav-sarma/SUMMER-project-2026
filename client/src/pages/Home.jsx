import Navbar from "../components/Navbar";
import Third from "../components/Third";
import Second from "../components/Second";
import First from "../components/First";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[url('/c.png')] bg-cover bg-center bg-no-repeat">
      <Navbar />
      <First />
      <Second />
      <Third />
      <Footer />
    </div>
  );
}
