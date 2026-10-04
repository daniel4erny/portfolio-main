import Image from "next/image";
import { projects, type Project } from "@/lib/content";

function Links({ project }: { project: Project }) {
  return (
    <p className="links">
      {project.links.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noreferrer noopener">
          {l.label}
        </a>
      ))}
    </p>
  );
}

function Feature({ project }: { project: Project }) {
  return (
    <article className="feature">
      {project.image && (
        <a
          href={project.primary}
          target="_blank"
          rel="noreferrer noopener"
          className="feature-shot"
          tabIndex={-1}
          aria-hidden
        >
          <Image
            src={project.image.src}
            alt=""
            width={1600}
            height={1000}
            sizes="(min-width: 960px) 55vw, 100vw"
          />
        </a>
      )}

      <div className="feature-text">
        <h3 className="h3">{project.title}</h3>
        <p className="kicker">{project.kicker}</p>
        <p className="body-text">{project.body}</p>
        <p className="tech">{project.tech.join(", ")}</p>
        <Links project={project} />
      </div>
    </article>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section shell">
      <h2 className="h2">Projects</h2>

      <div className="features">
        {featured.map((p) => (
          <Feature key={p.title} project={p} />
        ))}
      </div>

      {rest.length > 0 && (
        <>
          <h3 className="h3 mt-24">Smaller projects in Go</h3>
          <ul className="builds">
            {rest.map((p) => (
              <li key={p.title} className="build">
                <div>
                  <h4 className="build-title">{p.title}</h4>
                  <p className="kicker">{p.kicker}</p>
                </div>
                <div>
                  <p className="body-text">{p.body}</p>
                  <p className="tech">{p.tech.join(", ")}</p>
                </div>
                <Links project={p} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
