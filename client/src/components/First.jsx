import { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";

export default function First() {
  const { user } = useAuth();

  useEffect(() => {
    document.body.classList.add("home-page");
    return () => document.body.classList.remove("home-page");
  }, []);

  return (
    <section className="max-w-[1200px] mx-auto h-screen px-lg2 pt-section text-center">
        <div className="absolute bottom-[10px] left-0 right-0">
          <p className=" text-white/80  tracking-[1px] mb-md2 items-center justify-center gap-2 bg-[#a0adc1]/40 backdrop-blur-[10px] inline-flex w-[380px] min-h-[29px] rounded-full ">
            600+ Problems · 12 Languages · Live Judge
          </p>
          <h1 className="font-display text-display-lg md:text-display-xl text-ink mb-lg2">
            Practice Leads{" "}
            <span
              style={{
                fontFamily: '"EB Garamond", serif',
                fontStyle: "italic",
              }}
            >
              Progress.
            </span>
          </h1>
          <p className="font-body text-body-lg text-white/80 max-w-[560px] mx-auto mb-xl2">
            Solve real problems in a real editor, get instant test-case
            feedback, and track every streak along the way.
          </p>
          <div className="flex items-center justify-center gap-sm2">
            <Button as={Link} to={user ? "/problems" : "/register"} variant="primary">
              Start solving — it's free
            </Button>
          </div>
        </div>
      </section>
  );
}
