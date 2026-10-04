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

export type StackItem = {
  name: string;
  body: string;
};

export const stack: StackItem[] = [
  {
    name: "Next.js",
    body: "App Router, server components and route handlers. This site runs on it, and so does the forchan front end.",
  },
  {
    name: "TypeScript / JS",
    body: "Strict mode everywhere. If a type can describe it, I'd rather write the type than the comment.",
  },
  {
    name: "Python",
    body: "Automation, data processing and most of what I write during cybersecurity competitions. It's what I open first when I'm still figuring the problem out.",
  },
  {
    name: "FastAPI",
    body: "Async Python services with Pydantic models and OpenAPI docs for free. forchan's posting, auth and upload endpoints are FastAPI.",
  },
  {
    name: "Go",
    body: "Goroutines and channels make concurrency easy to follow, and the result is one static binary. gowlan, minesweeper-go and redis-golang are all written in Go, and chip8-emul compiles it to WebAssembly.",
  },
  {
    name: "Linux",
    body: "Arch on my own machine: shell, systemd, networking, Docker. I package my own stuff too, minesweeper-go is on the AUR.",
  },
];

export type ProjectLink = { label: string; href: string; kind: "live" | "code" };

export type ProjectImage = { src: string; alt: string };

export type Project = {
  title: string;
  kicker: string;
  body: string;
  tech: string[];
  primary: string;
  links: ProjectLink[];
  /** featured projects get a screenshot and a full-width row at the top */
  featured?: boolean;
  image?: ProjectImage;
};

