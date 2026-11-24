import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const GRID_SCENES = [
  "radar",
  "tower",
  "nightSky",
  "nightAirport",
  "flightRadar",
  "clouds",
];

/* Minimal Control Tower SVG Icon for the 44px round trigger */
function ControlTowerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 block"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2v3" />
      <path d="M6 7h12l-1.5 4h-9L6 7z" />
      <path d="M5 7h14" />
      <path d="M9.5 11L8.5 21" />
      <path d="M14.5 11l1 10" />
      <path d="M6 21h12" />
      <path d="M9.2 15h5.6" />
    </svg>
  );
}

/* Lightweight mini SVG/CSS thumbnail previews for each of the 6 scenes */
function SceneThumbnail({ id }) {
  switch (id) {
    case "radar":
      return (
        <div className="w-full h-11 rounded-lg bg-gradient-to-br from-[#07142b] to-[#0f2447] relative overflow-hidden">
          <svg viewBox="0 0 80 44" className="w-full h-full" fill="none">
            <circle cx="58" cy="18" r="8" stroke="#60a5fa" strokeOpacity="0.35" strokeWidth="0.9" />
            <circle cx="58" cy="18" r="16" stroke="#60a5fa" strokeOpacity="0.25" strokeWidth="0.9" strokeDasharray="2 2" />
            <path d="M6 36 Q 36 22 72 8" stroke="#38bdf8" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="58" cy="18" r="1.8" fill="#38bdf8" />
          </svg>
        </div>
      );
    case "tower":
      return (
        <div className="w-full h-11 rounded-lg bg-gradient-to-b from-[#0b1b36] to-[#13294d] relative overflow-hidden">
          <svg viewBox="0 0 80 44" className="w-full h-full" fill="none">
            <rect x="0" y="34" width="80" height="10" fill="#3b82f6" fillOpacity="0.14" />
            <line x1="6" y1="42" x2="64" y2="34" stroke="#93c5fd" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="3 3" />
            <polygon points="62,34 68,34 67,18 63,18" fill="#93c5fd" fillOpacity="0.45" />
            <polygon points="59,13 71,13 69,18 61,18" fill="#93c5fd" fillOpacity="0.55" />
            <circle cx="65" cy="10" r="1.5" fill="#38bdf8" />
          </svg>
        </div>
      );
    case "nightSky":
      return (
        <div className="w-full h-11 rounded-lg bg-gradient-to-b from-[#040916] to-[#0b1936] relative overflow-hidden">
          <svg viewBox="0 0 80 44" className="w-full h-full" fill="none">
            <circle cx="14" cy="12" r="1.1" fill="#bfdbfe" fillOpacity="0.8" />
            <circle cx="30" cy="8" r="0.9" fill="#93c5fd" fillOpacity="0.7" />
            <circle cx="52" cy="14" r="1.2" fill="#e0f2fe" fillOpacity="0.85" />
            <circle cx="66" cy="28" r="1" fill="#bfdbfe" fillOpacity="0.7" />
            <circle cx="22" cy="30" r="0.9" fill="#93c5fd" fillOpacity="0.6" />
            <line x1="16" y1="20" x2="50" y2="27" stroke="#60a5fa" strokeOpacity="0.6" strokeWidth="1.1" strokeLinecap="round" />
            <circle cx="51" cy="27" r="1.4" fill="#e0f2fe" />
          </svg>
        </div>
      );
    case "nightAirport":
      return (
        <div className="w-full h-11 rounded-lg bg-gradient-to-b from-[#050b18] via-[#0a1833] to-[#10254a] relative overflow-hidden">
          <svg viewBox="0 0 80 44" className="w-full h-full" fill="none">
            <polygon points="34,26 46,26 70,44 10,44" fill="#60a5fa" fillOpacity="0.16" />
            <circle cx="26" cy="36" r="1.1" fill="#ffffff" fillOpacity="0.85" />
            <circle cx="33" cy="30" r="1" fill="#ffffff" fillOpacity="0.75" />
            <circle cx="54" cy="36" r="1.1" fill="#ffffff" fillOpacity="0.85" />
            <circle cx="47" cy="30" r="1" fill="#ffffff" fillOpacity="0.75" />
            <circle cx="40" cy="38" r="1.2" fill="#38bdf8" />
            <circle cx="40" cy="32" r="1.1" fill="#38bdf8" fillOpacity="0.8" />
            <circle cx="62" cy="34" r="1" fill="#34d399" fillOpacity="0.85" />
            <circle cx="69" cy="31" r="1" fill="#60a5fa" fillOpacity="0.85" />
          </svg>
        </div>
      );
    case "flightRadar":
      return (
        <div className="w-full h-11 rounded-lg bg-gradient-to-br from-[#071226] to-[#0f2242] relative overflow-hidden">
          <svg viewBox="0 0 80 44" className="w-full h-full" fill="none">
            <line x1="0" y1="22" x2="80" y2="22" stroke="#60a5fa" strokeOpacity="0.16" strokeWidth="0.6" />
            <line x1="40" y1="0" x2="40" y2="44" stroke="#60a5fa" strokeOpacity="0.16" strokeWidth="0.6" />
            <path d="M16 28 Q 36 10 50 22" stroke="#60a5fa" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M50 22 Q 60 15 68 20" stroke="#60a5fa" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="50" cy="22" r="4" stroke="#3b82f6" strokeOpacity="0.5" strokeWidth="0.9" />
            <circle cx="50" cy="22" r="2" fill="#3b82f6" />
            <circle cx="16" cy="28" r="1.3" fill="#93c5fd" />
            <circle cx="68" cy="20" r="1.3" fill="#93c5fd" />
          </svg>
        </div>
      );
    case "clouds":
      return (
        <div className="w-full h-11 rounded-lg bg-gradient-to-b from-[#dbeafe] via-[#eff6ff] to-[#bfdbfe] dark:from-[#0f2042] dark:to-[#1e3a6d] relative overflow-hidden">
          <div className="absolute top-2 left-2 w-10 h-4 rounded-full bg-white/85 dark:bg-blue-300/25 blur-[2px]" />
          <div className="absolute bottom-2 right-2 w-12 h-4 rounded-full bg-white/80 dark:bg-blue-200/20 blur-[2px]" />
          <div className="absolute top-5 left-8 w-8 h-[1.5px] bg-blue-500/45 dark:bg-blue-200/45 -rotate-6" />
        </div>
      );
    default:
      return null;
  }
}

