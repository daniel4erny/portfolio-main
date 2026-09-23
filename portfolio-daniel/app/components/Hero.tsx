import { profile } from "@/lib/content";
import { IconArrow, IconGitHub } from "./Icons";

export default function Hero() {
  return (
    <section id="hero" className="hero">

      <div className="hero-content shell">
        <p className="eyebrow fade-up [animation-delay:0.15s] mb-7">
          Portfolio — 2026
        </p>

        <h1 className="fade-up [animation-delay:0.3s] text-[clamp(2.1rem,6.2vw,4.6rem)] font-bold leading-[1.04] tracking-[-0.04em] text-text-primary">
          {profile.role[0]}
          <br />
          {profile.role[1]}
        </h1>

        <p className="fade-up [animation-delay:0.42s] mt-1 text-[clamp(2.1rem,6.2vw,4.6rem)] font-bold leading-[1.04] tracking-[-0.04em] text-accent">
          {profile.name}
        </p>

        <p className="lede fade-up [animation-delay:0.55s] mt-8 max-w-[46ch] text-[clamp(0.98rem,1.3vw,1.12rem)]">
          Next.js and TypeScript on the front, Python/FastAPI and Go on the
          back, Linux everywhere in between. I build things that are fast
          because of how they&apos;re put together, not because of what&apos;s
          bolted on afterwards.
        </p>

        <div className="fade-up [animation-delay:0.68s] mt-10 flex flex-wrap gap-4">
          <a href="#projects" className="btn btn--primary">
            See the work
            <IconArrow width={15} height={15} />
          </a>
          <a href="#contact" className="btn btn--secondary">
            Get in touch
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn--ghost"
          >
            <IconGitHub />
            GitHub
          </a>
        </div>

        <div className="status-bar fade-up [animation-delay:0.82s] mt-12">
          <span>{profile.available}</span>
          <span className="hidden sm:inline opacity-40">/</span>
          <span>{profile.location}</span>
          <span className="hidden sm:inline opacity-40">/</span>
          <a href={profile.github} target="_blank" rel="noreferrer noopener">
            github.com/{profile.githubHandle}
          </a>
        </div>
      </div>

    </section>
  );
}
