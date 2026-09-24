/**
 * Every editable string on the site lives here. Components read from it, so
 * updating a project or adding a result never means touching layout code.
 */

export const profile = {
  name: "Daniel Černý",
  role: "Software developer & cybersecurity",
  location: "Prague, CZ",
  email: "daniel@djt-group.com",
  github: "https://github.com/daniel4erny",
  githubHandle: "daniel4erny",
  available: "Open to internships and freelance work",
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
  /** brand colour the mark lights up in on hover */
  color: string;
  body: string;
  chips: string[];
};

export const stack: StackItem[] = [
  {
    icon: "next",
    name: "Next.js",
    kicker: "Front end",
    color: "#ffffff",
    body: "App Router, server components and route handlers. This site runs on it, and so does the forchan front end.",
    chips: ["App Router", "React 19", "Vercel"],
  },
  {
    icon: "ts",
    name: "TypeScript / JS",
    kicker: "Default language",
    color: "#3178c6",
    body: "Strict mode everywhere. If a type can describe it, I'd rather write the type than the comment.",
    chips: ["strict", "ESLint", "Tailwind"],
  },
  {
    icon: "python",
    name: "Python",
    kicker: "Scripts & tooling",
    color: "#ffd43b",
    body: "Automation, data processing and most of what I write during cybersecurity competitions. It's what I open first when I'm still figuring the problem out.",
    chips: ["asyncio", "Pydantic", "scripting"],
  },
  {
    icon: "fastapi",
    name: "FastAPI",
    kicker: "APIs",
    color: "#05998b",
    body: "Async Python services with Pydantic models and OpenAPI docs for free. forchan's posting, auth and upload endpoints are FastAPI.",
    chips: ["async", "OpenAPI", "Supabase"],
  },
  {
    icon: "go",
    name: "Go",
    kicker: "Servers & CLIs",
    color: "#00add8",
    body: "Goroutines and channels make concurrency easy to follow, and the result is one static binary. gowlan, minesweeper-go and redis-golang are all written in Go.",
    chips: ["WebSockets", "TUI", "net/http"],
  },
  {
    icon: "linux",
    name: "Linux",
    kicker: "Daily driver",
    color: "#fcc624",
    body: "Arch on my own machine: shell, systemd, networking, Docker. I package my own stuff too, minesweeper-go is on the AUR.",
    chips: ["Arch", "zsh", "Docker"],
  },
];

export type ProjectLink = { label: string; href: string; kind: "live" | "code" };

export type ProjectImage = { src: string; alt: string };

