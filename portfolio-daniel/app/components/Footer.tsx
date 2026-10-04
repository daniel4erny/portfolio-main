import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer shell">
      <span>© 2026 {profile.name}</span>
      <a href={profile.github} target="_blank" rel="noreferrer noopener">
        github.com/{profile.githubHandle}
      </a>
    </footer>
  );
}
