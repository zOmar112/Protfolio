import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";

// Easily switch on the CV link later: provide a non-empty string URL (e.g. "/cv.pdf")
const CV_URL = "";

// Set to true to also loop the USP paragraph (type -> hold 6s -> delete -> type)
const LOOP_USP = false;

const TYPE_SPEED_MS = 65;
const DELETE_SPEED_MS = 38;
const ROLE_HOLD_MS = 1400;
const USP_HOLD_MS = 5000;

const PLANE_PATH =
  "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";

/* Skywriting / Typing Airplane Indicator matching exact font-size via 1em */
function AirplaneCursor({ isRtl, isDeleting = false }) {
  // In LTR: typing -> nose right (90deg), deleting -> nose left (-90deg)
  // In RTL: typing -> nose left (-90deg), deleting -> nose right (90deg)
  const rotationDeg = isRtl
    ? (isDeleting ? 90 : -90)
    : (isDeleting ? -90 : 90);

  return (
    <motion.span
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="inline-block align-middle ms-1 select-none pointer-events-none"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-[1em] h-[1em] inline-block align-middle text-accent dark:text-blue-400 drop-shadow-[0_0_6px_rgba(37,99,235,0.45)] transition-transform duration-200 ease-in-out"
        style={{
          width: "1em",
          height: "1em",
          transform: `rotate(${rotationDeg}deg)`,
        }}
        fill="currentColor"
      >
        <path d={PLANE_PATH} />
      </svg>
    </motion.span>
  );
}