export default function BackgroundSwitcher({ scene, onChange }) {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  const labels = t.backgroundSwitcher || {
    label: "Change background scene",
    title: "Background Scene",
    autoHint: "Clouds (Light) · Night Airport (Dark)",
    scenes: {
      radar: "Radar",
      tower: "Control Tower",
      nightSky: "Night Sky",
      nightAirport: "Night Airport",
      flightRadar: "Flight Radar",
      clouds: "Clouds",
      auto: "Auto",
    },
  };

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSelect = (id) => {
    onChange(id);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const isAuto = scene === "auto";

  return (
    <div
      ref={wrapperRef}
      data-hide-plane-cursor="true"
      className="fixed bottom-6 left-6 z-40"
    >
      {/* Restore normal pointer over switcher & popover */}
      <style>{`
        [data-hide-plane-cursor="true"],
        [data-hide-plane-cursor="true"] * {
          cursor: auto !important;
        }
        [data-hide-plane-cursor="true"] button,
        [data-hide-plane-cursor="true"] [role="radio"],
        [data-hide-plane-cursor="true"] button * {
          cursor: pointer !important;
        }
      `}</style>

      {/* Popover Menu: 2x3 Thumbnail Grid + Auto Option */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="bg-scene-popover"
            role="radiogroup"
            aria-label={labels.title}
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }
            }
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
            className="absolute bottom-14 left-0 w-[290px] sm:w-[320px] max-w-[calc(100vw-3rem)] p-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl"
          >
            <div className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-wider rtl:tracking-normal text-gray-400 dark:text-gray-500">
              {labels.title}
            </div>

            {/* 2x3 Grid of 6 Scene Thumbnails */}
            <div className="grid grid-cols-3 gap-2 mb-2.5">
              {GRID_SCENES.map((id) => {
                const isSelected = scene === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelect(id)}
                    className={`flex flex-col items-center gap-1.5 p-1.5 rounded-xl border text-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isSelected
                        ? "border-accent dark:border-blue-400 bg-accent/10 ring-1 ring-accent/30"
                        : "border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-950/60 hover:border-gray-300 dark:hover:border-gray-700"
                    }`}
                  >
                    <SceneThumbnail id={id} />
                    <span
                      className={`text-[10.5px] leading-tight font-medium line-clamp-1 ${
                        isSelected
                          ? "text-accent dark:text-blue-400 font-semibold"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {labels.scenes?.[id] || id}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Optional Auto Mode (Clouds in Light / Night Airport in Dark) */}
            <button
              type="button"
              role="radio"
              aria-checked={isAuto}
              onClick={() => handleSelect("auto")}
              className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl border text-start transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isAuto
                  ? "border-accent dark:border-blue-400 bg-accent/10 ring-1 ring-accent/30"
                  : "border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-950/60 hover:border-gray-300 dark:hover:border-gray-700"
              }`}
            >
              <div className="min-w-0">
                <span
                  className={`block text-xs font-semibold ${
                    isAuto
                      ? "text-accent dark:text-blue-400"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {labels.scenes?.auto || "Auto"}
                </span>
                <span className="block text-[10px] text-gray-500 dark:text-gray-400 truncate">
                  {labels.autoHint}
                </span>
              </div>
              <span
                aria-hidden="true"
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  isAuto
                    ? "border-accent dark:border-blue-400"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {isAuto && (
                  <span className="w-2 h-2 rounded-full bg-accent dark:bg-blue-400" />
                )}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 44px Round Switcher Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={labels.label}
        aria-expanded={open}
        aria-haspopup="true"
        title={labels.label}
        className={`w-11 h-11 rounded-full flex items-center justify-center border shadow-lg transition-all duration-200 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent ${
          open
            ? "bg-accent text-white border-blue-400/60 shadow-blue-600/30"
            : "bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-accent dark:hover:border-accent hover:text-accent dark:hover:text-blue-400 backdrop-blur-md"
        }`}
      >
        <ControlTowerIcon />
      </button>
    </div>
  );
}
