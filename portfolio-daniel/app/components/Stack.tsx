"use client";

import Tilt from "react-parallax-tilt";
import Reveal from "./Reveal";
import { stack, type StackIcon } from "@/lib/content";
import {
  IconFastAPI,
  IconGo,
  IconLinux,
  IconNext,
  IconPython,
  IconTS,
} from "./Icons";

const ICONS: Record<StackIcon, (p: { width: number; height: number }) => React.JSX.Element> = {
  next: IconNext,
  ts: IconTS,
  python: IconPython,
  fastapi: IconFastAPI,
  go: IconGo,
  linux: IconLinux,
};

export default function Stack() {
  return (
    <section id="stack" className="section shell">
      <Reveal>
        <p className="eyebrow mb-5">Stack</p>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="h2 max-w-[26ch]">
          Six things I reach for.{" "}
          <span className="muted">Every one of them, most weeks.</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <Reveal key={item.name} delay={0.05 + (i % 3) * 0.07}>
              <Tilt
                tiltMaxAngleX={7}
                tiltMaxAngleY={7}
                glareEnable
                glareMaxOpacity={0.12}
                glareColor="#7dd3fc"
                glarePosition="all"
                glareBorderRadius="18px"
                scale={1.015}
                transitionSpeed={1400}
                perspective={1100}
                className="h-full rounded-[18px]"
              >
                <article className="panel stack-card">
                  <span className="stack-icon">
                    <Icon width={20} height={20} />
                  </span>

                  <p className="mono mb-1.5 text-[0.62rem] uppercase tracking-[0.18em] text-text-muted">
                    {item.kicker}
                  </p>

                  <h3 className="mb-3 text-[1.18rem] font-bold tracking-[-0.02em] text-text-primary">
                    {item.name}
                  </h3>

                  <p className="mb-5 text-[0.86rem] leading-[1.75] text-text-secondary">
                    {item.body}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {item.chips.map((c) => (
                      <span key={c} className="chip">
                        {c}
                      </span>
                    ))}
                  </div>
                </article>
              </Tilt>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
