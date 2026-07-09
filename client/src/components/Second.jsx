import {
  GitBranch,
  Settings2,
  Flame,
  Trophy,
  Command,
  CornerDownLeft,
} from "lucide-react";

export default function Second() {
  return (
    <section className="max-w-[1200px] mx-auto p-4 mt-[5.5rem]">
      <div className="grid grid-cols-3 grid-rows-[80px_250px_80px] gap-3">

        <div className="col-start-1 row-start-1 row-span-3 bg-white rounded-[24px] border border-[#E8E8E8] shadow-sm p-6 flex flex-col">

          <div className="w-12 h-12 rounded-xl bg-[#1D497F] flex items-center justify-center">
            <GitBranch className="w-6 h-6 text-white" />
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-[#111827]">
              GitHub Sync
            </h2>

            <p className="mt-3 text-[15px] leading-7 text-[#6B7280]">
              Automatically sync solved problems with GitHub. Build your coding
              portfolio while maintaining your daily streak.
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between">

            <button className="flex items-center gap-2 bg-[#EEF3FF] text-[#2955D9] px-4 h-10 rounded-full text-sm font-medium">
              <Settings2 className="w-4 h-4" />
              Configure
            </button>

            <div className="w-12 h-6 rounded-full bg-[#2955D9] p-1 flex justify-end">
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>

          </div>

        </div>

        <div className="col-start-2 row-start-1 bg-white rounded-[24px] border border-[#E8E8E8] shadow-sm px-6 flex items-center justify-between">

          <div>
            <h3 className="font-semibold text-[#111827]">
              Topics Connected
            </h3>

            <p className="text-sm text-[#6B7280]">
              04 Active Topics
            </p>
          </div>

          <div className="flex -space-x-2">

            <div className="w-9 h-9 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
              DP
            </div>

            <div className="w-9 h-9 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
              GR
            </div>

            <div className="w-9 h-9 rounded-full bg-sky-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
              TR
            </div>

          </div>

        </div>

        <div className="col-start-2 row-start-2 bg-white rounded-[24px] border border-[#E8E8E8] shadow-sm p-6 flex flex-col">

          <div className="flex justify-between">

            <div>

              <h3 className="font-semibold text-[#111827]">
                Solving Accuracy
              </h3>

              <p className="text-sm text-[#6B7280]">
                Monthly Performance
              </p>

            </div>

            <div className="flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-600">
              <Flame className="w-3 h-3" />
              12 Day Streak
            </div>

          </div>

          <h1 className="mt-6 text-[72px] font-bold leading-none text-[#111827]">
            68%
          </h1>

          <div className="mt-auto flex justify-between text-sm text-[#6B7280]">

            <span>First Try Success</span>

            <span className="font-medium text-[#2955D9]">
              Monthly
            </span>

          </div>

        </div>

        <div className="col-start-3 row-start-1 row-span-2 rounded-[24px] bg-[#1D497F] shadow-sm p-7 flex flex-col justify-between overflow-hidden relative">

          <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

          <div className="flex justify-between relative z-10">

            <Trophy className="text-white/70 w-6 h-6" />

            <span className="text-xs uppercase tracking-widest text-white/60">
              All Time
            </span>

          </div>

          <h1 className="text-[72px] font-bold text-white leading-none relative z-10">
            150+
          </h1>

          <div className="relative z-10">

            <h3 className="text-xl text-white font-semibold">
              Problems Solved
            </h3>

            <p className="mt-3 text-white/75 leading-7">
              Solved coding problems across Arrays, Trees, Graphs and Dynamic
              Programming while improving interview readiness.
            </p>

          </div>

        </div>


        <div className="col-start-2 col-span-2 row-start-3 bg-white rounded-[24px] border border-[#E8E8E8] shadow-sm px-6 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-10 h-10 rounded-full bg-[#EEF3FF] flex items-center justify-center">
              <Command className="w-5 h-5 text-[#2955D9]" />
            </div>

            <div>

              <h3 className="font-semibold text-[#111827]">
                Shortcut Keys
              </h3>

              <p className="text-sm text-[#6B7280]">
                Run and submit code instantly.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2">

            <kbd className="text-white/80 w-10 h-10 rounded-full bg-[#2955D9]/70 backdrop-blur-[10px] flex items-center justify-center text-sm font-semibold">
              ⌘
            </kbd>

            <span>+</span>

            <kbd className="w-10 h-10 rounded-full bg-[#2955D9]/70 backdrop-blur-[10px] flex items-center justify-center">
              <CornerDownLeft className="w-4 h-4" />
            </kbd>

          </div>

        </div>

      </div>
    </section>
  );
}