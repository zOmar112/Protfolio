import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

function PlaneUpSvg() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 block"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
}

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHome = () => {
    const homeEl = document.getElementById("home");
    if (homeEl) {
      homeEl.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          type="button"
          onClick={scrollToHome}
          aria-label="Back to top"
          title="Back to top"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-accent text-white shadow-lg shadow-blue-600/25 border border-blue-400/40 flex items-center justify-center cursor-pointer transition-all duration-200 hover:opacity-95 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
        >
          <PlaneUpSvg />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
