import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="shell">
      <hr className="rule" />
      <div className="flex flex-wrap items-center justify-between gap-4 py-8">
        <span className="mono text-[0.95rem] text-text-muted">
          © 2026 {profile.name}
        </span>
        <span className="mono text-[0.95rem] text-text-muted">
          Built with Next.js and Three.js
        </span>
      </div>
    </footer>
  );
}