/* Subtle Minimalist Aviation Backdrop behind Hero Cutout Portrait (z-0) */
function PortraitAviationBackdrop({ shouldReduceMotion }) {
  return (
    <div
      dir="ltr"
      aria-hidden="true"
      className="pointer-events-none select-none absolute -inset-5 sm:-inset-7 z-0 opacity-40 dark:opacity-45"
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, #000 0%, #000 80%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, #000 0%, #000 80%, transparent 100%)",
      }}
    >
      <svg
        viewBox="0 0 320 320"
        className="w-full h-full overflow-visible"
        fill="none"
      >
        <defs>
          <radialGradient id="heroPortraitAmbient" cx="52%" cy="48%" r="48%">
            <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.24" />
            <stop offset="55%" stopColor="#0ea5e9" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0B1120" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heroAtcCabGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0B1120" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="heroAtcCabGlass" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient
            id="heroAtcTowerFade"
            x1="254"
            y1="95"
            x2="254"
            y2="234"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#2563eb" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="heroFlightPath1"
            x1="18"
            y1="148"
            x2="108"
            y2="47"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient
            id="heroFlightPath2"
            x1="196"
            y1="42"
            x2="289"
            y2="59"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
            <stop offset="55%" stopColor="#38bdf8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient
            id="heroFlightPath3"
            x1="14"
            y1="214"
            x2="64"
            y2="159"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#1e40af" stopOpacity="0" />
            <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* Soft Royal-Blue / Cyan Ambient Halo */}
        <circle cx="164" cy="154" r="142" fill="url(#heroPortraitAmbient)" />

        {/* Subtle Concentric Radar Rings & Azimuth Ticks */}
        <circle
          cx="160"
          cy="158"
          r="144"
          stroke="#2563eb"
          strokeWidth="0.75"
          strokeOpacity="0.45"
          strokeDasharray="2 5"
        />
        <path
          d="M 48 198 A 120 120 0 0 1 102 53 M 218 53 A 120 120 0 0 1 272 198"
          stroke="#38bdf8"
          strokeWidth="0.85"
          strokeOpacity="0.42"
        />
        <path
          d="M 68 184 A 96 96 0 0 1 96 86 M 224 86 A 96 96 0 0 1 252 184"
          stroke="#22d3ee"
          strokeWidth="0.75"
          strokeOpacity="0.32"
          strokeDasharray="3 4"
        />
        <path
          d="M 12 158 L 20 158 M 300 158 L 308 158 M 55 55 L 61 61 M 265 55 L 259 61"
          stroke="#38bdf8"
          strokeWidth="0.8"
          strokeOpacity="0.45"
          strokeLinecap="round"
        />

        {/* Sleek Line-Art ATC Tower (Right Side Behind Shoulder) */}
        <g>
          {/* Soft Glowing Cyan Radar Halo & Pulse around Cab */}
          <circle cx="254" cy="101" r="34" fill="url(#heroAtcCabGlow)" />
          {shouldReduceMotion ? (
            <>
              <circle
                cx="254"
                cy="96"
                r="16"
                stroke="#22d3ee"
                strokeWidth="0.8"
                strokeOpacity="0.35"
              />
              <circle
                cx="254"
                cy="96"
                r="26"
                stroke="#38bdf8"
                strokeWidth="0.65"
                strokeOpacity="0.2"
                strokeDasharray="2 3"
              />
            </>
          ) : (
            <>
              <circle cx="254" cy="96" r="8" stroke="#22d3ee" strokeWidth="1">
                <animate
                  attributeName="r"
                  values="7;30"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.75;0"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="254" cy="96" r="8" stroke="#38bdf8" strokeWidth="0.85">
                <animate
                  attributeName="r"
                  values="7;30"
                  dur="3.2s"
                  begin="1.6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0"
                  dur="3.2s"
                  begin="1.6s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          )}

          {/* Roof Radar Dish & Beacon Mast */}
          <line
            x1="254"
            y1="78"
            x2="254"
            y2="91"
            stroke="#67e8f9"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
          <path
            d="M 247 84 Q 254 81 261 84"
            stroke="#67e8f9"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <circle cx="254" cy="77" r="1.8" fill="#a5f3fc" />

          {/* Roof Overhang */}
          <path
            d="M 233 96 L 239 91 L 269 91 L 275 96 Z"
            fill="#1e3a8a"
            fillOpacity="0.45"
            stroke="#60a5fa"
            strokeWidth="1"
            strokeLinejoin="round"
          />

          {/* Angled Panoramic Glass Control Cab */}
          <path
            d="M 235 96 L 273 96 L 268 111 L 240 111 Z"
            fill="url(#heroAtcCabGlass)"
            stroke="#67e8f9"
            strokeWidth="1.15"
            strokeLinejoin="round"
          />
          <line
            x1="246"
            y1="96.5"
            x2="248"
            y2="110.5"
            stroke="#38bdf8"
            strokeWidth="0.8"
            strokeOpacity="0.65"
          />
          <line
            x1="254"
            y1="96.5"
            x2="254"
            y2="110.5"
            stroke="#38bdf8"
            strokeWidth="0.8"
            strokeOpacity="0.65"
          />
          <line
            x1="262"
            y1="96.5"
            x2="260"
            y2="110.5"
            stroke="#38bdf8"
            strokeWidth="0.8"
            strokeOpacity="0.65"
          />

          {/* Catwalk Deck & Tapered Structural Shaft */}
          <path
            d="M 237 114 L 271 114"
            stroke="#3b82f6"
            strokeWidth="1.05"
            strokeLinecap="round"
          />
          <path
            d="M 245 114 L 239 232 M 263 114 L 269 232"
            stroke="url(#heroAtcTowerFade)"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <line
            x1="254"
            y1="114"
            x2="254"
            y2="224"
            stroke="url(#heroAtcTowerFade)"
            strokeWidth="0.7"
            strokeOpacity="0.55"
          />
          <path
            d="M 244 132 L 264 132 M 243 152 L 265 152 M 242 174 L 266 174 M 241 198 L 267 198"
            stroke="url(#heroAtcTowerFade)"
            strokeWidth="0.8"
          />
          <path
            d="M 245 114 L 264 132 M 263 114 L 244 132 M 244 132 L 265 152 M 264 132 L 243 152 M 243 152 L 266 174 M 265 152 L 242 174"
            stroke="url(#heroAtcTowerFade)"
            strokeWidth="0.65"
            strokeOpacity="0.6"
          />
        </g>

        {/* Curved Flight Path 1 + Commercial Jet Silhouette (Upper-Left Climb) */}
        <path
          d="M 18 148 Q 50 74 107.5 46.8"
          stroke="url(#heroFlightPath1)"
          strokeWidth="1"
          strokeDasharray="3 3.5"
          strokeLinecap="round"
        />
        <circle cx="24" cy="136" r="1.5" fill="#3b82f6" fillOpacity="0.65" />
        <g transform="translate(114 44) rotate(65) scale(0.52) translate(-12 -12)">
          <path d={PLANE_PATH} fill="#67e8f9" />
        </g>

        {/* Curved Flight Path 2 + Commercial Jet Silhouette (Upper-Right Outbound) */}
        <path
          d="M 196 42 Q 244 33 288.5 59"
          stroke="url(#heroFlightPath2)"
          strokeWidth="0.95"
          strokeDasharray="2.5 3.5"
          strokeLinecap="round"
        />
        <circle cx="196" cy="42" r="1.4" fill="#38bdf8" fillOpacity="0.6" />
        <g transform="translate(293.5 62) rotate(120) scale(0.45) translate(-12 -12)">
          <path d={PLANE_PATH} fill="#38bdf8" />
        </g>

        {/* Curved Flight Path 3 + Commercial Jet Silhouette (Lower-Left Departure) */}
        <path
          d="M 14 214 Q 35 179 64 159"
          stroke="url(#heroFlightPath3)"
          strokeWidth="0.85"
          strokeDasharray="2.5 3.5"
          strokeLinecap="round"
        />
        <g transform="translate(68 156) rotate(55.5) scale(0.38) translate(-12 -12)">
          <path d={PLANE_PATH} fill="#60a5fa" />
        </g>
      </svg>
    </div>
  );
}