export const projects: Project[] = [
  {
    title: "TEP",
    kicker: "Training Evaluation Platform",
    body: "Teams rehearse hard moments here, like a client pitch, a command decision or an emergency call, in web and VR scenarios built from their own data. AI characters play the other side. Every session is scored on clarity, confidence and decision quality, and the scores end up in team dashboards.",
    tech: ["Next.js", "TypeScript", "AI scenarios", "Analytics"],
    primary: "https://tep.training",
    links: [{ label: "tep.training", href: "https://tep.training", kind: "live" }],
    featured: true,
    image: { src: "/projects/tep.jpg", alt: "TEP landing page: \"Training that actually changes behaviour\"" },
  },
  {
    title: "forchan",
    kicker: "Imageboard",
    body: "Boards, threads, replies, image uploads, and token-based identity instead of accounts. The Next.js front end talks to a FastAPI service mounted at /api/py, Supabase handles Postgres and file storage, and all of it deploys as one Vercel project.",
    tech: ["Next.js", "TypeScript", "Python", "FastAPI", "Supabase"],
    primary: "https://forchan.vercel.app",
    links: [
      { label: "forchan.vercel.app", href: "https://forchan.vercel.app", kind: "live" },
      { label: "Source", href: "https://github.com/daniel4erny/forchan", kind: "code" },
    ],
  },
  {
    title: "DOOM Museum",
    kicker: "24h hackathon, 3rd place",
    body: "A bilingual (EN/CZ) site about the DOOM series, built by our team of three from an empty repo at the GJS hackathon. It has a weapons catalogue, a games timeline, an archive of sounds, 3D models and artwork, and a /play page that runs DOOM (1993) in the browser through DOS emulation.",
    tech: ["Next.js", "TypeScript", "DOS emulation", "EN / CZ"],
    primary: "https://doom.djt-group.com",
    links: [{ label: "doom.djt-group.com", href: "https://doom.djt-group.com", kind: "live" }],
    featured: true,
    image: { src: "/projects/doom.jpg", alt: "DOOM Museum landing page with the Doom Slayer" },
  },
  {
    title: "chip8-emul",
    kicker: "CHIP-8 emulator in the browser",
    body: "A CHIP-8 interpreter written in Go and compiled to WebAssembly, so it runs in the browser. The CPU executes ten instructions per 60 Hz frame and hands the 64×32 framebuffer to a canvas, while the delay and sound timers count down on their own goroutine and drive a Web Audio beep. Pong, Tetris, Space Invaders and a few other ROMs are built in, or you can load your own .ch8 file.",
    tech: ["Go", "WebAssembly", "syscall/js", "Canvas", "Web Audio"],
    primary: "https://chip8-emul.vercel.app",
    links: [
      { label: "chip8-emul.vercel.app", href: "https://chip8-emul.vercel.app", kind: "live" },
      { label: "Source", href: "https://github.com/daniel4erny/chip8-emul", kind: "code" },
    ],
  },
  // {
  //   title: "gowlan",
  //   kicker: "LAN chat over WebSockets",
  //   body: "A chat server in Go. One hub goroutine owns every connection and broadcasts over channels, so there isn't a single mutex. Ping/pong with read deadlines drops dead clients. The client is a Bubble Tea TUI and the server ships as a Docker image.",
  //   tech: ["Go", "WebSockets", "gorilla/websocket", "Bubble Tea", "Docker"],
  //   primary: "https://github.com/daniel4erny/gowlan",
  //   links: [{ label: "Source", href: "https://github.com/daniel4erny/gowlan", kind: "code" }],
  // },
  {
    title: "minesweeper-go",
    kicker: "Minesweeper in the terminal",
    body: "Keyboard-only Minesweeper on tcell. Three difficulty presets and custom board sizes, flood-fill reveal, flags and a timer. It's on the AUR and released under the Unlicense.",
    tech: ["Go", "tcell", "TUI", "AUR"],
    primary: "https://github.com/daniel4erny/minesweeper-go",
    links: [
      { label: "Source", href: "https://github.com/daniel4erny/minesweeper-go", kind: "code" },
    ],
  },
  // {
  //   title: "redis-golang",
  //   kicker: "Key-value server on the Redis protocol",
  //   body: "A key-value server in Go that speaks Redis's RESP wire format. A hand-written parser reads the length-prefixed commands and handles PING, GET, SET and DEL. Each connection gets its own goroutine, and the store sits behind a read-write mutex so reads can run in parallel. Every packet is logged on one line with CR/LF escaped.",
  //   tech: ["Go", "TCP", "RESP", "sync.RWMutex", "charm/log"],
  //   primary: "https://github.com/daniel4erny/redis-golang",
  //   links: [
  //     { label: "Source", href: "https://github.com/daniel4erny/redis-golang", kind: "code" },
  //   ],
  // },
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
    org: "Czech AI Olympiad, run by nvias",
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
    org: "National cybersecurity competition, run by AFCEA",
    places: [{ place: "21", ordinal: "st", note: "overall" }],
    detail:
      "The national cybersecurity competition for secondary schools, with NÚKIB as the expert guarantor.",
    links: [{ label: "kybersoutez.cz", href: "https://www.kybersoutez.cz/" }],
  },
  {
    year: "2024",
    title: "Kybersoutěž",
    org: "National cybersecurity competition, junior category",
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
    code: "hqr25qn2tut",
    href: "https://certificates.mooc.fi/validate/hqr25qn2tut",
  },
  {
    course: "Java Programming I",
    series: "Java Programming MOOC",
    issuer: "University of Helsinki",
    code: "wpwwtiu5jv",
    href: "https://certificates.mooc.fi/validate/wpwwtiu5jv",
  },
  {
    course: "Introduction to Programming",
    series: "Python Programming MOOC",
    issuer: "University of Helsinki",
    code: "a3wwfcmf03f",
    href: "https://certificates.mooc.fi/validate/a3wwfcmf03f",
  },
];

/**
 * The brand mark handles "back to top", so the hero needs no link of its own.
 * Keep these in page order: TopNav highlights the last one scrolled past.
 */
export const nav = [
  { label: "Projects", href: "#projects" },
  { label: "Results", href: "#awards" },
  { label: "Courses", href: "#certificates" },
  { label: "Tools", href: "#stack" },
  { label: "Contact", href: "#contact" },
];
