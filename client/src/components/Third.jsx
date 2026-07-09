export default function AchievementsStrip() {
    const stats = [
      { value: "600+", label: "problems across 12 languages" },
      { value: "50K+", label: "developers practicing daily" },
      { value: "98%", label: "test-case pass accuracy on submit" },
      { value: "40%", label: "faster interview prep, avg. reported" },
    ];
  
    return (
      <section className="relative overflow-hidden rounded-3xl px-8 py-12 md:px-14 md:py-16 max-w-[1100px] mx-auto mt-[130px]">
        <div className="relative z-10 grid md:grid-cols-[1.2fr_1fr] text-black gap-16">

          <div>
            <h2 className="text-4xl md:text-5xl font-light uppercase tracking-wide  leading-tight">
              WHAT
              <br />
              WE
              <br />
              OFFER
            </h2>
  
            <p className="mt-6 max-w-sm text-black/70 text-lg leading-relaxed">
              Innovating, leading, and delivering exceptional results.
            </p>
          </div>

          <div>
            {stats.map((item) => (
              <div
                key={item.label}
                className="border-t border-black/20 py-7"
              >
                <div className="grid grid-cols-[180px_1fr] items-center">
                  <span className="text-6xl font-light text-black">
                    {item.value}
                  </span>
  
                  <span className="text-black/70 text-lg">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
  
            <div className="border-t border-white/20" />
          </div>
        </div>
      </section>
    );
  }