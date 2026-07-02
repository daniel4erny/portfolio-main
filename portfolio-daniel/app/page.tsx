import SideNav from "./components/SideNav";
import Hero from "./components/Hero";
import Cards from "./components/Cards";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div style={{ color: "var(--text-primary)", minHeight: "100vh" }}>
      <SideNav />
      <Hero />
      <Cards />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
