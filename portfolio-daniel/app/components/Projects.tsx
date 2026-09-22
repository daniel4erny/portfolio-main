import Reveal from "./Reveal";
import { projects, type Project } from "@/lib/content";
import { IconArrow, IconGitHub, IconGlobe } from "./Icons";

function Head({ project }: { project: Project }) {
  return (
    <>
      <header className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="mono text-[0.7rem] tracking-[0.2em] text-text-muted">
            {project.index}
          </span>
          {project.status && <span className="tag">{project.status}</span>}
        </div>
        <span className="project-arrow" aria-hidden>
          <IconArrow width={18} height={18} />
        </span>
      </header>

      <h3 className="text-[clamp(1.4rem,2.4vw,2.1rem)] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary">
        {/* stretched link turns the whole card into the hit-area for the primary URL */}
        <a
          href={project.primary}
          target="_blank"
          rel="noreferrer noopener"
          className="stretch-link"
        >
          {project.title}
        </a>
      </h3>

      <p className="mono mt-2 text-[0.73rem] tracking-[0.04em] text-text-muted">
        {project.kicker}
      </p>
    </>
  );
}

function Links({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
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
  );
}

function Tech({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {project.tech.map((t) => (
        <span key={t} className="chip">
          {t}
        </span>
      ))}
    </div>
  );
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  if (project.featured) {
    return (
      <Reveal delay={delay} className="md:col-span-2">
        <article className="panel project-card md:!flex-row md:gap-12 md:p-10">
          {/* headline column stays narrow so the body copy keeps a readable measure */}
          <div className="md:w-[34%] md:shrink-0">
            <Head project={project} />
            <div className="mt-6 hidden md:block">
              <Links project={project} />
            </div>
          </div>

          <div className="mt-6 flex flex-1 flex-col md:mt-0">
            <p className="mb-7 text-[0.92rem] leading-[1.85] text-text-secondary">
              {project.body}
            </p>
            <div className="mt-auto flex flex-col gap-5">
              <Tech project={project} />
              <div className="md:hidden">
                <Links project={project} />
              </div>
            </div>
          </div>
        </article>
      </Reveal>
    );
  }

  return (
    <Reveal delay={delay}>
      <article className="panel project-card">
        <Head project={project} />
        <p className="mb-7 mt-5 text-[0.88rem] leading-[1.8] text-text-secondary">
          {project.body}
        </p>
        <div className="mt-auto flex flex-col gap-5">
          <Tech project={project} />
          <Links project={project} />
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section shell">
      <Reveal>
        <p className="eyebrow mb-5">Selected work</p>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="h2 max-w-[26ch]">
          Four things I built.{" "}
          <span className="muted">Two are live, all four are real.</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} delay={0.05 + (i % 2) * 0.07} />
        ))}
      </div>
    </section>
  );
}
