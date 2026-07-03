export default function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-screen items-start px-[16vw] pt-[8vh]"
    >
      <div className="pt-[8vh]">
        <p className="fade-up [animation-delay:0.1s] mb-[1.8rem] text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-accent">
          Portfolio — 2026
        </p>

        <h1 className="fade-up [animation-delay:0.25s] mb-[0.2rem] text-[clamp(2rem,4.5vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-text-primary">
          Software developer and
          <br />
          cybersecurity engineer
        </h1>

        <span className="fade-up [animation-delay:0.4s] mb-[2.4rem] block text-[clamp(2rem,4.5vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-accent">
          Daniel Černý
        </span>

        <p className="fade-up [animation-delay:0.55s] mb-[2.8rem] max-w-[44ch] text-[clamp(1rem,1.4vw,1.25rem)] font-normal leading-[1.7] text-text-secondary">
          Building secure, high-performance software — from full-stack
          web apps to network infrastructure and penetration testing.
          <br />
          <span className="text-[0.82em] text-text-primary opacity-[0.45]">
            Prague, CZ
          </span>
        </p>

        <div className="fade-up [animation-delay:0.7s] flex flex-wrap gap-5">
          <a href="#projects" className="btn btn--primary">
            Projects
          </a>
          <a href="#contact" className="btn btn--secondary">
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
