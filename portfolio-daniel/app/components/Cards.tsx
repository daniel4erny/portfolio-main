"use client";

import { useRef, useState } from "react";

type Card = {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  glow: string;
  border: string;
  tag: string;
};

function PythonIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 56, height: 56 }}>
      <defs>
        <linearGradient id="py1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4B8BBE" />
          <stop offset="100%" stopColor="#306998" />
        </linearGradient>
        <linearGradient id="py2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFE873" />
          <stop offset="100%" stopColor="#FFD43B" />
        </linearGradient>
      </defs>
      <path
        d="M31.8 4C20.3 4 21.1 9 21.1 9l.02 5.2h11v1.6H16.4S10 15.1 10 26.7c0 11.6 6.4 11.2 6.4 11.2h3.8v-5.4s-.2-6.4 6.3-6.4h10.9s6.1.1 6.1-5.9V9.8S44.5 4 31.8 4zm-6.1 3.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"
        fill="url(#py1)"
      />
      <path
        d="M32.2 60c11.5 0 10.7-5 10.7-5l-.02-5.2h-11v-1.6h15.7S54 49 54 37.3c0-11.6-6.4-11.2-6.4-11.2h-3.8v5.4s.2 6.4-6.3 6.4H26.6s-6.1-.1-6.1 5.9v10.4S19.5 60 32.2 60zm6.1-3.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
        fill="url(#py2)"
      />
    </svg>
  );
}

function ReactIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 56, height: 56 }}>
      <defs>
        <linearGradient id="re1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00D8FF" />
          <stop offset="100%" stopColor="#61DAFB" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="32" rx="5" ry="5" fill="url(#re1)" />
      <ellipse cx="32" cy="32" rx="28" ry="10.5" stroke="url(#re1)" strokeWidth="2.5" fill="none" />
      <ellipse cx="32" cy="32" rx="28" ry="10.5" stroke="url(#re1)" strokeWidth="2.5" fill="none" transform="rotate(60 32 32)" />
      <ellipse cx="32" cy="32" rx="28" ry="10.5" stroke="url(#re1)" strokeWidth="2.5" fill="none" transform="rotate(120 32 32)" />
    </svg>
  );
}

function AnonIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 56, height: 56 }}>
      <defs>
        <linearGradient id="an1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="an2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      {/* Head */}
      <ellipse cx="32" cy="26" rx="16" ry="19" fill="url(#an1)" />
      {/* Forehead bump */}
      <ellipse cx="32" cy="12" rx="9" ry="5" fill="url(#an1)" />
      {/* Eyes - classic Guy Fawkes */}
      <ellipse cx="24" cy="25" rx="4.5" ry="3.5" fill="url(#an2)" />
      <ellipse cx="40" cy="25" rx="4.5" ry="3.5" fill="url(#an2)" />
      {/* Eye highlights */}
      <ellipse cx="25.5" cy="23.5" rx="1.2" ry="1" fill="white" opacity="0.6" />
      <ellipse cx="41.5" cy="23.5" rx="1.2" ry="1" fill="white" opacity="0.6" />
      {/* Rosy cheeks */}
      <ellipse cx="19" cy="30" rx="3.5" ry="2" fill="#f87171" opacity="0.5" />
      <ellipse cx="45" cy="30" rx="3.5" ry="2" fill="#f87171" opacity="0.5" />
      {/* Nose */}
      <ellipse cx="32" cy="32" rx="2" ry="1.5" fill="#94a3b8" opacity="0.7" />
      {/* Smile - curled ends */}
      <path d="M23 37 Q32 43 41 37" stroke="#475569" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M23 37 Q20 33 22 31" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M41 37 Q44 33 42 31" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Chin pointed */}
      <path d="M22 41 Q32 54 42 41" fill="url(#an1)" />
      {/* Mustache */}
      <path d="M26 35 Q29 33 32 35 Q35 33 38 35" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

const CARDS: Card[] = [
  {
    title: "Python",
    subtitle: "Backend & Automation",
    description:
      "Scripts, bots, data pipelines, FastAPI services. Python is the Swiss Army knife — from rapid prototyping to production-grade tooling.",
    icon: <PythonIcon />,
    glow: "rgba(59,130,246,0.35)",
    border: "rgba(59,130,246,0.45)",
    tag: "Python",
  },
  {
    title: "Web Dev",
    subtitle: "Full-Stack Engineering",
    description:
      "React, Next.js, TypeScript on the frontend. Node, APIs, databases on the back. Building things that are fast, accessible, and don't suck.",
    icon: <ReactIcon />,
    glow: "rgba(6,182,212,0.35)",
    border: "rgba(6,182,212,0.45)",
    tag: "React / Next.js",
  },
  {
    title: "Cybersecurity",
    subtitle: "Pentesting & Defense",
    description:
      "Network analysis, vulnerability assessment, CTF challenges. Understanding systems deeply enough to break them — and fix them.",
    icon: <AnonIcon />,
    glow: "rgba(168,85,247,0.35)",
    border: "rgba(168,85,247,0.45)",
    tag: "Offensive & Defensive",
  },
];

