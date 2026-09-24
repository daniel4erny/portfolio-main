import TopNav from "./components/TopNav";
import Hero from "./components/Hero";
import Stack from "./components/Stack";
import Projects from "./components/Projects";
import Awards from "./components/Awards";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <TopNav />
      <main>
        <Hero />
        <Stack />
        <div className="shell">
          <hr className="rule" />
        </div>
        <Projects />
        <div className="shell">
          <hr className="rule" />
        </div>
        <Awards />
        <div className="shell">
          <hr className="rule" />
        </div>
        <Certificates />
        <div className="shell">
          <hr className="rule" />
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
