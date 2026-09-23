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

      <div className="mt-12 grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <Reveal key={item.name} delay={0.04 + (i % 3) * 0.06} className="h-full">
              <article className="stack-cell">
                <header className="mb-5 flex items-center gap-3">
                  <span className="stack-icon">
                    <Icon width={19} height={19} />
                  </span>
                  <div>
                    <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em] text-text-primary">
                      {item.name}
                    </h3>
                    <p className="mono text-[0.62rem] uppercase tracking-[0.16em] text-text-muted">
                      {item.kicker}
                    </p>
                  </div>
                </header>

                <p className="mb-6 text-[0.86rem] leading-[1.75] text-text-secondary">
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
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
