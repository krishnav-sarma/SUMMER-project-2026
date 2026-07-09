import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Discuss() {
  return (
    <div className="min-h-screen bg-[#C8D8F1] ">
      <Navbar/>
      <div className="max-w-[1200px] h-screen mx-auto px-lg2 py-xl2 ">
      <h1 className="font-display text-display-md text-[#141618] mb-xs2">Discuss</h1>
      <p className="font-body text-body-sm text-[#646c79] mb-lg2">
        Discussion lives on each problem's page, under its Discuss tab. Open any problem to join
        the conversation.
      </p>
      <Link to="/problems" className="font-body text-body-sm text-[#646c79]">
        Browse problems →
      </Link>
    </div>
    <Footer/>
    </div>
  );
}
