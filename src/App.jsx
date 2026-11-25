import { useState, useEffect } from "react";
import PlaneCursor from "./components/PlaneCursor";
import AviationBackground from "./components/AviationBackground";
import BackgroundSwitcher from "./components/BackgroundSwitcher";
import IntroLoader from "./components/IntroLoader";
import BackToTop from "./components/BackToTop";
import FlightPathTracker from "./components/FlightPathTracker";
import Navbar from "./components/Navbar";
import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Education from "./components/sections/Education";
import Certificates from "./components/sections/Certificates";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Services from "./components/sections/Services";
import Projects from "./components/sections/Projects";
import Achievements from "./components/sections/Achievements";
import Testimonials from "./components/sections/Testimonials";

const BG_SCENE_KEY = "oi_bg_scene";
const VALID_SCENES = new Set([
  "radar",
  "tower",
  "nightSky",
  "nightAirport",
  "flightRadar",
  "clouds",
  "auto",
]);

function getInitialScene() {
  if (typeof window === "undefined") return "radar";
  try {
    const saved = window.localStorage.getItem(BG_SCENE_KEY);
    return saved && VALID_SCENES.has(saved) ? saved : "radar";
  } catch {
    return "radar";
  }
}

export default function App() {
  const [bgScene, setBgScene] = useState(getInitialScene);

  useEffect(() => {
    try {
      window.localStorage.setItem(BG_SCENE_KEY, bgScene);
    } catch {
      // Ignore storage errors (private mode / blocked storage)
    }
  }, [bgScene]);

  return (
    <>
      <PlaneCursor />
      <AviationBackground scene={bgScene} />
      <Navbar />
      <main className="pt-16 relative z-10">
        <Home />
        <About />
        <Education />
        <Certificates />
        <Skills />
        <Experience />
        <Services />
        <Projects />
        <Achievements />
        <Testimonials />
      </main>
      <BackgroundSwitcher scene={bgScene} onChange={setBgScene} />
      <FlightPathTracker />
      <BackToTop />
      <IntroLoader />
    </>
  );
}
