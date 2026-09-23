import Reveal from "./Reveal";
import GlassCard from "./GlassCard";
import { profile, projects, type Project } from "@/lib/content";
import { IconArrow, IconGitHub, IconGlobe } from "./Icons";

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal delay={delay} className="project-slot">
      <GlassCard className="project-card group">
        <header className="mb-4 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="mono text-[0.7rem] tracking-[0.2em] text-text-muted">
              {project.index}
            </span>
            {project.status && <span className="tag">{project.status}</span>}
          </div>
          <span className="project-arrow" aria-hidden>
            <IconArrow width={17} height={17} />
          </span>
        </header>

        <h3 className="text-[clamp(1.3rem,2vw,1.7rem)] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary">
          {/* stretched link turns the whole card into the hit-area */}
          <a
            href={project.primary}
            target="_blank"
            rel="noreferrer noopener"
            className="stretch-link"
          >
            {project.title}
          </a>
        </h3>

        <p className="mono mt-2 text-[0.72rem] tracking-[0.03em] text-text-muted">
          {project.kicker}
        </p>

        {/* collapsed to nothing until hover; 0fr→1fr animates an auto height */}
        <div className="project-reveal">
          <div>
            <p className="pt-5 text-[0.87rem] leading-[1.8] text-text-secondary">
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
          <h2 className="h2 max-w-[26ch]">
            Five things I built.{" "}
            <span className="muted">Three are live, all five are real.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mono hover-hint text-[0.68rem] tracking-[0.1em] text-text-muted">
            hover a card for detail
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} delay={0.04 + (i % 3) * 0.06} />
        ))}

        {/* closes the grid rather than leaving a hole, and earns its place */}
        <Reveal delay={0.16} className="project-slot">
          <GlassCard className="h-full">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="project-more"
            >
              <IconGitHub width={20} height={20} />
              <span className="text-[1.05rem] font-semibold tracking-[-0.02em]">
                Everything else
              </span>
              <span className="mono flex items-center gap-2 text-[0.72rem] text-text-muted">
                github.com/{profile.githubHandle}
                <span className="project-arrow">
                  <IconArrow width={12} height={12} />
                </span>
              </span>
            </a>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
