import Reveal from "./Reveal";

type Project = {
  index: string;
  title: string;
  description: string;
  tech: string[];
  href: string;
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    index: "01",
    title: "Project Alpha",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    href: "#",
    featured: true,
  },
  {
    index: "02",
    title: "Project Beta",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    tech: ["Python", "FastAPI"],
    href: "#",
  },
  {
    index: "03",
    title: "Project Gamma",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tech: ["Rust", "WebAssembly"],
    href: "#",
  },
  {
    index: "04",
    title: "Project Delta",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    tech: ["Nmap", "Burp Suite", "Bash"],
    href: "#",
  },
  {
    index: "05",
    title: "Project Epsilon",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
    tech: ["React", "Node.js"],
    href: "#",
  },
];

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal
      delay={delay}
      className={project.featured ? "md:col-span-2" : ""}
    >
      <a href={project.href} className="project-card group">
        <div className="flex items-start justify-between mb-6">
          <span className="font-mono text-[0.7rem] tracking-[0.2em] text-white/25">
            {project.index}
          </span>
          <span className="project-arrow" aria-hidden>
            ↗
          </span>
        </div>

        <h3 className="text-[clamp(1.3rem,2vw,1.7rem)] font-bold tracking-[-0.025em] text-text-primary mb-3 leading-[1.15]">
          {project.title}
        </h3>

        <p className="text-[0.88rem] leading-[1.75] text-slate-400/85 mb-7 max-w-[52ch]">
          {project.description}
        </p>

        <div className="flex gap-2 flex-wrap mt-auto">
          {project.tech.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </a>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="px-[16vw] pb-[14vh]">
      <Reveal>
        <p className="text-[0.72rem] font-semibold tracking-[0.24em] text-accent uppercase mb-3">
          Selected Work
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="text-[clamp(1.6rem,3vw,2.6rem)] font-bold tracking-[-0.03em] text-text-primary mb-12 leading-[1.1]">
          Lorem ipsum projects.{" "}
          <span className="text-text-secondary font-normal">
            Dolor sit amet.
          </span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} delay={0.06 * (i % 3)} />
        ))}
      </div>
    </section>
  );
}
