import Reveal from "./Reveal";

const SOCIALS = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X / Twitter", href: "#" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-[16vw] pb-[16vh] pt-[4vh] text-center flex flex-col items-center"
    >
      <Reveal>
        <p className="text-[0.72rem] font-semibold tracking-[0.24em] text-accent uppercase mb-4">
          Contact
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="text-[clamp(2rem,4vw,3.6rem)] font-bold tracking-[-0.03em] text-text-primary mb-6 leading-[1.08]">
          Lorem ipsum dolor?
          <br />
          <span className="text-text-secondary font-normal">
            Sit amet, let&apos;s talk.
          </span>
        </h2>
      </Reveal>

      <Reveal delay={0.16}>
        <p className="text-[0.95rem] leading-[1.8] text-slate-400/85 max-w-[46ch] mb-10">
          Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua.
        </p>
      </Reveal>

      <Reveal delay={0.24}>
        <div className="flex gap-4 flex-wrap justify-center mb-12">
          <a href="mailto:placeholder@example.com" className="btn-outline">
            placeholder@example.com
          </a>
          <a href="#" className="btn-ghost">
            Download CV
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.32}>
        <div className="flex gap-8 justify-center">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} className="social-link">
              {s.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
