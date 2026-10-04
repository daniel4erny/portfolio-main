import { profile } from "@/lib/content";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-content shell">
        <h1 className="hero-name">{profile.name}</h1>

        <p className="hero-intro">
          Developer in Prague. I build web apps in Next.js and TypeScript,
          backends in Python and Go, and spend the rest of my time on
          cybersecurity and AI competitions.
        </p>

        <p className="hero-links">
          <a href="#projects">Projects</a>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
        </p>
      </div>
    </section>
  );
}
