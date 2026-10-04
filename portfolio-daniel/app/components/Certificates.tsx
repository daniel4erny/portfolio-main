import { certificates } from "@/lib/content";

export default function Certificates() {
  return (
    <section id="certificates" className="section shell">
      <h2 className="h2">Courses</h2>
      <p className="section-note">
        University of Helsinki programming MOOCs. Each links to the
        certificate on the university&apos;s validation page.
      </p>

      <ul className="certs">
        {certificates.map((c) => (
          <li key={c.code} className="cert">
            <div>
              <h3 className="build-title">{c.course}</h3>
              <p className="kicker">{c.series}</p>
            </div>
            <a href={c.href} target="_blank" rel="noreferrer noopener">
              View certificate
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