export type Project = {
  index: string;
  title: string;
  kicker: string;
  status?: string;
  body: string;
  tech: string[];
  primary: string;
  links: ProjectLink[];
  /** featured projects get a screenshot and the large cards at the top */
  featured?: boolean;
  image?: ProjectImage;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "TEP",
    kicker: "Training Evaluation Platform",
    status: "Live",
    body: "Teams rehearse hard moments here, like a client pitch, a command decision or an emergency call, in web and VR scenarios built from their own data. AI characters play the other side. Every session is scored on clarity, confidence and decision quality, and the scores end up in team dashboards.",
    tech: ["Next.js", "TypeScript", "AI scenarios", "Analytics"],
    primary: "https://tep.training",
    links: [{ label: "tep.training", href: "https://tep.training", kind: "live" }],
    featured: true,
    image: { src: "/projects/tep.jpg", alt: "TEP landing page: \"Training that actually changes behaviour\"" },
  },
  {
    index: "02",
    title: "forchan",
    kicker: "Imageboard",
    status: "Live",
    body: "Boards, threads, replies, image uploads, and token-based identity instead of accounts. The Next.js front end talks to a FastAPI service mounted at /api/py, Supabase handles Postgres and file storage, and all of it deploys as one Vercel project.",
    tech: ["Next.js", "TypeScript", "Python", "FastAPI", "Supabase"],
    primary: "https://forchan.vercel.app",
    links: [
      { label: "forchan.vercel.app", href: "https://forchan.vercel.app", kind: "live" },
      { label: "Source", href: "https://github.com/daniel4erny/forchan", kind: "code" },
    ],
    featured: true,
    image: { src: "/projects/forchan.jpg", alt: "forchan home page listing the technology, sport and games boards" },
  },
  {
    index: "03",
    title: "DOOM Museum",
    kicker: "24h hackathon, 3rd place",
    status: "Live",
    body: "A bilingual (EN/CZ) site about the DOOM series, built by our team of three from an empty repo at the GJS hackathon. It has a weapons catalogue, a games timeline, an archive of sounds, 3D models and artwork, and a /play page that runs DOOM (1993) in the browser through DOS emulation.",
    tech: ["Next.js", "TypeScript", "DOS emulation", "EN / CZ"],
    primary: "https://doom.djt-group.com",
    links: [{ label: "doom.djt-group.com", href: "https://doom.djt-group.com", kind: "live" }],
    featured: true,
    image: { src: "/projects/doom.jpg", alt: "DOOM Museum landing page with the Doom Slayer" },
  },
  {
    index: "04",
    title: "gowlan",
    kicker: "LAN chat over WebSockets",
    body: "A chat server in Go. One hub goroutine owns every connection and broadcasts over channels, so there isn't a single mutex. Ping/pong with read deadlines drops dead clients. The client is a Bubble Tea TUI and the server ships as a Docker image.",
    tech: ["Go", "WebSockets", "gorilla/websocket", "Bubble Tea", "Docker"],
    primary: "https://github.com/daniel4erny/gowlan",
    links: [{ label: "Source", href: "https://github.com/daniel4erny/gowlan", kind: "code" }],
  },
  {
    index: "05",
    title: "minesweeper-go",
    kicker: "Minesweeper in the terminal",
    body: "Keyboard-only Minesweeper on tcell. Three difficulty presets and custom board sizes, flood-fill reveal, flags and a timer. It's on the AUR and released under the Unlicense.",
    tech: ["Go", "tcell", "TUI", "AUR"],
    primary: "https://github.com/daniel4erny/minesweeper-go",
    links: [
      { label: "Source", href: "https://github.com/daniel4erny/minesweeper-go", kind: "code" },
    ],
  },
  {
    index: "06",
    title: "redis-golang",
    kicker: "Key-value server on the Redis protocol",
    body: "A key-value server in Go that speaks Redis's RESP wire format. A hand-written parser reads the length-prefixed commands and handles PING, GET, SET and DEL. Each connection gets its own goroutine, and the store sits behind a read-write mutex so reads can run in parallel. Every packet is logged on one line with CR/LF escaped.",
    tech: ["Go", "TCP", "RESP", "sync.RWMutex", "charm/log"],
    primary: "https://github.com/daniel4erny/redis-golang",
    links: [
      { label: "Source", href: "https://github.com/daniel4erny/redis-golang", kind: "code" },
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
  links?: { label: string; href: string }[];
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
      "The first year of the Czech AI Olympiad, which qualifies for the International Olympiad in AI. You train models on real data and then defend the solution to a technical jury.",
    links: [{ label: "aiolympiada.cz", href: "https://www.aiolympiada.cz/" }],
  },
  {
    year: "2026",
    title: "GJS Hackathon",
    org: "Gymnázium Jaroslava Seiferta, Prague",
    places: [{ place: "3", ordinal: "rd", note: "of 18 teams" }],
    detail:
      "24 hours, 18 teams of three from around the country, and a pitch at the end to a jury of engineers from software companies. Our team built DOOM Museum, and it's still online.",
    links: [
      { label: "doom.djt-group.com", href: "https://doom.djt-group.com" },
      { label: "gymjs.cz", href: "https://www.gymjs.cz/2026/03/14/hackathon-13-14-3/" },
    ],
  },
  {
    year: "2025",
    title: "Kybersoutěž",
    org: "AFCEA — national cybersecurity competition",
    places: [{ place: "21", ordinal: "st", note: "overall" }],
    detail:
      "The national cybersecurity competition for secondary schools, with NÚKIB as the expert guarantor.",
    links: [{ label: "kybersoutez.cz", href: "https://www.kybersoutez.cz/" }],
  },
  {
    year: "2024",
    title: "Kybersoutěž",
    org: "AFCEA — junior category",
    places: [{ place: "2", ordinal: "nd", note: "junior category" }],
    detail:
      "National final, junior category. Tasks covered cryptography, network forensics, web exploitation and security theory.",
    links: [{ label: "kybersoutez.cz", href: "https://www.kybersoutez.cz/" }],
  },
];

export type Certificate = {
  course: string;
  series: string;
  issuer: string;
  /** picks the card's logo and colours */
  lang: "python" | "java";
  /** the issuer's validation code, also the last segment of href */
  code: string;
  href: string;
};

/** Each href is the issuer's own validation page, which serves the certificate. */
export const certificates: Certificate[] = [
  {
    course: "Advanced Course in Programming",
    series: "Python Programming MOOC",
    issuer: "University of Helsinki",
    lang: "python",
    code: "hqr25qn2tut",
    href: "https://certificates.mooc.fi/validate/hqr25qn2tut",
  },
  {
    course: "Java Programming I",
    series: "Java Programming MOOC",
    issuer: "University of Helsinki",
    lang: "java",
    code: "wpwwtiu5jv",
    href: "https://certificates.mooc.fi/validate/wpwwtiu5jv",
  },
  {
    course: "Introduction to Programming",
    series: "Python Programming MOOC",
    issuer: "University of Helsinki",
    lang: "python",
    code: "a3wwfcmf03f",
    href: "https://certificates.mooc.fi/validate/a3wwfcmf03f",
  },
];

/**
 * The brand mark handles "back to top", so the hero needs no link of its own.
 * Keep these in page order: TopNav highlights the last one scrolled past.
 */
export const nav = [
  { label: "work", href: "#projects" },
  { label: "results", href: "#awards" },
  { label: "stack", href: "#stack" },
  { label: "contact", href: "#contact" },
];