function TiltCard({ card, index }: { card: Card; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)");
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -12;
    const rotY = ((x - cx) / cx) * 12;
    setTransform(`perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const onMouseLeave = () => {
    setTransform("perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)");
    setGlowPos({ x: 50, y: 50 });
    setHovered(false);
  };

  const animDelay = `${0.15 + index * 0.12}s`;

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        animation: `fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${animDelay} both`,
        transform,
        transition: hovered ? "transform 0.08s linear" : "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
        willChange: "transform",
        position: "relative",
        borderRadius: 20,
        padding: 1,
        background: hovered
          ? `linear-gradient(135deg, ${card.border}, transparent 60%)`
          : `linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))`,
        cursor: "default",
        flex: "1 1 280px",
        maxWidth: 360,
        boxShadow: hovered
          ? `0 0 60px 0 ${card.glow}, 0 20px 60px rgba(0,0,0,0.5)`
          : "0 4px 32px rgba(0,0,0,0.4)",
      }}
    >
      {/* Animated border shimmer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 20,
          border: `1px solid ${hovered ? card.border : "rgba(255,255,255,0.08)"}`,
          transition: "border-color 0.3s",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Inner card */}
      <div
        style={{
          position: "relative",
          borderRadius: 19,
          background: "linear-gradient(145deg, #0f1520 0%, #0a0e17 60%, #060910 100%)",
          padding: "2rem 1.75rem 1.75rem",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Moving spotlight */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle 200px at ${glowPos.x}% ${glowPos.y}%, ${card.glow}, transparent 70%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s",
            pointerEvents: "none",
          }}
        />

        {/* Top row: icon + tag */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <div
            style={{
              padding: "0.75rem",
              borderRadius: 14,
              background: hovered ? `${card.glow}` : "rgba(255,255,255,0.04)",
              border: `1px solid ${hovered ? card.border : "rgba(255,255,255,0.06)"}`,
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {card.icon}
          </div>

          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: hovered ? card.border.replace("0.45", "0.9") : "rgba(255,255,255,0.25)",
              border: `1px solid ${hovered ? card.border : "rgba(255,255,255,0.08)"}`,
              borderRadius: 40,
              padding: "0.3rem 0.75rem",
              transition: "all 0.3s",
              whiteSpace: "nowrap",
            }}
          >
            {card.tag}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "clamp(1.4rem, 2.2vw, 1.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            color: "#e5e7eb",
            marginBottom: "0.35rem",
            lineHeight: 1.15,
          }}
        >
          {card.title}
        </h3>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: hovered ? card.border.replace("0.45", "0.85") : "rgba(255,255,255,0.3)",
            marginBottom: "1rem",
            transition: "color 0.3s",
          }}
        >
          {card.subtitle}
        </p>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: hovered
              ? `linear-gradient(90deg, ${card.border}, transparent)`
              : "rgba(255,255,255,0.05)",
            marginBottom: "1rem",
            transition: "background 0.3s",
          }}
        />

        {/* Description */}
        <p
          style={{
            fontSize: "0.88rem",
            lineHeight: 1.75,
            color: "rgba(148,163,184,0.85)",
          }}
        >
          {card.description}
        </p>

        {/* Bottom arrow indicator */}
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-8px)",
            transition: "all 0.3s",
            color: card.border.replace("0.45", "0.9"),
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <span>Explore</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Cards() {
  return (
    <section
      id="skills"
      style={{
        padding: "0 8vw 10vh",
      }}
    >
      {/* Section label */}
      <p
        style={{
          animation: "fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both",
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.24em",
          color: "var(--accent)",
          textTransform: "uppercase",
          marginBottom: "0.75rem",
        }}
      >
        What I do
      </p>

      <h2
        style={{
          animation: "fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both",
          fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "var(--text-primary)",
          marginBottom: "3rem",
          lineHeight: 1.1,
        }}
      >
        Three domains.{" "}
        <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>One engineer.</span>
      </h2>

      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
          alignItems: "stretch",
        }}
      >
        {CARDS.map((card, i) => (
          <TiltCard key={card.title} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}
