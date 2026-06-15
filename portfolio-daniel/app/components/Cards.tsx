"use client";

import Tilt from "react-parallax-tilt";

type Card = {
  title: string;
  tag: string;
  description: string;
};

const CARDS: Card[] = [
  {
    title: "Lorem Ipsum",
    tag: "Placeholder",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Dolor Sit",
    tag: "Placeholder",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "Consectetur",
    tag: "Placeholder",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

function TiltCard({ card, index }: { card: Card; index: number }) {
  return (
    <div
      className="fade-up grow shrink basis-[280px]"
      style={{ animationDelay: `${0.15 + index * 0.12}s` }}
    >
      <Tilt
        tiltMaxAngleX={14}
        tiltMaxAngleY={14}
        glareEnable
        glareMaxOpacity={0.22}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="20px"
        scale={1.05}
        transitionSpeed={1500}
        perspective={900}
        className="h-full rounded-[20px]"
      >
        <div className="relative h-full rounded-[20px] border border-white/10 bg-[linear-gradient(145deg,#0f1520_0%,#0a0e17_60%,#060910_100%)] p-[2rem_1.75rem_1.75rem] shadow-[0_4px_32px_rgba(0,0,0,0.4)] overflow-hidden">
          <span className="inline-block text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-white/25 border border-white/10 rounded-full px-3 py-[0.3rem] mb-6">
            {card.tag}
          </span>

          <h3 className="text-[clamp(1.4rem,2.2vw,1.75rem)] font-bold tracking-[-0.025em] text-[#e5e7eb] mb-4 leading-[1.15]">
            {card.title}
          </h3>

          <div className="h-px bg-white/5 mb-4" />

          <p className="text-[0.88rem] leading-[1.75] text-slate-400/85">
            {card.description}
          </p>
        </div>
      </Tilt>
    </div>
  );
}

export default function Cards() {
  return (
    <section id="skills" className="px-[16vw] pb-[10vh]">
      <p
        className="fade-up text-[0.72rem] font-semibold tracking-[0.24em] text-accent uppercase mb-3"
        style={{ animationDelay: "0.1s" }}
      >
        Lorem Ipsum
      </p>

      <h2
        className="fade-up text-[clamp(1.6rem,3vw,2.6rem)] font-bold tracking-[-0.03em] text-text-primary mb-12 leading-[1.1]"
        style={{ animationDelay: "0.2s" }}
      >
        Lorem ipsum dolor.{" "}
        <span className="text-text-secondary font-normal">Sit amet.</span>
      </h2>

      <div className="flex gap-6 flex-wrap items-stretch">
        {CARDS.map((card, i) => (
          <TiltCard key={card.title} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}
