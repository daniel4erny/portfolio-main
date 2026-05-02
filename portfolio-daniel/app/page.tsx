import SideNav from "./components/SideNav";
import Hero from "./components/Hero";
import Cards from "./components/Cards";

export default function Home() {
  return (
    <div style={{ color: "var(--text-primary)", minHeight: "100vh" }}>
      <SideNav />
      <Hero />
      <Cards />
    </div>
  );
}
