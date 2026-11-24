import PlaneCursor from "./components/PlaneCursor";
import AviationBackground from "./components/AviationBackground";
import IntroLoader from "./components/IntroLoader";
import Navbar from "./components/Navbar";
import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Education from "./components/sections/Education";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Services from "./components/sections/Services";
import Projects from "./components/sections/Projects";
import Achievements from "./components/sections/Achievements";
import Testimonials from "./components/sections/Testimonials";

export default function App() {
  return (
    <>
      <PlaneCursor />
      <AviationBackground />
      <Navbar />
      <main className="pt-16 relative z-10">
        <Home />
        <About />
        <Education />
        <Skills />
        <Experience />
        <Services />
        <Projects />
        <Achievements />
        <Testimonials />
      </main>
      <IntroLoader />
    </>
  );
}
