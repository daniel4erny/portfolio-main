import Reveal from "./Reveal";
import { awards } from "@/lib/content";
import { IconArrow } from "./Icons";

export default function Awards() {
  return (
    <section id="awards" className="section shell">
      <Reveal>
        <p className="eyebrow mb-5">Competitions</p>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="h2">Results</h2>
      </Reveal>

      <div className="results">
        {awards.map((a, i) => (
          <Reveal key={`${a.year}-${a.title}`} delay={0.04 + i * 0.04}>
            <article className="result">
              <span className="result-year mono">{a.year}</span>

              <div className="result-body">
                <h3 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-text-primary">
                  {a.title}
                </h3>
                <p className="mono mt-1 text-[0.94rem] tracking-[0.03em] text-text-muted">
                  {a.org}
                </p>
                <p className="mt-3 max-w-[60ch] text-[1.08rem] leading-[1.8] text-text-secondary">
                  {a.detail}
                </p>

                {a.links && (
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {a.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="meta-link"
                      >
                        {l.label}
                        <IconArrow width={12} height={12} />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <dl className="result-places">
                {a.places.map((p) => (
                  <div key={p.note} data-place={p.place}>
                    <dt className="result-rank">
                      {p.place}
                      <span>{p.ordinal}</span>
                    </dt>
                    <dd className="mono text-[0.9rem] tracking-[0.04em] text-text-muted">
                      {p.note}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
