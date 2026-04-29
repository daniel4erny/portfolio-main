const fadeUp = (delay: string) => ({
  animation: `fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay} both`,
});

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        padding: "8vh 8vw 0",
      }}
    >
      <div style={{ paddingTop: "8vh" }}>
        <p
          style={{
            ...fadeUp("0.1s"),
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.24em",
            color: "var(--accent)",
            marginBottom: "1.8rem",
            textTransform: "uppercase",
          }}
        >
          Portfolio — 2026
        </p>

        <h1
          style={{
            ...fadeUp("0.25s"),
            fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            marginBottom: "0.2rem",
            color: "var(--text-primary)",
          }}
        >
          Software developer and
          <br />
          cybersecurity engineer
        </h1>

        <span
          style={{
            ...fadeUp("0.4s"),
            display: "block",
            fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
            fontWeight: 700,
            color: "var(--accent)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            marginBottom: "2.4rem",
          }}
        >
          Daniel Černý
        </span>

        <p
          style={{
            ...fadeUp("0.55s"),
            fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
            color: "var(--text-secondary)",
            fontWeight: 400,
            lineHeight: 1.7,
            maxWidth: "44ch",
            marginBottom: "2.8rem",
          }}
        >
          Building secure, high-performance software — from full-stack
          web apps to network infrastructure and penetration testing.
          <br />
          <span style={{ color: "var(--text-primary)", opacity: 0.45, fontSize: "0.82em" }}>
            Prague, CZ
          </span>
        </p>

        <div
          style={{
            ...fadeUp("0.7s"),
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <a href="#projects" className="btn-outline">
            Projekty
          </a>
          <a href="#contact" className="btn-ghost">
            Kontakt
          </a>
        </div>
      </div>
    </section>
  );
}
