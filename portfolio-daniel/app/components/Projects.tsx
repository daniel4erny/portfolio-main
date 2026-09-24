import Reveal from "./Reveal";
import GlassCard from "./GlassCard";
import { projects, type Project } from "@/lib/content";
import { IconArrow, IconGitHub, IconGlobe } from "./Icons";

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal delay={delay} className="project-slot">
      <GlassCard className="project-card group">
        {/* covers the card so a click anywhere opens the project; the links in
            the detail panel sit above it and stay separately clickable */}
        <a
          href={project.primary}
          target="_blank"
          rel="noreferrer noopener"
          className="project-hit"
          aria-label={`${project.title} — ${project.kicker}`}
        />

        <header className="mb-4 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="mono text-[0.94rem] tracking-[0.04em] text-text-muted">
              {project.index}
            </span>
            {project.status && <span className="tag">{project.status}</span>}
          </div>
          <span className="project-arrow" aria-hidden>
            <IconArrow width={17} height={17} />
          </span>
        </header>

        <h3 className="text-[clamp(1.3rem,2vw,1.7rem)] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary">
          {project.title}
        </h3>

        <p className="mono mt-2 text-[0.95rem] tracking-[0.03em] text-text-muted">
          {project.kicker}
        </p>

        {/* collapsed to nothing until hover; 0fr→1fr animates an auto height */}
        <div className="project-reveal">
          <div>
            <p className="pt-5 text-[1.08rem] leading-[1.8] text-text-secondary">
              {project.body}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
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

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </GlassCard>
    </Reveal>
  );
}

export default function Projects() {
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
          <p className="mono hover-hint text-[0.92rem] tracking-[0.04em] text-text-muted">
            hover a card for detail
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} delay={0.04 + (i % 3) * 0.06} />
        ))}
      </div>
    </section>
  );
}
