import { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { getVisibleNavKeys } from "./Navbar";
import "./FlightPathTracker.css";

const CONTRAIL_OFFSETS = [14, 21, 28, 35];
const CONTRAIL_SIZES = [4, 3.2, 2.4, 1.8];
const CONTRAIL_OPACITIES = [0.55, 0.38, 0.24, 0.12];

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

function getScrollProgress() {
  if (typeof window === "undefined") return 0;
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return 0;
  return clamp(window.scrollY / maxScroll, 0, 1);
}

/**
 * Generates a smooth vertical sine-like flight path SVG string
 * with ~1.5 wiggles (half-waves) per section interval.
 */
function buildFlightPath(width, height, sectionCount) {
  if (width <= 0 || height <= 0) return "";
  const padY = 16;
  const yStart = padY;
  const yEnd = Math.max(padY + 40, height - padY);
  const span = yEnd - yStart;
  const cx = width / 2;
  const amplitude = Math.min(10.5, Math.max(7, width * 0.18));
  const halfWaves = Math.max(1, sectionCount - 1) * 1.5;
  const totalAngle = halfWaves * Math.PI;
  const steps = Math.max(64, Math.round(span / 5));

  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    pts.push({
      x: cx + amplitude * Math.sin(t * totalAngle),
      y: yStart + t * span,
    });
  }

  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(
      2
    )} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }

  return d;
}

/**
 * Decorative flight level from scroll progress:
 * - 0%..25%: climbs 000 -> 350 (CLIMB)
 * - 25%..80%: stays 350 (CRUISE)
 * - 80%..100%: descends 350 -> 000 (DESCENT)
 */
function computeFlightTelemetry(progress) {
  const p = clamp(progress, 0, 1);
  let rawFL;
  let phase;

  if (p <= 0.25) {
    rawFL = (p / 0.25) * 350;
    phase = "climb";
  } else if (p <= 0.8) {
    rawFL = 350;
    phase = "cruise";
  } else {
    rawFL = ((1 - p) / 0.2) * 350;
    phase = "descent";
  }

  const fl = clamp(Math.round(rawFL / 5) * 5, 0, 350);
  return {
    flText: `FL ${String(fl).padStart(3, "0")}`,
    phase,
  };
}

function AirplaneSvg() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
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

