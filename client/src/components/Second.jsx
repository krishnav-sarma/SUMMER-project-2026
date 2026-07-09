import {Trophy,GitBranch,Flame,Code2,ChartColumn,Command,} from "lucide-react";

export default function Second() {
  return (
    <section className="max-w-7xl mx-auto p-5 mt-20">
      <div className="grid grid-cols-12 grid-rows-3 gap-5 h-[500px]">
        <div className="col-span-5 row-span-3 rounded-3xl bg-[#4A6892] p-8 text-white flex flex-col justify-between">
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
            <Trophy size={28} />
          </div>
          <div>
            <h1 className="text-7xl font-bold">150+</h1>
            <h2 className="text-2xl font-semibold mt-3">Problems Solved</h2>
            <p className="mt-4 text-white/70 leading-7">
              Master DSA with consistent practice, detailed analytics and GitHub
              synced progress.
            </p>
          </div>
        </div>

        <div className="col-span-4 rounded-3xl border bg-white p-7 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <ChartColumn className="text-blue-600" />
            <span className="text-sm text-zinc-500">Monthly</span>
          </div>
          <div>
            <h1 className="text-6xl font-bold text-[#141618]">68%</h1>
            <p className="text-zinc-500 mt-2">First Attempt Accuracy</p>
          </div>
        </div>

        <div className="col-span-3 rounded-3xl border bg-white p-6 flex flex-col justify-between">
          <Flame className="text-orange-500" size={28} />
          <div>
            <h2 className="text-5xl font-bold text-[#141618]">12</h2>
            <p className="text-zinc-500">Day Streak</p>
          </div>
        </div>

        <div className="col-span-3 rounded-3xl border bg-white p-6 flex flex-col justify-between">
          <GitBranch className="text-blue-600" />
          <div>
            <h3 className="font-semibold text-lg text-[#141618]">
              GitHub Sync
            </h3>
            <p className="text-sm text-zinc-500 mt-2">
              Automatically push solved questions.
            </p>
          </div>
        </div>

        <div className="col-span-4 rounded-3xl border bg-white p-6 flex flex-col justify-between">
          <Code2 className="text-violet-600" />
          <div>
            <h3 className="font-semibold text-lg text-[#141618]">
              Topics Covered
            </h3>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Arrays", "Trees", "Graphs", "DP"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-[#4A6993] text-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-7 rounded-3xl border bg-[#4A6892] text-white p-6 flex items-center justify-between">
          <div>
            <p className="text-white/60">Quick Submit</p>
            <h3 className="text-2xl font-semibold mt-2">Run & Submit Faster</h3>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Command size={20} />
            </kbd>
            <span>+</span>
            <kbd className="px-4 h-12 rounded-xl bg-blue-600 flex items-center justify-center font-semibold">
              Enter
            </kbd>
          </div>
        </div>
      </div>
    </section>
  );
}