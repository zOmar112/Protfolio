import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";

// Easily switch on the CV link later: provide a non-empty string URL (e.g. "/cv.pdf")
const CV_URL = "";

// Set to true to also loop the USP paragraph (type -> hold 6s -> delete -> type)
const LOOP_USP = false;

const TYPE_SPEED_MS = 45;
const DELETE_SPEED_MS = 25;
const ROLE_HOLD_MS = 2000;
const USP_HOLD_MS = 6000;

function BlockCursor() {
  return (
    <span
      aria-hidden="true"
      className="inline-block w-[0.55em] h-[0.95em] bg-accent align-[-0.12em] ms-1 cockpit-cursor"
    />
  );
}

export default function Home() {
  const { t, lang } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);
  const [cvDialogOpen, setCvDialogOpen] = useState(false);

  const cvButtonRef = useRef(null);
  const dialogConfirmButtonRef = useRef(null);

  const greetingText = t.home.greeting;
  const nameText = t.home.name;
  const rolePhrases = [t.home.role, t.home.roleAlt || t.home.role];
  const uspText = t.home.usp;

  const isReducedInitial =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // Track which intro stage has completed so language switches don't replay static lines
  const introDoneRef = useRef(isReducedInitial);
  const isHiddenRef = useRef(
    typeof document !== "undefined" && document.visibilityState === "hidden"
  );

  // Typed lengths for static intro lines
  const [greetingLen, setGreetingLen] = useState(() =>
    isReducedInitial ? greetingText.length : 0
  );
  const [nameLen, setNameLen] = useState(() =>
    isReducedInitial ? nameText.length : 0
  );
  const [uspLen, setUspLen] = useState(() =>
    isReducedInitial ? uspText.length : 0
  );

  // Stage: "greeting" -> "name" -> "roleIntro" -> "usp" -> "done"
  const [stage, setStage] = useState(() =>
    isReducedInitial ? "done" : "greeting"
  );

  // Looping Role line state
  const [rolePhraseIdx, setRolePhraseIdx] = useState(0);
  const [roleLen, setRoleLen] = useState(() =>
    isReducedInitial ? rolePhrases[0].length : 0
  );
  const [rolePhase, setRolePhase] = useState(() =>
    isReducedInitial ? "hold" : "idle"
  ); // "idle" | "typing" | "hold" | "deleting"

  // Optional USP loop phase (only active if LOOP_USP === true)
  const [uspPhase, setUspPhase] = useState("idle"); // "idle" | "typing" | "hold" | "deleting"

  // CTA visibility: fades in after USP finishes, or immediately on any user interaction
  const [showCtas, setShowCtas] = useState(isReducedInitial);

  // Track tab visibility to pause loops while tab is hidden
  const [isTabHidden, setIsTabHidden] = useState(isHiddenRef.current);
  useEffect(() => {
    const onVisibility = () => {
      const hidden = document.visibilityState === "hidden";
      isHiddenRef.current = hidden;
      setIsTabHidden(hidden);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Show CTA buttons immediately on any scroll or click/key interaction
  useEffect(() => {
    if (showCtas) return;
    const revealNow = () => setShowCtas(true);
    window.addEventListener("scroll", revealNow, { passive: true, once: true });
    window.addEventListener("pointerdown", revealNow, { passive: true, once: true });
    window.addEventListener("keydown", revealNow, { once: true });
    return () => {
      window.removeEventListener("scroll", revealNow);
      window.removeEventListener("pointerdown", revealNow);
      window.removeEventListener("keydown", revealNow);
    };
  }, [showCtas]);

  // Instant display under prefers-reduced-motion
  useEffect(() => {
    if (!shouldReduceMotion) return;
    introDoneRef.current = true;
    setStage("done");
    setGreetingLen(greetingText.length);
    setNameLen(nameText.length);
    setRoleLen(rolePhrases[0].length);
    setRolePhase("hold");
    setUspLen(uspText.length);
    setShowCtas(true);
  }, [shouldReduceMotion, greetingText, nameText, uspText, rolePhrases[0]]);

  // Sync static lines cleanly if language toggles after intro finished
  useEffect(() => {
    if (introDoneRef.current) {
      setGreetingLen(greetingText.length);
      setNameLen(nameText.length);
      if (!LOOP_USP) {
        setUspLen(uspText.length);
      }
    }
  }, [lang, greetingText, nameText, uspText]);

  // 1. Sequential Intro: Greeting -> Name -> Role (first pass) -> USP
  useEffect(() => {
    if (shouldReduceMotion || isTabHidden || stage === "done") return;

    if (stage === "greeting") {
      if (greetingLen < greetingText.length) {
        const id = window.setTimeout(
          () => setGreetingLen((n) => n + 1),
          TYPE_SPEED_MS
        );
        return () => window.clearTimeout(id);
      }
      const id = window.setTimeout(() => setStage("name"), 140);
      return () => window.clearTimeout(id);
    }

    if (stage === "name") {
      if (nameLen < nameText.length) {
        const id = window.setTimeout(
          () => setNameLen((n) => n + 1),
          TYPE_SPEED_MS
        );
        return () => window.clearTimeout(id);
      }
      const id = window.setTimeout(() => {
        setRolePhase("typing");
        setStage("roleIntro");
      }, 140);
      return () => window.clearTimeout(id);
    }

    if (stage === "usp") {
      if (uspLen < uspText.length) {
        const id = window.setTimeout(
          () => setUspLen((n) => n + 1),
          TYPE_SPEED_MS
        );
        return () => window.clearTimeout(id);
      }
      introDoneRef.current = true;
      setShowCtas(true);
      setStage("done");
      if (LOOP_USP) {
        setUspPhase("hold");
      }
    }
  }, [
    shouldReduceMotion,
    isTabHidden,
    stage,
    greetingLen,
    greetingText,
    nameLen,
    nameText,
    uspLen,
    uspText,
  ]);

  // 2. Looping Role line (types -> holds 2s -> deletes at 25ms -> alternates phrase)
  useEffect(() => {
    if (shouldReduceMotion || isTabHidden || rolePhase === "idle") return;

    const currentPhrase = rolePhrases[rolePhraseIdx] || rolePhrases[0];

    if (rolePhase === "typing") {
      if (roleLen < currentPhrase.length) {
        const id = window.setTimeout(
          () => setRoleLen((n) => n + 1),
          TYPE_SPEED_MS
        );
        return () => window.clearTimeout(id);
      }
      // First pass finished: kick off USP typing next!
      if (stage === "roleIntro") {
        setStage("usp");
      }
      setRolePhase("hold");
      return;
    }

    if (rolePhase === "hold") {
      // Wait for USP initial pass to finish before deleting the role line
      if (stage === "usp") return;
      const id = window.setTimeout(
        () => setRolePhase("deleting"),
        ROLE_HOLD_MS
      );
      return () => window.clearTimeout(id);
    }

    if (rolePhase === "deleting") {
      if (roleLen > 0) {
        const id = window.setTimeout(
          () => setRoleLen((n) => n - 1),
          DELETE_SPEED_MS
        );
        return () => window.clearTimeout(id);
      }
      setRolePhraseIdx((idx) => (idx + 1) % rolePhrases.length);
      setRolePhase("typing");
    }
  }, [
    shouldReduceMotion,
    isTabHidden,
    rolePhase,
    roleLen,
    rolePhraseIdx,
    rolePhrases[0],
    rolePhrases[1],
    stage,
  ]);

  // 3. Optional USP Loop (only runs if LOOP_USP === true)
  useEffect(() => {
    if (!LOOP_USP || shouldReduceMotion || isTabHidden || stage !== "done") {
      return;
    }

    if (uspPhase === "hold") {
      const id = window.setTimeout(
        () => setUspPhase("deleting"),
        USP_HOLD_MS
      );
      return () => window.clearTimeout(id);
    }

    if (uspPhase === "deleting") {
      if (uspLen > 0) {
        const id = window.setTimeout(
          () => setUspLen((n) => n - 1),
          DELETE_SPEED_MS
        );
        return () => window.clearTimeout(id);
      }
      setUspPhase("typing");
      return;
    }

    if (uspPhase === "typing") {
      if (uspLen < uspText.length) {
        const id = window.setTimeout(
          () => setUspLen((n) => n + 1),
          TYPE_SPEED_MS
        );
        return () => window.clearTimeout(id);
      }
      setUspPhase("hold");
    }
  }, [shouldReduceMotion, isTabHidden, stage, uspPhase, uspLen, uspText]);

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
    document.getElementById("projects")?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  const hasDirectCvUrl = Boolean(CV_URL && CV_URL.trim() !== "");
  const activeRolePhrase = rolePhrases[rolePhraseIdx] || rolePhrases[0];

  const displayedGreeting = shouldReduceMotion
    ? greetingText
    : greetingText.slice(0, greetingLen);
  const displayedName = shouldReduceMotion
    ? nameText
    : nameText.slice(0, nameLen);
  const displayedRole = shouldReduceMotion
    ? rolePhrases[0]
    : activeRolePhrase.slice(0, roleLen);
  const displayedUsp = shouldReduceMotion
    ? uspText
    : uspText.slice(0, uspLen);

  // Determine which single line currently owns the blinking block cursor
  const cursorLine = shouldReduceMotion
    ? null
    : stage === "greeting"
    ? "greeting"
    : stage === "name"
    ? "name"
    : stage === "roleIntro"
    ? "role"
    : stage === "usp"
    ? "usp"
    : LOOP_USP && (uspPhase === "typing" || uspPhase === "deleting")
    ? "usp"
    : "role";

  return (
    <Section id="home" isHero>
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 py-8 font-cockpit">
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
        <div className="order-2 lg:order-1 flex-1 min-w-0 w-full text-center lg:text-start">
          {/* 1. "Hello, I'm" */}
          <p
            aria-label={greetingText}
            className="text-base sm:text-lg md:text-xl font-medium text-accent mb-2 grid"
          >
            <span className="sr-only">{greetingText}</span>
            <span
              aria-hidden="true"
              className="invisible col-start-1 row-start-1 select-none pointer-events-none"
            >
              {greetingText}
            </span>
            <span aria-hidden="true" className="col-start-1 row-start-1">
              {displayedGreeting}
              {cursorLine === "greeting" && <BlockCursor />}
            </span>
          </p>

          {/* 2. "Omar Ibrahim" (largest text) */}
          <h1
            aria-label={nameText}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-3 grid"
          >
            <span className="sr-only">{nameText}</span>
            <span
              aria-hidden="true"
              className="invisible col-start-1 row-start-1 select-none pointer-events-none"
            >
              {nameText}
            </span>
            <span aria-hidden="true" className="col-start-1 row-start-1">
              {displayedName}
              {cursorLine === "name" && <BlockCursor />}
            </span>
          </h1>

          {/* 3. Alternating Role Line (reserves max height of both phrases) */}
          <h2
            aria-label={rolePhrases[0]}
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6 grid"
          >
            <span className="sr-only">{rolePhrases[0]}</span>
            {rolePhrases.map((phrase) => (
              <span
                key={phrase}
                aria-hidden="true"
                className="invisible col-start-1 row-start-1 select-none pointer-events-none"
              >
                {phrase}
              </span>
            ))}
            <span aria-hidden="true" className="col-start-1 row-start-1">
              {displayedRole}
              {cursorLine === "role" && <BlockCursor />}
            </span>
          </h2>

          {/* 4. USP Paragraph */}
          <p
            aria-label={uspText}
            className="text-base sm:text-lg md:text-xl font-normal leading-[1.7] text-gray-600 dark:text-gray-400 max-w-2xl mb-8 grid mx-auto lg:mx-0"
          >
            <span className="sr-only">{uspText}</span>
            <span
              aria-hidden="true"
              className="invisible col-start-1 row-start-1 select-none pointer-events-none"
            >
              {uspText}
            </span>
            <span aria-hidden="true" className="col-start-1 row-start-1">
              {displayedUsp}
              {cursorLine === "usp" && <BlockCursor />}
            </span>
          </p>

          {/* 5. Two CTA Buttons (fade in after USP finishes, or immediately on interaction) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: showCtas ? 1 : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" }}
            className={`flex flex-wrap items-center justify-center lg:justify-start gap-4 ${
              showCtas ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
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
          </motion.div>
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
              transition={{
                duration: shouldReduceMotion ? 0 : 0.2,
                ease: "easeOut",
              }}
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
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
