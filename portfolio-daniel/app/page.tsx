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
        <Projects />
        <Awards />
        <Certificates />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
