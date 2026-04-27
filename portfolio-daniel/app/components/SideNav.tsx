const links = [
  { label: "Intro", href: "#intro" },
  { label: "Usecases", href: "#usecases" },
  { label: "Pricing", href: "#pricing" },
  { label: "Collections", href: "#collections" },
  { label: "FAQs", href: "#faqs" },
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
