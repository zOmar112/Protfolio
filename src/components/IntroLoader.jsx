import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "oi_intro_loader_shown";
const FLIGHT_PATH = "M 20 112 Q 140 96 260 22";

function CommercialPlaneSvg() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="block"
      style={{
        filter: "drop-shadow(0 0 8px rgba(56, 189, 248, 0.75))",
      }}
    >
      <path
        fill="#f8fafc"
        d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
      />
      <path
        fill="#38bdf8"
        fillOpacity="0.65"
        d="M11.5 2c.83 0 1.5.67 1.5 1.5V9l8 5v.8l-8-4.2V19l1.5 1.1v.9L11.5 20V2z"
      />
    </svg>
  );
}

function shouldShowIntroOnMount() {
  if (typeof window === "undefined") return false;
  try {
    const navEntry = window.performance?.getEntriesByType?.("navigation")?.[0];
    const isFreshReload = navEntry?.type === "reload";
    const alreadyShown = window.sessionStorage.getItem(STORAGE_KEY) === "1";

    if (isFreshReload || !alreadyShown) {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
      return true;
    }
    return false;
  } catch {
    return true;
  }
}

export default function IntroLoader() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(shouldShowIntroOnMount);

  useEffect(() => {
    if (!visible) return;

    const reduceMotion =
      prefersReducedMotion ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const durationMs = reduceMotion ? 300 : 1500;
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, durationMs);

    return () => window.clearTimeout(timer);
  }, [visible, prefersReducedMotion]);

  const reduced = Boolean(prefersReducedMotion);
  const flightDuration = reduced ? 0.25 : 1.35;
  const barDuration = reduced ? 0.3 : 1.5;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-loader"
          dir="ltr"
          role="status"
          aria-label="Loading portfolio"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B1120] px-6 select-none overflow-hidden"
        >
          {/* Subtle aviation ambient glow */}
          <div
            aria-hidden="true"
            className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(37, 99, 235, 0.18) 0%, rgba(34, 211, 238, 0.06) 45%, transparent 72%)",
            }}
          />

          {/* Logo with subtle scale / fade-in entrance */}
          <motion.div
            initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0.15 : 0.45, ease: "easeOut" }}
            className="mb-4 relative"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl bg-cyan-500/20 blur-xl pointer-events-none"
            />
            <img
              src="/logo.png"
              alt="Omar Ibrahim"
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-contain shadow-lg"
            />
          </motion.div>

          {/* Centerpiece: Takeoff Flight Arc + Glowing Contrail + Airplane */}
          <div className="relative w-[280px] h-[130px] mb-5">
            <svg
              width="280"
              height="130"
              viewBox="0 0 280 130"
              fill="none"
              className="block w-full h-full overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="introContrailGrad"
                  x1="20"
                  y1="112"
                  x2="260"
                  y2="22"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
                  <stop offset="55%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="1" />
                </linearGradient>
                <filter
                  id="introContrailGlow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Subtle dashed runway baseline */}
              <line
                x1="10"
                y1="116"
                x2="112"
                y2="116"
                stroke="#38bdf8"
                strokeOpacity="0.2"
                strokeWidth="1.25"
                strokeDasharray="4 6"
                strokeLinecap="round"
              />

              {/* Subtle dashed flight arc guide */}
              <path
                d={FLIGHT_PATH}
                stroke="#60a5fa"
                strokeOpacity="0.22"
                strokeWidth="1.25"
                strokeDasharray="4 6"
                strokeLinecap="round"
              />

              {/* Glowing contrail line drawing behind the airplane */}
              <motion.path
                d={FLIGHT_PATH}
                stroke="url(#introContrailGrad)"
                strokeWidth="2.25"
                strokeLinecap="round"
                filter="url(#introContrailGlow)"
                initial={{ pathLength: reduced ? 1 : 0, opacity: 0.9 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: flightDuration,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </svg>

            {/* Minimalist white/cyan commercial airplane following the exact arc */}
            <motion.div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "30px",
                height: "30px",
                offsetPath: `path("${FLIGHT_PATH}")`,
                offsetRotate: "auto 90deg",
                offsetAnchor: "center",
              }}
              initial={{
                offsetDistance: reduced ? "100%" : "0%",
                opacity: reduced ? 1 : 0.85,
              }}
              animate={{ offsetDistance: "100%", opacity: 1 }}
              transition={{
                duration: flightDuration,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <CommercialPlaneSvg />
            </motion.div>
          </div>

          {/* Thin 1.5s progress bar */}
          <div className="w-44 sm:w-52 h-[2px] rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#22d3ee]"
              initial={{ scaleX: reduced ? 1 : 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: barDuration, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
