import Image from "next/image";
import Reveal from "./Reveal";
import GlassCard from "./GlassCard";
import { projects, type Project } from "@/lib/content";
import { IconArrow, IconGitHub, IconGlobe } from "./Icons";

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal delay={delay} className="project-slot h-full">
      <GlassCard className="project-card">
        {/* covers the card so a click anywhere opens the project; the links
            in the drawer sit outside it and stay separately clickable */}
        <a
          href={project.primary}
          target="_blank"
          rel="noreferrer noopener"
          className="project-hit"
          aria-label={`${project.title} — ${project.kicker}`}
        />

        {project.image && (
          <div className="project-shot">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={1600}
              height={1000}
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
            />
          </div>
        )}

        <div className="project-body">
          <header className="mb-3 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="mono text-[0.9rem] tracking-[0.04em] text-text-muted">
                {project.index}
              </span>
              {project.status && <span className="tag">{project.status}</span>}
            </div>
            <span className="project-arrow" aria-hidden>
              <IconArrow width={17} height={17} />
            </span>
          </header>

          <h3 className="text-[clamp(1.2rem,1.6vw,1.45rem)] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary">
            {project.title}
          </h3>

          <p className="mono mt-1.5 text-[0.9rem] tracking-[0.02em] text-text-muted">
            {project.kicker}
          </p>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {project.tech.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* slides out below the card on hover and floats over whatever is
            underneath, so the grid never reflows */}
        <div className="project-drawer">
          <div>
            <p className="text-[1rem] leading-[1.75] text-text-secondary">
              {project.body}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="meta-link"
                >
                  {l.kind === "code" ? <IconGitHub /> : <IconGlobe />}
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </Reveal>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section shell">
      <Reveal>
        <p className="eyebrow mb-5">Selected work</p>
      </Reveal>

      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal delay={0.06}>
          <h2 className="h2">Things I&apos;ve built</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mono hover-hint text-[0.9rem] tracking-[0.04em] text-text-muted">
            hover a card for details
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <ProjectCard key={p.title} project={p} delay={0.04 + (i % 3) * 0.06} />
        ))}
      </div>

      {rest.length > 0 && (
        <>
          <Reveal>
            <p className="mono mt-16 mb-5 text-[0.92rem] tracking-[0.04em] text-text-muted">
              Smaller builds — terminal &amp; network tools in Go
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <ProjectCard key={p.title} project={p} delay={0.04 + (i % 3) * 0.06} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
