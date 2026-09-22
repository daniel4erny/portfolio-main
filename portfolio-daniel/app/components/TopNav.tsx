"use client";

import { useEffect, useRef, useState } from "react";
import { nav, profile } from "@/lib/content";

export default function TopNav() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // the hero is tracked too, so nothing is highlighted while you're on it
    const ids = ["#hero", ...nav.map((n) => n.href)];
    const sections = ids
      .map((id) => document.querySelector<HTMLElement>(id))
      .filter((el): el is HTMLElement => el !== null);

    function sync() {
      const line = window.innerHeight * 0.4;
      let current: HTMLElement | null = null;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= line) current = el;
      }
      const id = current ? `#${current.id}` : null;
      setActive(id === "#hero" ? null : id);
      setScrolled(window.scrollY > 24);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      barRef.current?.style.setProperty(
        "--p",
        max > 0 ? (window.scrollY / max).toFixed(4) : "0"
      );
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        sync();
        ticking = false;
      });
    }

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header ref={barRef} className="topbar" data-scrolled={scrolled}>
      <div className="topbar-inner shell">
        <a href="#hero" className="topbar-brand">
          {profile.name}
        </a>

        <nav className="topbar-links" aria-label="Sections">
          {nav.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="topbar-link"
              data-active={active === href}
              aria-current={active === href ? "true" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      <span className="topbar-progress" aria-hidden />
    </header>
  );
}
