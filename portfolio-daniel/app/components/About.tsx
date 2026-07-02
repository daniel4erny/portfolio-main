import Reveal from "./Reveal";

const STATS = [
  { value: "X+", label: "Years of lorem" },
  { value: "NN", label: "Ipsum shipped" },
  { value: "∞", label: "Dolor sit amet" },
];

export default function About() {
  return (
    <section id="about" className="px-[16vw] pb-[14vh]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-14 items-start">
        <div>
          <Reveal>
            <p className="text-[0.72rem] font-semibold tracking-[0.24em] text-accent uppercase mb-3">
              About
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="text-[clamp(1.6rem,3vw,2.6rem)] font-bold tracking-[-0.03em] text-text-primary mb-8 leading-[1.1]">
              Lorem ipsum dolor,{" "}
              <span className="text-text-secondary font-normal">
                consectetur adipiscing.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="text-[0.95rem] leading-[1.85] text-slate-400/85 mb-5 max-w-[58ch]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-[0.95rem] leading-[1.85] text-slate-400/85 max-w-[58ch]">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4 lg:pt-[5.5rem]">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.1 + i * 0.08}>
              <div className="stat-block">
                <span className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold tracking-[-0.03em] text-accent leading-none">
                  {s.value}
                </span>
                <span className="text-[0.8rem] tracking-[0.06em] text-slate-400/85 uppercase">
                  {s.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
