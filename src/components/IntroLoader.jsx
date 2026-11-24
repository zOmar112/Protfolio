import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const SESSION_KEY = "oi_intro_seen";

/* Same 24x24 airplane SVG path used in AviationBackground (nose pointing up) */
function PlaneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="36"
      height="36"
      className="block text-accent dark:text-blue-400"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
      />
    </svg>
  );
}

function shouldShowIntro() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  try {
    if (window.sessionStorage.getItem(SESSION_KEY) === "1") {
      return false;
    }
    window.sessionStorage.setItem(SESSION_KEY, "1");
    return true;
  } catch {
    return true;
  }
}

export default function IntroLoader() {
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(shouldShowIntro);

  // Immediately skip if prefers-reduced-motion is enabled
  useEffect(() => {
    if (prefersReducedMotion && visible) {
      setVisible(false);
    }
  }, [prefersReducedMotion, visible]);

  // Auto-dismiss after 1.5s
  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [visible]);

  // Prevent page scroll while the splash overlay is visible
  useEffect(() => {
    if (!visible) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [visible]);

  if (prefersReducedMotion) return null;

  const isDark = theme === "dark";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-loader"
          dir="ltr"
          role="status"
          aria-label="Loading Omar Ibrahim portfolio"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-[#f0f7ff] via-[#f8fbff] to-[#e4f1fd] dark:from-[#050c18] dark:via-[#091428] dark:to-[#030712] px-6 select-none overflow-hidden"
        >
          {/* Faint radar coordinate grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: isDark
                ? "linear-gradient(to right, rgba(59, 130, 246, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.06) 1px, transparent 1px)"
                : "linear-gradient(to right, rgba(37, 99, 235, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(37, 99, 235, 0.05) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />

          {/* Faint centered radar rings */}
          <svg
            aria-hidden="true"
            viewBox="0 0 400 400"
            className="absolute w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] text-blue-600/[0.07] dark:text-blue-400/[0.1] pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <circle cx="200" cy="200" r="85" strokeDasharray="3 5" />
            <circle cx="200" cy="200" r="145" />
            <circle cx="200" cy="200" r="195" strokeDasharray="4 6" />
          </svg>

          {/* Center Stack */}
          <div className="relative z-10 flex flex-col items-center">
            {/* 64px OI Logo */}
            <motion.img
              src="/logo.svg"
              onError={(e) => {
                if (!e.currentTarget.dataset.fallback) {
                  e.currentTarget.dataset.fallback = "1";
                  e.currentTarget.src = "/logo.png";
                }
              }}
              alt="OI"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-16 h-16 rounded-xl object-contain mb-7 shadow-xs"
            />

            {/* Dashed Runway + Takeoff Plane (transform & opacity only) */}
            <div className="relative w-64 sm:w-72 h-10 flex items-center justify-center mb-5">
              {/* Thin dashed runway line */}
              <div
                aria-hidden="true"
                className="w-full border-t border-dashed border-blue-600/35 dark:border-blue-400/35"
              />

              {/* 36px accent plane accelerating right, then lifting off to top-right */}
              <motion.div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 -ml-[18px] -mt-[18px] pointer-events-none will-change-transform"
                initial={{ x: -115, y: 0, rotate: 90, opacity: 1 }}
                animate={{
                  x: [-115, -10, 75, 175],
                  y: [0, 0, -22, -95],
                  rotate: [90, 90, 68, 48],
                  opacity: [1, 1, 1, 0],
                }}
                transition={{
                  duration: 1.4,
                  times: [0, 0.45, 0.72, 1],
                  ease: "easeIn",
                }}
              >
                <PlaneIcon />
              </motion.div>
            </div>

            {/* Thin progress bar filling in 1.5s (transform only) */}
            <div className="w-48 sm:w-56 h-[2.5px] rounded-full bg-blue-600/15 dark:bg-blue-400/15 overflow-hidden mb-3.5">
              <motion.div
                className="h-full w-full origin-left rounded-full bg-accent dark:bg-blue-400 will-change-transform"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "linear" }}
              />
            </div>

            {/* Name fading in */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="text-sm sm:text-base font-semibold tracking-wide text-gray-800 dark:text-gray-100"
            >
              Omar Ibrahim
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
