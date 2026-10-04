import { awards } from "@/lib/content";

export default function Awards() {
  return (
    <section id="awards" className="section shell">
      <h2 className="h2">Competition results</h2>

      <ol className="results">
        {awards.map((a) => (
          <li key={`${a.year}-${a.title}`} className="result">
            <span className="result-year">{a.year}</span>

            <div>
              <h3 className="h3">{a.title}</h3>
              <p className="kicker">{a.org}</p>
              <p className="body-text">{a.detail}</p>
              {a.links && (
                <p className="links">
                  {a.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer noopener">
                      {l.label}
                    </a>
                  ))}
                </p>
              )}
            </div>

            <ul className="result-places">
              {a.places.map((p) => (
                <li key={p.note}>
                  <span className="result-rank">
                    {p.place}
                    <sup>{p.ordinal}</sup>
                  </span>
                  {p.note}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
