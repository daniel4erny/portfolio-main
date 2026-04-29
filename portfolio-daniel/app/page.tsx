import SideNav from "./components/SideNav";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div style={{ color: "var(--text-primary)", minHeight: "100vh" }}>
      <SideNav />
      <Hero />
    </div>
  );
}