export default function FlightPathTracker() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const navKeys = useMemo(() => getVisibleNavKeys(t), [t]);
  const totalSections = navKeys.length;

  const [trackSize, setTrackSize] = useState({ width: 56, height: 0 });
  const [waypoints, setWaypoints] = useState([]);
  const [passedCount, setPassedCount] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState("climb");

  const trackRef = useRef(null);
  const basePathRef = useRef(null);
  const activePathRef = useRef(null);
  const planeRef = useRef(null);
  const contrailRefs = useRef([]);
  const flLabelRef = useRef(null);

  const totalLengthRef = useRef(0);
  const waypointsRef = useRef([]);
  const phaseRef = useRef("climb");
  const passedCountRef = useRef(1);

  const rawProgress = useMotionValue(0);
  const springProgress = useSpring(rawProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.5,
  });

  const pathD = useMemo(
    () => buildFlightPath(trackSize.width, trackSize.height, totalSections),
    [trackSize.width, trackSize.height, totalSections]
  );

  // Apply visual updates directly to DOM (transform / opacity / stroke-dashoffset only)
  const applyProgressToVisuals = useCallback(
    (progressValue) => {
      const p = clamp(progressValue, 0, 1);

      // Update flight level readout & phase label
      const { flText, phase: nextPhase } = computeFlightTelemetry(p);
      if (flLabelRef.current && flLabelRef.current.textContent !== flText) {
        flLabelRef.current.textContent = flText;
      }
      if (phaseRef.current !== nextPhase) {
        phaseRef.current = nextPhase;
        setPhase(nextPhase);
      }

      // Update passed waypoints count only when it changes
      const wps = waypointsRef.current;
      if (wps.length > 0) {
        let nextPassed = 0;
        for (let i = 0; i < wps.length; i++) {
          if (p >= wps[i].fraction - 0.004) {
            nextPassed = i + 1;
          }
        }
        nextPassed = Math.max(1, nextPassed);
        if (passedCountRef.current !== nextPassed) {
          passedCountRef.current = nextPassed;
          setPassedCount(nextPassed);
        }
      }

      const pathEl = basePathRef.current;
      const totalLen = totalLengthRef.current;
      if (!pathEl || totalLen <= 0) return;

      // Flown path stroke-dashoffset
      if (activePathRef.current) {
        activePathRef.current.style.strokeDashoffset = (
          totalLen *
          (1 - p)
        ).toFixed(2);
      }

      // Airplane position & tangent rotation (SVG nose points up -> +90deg)
      const len = p * totalLen;
      const pt = pathEl.getPointAtLength(len);
      const delta = Math.min(2, totalLen * 0.004);
      const p1 = pathEl.getPointAtLength(Math.max(0, len - delta));
      const p2 = pathEl.getPointAtLength(Math.min(totalLen, len + delta));
      const angleDeg =
        Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI) + 90;

      if (planeRef.current) {
        planeRef.current.style.transform = `translate3d(${pt.x.toFixed(
          2
        )}px, ${pt.y.toFixed(2)}px, 0) translate(-50%, -50%) rotate(${angleDeg.toFixed(
          1
        )}deg)`;
        planeRef.current.style.opacity = "1";
      }

      // Fading contrail dots behind the airplane along the curve
      if (!shouldReduceMotion) {
        for (let i = 0; i < CONTRAIL_OFFSETS.length; i++) {
          const dotEl = contrailRefs.current[i];
          if (!dotEl) continue;
          const dotLen = len - CONTRAIL_OFFSETS[i];
          if (dotLen < 0) {
            dotEl.style.opacity = "0";
          } else {
            const dotPt = pathEl.getPointAtLength(dotLen);
            dotEl.style.transform = `translate3d(${dotPt.x.toFixed(
              2
            )}px, ${dotPt.y.toFixed(2)}px, 0) translate(-50%, -50%)`;
            dotEl.style.opacity = String(CONTRAIL_OPACITIES[i]);
          }
        }
      }
    },
    [shouldReduceMotion]
  );

  // Measure track container after fonts & layout are ready, and recompute on resize
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let cancelled = false;
    let rafId = null;

    const measure = () => {
      if (cancelled || !trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const nextWidth = Math.round(rect.width);
      const nextHeight = Math.round(rect.height);
      if (nextWidth > 0 && nextHeight > 0) {
        setTrackSize((prev) =>
          prev.width === nextWidth && prev.height === nextHeight
            ? prev
            : { width: nextWidth, height: nextHeight }
        );
      }
    };

    const scheduleMeasure = () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(measure);
    };

    scheduleMeasure();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scheduleMeasure).catch(() => {});
    }

    const ro = new ResizeObserver(scheduleMeasure);
    ro.observe(el);

    return () => {
      cancelled = true;
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  // Recompute total path length and evenly spaced waypoint coordinates when path changes
  useLayoutEffect(() => {
    const pathEl = basePathRef.current;
    if (!pathEl || !pathD) {
      totalLengthRef.current = 0;
      return;
    }

    const totalLen = pathEl.getTotalLength();
    totalLengthRef.current = totalLen;

    if (activePathRef.current) {
      activePathRef.current.style.strokeDasharray = totalLen.toFixed(2);
    }

    const computedWaypoints = navKeys.map((key, idx) => {
      const fraction =
        navKeys.length > 1 ? idx / (navKeys.length - 1) : 0;
      const pt = pathEl.getPointAtLength(fraction * totalLen);
      return { key, x: pt.x, y: pt.y, fraction };
    });

    waypointsRef.current = computedWaypoints;
    setWaypoints(computedWaypoints);

    const currentProgress = shouldReduceMotion
      ? rawProgress.get()
      : springProgress.get();
    applyProgressToVisuals(currentProgress);
  }, [
    pathD,
    navKeys,
    shouldReduceMotion,
    rawProgress,
    springProgress,
    applyProgressToVisuals,
  ]);

  // Listen to scroll and resize to update rawProgress (0..1)
  useEffect(() => {
    const updateScroll = () => {
      rawProgress.set(getScrollProgress());
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });

    const bodyRo = new ResizeObserver(updateScroll);
    bodyRo.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      bodyRo.disconnect();
    };
  }, [rawProgress]);

  // Drive visuals from springProgress (or directly from rawProgress under reduced motion)
  useEffect(() => {
    const source = shouldReduceMotion ? rawProgress : springProgress;
    applyProgressToVisuals(source.get());
    const unsubscribe = source.on("change", applyProgressToVisuals);
    return unsubscribe;
  }, [shouldReduceMotion, rawProgress, springProgress, applyProgressToVisuals]);

  // Track current section whose top is closest to the middle of the viewport via IntersectionObserver
  useEffect(() => {
    const elements = navKeys
      .map((key) => document.getElementById(key))
      .filter(Boolean);

    if (elements.length === 0) return;

    const pickClosestSection = () => {
      const scrollY = window.scrollY;
      if (scrollY <= 10) {
        setActiveIndex(0);
        return;
      }
      if (
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 10
      ) {
        setActiveIndex(navKeys.length - 1);
        return;
      }

      const viewportMid = window.innerHeight / 2;
      let bestIdx = 0;
      let bestDist = Infinity;

      for (let i = 0; i < navKeys.length; i++) {
        const el = document.getElementById(navKeys[i]);
        if (!el) continue;
        const dist = Math.abs(el.getBoundingClientRect().top - viewportMid);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }

      setActiveIndex(bestIdx);
    };

    const thresholds = Array.from({ length: 11 }, (_, i) => i / 10);
    const observer = new IntersectionObserver(pickClosestSection, {
      threshold: thresholds,
    });

    elements.forEach((el) => observer.observe(el));
    pickClosestSection();

    return () => observer.disconnect();
  }, [navKeys]);

  const handleWaypointClick = (key) => {
    const el = document.getElementById(key);
    el?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  const labels = t.flightTracker || {
    ariaLabel: "Page progress",
    phases: {
      climb: "CLIMB",
      cruise: "CRUISE",
      descent: "DESCENT",
    },
  };

  const phaseText = labels.phases?.[phase] || phase.toUpperCase();
  const counterText = `${String(activeIndex + 1).padStart(2, "0")}/${String(
    totalSections
  ).padStart(2, "0")}`;

  return (
    <aside
      aria-label={labels.ariaLabel}
      data-hide-plane-cursor="true"
      className="flight-tracker-panel"
    >
      {/* Top Flight Level Readout */}
      <div className="flex flex-col items-center leading-none gap-0.5 px-1">
        <span
          ref={flLabelRef}
          dir="ltr"
          className="flight-tracker-mono text-[9.5px] font-bold tracking-tight text-accent dark:text-blue-400 whitespace-nowrap"
        >
          FL 000
        </span>
        <span className="font-cockpit text-[7.5px] font-semibold tracking-wider rtl:tracking-normal text-slate-500 dark:text-slate-400 uppercase whitespace-nowrap">
          {phaseText}
        </span>
      </div>

      {/* Winding Vertical Flight Path + Waypoints + Moving Airplane */}
      <div ref={trackRef} className="relative flex-1 w-full my-1.5">
        {trackSize.height > 0 && pathD && (
          <svg
            width={trackSize.width}
            height={trackSize.height}
            viewBox={`0 0 ${trackSize.width} ${trackSize.height}`}
            fill="none"
            className="block w-full h-full overflow-visible"
            aria-hidden="true"
          >
            {/* Upcoming path ahead: dotted, low-opacity */}
            <path
              ref={basePathRef}
              d={pathD}
              className="stroke-accent dark:stroke-blue-400"
              strokeOpacity="0.28"
              strokeWidth="1.75"
              strokeDasharray="2 5"
              strokeLinecap="round"
            />

            {/* Already flown path: solid accent stroke driven by stroke-dashoffset */}
            <path
              ref={activePathRef}
              d={pathD}
              className="stroke-accent dark:stroke-blue-400"
              strokeWidth="2.25"
              strokeLinecap="round"
              style={{ strokeDashoffset: totalLengthRef.current || 0 }}
            />
          </svg>
        )}

        {/* Waypoint Buttons (only interactive elements with pointer-events) */}
        {waypoints.map((wp, idx) => {
          const isPassed = idx < passedCount;
          const isCurrent = idx === activeIndex;
          const sectionName = t.nav?.[wp.key] || wp.key;

          return (
            <button
              key={wp.key}
              type="button"
              data-flight-waypoint="true"
              data-hide-plane-cursor="true"
              aria-label={sectionName}
              aria-current={isCurrent ? "location" : undefined}
              onClick={() => handleWaypointClick(wp.key)}
              style={{
                left: 0,
                top: 0,
                transform: `translate3d(${wp.x.toFixed(2)}px, ${wp.y.toFixed(
                  2
                )}px, 0) translate(-50%, -50%)`,
              }}
              className="flight-tracker-waypoint pointer-events-auto absolute w-5 h-5 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:focus-visible:ring-blue-400"
            >
              <span
                aria-hidden="true"
                className={`block rounded-full transition-transform duration-150 motion-reduce:transition-none ${
                  isCurrent ? "w-2.5 h-2.5 scale-110" : "w-2 h-2"
                } ${
                  isPassed
                    ? "bg-accent dark:bg-blue-400 border border-accent dark:border-blue-400"
                    : "bg-white/90 dark:bg-slate-950/90 border-[1.5px] border-accent/60 dark:border-blue-400/60"
                }`}
              />
              <span role="tooltip" className="flight-tracker-tooltip">
                {sectionName}
              </span>
            </button>
          );
        })}

        {/* Fading Contrail Dots (disabled under prefers-reduced-motion) */}
        {!shouldReduceMotion &&
          CONTRAIL_OFFSETS.map((_, idx) => (
            <span
              key={idx}
              ref={(el) => {
                contrailRefs.current[idx] = el;
              }}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 rounded-full bg-accent dark:bg-blue-400 will-change-transform"
              style={{
                width: `${CONTRAIL_SIZES[idx]}px`,
                height: `${CONTRAIL_SIZES[idx]}px`,
                opacity: 0,
              }}
            />
          ))}

        {/* Moving Airplane Head */}
        <div
          ref={planeRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 w-7 h-7 flex items-center justify-center will-change-transform"
          style={{ opacity: 0 }}
        >
          {!shouldReduceMotion && <span className="flight-tracker-glow" />}
          <span className="relative z-10 block">
            <AirplaneSvg />
          </span>
        </div>
      </div>

      {/* Bottom Section Counter (01/09) */}
      <span
        dir="ltr"
        className="flight-tracker-mono text-[9.5px] font-bold tracking-tight text-slate-600 dark:text-slate-300"
      >
        {counterText}
      </span>
    </aside>
  );
}
