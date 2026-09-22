import type { SVGProps } from "react";

/**
 * One drawn-from-scratch glyph set rather than six mismatched brand SVGs —
 * same 24px box, same 1.5 stroke, so the stack grid reads as a single system.
 */

type Icon = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;

const base = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Next.js — a circle cut by the ascending stroke of the wordmark's "N". */
export const IconNext: Icon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9 16V8l7.2 9.2" />
    <path d="M15 8v4" />
  </svg>
);

/** TypeScript / JavaScript — the angle brackets every JS file lives between. */
export const IconTS: Icon = (p) => (
  <svg {...base} {...p}>
    <path d="M8.5 8.5 4.5 12l4 3.5" />
    <path d="M15.5 8.5 19.5 12l-4 3.5" />
    <path d="M13.2 6.5 10.8 17.5" />
  </svg>
);

/** Python — two interlocking halves, the shape at the heart of the logo. */
export const IconPython: Icon = (p) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="11" height="11" rx="3" />
    <rect x="9.5" y="9.5" width="11" height="11" rx="3" />
    <path d="M7 7h.01M17 17h.01" strokeWidth="2.2" />
  </svg>
);

/** FastAPI — the bolt, straight off the project's own mark. */
export const IconFastAPI: Icon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12.8 6.5 8.5 12.8h3.2l-.5 4.7 4.3-6.3h-3.2z" />
  </svg>
);

/** Go — the speed lines trailing the gopher's wordmark. */
export const IconGo: Icon = (p) => (
  <svg {...base} {...p}>
    <path d="M2.5 9h4.5M1.5 12h5.5M3.5 15h3.5" />
    <path d="M17 8.5a4 4 0 1 0 3.6 5.6H17" />
    <circle cx="11.5" cy="12" r="1.2" />
  </svg>
);

/** Linux — the shell that all of it actually runs in. */
export const IconLinux: Icon = (p) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="M7 10l2.5 2.2L7 14.4" />
    <path d="M12.5 15h4.5" />
  </svg>
);

/* ── UI glyphs ─────────────────────────────────────────── */

export const IconArrow: Icon = (p) => (
  <svg {...base} width={16} height={16} {...p}>
    <path d="M7 17 17 7" />
    <path d="M8.5 7H17v8.5" />
  </svg>
);

export const IconGitHub: Icon = (p) => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 1.8a10.2 10.2 0 0 0-3.23 19.88c.51.1.7-.22.7-.49l-.01-1.9c-2.84.62-3.44-1.2-3.44-1.2-.47-1.18-1.14-1.5-1.14-1.5-.93-.63.07-.62.07-.62 1.03.07 1.57 1.06 1.57 1.06.91 1.57 2.4 1.12 2.99.85.09-.66.36-1.11.65-1.37-2.27-.26-4.65-1.13-4.65-5.04 0-1.11.4-2.02 1.05-2.74-.11-.26-.46-1.3.1-2.7 0 0 .86-.28 2.8 1.05a9.7 9.7 0 0 1 5.1 0c1.94-1.33 2.8-1.05 2.8-1.05.56 1.4.21 2.44.1 2.7.65.72 1.05 1.63 1.05 2.74 0 3.92-2.39 4.78-4.66 5.03.37.32.69.94.69 1.9l-.01 2.81c0 .27.19.6.71.49A10.2 10.2 0 0 0 12 1.8Z" />
  </svg>
);

export const IconMail: Icon = (p) => (
  <svg {...base} width={16} height={16} {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const IconGlobe: Icon = (p) => (
  <svg {...base} width={16} height={16} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z" />
  </svg>
);

export const IconTrophy: Icon = (p) => (
  <svg {...base} width={16} height={16} {...p}>
    <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
    <path d="M7 6H4.5v1.5A3.5 3.5 0 0 0 8 11M17 6h2.5v1.5A3.5 3.5 0 0 1 16 11" />
    <path d="M12 14v3.5M9 20h6" />
  </svg>
);
