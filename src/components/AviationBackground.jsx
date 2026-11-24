import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import RadarScene from "./RadarScene";
import ControlTowerScene from "./ControlTowerScene";
import NightSkyScene from "./NightSkyScene";

export default function AviationBackground({ scene = "radar" }) {
  const { theme } = useTheme();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Track prefers-reduced-motion and tab visibility
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotionChange);

    const handleVisibility = () => {
      setIsHidden(document.visibilityState === "hidden");
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const isDark = theme === "dark";
  const isPaused = reducedMotion || isHidden;

  return (
    <div
      dir="ltr"
      aria-hidden="true"
      className="select-none transition-colors duration-500"
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: -1,
      }}
    >
      {/* Soft Sky / Night Background Gradient (shared across all scenes) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0f7ff] via-[#f8fbff] to-[#e4f1fd] dark:from-[#050c18] dark:via-[#091428] dark:to-[#030712] transition-colors duration-500" />

      {/* Active Scene with 0.4s cross-fade */}
      <AnimatePresence initial={false}>
        <motion.div
          key={scene}
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeInOut" }}
          className="absolute inset-0 overflow-hidden"
        >
          {scene === "tower" ? (
            <ControlTowerScene
              isDark={isDark}
              reducedMotion={reducedMotion}
              isPaused={isPaused}
            />
          ) : scene === "nightSky" ? (
            <NightSkyScene
              isDark={isDark}
              reducedMotion={reducedMotion}
              isPaused={isPaused}
            />
          ) : (
            <RadarScene
              isDark={isDark}
              reducedMotion={reducedMotion}
              isPaused={isPaused}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
