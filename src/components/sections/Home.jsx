import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";

// Easily switch on the CV link later: provide a non-empty string URL (e.g. "/cv.pdf")
const CV_URL = "";

export default function Home() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);
  const [cvDialogOpen, setCvDialogOpen] = useState(false);

  const cvButtonRef = useRef(null);
  const dialogConfirmButtonRef = useRef(null);

  const roleText = t.home.role;
  const hasTypedOnceRef = useRef(false);
  const [typedCount, setTypedCount] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      ? roleText.length
      : 0
  );
  const [isTyping, setIsTyping] = useState(() =>
    !(
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    )
  );

  useEffect(() => {
    if (shouldReduceMotion || hasTypedOnceRef.current) {
      hasTypedOnceRef.current = true;
      setTypedCount(roleText.length);
      setIsTyping(false);
      return;
    }

    let current = 0;
    let hideCursorTimeout;
    const interval = window.setInterval(() => {
      current += 1;
      setTypedCount(current);
      if (current >= roleText.length) {
        window.clearInterval(interval);
        hasTypedOnceRef.current = true;
        hideCursorTimeout = window.setTimeout(() => {
          setIsTyping(false);
        }, 250);
      }
    }, 40);

    return () => {
      window.clearInterval(interval);
      if (hideCursorTimeout) window.clearTimeout(hideCursorTimeout);
    };
  }, [roleText, shouldReduceMotion]);

  const displayedRole =
    shouldReduceMotion || hasTypedOnceRef.current
      ? roleText
      : roleText.slice(0, typedCount);

  // Dialog keyboard handling (Escape key) & focus management
  useEffect(() => {
    if (!cvDialogOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setCvDialogOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const timer = setTimeout(() => {
      dialogConfirmButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
      cvButtonRef.current?.focus?.();
    };
  }, [cvDialogOpen]);

  const handleCvClick = (e) => {
    if (!CV_URL || CV_URL.trim() === "") {
      e.preventDefault();
      setCvDialogOpen(true);
    }
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const hasDirectCvUrl = Boolean(CV_URL && CV_URL.trim() !== "");

  return (
    <Section id="home" isHero>
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 py-8">
        {/* Photo: above text on mobile (order-1), next to text on desktop (lg:order-2) */}
        <div className="order-1 lg:order-2 flex-shrink-0">
          <div className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 aspect-square rounded-2xl overflow-hidden border border-accent relative">
            {imgError ? (
              <div
                aria-label="Omar Ibrahim"
                className="w-full h-full rounded-2xl bg-accent/10 text-accent flex items-center justify-center text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight select-none"
              >
                OI
              </div>
            ) : (
              <img
                src="/me.jpg"
                alt="Omar Ibrahim"
                className="w-full h-full object-cover rounded-2xl block opacity-100"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "50% 20%",
                  display: "block",
                  opacity: 1,
                }}
                onError={() => setImgError(true)}
              />
            )}
          </div>
        </div>

        {/* Text: below photo on mobile (order-2), next to photo on desktop (lg:order-1) */}
        <div className="order-2 lg:order-1 flex-1 text-center lg:text-start">
          {/* 1. "Hello, I'm" */}
          <p className="text-base sm:text-lg md:text-xl font-medium text-accent mb-2">
            {t.home.greeting}
          </p>

          {/* 2. "Omar Ibrahim" (largest text) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
            {t.home.name}
          </h1>

          {/* 3. "Data & Machine Learning Student" */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6 grid">
            <span
              aria-hidden="true"
              className="invisible col-start-1 row-start-1 select-none pointer-events-none"
            >
              {roleText}
            </span>
            <span className="col-start-1 row-start-1">
              {displayedRole}
              {isTyping && !shouldReduceMotion && (
                <span
                  aria-hidden="true"
                  className="inline-block w-[2px] h-[0.95em] bg-accent align-[-0.1em] ms-0.5 animate-pulse"
                />
              )}
            </span>
          </h2>

          {/* 4. USP */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed mb-8">
            {t.home.usp}
          </p>

          {/* 5. Two buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button
              onClick={scrollToProjects}
              className="px-6 py-3 rounded-xl bg-accent hover:opacity-90 text-white font-medium transition-all duration-200 shadow-sm cursor-pointer hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
            >
              {t.home.viewWork}
            </button>

            {hasDirectCvUrl ? (
              <a
                ref={cvButtonRef}
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:border-accent dark:hover:border-accent font-medium transition-all duration-200 text-gray-800 dark:text-gray-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
              >
                {t.home.downloadCv}
              </a>
            ) : (
              <button
                ref={cvButtonRef}
                type="button"
                onClick={handleCvClick}
                className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:border-accent dark:hover:border-accent font-medium transition-all duration-200 text-gray-800 dark:text-gray-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
              >
                {t.home.downloadCv}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Centered Notice Dialog for Unavailable CV */}
      <AnimatePresence>
        {cvDialogOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-dialog-message"
          >
            {/* Translucent backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              onClick={() => setCvDialogOpen(false)}
            />

            {/* Small centered modal card (max-width 380px) */}
            <motion.div
              className="relative w-full max-w-[380px] bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 z-10 text-center"
              initial={
                shouldReduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95, y: 10 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95, y: 10 }
              }
              transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close 'X' icon */}
              <button
                type="button"
                onClick={() => setCvDialogOpen(false)}
                aria-label={t.home.cvDialogClose}
                className="absolute top-4 end-4 p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Icon badge */}
              <div className="w-12 h-12 rounded-full bg-accent/10 dark:bg-blue-500/15 text-accent dark:text-blue-400 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              {/* Message */}
              <p
                id="cv-dialog-message"
                className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed mb-6"
              >
                {t.home.cvDialogMessage}
              </p>

              {/* "Got it" / "حسنًا" button */}
              <button
                ref={dialogConfirmButtonRef}
                type="button"
                onClick={() => setCvDialogOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-accent hover:opacity-90 text-white font-medium text-sm transition-all duration-200 shadow-sm cursor-pointer hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {t.home.cvDialogButton}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  );
}
