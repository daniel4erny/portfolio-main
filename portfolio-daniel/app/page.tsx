export default function Home() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--text-primary)", fontFamily: "var(--font-exo2), sans-serif" }}>

      {/* NAVBAR */}
      <nav style={{
        background: "var(--surface)",
        borderBottom: "1px solid rgba(37,99,235,0.2)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <span style={{ fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.05em" }}>
            DANIEL <span style={{ color: "var(--primary)" }}>ČERNÝ</span>
          </span>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {(["SERVICES", "ABOUT", "PROJECTS", "CONTACT"] as const).map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
            ))}
            <a href="#contact" className="btn-outline">GET IN TOUCH</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "90vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(to top, rgba(37,99,235,0.05), transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "6rem 2rem" }}>
          <p style={{ color: "var(--accent)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.2em", marginBottom: "1rem" }}>
            WEB DEVELOPMENT • CYBERSECURITY
          </p>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Daniel<br />
            <span style={{ color: "var(--primary)" }}>Černý</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: 560, lineHeight: 1.7, marginBottom: "2.5rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#projects" style={{ background: "var(--primary)", color: "#fff", padding: "0.8rem 2rem", textDecoration: "none", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em", borderRadius: 2 }}>
              VIEW PROJECTS
            </a>
            <a href="#contact" className="btn-ghost">CONTACT ME</a>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "linear-gradient(to right, transparent, var(--primary), transparent)", opacity: 0.3 }} />

      {/* SERVICES */}
      <section id="services" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ color: "var(--accent)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.2em", marginBottom: "0.5rem" }}>WHAT I DO</p>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "3rem" }}>Services</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              { title: "Web Development", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
              { title: "Cybersecurity", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
              { title: "Penetration Testing", desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
              { title: "Security Audit", desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
            ].map(service => (
              <div key={service.title} className="card">
                <div style={{ color: "var(--primary)", fontSize: "1.5rem", marginBottom: "1rem" }}>◈</div>
                <h3 style={{ fontWeight: 700, fontSize: "1.05rem", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>{service.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(37,99,235,0.3), transparent)" }} />

      {/* ABOUT */}
      <section id="about" style={{ padding: "6rem 2rem", background: "rgba(18,22,28,0.5)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <p style={{ color: "var(--accent)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.2em", marginBottom: "0.5rem" }}>WHO I AM</p>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "1.5rem" }}>About Me</h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1rem" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "2rem" }}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.
            </p>
            <div style={{ display: "flex", gap: "2rem" }}>
              {[["5+", "Years Exp."], ["30+", "Projects"], ["100%", "Client Satisfaction"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--primary)" }}>{num}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", letterSpacing: "0.1em" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {["React / Next.js", "TypeScript", "Node.js", "Penetration Testing", "Network Security", "Python", "Docker", "Linux"].map(skill => (
              <div key={skill} style={{ background: "var(--surface)", border: "1px solid rgba(37,99,235,0.15)", borderRadius: 4, padding: "0.75rem 1rem", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.05em" }}>
                <span style={{ color: "var(--primary)", marginRight: "0.5rem" }}>▸</span>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(37,99,235,0.3), transparent)" }} />

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ color: "var(--accent)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.2em", marginBottom: "0.5rem" }}>MY WORK</p>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "3rem" }}>Projects</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" }}>
            {[
              { title: "Lorem Ipsum Platform", tags: ["Next.js", "TypeScript", "PostgreSQL"], desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
              { title: "Dolor Sit Security Tool", tags: ["Python", "Cybersecurity", "Linux"], desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
              { title: "Amet Consectetur App", tags: ["React", "Node.js", "Docker"], desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
            ].map(project => (
              <div key={project.title} className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ height: 120, background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(6,182,212,0.05))", borderRadius: 2, border: "1px solid rgba(37,99,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(37,99,235,0.3)", fontSize: "3rem" }}>◈</div>
                <h3 style={{ fontWeight: 700, fontSize: "1.05rem" }}>{project.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6 }}>{project.desc}</p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{ background: "rgba(37,99,235,0.1)", color: "var(--primary)", padding: "0.2rem 0.6rem", borderRadius: 2, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em" }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(37,99,235,0.3), transparent)" }} />

      {/* CONTACT */}
      <section id="contact" style={{ padding: "6rem 2rem", background: "rgba(18,22,28,0.5)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "var(--accent)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.2em", marginBottom: "0.5rem" }}>GET IN TOUCH</p>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "1rem" }}>Contact</h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "3rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[{ label: "EMAIL", value: "daniel@cerny.dev" }, { label: "LOCATION", value: "Czech Republic" }].map(item => (
              <div key={item.label} style={{ background: "var(--surface)", border: "1px solid rgba(37,99,235,0.15)", borderRadius: 4, padding: "1.25rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em" }}>{item.label}</span>
                <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{item.value}</span>
              </div>
            ))}
            <a href="mailto:daniel@cerny.dev" style={{ marginTop: "1rem", background: "var(--primary)", color: "#fff", padding: "1rem", textDecoration: "none", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.15em", borderRadius: 2, textAlign: "center", display: "block" }}>
              SEND MESSAGE
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "var(--surface)", borderTop: "1px solid rgba(37,99,235,0.15)", padding: "2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.05em" }}>
            DANIEL <span style={{ color: "var(--primary)" }}>ČERNÝ</span>
          </span>
          <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>WEB DEVELOPMENT • CYBERSECURITY</span>
          <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>© 2026</span>
        </div>
      </footer>

    </div>
  );
}
