import { profile } from "@/lib/content";
import { IconArrow, IconGitHub } from "./Icons";

export default function Hero() {
  return (
    <section id="hero" className="hero">

      <div className="hero-content shell flex flex-col items-center text-center">
        <h1 className="fade-up [animation-delay:0.3s] text-[clamp(2.8rem,8.4vw,6.6rem)] font-bold leading-[1] tracking-[-0.045em] text-text-primary">
          {profile.name}
        </h1>

        <p className="hero-role fade-up [animation-delay:0.42s] mt-3 text-[clamp(1.25rem,2.6vw,2rem)] font-medium tracking-[-0.025em]">
          {profile.role}
        </p>

        <p className="lede fade-up [animation-delay:0.55s] mt-8 max-w-[46ch] text-[clamp(1.1rem,1.4vw,1.25rem)]">
          I&apos;m a developer from Prague. I build web apps in Next.js and
          TypeScript, backends in Python and FastAPI, and smaller servers and
          terminal tools in Go. The rest of my time goes to cybersecurity and
          AI competitions.
        </p>

        <div className="fade-up [animation-delay:0.68s] mt-10 flex flex-wrap justify-center gap-4">
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

        <div className="status-bar fade-up [animation-delay:0.82s] mt-12 justify-center">
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
