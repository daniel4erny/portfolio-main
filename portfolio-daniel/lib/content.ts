/**
 * Every editable string on the site lives here. Components read from it, so
 * updating a project or adding a result never means touching layout code.
 */

export const profile = {
  name: "Daniel Černý",
  role: ["Software developer", "& cybersecurity engineer"],
  location: "Prague, CZ",
  email: "daniel@djt-group.com",
  github: "https://github.com/daniel4erny",
  githubHandle: "daniel4erny",
  available: "Open to internships & freelance",
} as const;

export type StackIcon =
  | "next"
  | "ts"
  | "python"
  | "fastapi"
  | "go"
  | "linux";

export type StackItem = {
  icon: StackIcon;
  name: string;
  kicker: string;
  body: string;
  chips: string[];
};

export const stack: StackItem[] = [
  {
    icon: "next",
    name: "Next.js",
    kicker: "Front of house",
    body: "App Router, server components and route handlers. It's what this site runs on and what forchan's whole front end is built from.",
    chips: ["App Router", "React 19", "Vercel"],
  },
  {
    icon: "ts",
    name: "TypeScript / JS",
    kicker: "The default",
    body: "Strict mode end to end. Types are where I put the design decisions that comments would otherwise have to carry.",
    chips: ["strict", "ESLint", "Tailwind"],
  },
  {
    icon: "python",
    name: "Python",
    kicker: "Glue & tooling",
    body: "Automation, data wrangling and the scripts I write during cyber competitions — the language I reach for when the problem is still fuzzy.",
    chips: ["asyncio", "Pydantic", "scripting"],
  },
  {
    icon: "fastapi",
    name: "FastAPI",
    kicker: "APIs",
    body: "Async Python services with typed request models and generated OpenAPI docs. Powers forchan's posting, auth and upload endpoints.",
    chips: ["async", "OpenAPI", "Supabase"],
  },
  {
    icon: "go",
    name: "Go",
    kicker: "Systems",
    body: "Goroutines and channels for concurrency I can actually reason about, compiled down to a single static binary. Both gowlan and minesweeper-go are pure Go.",
    chips: ["WebSockets", "TUI", "net/http"],
  },
  {
    icon: "linux",
    name: "Linux",
    kicker: "Where it all runs",
    body: "Arch-based daily driver. Shell, systemd, networking and packaging — minesweeper-go ships to the AUR because that's where I'd want to install it from.",
    chips: ["Arch", "zsh", "Docker"],
  },
];

export type ProjectLink = { label: string; href: string; kind: "live" | "code" };

export type Project = {
  index: string;
  title: string;
  kicker: string;
  status?: string;
  body: string;
  tech: string[];
  primary: string;
  links: ProjectLink[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "TEP",
    kicker: "Training Evaluation Platform",
    status: "Live",
    body: "An AI-driven training platform where teams rehearse high-stakes moments — a client pitch, a command decision, an emergency call — inside web and VR scenarios built on their own data. AI characters hold up the pressure; afterwards the session is scored on clarity, confidence and decision quality, and the results roll up into team dashboards.",
    tech: ["Next.js", "TypeScript", "AI scenarios", "Analytics"],
    primary: "https://tep.training",
    links: [{ label: "tep.training", href: "https://tep.training", kind: "live" }],
    featured: true,
  },
  {
    index: "02",
    title: "forchan",
    kicker: "Imageboard, from scratch",
    status: "Live",
    body: "A working imageboard clone: boards, threads, replies, image uploads and token-based identity with no accounts to manage. A Next.js App Router front end talks to a FastAPI service mounted at /api/py, with Supabase behind it for Postgres and object storage — the whole thing deployed as one Vercel project.",
    tech: ["Next.js", "TypeScript", "Python", "FastAPI", "Supabase"],
    primary: "https://forchan.vercel.app",
    links: [
      { label: "forchan.vercel.app", href: "https://forchan.vercel.app", kind: "live" },
      { label: "Source", href: "https://github.com/daniel4erny/forchan", kind: "code" },
    ],
    featured: true,
  },
  {
    index: "03",
    title: "gowlan",
    kicker: "Live chat over WebSockets",
    body: "A LAN chat server in pure Go. A hub goroutine owns every connection and fans messages out over channels, so registration, removal and broadcast never touch a mutex; ping/pong keepalives with read deadlines drop dead clients on their own. The client is a Bubble Tea TUI, the server ships as a Docker image.",
    tech: ["Go", "WebSockets", "gorilla/websocket", "Bubble Tea", "Docker"],
    primary: "https://github.com/daniel4erny/gowlan",
    links: [{ label: "Source", href: "https://github.com/daniel4erny/gowlan", kind: "code" }],
  },
  {
    index: "04",
    title: "minesweeper-go",
    kicker: "Minesweeper in the terminal",
    body: "Minesweeper rebuilt on tcell, entirely keyboard-driven. Beginner, normal and expert presets plus custom boards, flood-fill reveal on empty cells, flagging, win detection and a live timer. Packaged for Arch Linux on the AUR and released into the public domain under the Unlicense.",
    tech: ["Go", "tcell", "TUI", "AUR"],
    primary: "https://github.com/daniel4erny/minesweeper-go",
    links: [
      { label: "Source", href: "https://github.com/daniel4erny/minesweeper-go", kind: "code" },
    ],
  },
];

export type Placement = { place: string; ordinal: string; note: string };

export type Award = {
  year: string;
  title: string;
  org: string;
  places: Placement[];
  detail: string;
  href?: string;
};

export const awards: Award[] = [
  {
    year: "2026",
    title: "Česká AI Olympiáda",
    org: "nvias — Czech AI Olympiad",
    places: [
      { place: "2", ordinal: "nd", note: "regional round" },
      { place: "7", ordinal: "th", note: "national final" },
    ],
    detail:
      "Second in the regional round and seventh nationally in the first year of the Czech AI Olympiad — training models on real data and defending the solution in front of a technical jury. It is the national qualifier for the International Olympiad in AI.",
    href: "https://www.aiolympiada.cz/",
  },
  {
    year: "2026",
    title: "GJS Hackathon",
    org: "Gymnázium Jaroslava Seiferta, Prague",
    places: [{ place: "3", ordinal: "rd", note: "of 18 teams" }],
    detail:
      "24 hours non-stop, 18 three-person teams from across the country, one web app built from nothing and pitched at the end to a jury of engineers from software companies.",
    href: "https://www.gymjs.cz/2026/03/14/hackathon-13-14-3/",
  },
  {
    year: "2025",
    title: "Kybersoutěž",
    org: "AFCEA — national cybersecurity competition",
    places: [{ place: "21", ordinal: "st", note: "overall" }],
    detail:
      "21st in the overall national ranking of the Czech secondary-school cybersecurity competition, run with the National Cyber and Information Security Agency as expert guarantor.",
    href: "https://www.kybersoutez.cz/",
  },
  {
    year: "2024",
    title: "Kybersoutěž",
    org: "AFCEA — junior category",
    places: [{ place: "2", ordinal: "nd", note: "junior category" }],
    detail:
      "Second place nationally in the junior category: cryptography, network forensics, web exploitation and the security theory underneath all three.",
    href: "https://www.kybersoutez.cz/",
  },
];

/** The brand mark handles "back to top", so the hero needs no link of its own. */
export const nav = [
  { label: "stack", href: "#stack" },
  { label: "work", href: "#projects" },
  { label: "results", href: "#awards" },
  { label: "contact", href: "#contact" },
];
