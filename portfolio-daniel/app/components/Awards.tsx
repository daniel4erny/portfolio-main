import Reveal from "./Reveal";
import { awards } from "@/lib/content";
import { IconArrow, IconTrophy } from "./Icons";

export default function Awards() {
  return (
    <section id="awards" className="section shell">
      <Reveal>
        <p className="eyebrow mb-5">Competitions</p>
      </Reveal>

      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal delay={0.06}>
          <h2 className="h2 max-w-[30ch]">
            Where the work gets measured{" "}
            <span className="muted">against everyone else&apos;s.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mono flex items-center gap-2 text-[0.72rem] text-text-muted">
            <IconTrophy />
            2024 — 2026
          </p>
        </Reveal>
      </div>

      <div className="timeline mt-12">
        {awards.map((a, i) => (
          <Reveal key={`${a.year}-${a.title}`} delay={0.04 + i * 0.05}>
            <div className="award-row">
              <span className="mono text-[0.78rem] tracking-[0.12em] text-text-muted">
                {a.year}
              </span>

              <div className="flex flex-row gap-5 lg:flex-col lg:gap-2">
                {a.places.map((p) => (
                  <div key={p.note}>
                    <span className="award-place">
                      {p.place}
                      <sup>{p.ordinal}</sup>
                    </span>
                    <span className="mono ml-2 text-[0.66rem] text-text-muted lg:ml-0 lg:block">
                      {p.note}
                    </span>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-[1.1rem] font-semibold tracking-[-0.02em] text-text-primary">
                  {a.title}
                </h3>
                <p className="mono mt-1 text-[0.7rem] tracking-[0.04em] text-text-muted">
                  {a.org}
                </p>
                <p className="mt-3 max-w-[62ch] text-[0.87rem] leading-[1.8] text-text-secondary">
                  {a.detail}
                </p>
                {a.href && (
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="meta-link mt-3"
                  >
                    {new URL(a.href).host.replace(/^www\./, "")}
                    <IconArrow width={13} height={13} />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
