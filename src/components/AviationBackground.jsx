import { useState, useEffect, useRef, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";

/* ── Exact 24x24 Airplane SVG (nose pointing up) ── */
function PlaneIcon({ size }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="block text-accent dark:text-blue-400"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <path
        fill="currentColor"
        d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
      />
    </svg>
  );
}

const FLIGHT_CONFIGS = [
  {
    id: "flight-1",
    size: 36,
    opacity: 0.46,
    duration: 38,
    delay: -10,
    staticOffset: 28,
    dashArray: "6 8",
    strokeWidth: 1.25,
    buildPath: (w, h) =>
      `M ${Math.round(-0.04 * w)} ${Math.round(0.84 * h)} C ${Math.round(
        0.24 * w
      )} ${Math.round(0.68 * h)}, ${Math.round(0.6 * w)} ${Math.round(
        0.34 * h
      )}, ${Math.round(1.04 * w)} ${Math.round(0.14 * h)}`,
  },
  {
    id: "flight-2",
    size: 32,
    opacity: 0.42,
    duration: 48,
    delay: -22,
    staticOffset: 54,
    dashArray: "5 7",
    strokeWidth: 1.2,
    buildPath: (w, h) =>
      `M ${Math.round(-0.04 * w)} ${Math.round(0.22 * h)} C ${Math.round(
        0.3 * w
      )} ${Math.round(0.3 * h)}, ${Math.round(0.64 * w)} ${Math.round(
        0.58 * h
      )}, ${Math.round(1.04 * w)} ${Math.round(0.76 * h)}`,
  },
  {
    id: "flight-3",
    size: 28,
    opacity: 0.38,
    duration: 56,
    delay: -34,
    staticOffset: 70,
    dashArray: "4 6",
    strokeWidth: 1,
    buildPath: (w, h) =>
      `M ${Math.round(1.04 * w)} ${Math.round(0.18 * h)} C ${Math.round(
        0.68 * w
      )} ${Math.round(0.06 * h)}, ${Math.round(0.34 * w)} ${Math.round(
        0.14 * h
      )}, ${Math.round(-0.04 * w)} ${Math.round(0.34 * h)}`,
  },
];

export default function AviationBackground() {
  const { theme } = useTheme();
  const containerRef = useRef(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [viewport, setViewport] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1440,
    height: typeof window !== "undefined" ? window.innerHeight : 900,
  }));

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

  // Measure the fixed viewport container so SVG paths and CSS offset-path align 1:1
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setViewport((prev) =>
          prev.width === Math.round(rect.width) &&
          prev.height === Math.round(rect.height)
            ? prev
            : {
                width: Math.round(rect.width),
                height: Math.round(rect.height),
              }
        );
      }
    };

    updateSize();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateSize);
      observer.observe(el);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateSize, { passive: true });
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const flights = useMemo(
    () =>
      FLIGHT_CONFIGS.map((cfg) => ({
        ...cfg,
        d: cfg.buildPath(viewport.width, viewport.height),
      })),
    [viewport.width, viewport.height]
  );

  const isDark = theme === "dark";
  const isPaused = reducedMotion || isHidden;

  return (
    <div
      ref={containerRef}
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
      <style>{`
        @keyframes aviation-plane-flight {
          0% {
            offset-distance: 0%;
          }
          100% {
            offset-distance: 100%;
          }
        }
      `}</style>

      {/* ── Soft Sky / Night Background Gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0f7ff] via-[#f8fbff] to-[#e4f1fd] dark:from-[#050c18] dark:via-[#091428] dark:to-[#030712] transition-colors duration-500" />

      {/* ── Low-Contrast Aviation Coordinate Grid ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isDark
            ? "linear-gradient(to right, rgba(59, 130, 246, 0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.055) 1px, transparent 1px)"
            : "linear-gradient(to right, rgba(37, 99, 235, 0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(37, 99, 235, 0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Low-Contrast Concentric Radar Rings & Crosshairs ── */}
      <div
        className="absolute top-6 right-6 w-[300px] h-[300px] md:w-[500px] md:h-[500px] max-w-[80vw] max-h-[80vh] overflow-hidden"
        style={{ pointerEvents: "none" }}
      >
        <svg
          viewBox="0 0 600 600"
          className="block w-full h-full text-blue-600/[0.08] dark:text-blue-400/[0.13]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="300" cy="300" r="70" strokeDasharray="3 4" />
          <circle cx="300" cy="300" r="140" />
          <circle cx="300" cy="300" r="210" strokeDasharray="4 6" />
          <circle cx="300" cy="300" r="280" />
          <line x1="20" y1="300" x2="580" y2="300" strokeDasharray="2 4" />
          <line x1="300" y1="20" x2="300" y2="580" strokeDasharray="2 4" />
          <line
            x1="102"
            y1="102"
            x2="498"
            y2="498"
            strokeDasharray="2 8"
            opacity="0.6"
          />
          <line
            x1="498"
            y1="102"
            x2="102"
            y2="498"
            strokeDasharray="2 8"
            opacity="0.6"
          />
        </svg>

        {!reducedMotion && (
          <div
            className="absolute inset-4 md:inset-6 rounded-full animate-radar-sweep"
            style={{
              pointerEvents: "none",
              animationPlayState: isPaused ? "paused" : "running",
              background: isDark
                ? "conic-gradient(from 0deg, transparent 0deg, transparent 310deg, rgba(59, 130, 246, 0.07) 360deg)"
                : "conic-gradient(from 0deg, transparent 0deg, transparent 310deg, rgba(37, 99, 235, 0.045) 360deg)",
            }}
          />
        )}
      </div>

      {/* ── Dashed Flight-Path Curves & Animated Airplanes ── */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          width={viewport.width}
          height={viewport.height}
          viewBox={`0 0 ${viewport.width} ${viewport.height}`}
          className="block w-full h-full"
          fill="none"
        >
          {flights.map((flight) => (
            <path
              key={flight.id}
              d={flight.d}
              className="text-blue-500/15 dark:text-blue-400/15"
              stroke="currentColor"
              strokeWidth={flight.strokeWidth}
              strokeDasharray={flight.dashArray}
            />
          ))}
        </svg>

        {flights.map((flight) => (
          <div
            key={flight.id}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${flight.size}px`,
              height: `${flight.size}px`,
              opacity: flight.opacity,
              offsetPath: `path("${flight.d}")`,
              offsetRotate: "auto 90deg",
              offsetAnchor: "center",
              offsetDistance: reducedMotion
                ? `${flight.staticOffset}%`
                : undefined,
              animationName: reducedMotion ? "none" : "aviation-plane-flight",
              animationDuration: `${flight.duration}s`,
              animationDelay: `${flight.delay}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: isPaused ? "paused" : "running",
              willChange: reducedMotion ? "auto" : "offset-distance",
            }}
          >
            <PlaneIcon size={flight.size} />
          </div>
        ))}
      </div>
    </div>
  );
}
