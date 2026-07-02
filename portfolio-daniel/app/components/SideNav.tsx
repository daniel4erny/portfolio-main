const links = [
  { label: "Hero", href: "#hero" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function SideNav() {
  return (
    <nav className="side-nav">
      {links.map(({ label, href }) => (
        <a key={label} href={href} className="side-nav-link">
          <span className="side-nav-line" />
          <span className="side-nav-text">{label}</span>
        </a>
      ))}
    </nav>
  );
}
