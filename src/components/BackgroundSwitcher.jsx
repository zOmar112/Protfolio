import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const SCENE_IDS = ["radar", "tower", "nightSky"];

/* Minimal Control Tower SVG Icon */
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

export default function BackgroundSwitcher({ scene, onChange }) {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  const labels = t.backgroundSwitcher || {
    label: "Change background scene",
    title: "Background Scene",
    scenes: {
      radar: "Radar",
      tower: "Control Tower",
      nightSky: "Night Sky",
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

      {/* Popover Menu */}
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
            className="absolute bottom-14 left-0 w-48 p-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl"
          >
            <div className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider rtl:tracking-normal text-gray-400 dark:text-gray-500">
              {labels.title}
            </div>

            <div className="space-y-1">
              {SCENE_IDS.map((id) => {
                const isSelected = scene === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelect(id)}
                    className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isSelected
                        ? "bg-accent/10 text-accent dark:text-blue-400 font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/80"
                    }`}
                  >
                    <span>{labels.scenes?.[id] || id}</span>
                    <span
                      aria-hidden="true"
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? "border-accent dark:border-blue-400"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-accent dark:bg-blue-400" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
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
