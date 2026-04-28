import SideNav from "./components/SideNav";

const fadeUp = (delay: string) => ({
  animation: `fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay} both`,
});

export default function Home() {
  return (
    <div style={{ color: "var(--text-primary)", fontFamily: "var(--font-exo2), sans-serif", minHeight: "100vh" }}>
      <SideNav />

      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "flex-start", padding: "8vh 8vw 0" }}>
        <div style={{ paddingTop: "8vh" }}>
          <p style={{
            ...fadeUp("0.1s"),
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: "var(--accent)",
            marginBottom: "1.6rem",
          }}>
            PORTFOLIO — 2026
          </p>
          <h1 style={{
            ...fadeUp("0.25s"),
            fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            marginBottom: "0.25rem",
            color: "var(--text-primary)",
          }}>
            Software developer and<br />
            cybersecurity engineer
          </h1>
          <span style={{
            ...fadeUp("0.4s"),
            display: "block",
            fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
            fontWeight: 800,
            color: "var(--accent)",
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
          }}>
            Daniel Černý
          </span>
        </div>
      </section>
    </div>
  );
}
