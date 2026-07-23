import { ChevronRight, Smartphone, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#DEEBFB]  text-[#666] border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="py-24 flex flex-col items-center text-center">
          <p className="max-w-2xl text-[15px] leading-8 text-black/70">
            If you are passionate about tackling some of the most interesting
            problems around, we would love to hear from you.
          </p>
          <a  href="/" className="mt-8 inline-flex items-center gap-2 text-[#007aff] hover:gap-3 transition-all" > Join Our Team
          <ChevronRight size={18} />
          </a>
        </div>
        <div className="border-t border-gray-200" />
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <p className="text-[#7b7b7b]">Copyright © 2026 WellCode</p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[#666]">
            <a href="/" className="text-[#7b7b7b] hover:text-black transition"> Help Center </a>
            <span>|</span>
            <a href="/" className="text-[#7b7b7b] hover:text-black transition"> Bug Bounty </a>
            <span>|</span>
            <a href="/" className="text-[#7b7b7b] hover:text-black transition"> Terms </a>
            <span>|</span>
            <a href="/" className="text-[#7b7b7b] hover:text-black transition"> Privacy Policy </a>
            <span className="hidden sm:inline">|</span>

            <button className="flex items-center gap-2 hover:text-black transition">
              <Globe size={15} />
              India
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