export default function Home() {
  const { t, lang } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const isRtl = lang === "ar";

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
  const [uspPhase, setUspPhase] = useState("idle");

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

  // 2. Looping Role line (types -> holds 2.2s -> deletes at 20ms -> alternates phrase)
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
      if (stage === "roleIntro") {
        setStage("usp");
      }
      setRolePhase("hold");
      return;
    }

    if (rolePhase === "hold") {
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

  // Trap focus inside modal dialog when open
  useEffect(() => {
    if (!cvDialogOpen) return;
    const timer = setTimeout(() => {
      dialogConfirmButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setCvDialogOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
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

  // Sliced strings currently displayed
  const displayedGreeting = greetingText.slice(0, greetingLen);
  const displayedName = nameText.slice(0, nameLen);
  const currentRolePhrase = rolePhrases[rolePhraseIdx] || rolePhrases[0];
  const displayedRole = currentRolePhrase.slice(0, roleLen);
  const displayedUsp = uspText.slice(0, uspLen);

  // Active cursor placement
  const cursorLine = (() => {
    if (stage === "greeting") {
      return greetingLen < greetingText.length ? "greeting" : null;
    }
    if (stage === "name") {
      return nameLen < nameText.length ? "name" : null;
    }
    if (stage === "usp") {
      return uspLen < uspText.length ? "usp" : null;
    }
    if (rolePhase === "typing" && roleLen < currentRolePhrase.length) {
      return "role";
    }
    if (rolePhase === "deleting") {
      return "role";
    }
    if (LOOP_USP && (uspPhase === "typing" || uspPhase === "deleting")) {
      return "usp";
    }
    return null;
  })();

  return (
    <Section id="home" isHero>
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 py-8 font-cockpit overflow-x-clip">
        {/* Photo: above text on mobile (order-1), next to text on desktop (lg:order-2) */}
        <div className="order-1 lg:order-2 flex-shrink-0">
          <div className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 aspect-square relative flex items-center justify-center">
            {/* Decorative Aviation Backdrop (z-0, behind z-10 cutout portrait) */}
            <PortraitAviationBackdrop
              shouldReduceMotion={Boolean(shouldReduceMotion)}
            />

            {imgError ? (
              <div
                aria-label="Omar Ibrahim"
                className="relative z-10 w-full h-full text-accent flex items-center justify-center text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight select-none"
              >
                OI
              </div>
            ) : (
              <div
                className="relative z-10 w-full h-full"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, #000 0%, #000 75%, rgba(0,0,0,0.45) 88%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, #000 0%, #000 75%, rgba(0,0,0,0.45) 88%, transparent 100%)",
                }}
              >
                <img
                  src="/me.png"
                  alt="Omar Ibrahim"
                  className="w-full h-full object-contain block select-none"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                  onError={() => setImgError(true)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Text: below photo on mobile (order-2), next to photo on desktop (lg:order-1) */}
        <div className="relative order-2 lg:order-1 flex-1 min-w-0 w-full text-center lg:text-start">
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
              <span className="inline-block w-[1em] ms-1" />
            </span>
            <span aria-hidden="true" className="col-start-1 row-start-1">
              {displayedGreeting}
              <AnimatePresence>
                {cursorLine === "greeting" && (
                  <AirplaneCursor isRtl={isRtl} isDeleting={false} />
                )}
              </AnimatePresence>
            </span>
          </p>

          {/* 2. "Omar Ibrahim" (largest text - airplane renders at 1em of 4xl..7xl) */}
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
              <span className="inline-block w-[1em] ms-1" />
            </span>
            <span aria-hidden="true" className="col-start-1 row-start-1">
              {displayedName}
              <AnimatePresence>
                {cursorLine === "name" && (
                  <AirplaneCursor isRtl={isRtl} isDeleting={false} />
                )}
              </AnimatePresence>
            </span>
          </h1>

          {/* 3. Alternating Role Line (reserves max height of both phrases + airplane at 1em of xl..3xl) */}
          <h2
            aria-label={rolePhrases[0]}
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6 grid"
          >
            <span className="sr-only">{rolePhrases[0]}</span>
            {rolePhrases.map((phrase) => (
              <span
                key={`reserve-${phrase}`}
                aria-hidden="true"
                className="invisible col-start-1 row-start-1 select-none pointer-events-none"
              >
                {phrase}
                <span className="inline-block w-[1em] ms-1" />
              </span>
            ))}
            <span aria-hidden="true" className="col-start-1 row-start-1">
              {displayedRole}
              <AnimatePresence>
                {cursorLine === "role" && (
                  <AirplaneCursor
                    isRtl={isRtl}
                    isDeleting={rolePhase === "deleting"}
                  />
                )}
              </AnimatePresence>
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
              <span className="inline-block w-[1em] ms-1" />
            </span>
            <span aria-hidden="true" className="col-start-1 row-start-1">
              {displayedUsp}
              <AnimatePresence>
                {cursorLine === "usp" && (
                  <AirplaneCursor
                    isRtl={isRtl}
                    isDeleting={uspPhase === "deleting"}
                  />
                )}
              </AnimatePresence>
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
