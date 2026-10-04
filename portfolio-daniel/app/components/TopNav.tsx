"use client";

import { useEffect, useState } from "react";
import { nav, profile } from "@/lib/content";

export default function TopNav() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

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
    <header className="topbar" data-scrolled={scrolled}>
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
    </header>
  );
}
