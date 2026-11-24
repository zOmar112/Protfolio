import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const SCROLL_SHOW_THRESHOLD = 600;
const MIN_DURATION_MS = 1100;
const MAX_DURATION_MS = 2600;
const SCROLL_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
]);

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

function easeInCubic(t) {
  return t * t * t;
}

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
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const [visible, setVisible] = useState(false);
  const [isFlying, setIsFlying] = useState(false);

  const wrapperRef = useRef(null);
  const planeRef = useRef(null);
  const glowRef = useRef(null);
  const trailRef = useRef(null);

  const isFlyingRef = useRef(false);
  const rafIdRef = useRef(null);
  const resetTimerRef = useRef(null);
  const prevScrollBehaviorRef = useRef(null);
  const detachInterruptRef = useRef(null);

  const label = t.backToTop?.label || "Back to top";

  const restoreScrollBehavior = useCallback(() => {
    if (prevScrollBehaviorRef.current !== null) {
      document.documentElement.style.scrollBehavior =
        prevScrollBehaviorRef.current;
      prevScrollBehaviorRef.current = null;
    }
  }, []);

  const resetVisuals = useCallback((smooth = false) => {
    const wrapper = wrapperRef.current;
    const plane = planeRef.current;
    const glow = glowRef.current;
    const trail = trailRef.current;

    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }

    if (wrapper) {
      wrapper.style.transition = smooth
        ? "transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease-out"
        : "";
      wrapper.style.transform = "translate3d(0, 0, 0) scale(1)";
    }
    if (plane) {
      plane.style.transition = smooth ? "transform 0.28s ease-out" : "";
      plane.style.transform = "rotate(-12deg)";
    }
    if (glow) {
      glow.style.transition = smooth
        ? "opacity 0.25s ease-out, transform 0.25s ease-out"
        : "";
      glow.style.opacity = "0";
      glow.style.transform = "scale(0.8)";
    }
    if (trail) {
      trail.style.transition = smooth
        ? "opacity 0.2s ease-out, transform 0.2s ease-out"
        : "";
      trail.style.opacity = "0";
      trail.style.transform = "translateX(-50%) scaleY(0.1)";
    }

    if (smooth) {
      resetTimerRef.current = window.setTimeout(() => {
        if (wrapperRef.current) wrapperRef.current.style.transition = "";
        if (planeRef.current) planeRef.current.style.transition = "";
        if (glowRef.current) glowRef.current.style.transition = "";
        if (trailRef.current) trailRef.current.style.transition = "";
        resetTimerRef.current = null;
      }, 340);
    }
  }, []);

  const stopFlight = useCallback(
    ({ interrupted = false } = {}) => {
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (detachInterruptRef.current) {
        detachInterruptRef.current();
        detachInterruptRef.current = null;
      }
      restoreScrollBehavior();
      isFlyingRef.current = false;
      setIsFlying(false);
      setVisible(window.scrollY > SCROLL_SHOW_THRESHOLD);
      // Only reset visuals in-place on interruption; on normal completion the plane is
      // already off-screen above the top edge and unmounts cleanly without flashing at the bottom.
      if (interrupted) {
        resetVisuals(true);
      }
    },
    [restoreScrollBehavior, resetVisuals]
  );

  // Track normal scroll visibility when not flying
  useEffect(() => {
    const handleScroll = () => {
      if (isFlyingRef.current) return;
      setVisible(window.scrollY > SCROLL_SHOW_THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cleanup everything cleanly on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
      if (detachInterruptRef.current) {
        detachInterruptRef.current();
      }
      restoreScrollBehavior();
    };
  }, [restoreScrollBehavior]);

  const handleBackToTop = () => {
    // Ignore extra clicks while already flying
    if (isFlyingRef.current) return;

    const startY = window.scrollY;
    if (startY <= 0) return;

    // Reduced motion: instant jump to top with no flying animation
    if (shouldReduceMotion) {
      const prev = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = prev;
      setVisible(false);
      return;
    }

    // Temporarily override html scroll-behavior to auto so rAF has exact frame control
    prevScrollBehaviorRef.current =
      document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    isFlyingRef.current = true;
    setIsFlying(true);

    // Clear any lingering reset transitions before starting frame updates
    if (wrapperRef.current) wrapperRef.current.style.transition = "";
    if (planeRef.current) planeRef.current.style.transition = "";
    if (glowRef.current) glowRef.current.style.transition = "";
    if (trailRef.current) trailRef.current.style.transition = "";

    const duration = clamp(startY / 2.2, MIN_DURATION_MS, MAX_DURATION_MS);
    const travelDistance = window.innerHeight + 80;
    let startTime = null;
    let lastExpectedY = startY;

    // Cancel immediately on any manual user scroll input
    const onInterrupt = () => {
      if (!isFlyingRef.current) return;
      stopFlight({ interrupted: true });
    };

    const onKeyDown = (e) => {
      if (SCROLL_KEYS.has(e.key)) {
        onInterrupt();
      }
    };

    window.addEventListener("wheel", onInterrupt, { passive: true });
    window.addEventListener("touchstart", onInterrupt, { passive: true });
    window.addEventListener("touchmove", onInterrupt, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    detachInterruptRef.current = () => {
      window.removeEventListener("wheel", onInterrupt);
      window.removeEventListener("touchstart", onInterrupt);
      window.removeEventListener("touchmove", onInterrupt);
      window.removeEventListener("keydown", onKeyDown);
    };

    const step = (timestamp) => {
      if (!isFlyingRef.current) return;

      if (startTime === null) {
        startTime = timestamp;
      } else {
        // Detect manual scrollbar dragging via unexpected scrollY deviation
        if (Math.abs(window.scrollY - lastExpectedY) > 18) {
          stopFlight({ interrupted: true });
          return;
        }
      }

      const elapsed = timestamp - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = easeInCubic(t);
      // Normalized instantaneous speed from derivative of easeInCubic (3t^2 -> t^2 in [0,1])
      const speed = t * t;

      const nextY = t >= 1 ? 0 : Math.max(0, Math.round(startY * (1 - eased)));
      lastExpectedY = nextY;
      window.scrollTo(0, nextY);

      // Move plane up in sync with scroll progress, scaling up to 1.25
      const translateY = -travelDistance * eased;
      const scale = 1 + 0.25 * Math.pow(t, 1.4);
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate3d(0, ${translateY.toFixed(
          2
        )}px, 0) scale(${scale.toFixed(3)})`;
      }

      // Rotate plane smoothly to point straight up (0deg) during initial lift-off
      const rot = -12 * Math.max(0, 1 - t / 0.16);
      if (planeRef.current) {
        planeRef.current.style.transform = `rotate(${rot.toFixed(1)}deg)`;
      }

      // Soft glow intensifies with speed (transform + opacity only)
      if (glowRef.current) {
        glowRef.current.style.opacity = (0.18 + 0.72 * speed).toFixed(3);
        glowRef.current.style.transform = `scale(${(0.85 + 0.65 * speed).toFixed(
          3
        )})`;
      }

      // Fading contrail line & dots elongate behind the plane as speed increases
      if (trailRef.current) {
        trailRef.current.style.opacity = Math.min(1, 0.15 + speed * 1.25).toFixed(
          3
        );
        trailRef.current.style.transform = `translateX(-50%) scaleY(${(
          0.18 +
          1.35 * speed
        ).toFixed(3)})`;
      }

      if (t < 1) {
        rafIdRef.current = window.requestAnimationFrame(step);
      } else {
        window.scrollTo(0, 0);
        stopFlight({ interrupted: false });
      }
    };

    rafIdRef.current = window.requestAnimationFrame(step);
  };

  const shouldRender = visible || isFlying;

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          key="back-to-top"
          initial={
            shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.9 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }
          }
          transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-40"
        >
          {/* GPU-animated flight wrapper (transform/opacity only) */}
          <div
            ref={wrapperRef}
            className="relative will-change-transform"
            style={{ transform: "translate3d(0, 0, 0) scale(1)" }}
          >
            {/* Speed-reactive soft glow behind button */}
            <span
              ref={glowRef}
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2.5 rounded-full bg-accent/65 dark:bg-blue-400/60 blur-md will-change-transform"
              style={{ opacity: 0, transform: "scale(0.8)" }}
            />

            {/* Fading contrail line & dots trailing behind the ascending plane */}
            <div
              ref={trailRef}
              aria-hidden="true"
              className="pointer-events-none absolute top-full left-1/2 origin-top flex flex-col items-center gap-1.5 pt-1 will-change-transform"
              style={{
                opacity: 0,
                transform: "translateX(-50%) scaleY(0.1)",
              }}
            >
              <span className="block w-[3px] h-14 rounded-full bg-gradient-to-b from-blue-300/90 via-accent/65 to-transparent dark:from-sky-200/95 dark:via-blue-400/55 dark:to-transparent" />
              <span className="block w-1.5 h-1.5 rounded-full bg-blue-300/75 dark:bg-sky-200/75" />
              <span className="block w-1 h-1 rounded-full bg-accent/55 dark:bg-blue-300/55" />
              <span className="block w-0.5 h-0.5 rounded-full bg-accent/35 dark:bg-blue-300/35" />
            </div>

            {/* Accessible 44x44 round button */}
            <button
              type="button"
              onClick={handleBackToTop}
              aria-label={label}
              title={label}
              className={`relative w-11 h-11 rounded-full bg-accent text-white shadow-lg shadow-blue-600/25 border border-blue-400/40 flex items-center justify-center cursor-pointer transition-transform duration-200 hover:opacity-95 ${
                isFlying
                  ? "pointer-events-none"
                  : "hover:-translate-y-1 motion-reduce:hover:translate-y-0"
              } motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent dark:focus-visible:ring-offset-gray-950`}
            >
              <span
                ref={planeRef}
                className="block will-change-transform"
                style={{
                  transform: shouldReduceMotion ? "rotate(0deg)" : "rotate(-12deg)",
                }}
              >
                <PlaneUpSvg />
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
