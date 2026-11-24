import { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";

// Easily switch on the CV link later: provide a non-empty string URL (e.g. "/cv.pdf")
const CV_URL = "";

// Set to true to also loop the USP paragraph (hold 6s -> reverse hide -> reveal again)
const LOOP_USP = false;

const PLANE_PATH =
  "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";

const GREETING_DUR_MS = 600;
const NAME_DUR_MS = 600;
const ROLE_LINE_DUR_MS = 620;
const ROLE_HOLD_MS = 2200;
const USP_LINE_DUR_MS = 700;
const USP_HOLD_MS = 6000;
const DIVE_DUR_MS = 300;
const UTURN_DUR_MS = 360;
const EXIT_DUR_MS = 460;

// Gentle cruise easing so plane moves smoothly across each line
function cruiseEase(t) {
  return 0.82 * t + 0.18 * (0.5 - 0.5 * Math.cos(Math.PI * t));
}

// Evaluate cubic Bezier point & tangent angle (deg, where plane nose points UP at 0deg)
function evalCubicBezier(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;
  const x =
    mt2 * mt * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t2 * t * p3.x;
  const y =
    mt2 * mt * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t2 * t * p3.y;
  const dx =
    3 * mt2 * (p1.x - p0.x) +
    6 * mt * t * (p2.x - p1.x) +
    3 * t2 * (p3.x - p2.x);
  const dy =
    3 * mt2 * (p1.y - p0.y) +
    6 * mt * t * (p2.y - p1.y) +
    3 * t2 * (p3.y - p2.y);
  const deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
  return { x, y, deg };
}

// Measure wrapped visual lines of a container holding word <span>s relative to heroRoot
function measureVisualLines(measureEl, heroRootEl) {
  if (!measureEl || !heroRootEl) return [];
  const rootRect = heroRootEl.getBoundingClientRect();
  const wordEls = measureEl.querySelectorAll("[data-word]");
  if (!wordEls.length) return [];

  const groups = [];
  wordEls.forEach((el) => {
    const top = el.offsetTop;
    const rect = el.getBoundingClientRect();
    const word = el.getAttribute("data-word") || "";
    const last = groups[groups.length - 1];
    if (!last || Math.abs(top - last.offsetTop) > 5) {
      groups.push({
        offsetTop: top,
        words: [word],
        minLeft: rect.left,
        maxRight: rect.right,
        minTop: rect.top,
        maxBottom: rect.bottom,
      });
    } else {
      last.words.push(word);
      if (rect.left < last.minLeft) last.minLeft = rect.left;
      if (rect.right > last.maxRight) last.maxRight = rect.right;
      if (rect.top < last.minTop) last.minTop = rect.top;
      if (rect.bottom > last.maxBottom) last.maxBottom = rect.bottom;
    }
  });

  return groups.map((g) => ({
    text: g.words.join(" "),
    left: g.minLeft - rootRect.left,
    right: g.maxRight - rootRect.left,
    top: g.minTop - rootRect.top,
    width: Math.max(1, g.maxRight - g.minLeft),
    height: Math.max(1, g.maxBottom - g.minTop),
  }));
}

function setLineClip(el, progress, isRtl) {
  if (!el) return;
  const p = Math.min(1, Math.max(0, progress));
  if (p >= 0.999) {
    el.style.clipPath = "inset(0 0% 0 0%)";
    return;
  }
  const hiddenPct = ((1 - p) * 100).toFixed(2);
  el.style.clipPath = isRtl
    ? `inset(0 0 0 ${hiddenPct}%)`
    : `inset(0 ${hiddenPct}% 0 0)`;
}

function setPlanePose(el, x, y, deg, opacity = 1) {
  if (!el) return;
  el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${deg.toFixed(1)}deg)`;
  el.style.opacity = opacity.toFixed(3);
}

/* Reusable Plane + Fading Contrail Overlay (transform & opacity only) */
function RevealPlane({ planeRef }) {
  return (
    <div
      ref={planeRef}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 z-20 will-change-transform"
      style={{
        width: 24,
        height: 24,
        marginLeft: -12,
        marginTop: -12,
        opacity: 0,
        transform: "translate3d(0px, 0px, 0) rotate(90deg)",
      }}
    >
      {/* Short fading contrail behind tail (+y in local plane coords) */}
      <span
        className="pointer-events-none absolute left-1/2 top-[20px] -translate-x-1/2 block w-[2px] h-11 rounded-full bg-gradient-to-b from-accent/70 via-accent/25 to-transparent dark:from-blue-400/75 dark:via-blue-400/25 dark:to-transparent"
      />
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 block text-accent dark:text-blue-400 drop-shadow-[0_0_6px_rgba(37,99,235,0.45)]"
        fill="currentColor"
      >
        <path d={PLANE_PATH} />
      </svg>
    </div>
  );
}

/* Renders word-measured invisible height reservation + clipped visual line spans */
function RevealLines({ text, lines, lineRefs, measureRef, instant }) {
  const words = text.split(" ");

  return (
    <>
      <span className="sr-only">{text}</span>

      {/* Invisible word-wrapped copy reserves exact height & provides ResizeObserver line boxes */}
      <span
        ref={measureRef}
        aria-hidden="true"
        className="invisible col-start-1 row-start-1 select-none pointer-events-none"
      >
        {words.map((word, idx) => (
          <span key={`${word}-${idx}`} data-word={word}>
            {word}
            {idx < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>

      {/* Animated clipped visual lines */}
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {instant || lines.length === 0 ? (
          <span style={{ opacity: instant ? 1 : 0 }}>{text}</span>
        ) : (
          lines.map((line, idx) => (
            <span key={`${line.text}-${idx}`} className="block">
              <span
                ref={(node) => {
                  lineRefs.current[idx] = node;
                }}
                className="inline-block will-change-[clip-path]"
                style={{
                  clipPath: "inset(0 100% 0 0)",
                }}
              >
                {line.text}
              </span>
            </span>
          ))
        )}
      </span>
    </>
  );
}

export default function Home() {
  const { t, lang } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const isRtl = lang === "ar";

  const [imgError, setImgError] = useState(false);
  const [cvDialogOpen, setCvDialogOpen] = useState(false);
  const [rolePhraseIdx, setRolePhraseIdx] = useState(0);

  const cvButtonRef = useRef(null);
  const dialogConfirmButtonRef = useRef(null);

  const greetingText = t.home.greeting;
  const nameText = t.home.name;
  const rolePhrases = [t.home.role, t.home.roleAlt || t.home.role];
  const activeRoleText = rolePhrases[rolePhraseIdx] || rolePhrases[0];
  const uspText = t.home.usp;

  const isReducedInitial =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // CTA visibility: fades in after USP finishes, or immediately on any user interaction
  const [showCtas, setShowCtas] = useState(isReducedInitial);

  // DOM refs for measurement & GPU-only animation updates
  const heroTextRef = useRef(null);
  const greetingMeasureRef = useRef(null);
  const nameMeasureRef = useRef(null);
  const roleMeasureRef = useRef(null);
  const uspMeasureRef = useRef(null);

  const greetingLineRefs = useRef([]);
  const nameLineRefs = useRef([]);
  const roleLineRefs = useRef([]);
  const uspLineRefs = useRef([]);

  const mainPlaneRef = useRef(null);
  const rolePlaneRef = useRef(null);

  // Measured visual lines state
  const [greetingLines, setGreetingLines] = useState([]);
  const [nameLines, setNameLines] = useState([]);
  const [roleLines, setRoleLines] = useState([]);
  const [uspLines, setUspLines] = useState([]);

  // Latest measured lines in refs so rAF loops always read up-to-date coordinates on resize
  const linesRef = useRef({
    greeting: [],
    name: [],
    role: [],
    usp: [],
  });

  // Track completion state so resize/language change doesn't hide already-revealed static lines
  const revealedStateRef = useRef({
    greeting: isReducedInitial,
    name: isReducedInitial,
    usp: isReducedInitial,
    introDone: isReducedInitial,
  });

  const [roleLoopReady, setRoleLoopReady] = useState(false);
  const [uspLoopReady, setUspLoopReady] = useState(false);
  const roleNeedsRevealRef = useRef(false);

  const isHiddenRef = useRef(
    typeof document !== "undefined" && document.visibilityState === "hidden"
  );

  // Track tab visibility to pause rAF loops cleanly while tab is hidden
  useEffect(() => {
    const onVisibility = () => {
      isHiddenRef.current = document.visibilityState === "hidden";
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Show CTA buttons immediately on any user interaction
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
    revealedStateRef.current = {
      greeting: true,
      name: true,
      usp: true,
      introDone: true,
    };
    setShowCtas(true);
  }, [shouldReduceMotion]);

  // Measure all 4 text blocks into visual wrapped lines
  const measureAll = useCallback(() => {
    const root = heroTextRef.current;
    if (!root) return;
    const g = measureVisualLines(greetingMeasureRef.current, root);
    const n = measureVisualLines(nameMeasureRef.current, root);
    const r = measureVisualLines(roleMeasureRef.current, root);
    const u = measureVisualLines(uspMeasureRef.current, root);

    linesRef.current = { greeting: g, name: n, role: r, usp: u };
    setGreetingLines(g);
    setNameLines(n);
    setRoleLines(r);
    setUspLines(u);
  }, []);

  // Measure on mount, text/lang/role change, ResizeObserver, and document.fonts.ready
  useLayoutEffect(() => {
    measureAll();
    let mounted = true;

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            if (mounted) measureAll();
          })
        : null;

    if (ro && heroTextRef.current) {
      ro.observe(heroTextRef.current);
    }

    document.fonts?.ready?.then(() => {
      if (mounted) measureAll();
    });

    return () => {
      mounted = false;
      ro?.disconnect();
    };
  }, [measureAll, greetingText, nameText, activeRoleText, uspText, lang]);

  // Ensure already-revealed static lines stay 100% visible after line re-measurement
  useLayoutEffect(() => {
    if (shouldReduceMotion) return;
    if (revealedStateRef.current.greeting) {
      greetingLineRefs.current.forEach((el) => setLineClip(el, 1, isRtl));
    }
    if (revealedStateRef.current.name) {
      nameLineRefs.current.forEach((el) => setLineClip(el, 1, isRtl));
    }
    if (revealedStateRef.current.usp && !LOOP_USP) {
      uspLineRefs.current.forEach((el) => setLineClip(el, 1, isRtl));
    }
  }, [greetingLines, nameLines, uspLines, isRtl, shouldReduceMotion]);

  // Helper: run a pausable rAF segment for durationMs, calling onFrame(t in [0..1])
  const runSegment = useCallback((durationMs, onFrame, cancelToken) => {
    return new Promise((resolve) => {
      let elapsed = 0;
      let lastNow = null;

      const tick = (now) => {
        if (cancelToken.cancelled) {
          resolve(false);
          return;
        }
        if (isHiddenRef.current) {
          lastNow = null;
          cancelToken.rafId = window.requestAnimationFrame(tick);
          return;
        }
        if (lastNow !== null) {
          elapsed += Math.min(50, now - lastNow);
        }
        lastNow = now;
        const t = durationMs <= 0 ? 1 : Math.min(1, elapsed / durationMs);
        onFrame(t);
        if (t < 1) {
          cancelToken.rafId = window.requestAnimationFrame(tick);
        } else {
          resolve(true);
        }
      };

      cancelToken.rafId = window.requestAnimationFrame(tick);
    });
  }, []);

  // Helper: fly plane along a single line (forward: 0->1, reverse: 1->0)
  const flyLine = useCallback(
    async ({
      planeEl,
      getLine,
      getLineEl,
      durationMs,
      forward,
      rtl,
      cancelToken,
    }) => {
      const dir = rtl ? -1 : 1;
      const travelDir = forward ? dir : -dir;
      const deg = travelDir > 0 ? 90 : -90;

      return runSegment(
        durationMs,
        (t) => {
          const line = getLine();
          const lineEl = getLineEl();
          if (!line) return;
          const eased = cruiseEase(t);
          const progress = forward ? eased : 1 - eased;
          const x = rtl
            ? line.right - progress * line.width
            : line.left + progress * line.width;
          const y = line.top + line.height * 0.5;
          setLineClip(lineEl, progress, rtl);
          setPlanePose(planeEl, x, y, deg, 1);
        },
        cancelToken
      );
    },
    [runSegment]
  );

  // Helper: short curved dive between two line endpoints
  const flyDive = useCallback(
    async ({ planeEl, fromPt, toPt, rtl, cancelToken }) => {
      const dir = rtl ? -1 : 1;
      const p0 = fromPt;
      const p3 = toPt;
      const p1 = { x: p0.x + dir * 26, y: p0.y + 18 };
      const p2 = { x: p3.x - dir * 26, y: p3.y - 10 };

      return runSegment(
        DIVE_DUR_MS,
        (t) => {
          const eased = 0.5 - 0.5 * Math.cos(Math.PI * t);
          const pt = evalCubicBezier(p0, p1, p2, p3, eased);
          setPlanePose(planeEl, pt.x, pt.y, pt.deg, 1);
        },
        cancelToken
      );
    },
    [runSegment]
  );

  // Helper: smooth U-turn arc at line end/start
  const flyUTurn = useCallback(
    async ({ planeEl, anchorPt, outwardDir, cancelToken }) => {
      const p0 = anchorPt;
      const p3 = anchorPt;
      const p1 = { x: anchorPt.x + outwardDir * 32, y: anchorPt.y - 18 };
      const p2 = { x: anchorPt.x + outwardDir * 32, y: anchorPt.y + 18 };

      return runSegment(
        UTURN_DUR_MS,
        (t) => {
          const eased = 0.5 - 0.5 * Math.cos(Math.PI * t);
          const pt = evalCubicBezier(p0, p1, p2, p3, eased);
          setPlanePose(planeEl, pt.x, pt.y, pt.deg, 1);
        },
        cancelToken
      );
    },
    [runSegment]
  );

  // 1. One-time Intro Choreography: Greeting -> Name -> Role (first pass) -> USP (line-by-line) -> Fly-off
  useEffect(() => {
    if (shouldReduceMotion) return;
    if (
      greetingLines.length === 0 ||
      nameLines.length === 0 ||
      roleLines.length === 0 ||
      uspLines.length === 0
    ) {
      return;
    }

    // If intro already finished (e.g. language toggled later), keep static lines visible and run role loop
    if (revealedStateRef.current.introDone) {
      greetingLineRefs.current.forEach((el) => setLineClip(el, 1, isRtl));
      nameLineRefs.current.forEach((el) => setLineClip(el, 1, isRtl));
      if (!LOOP_USP) {
        uspLineRefs.current.forEach((el) => setLineClip(el, 1, isRtl));
      }
      setRoleLoopReady(true);
      if (LOOP_USP) setUspLoopReady(true);
      return;
    }

    const cancelToken = { cancelled: false, rafId: null };
    const planeEl = mainPlaneRef.current;

    const getEndpoint = (line, atEnd) => ({
      x: isRtl
        ? atEnd
          ? line.left
          : line.right
        : atEnd
        ? line.right
        : line.left,
      y: line.top + line.height * 0.5,
    });

    (async () => {
      // Reset clips to hidden before starting intro
      greetingLineRefs.current.forEach((el) => setLineClip(el, 0, isRtl));
      nameLineRefs.current.forEach((el) => setLineClip(el, 0, isRtl));
      roleLineRefs.current.forEach((el) => setLineClip(el, 0, isRtl));
      uspLineRefs.current.forEach((el) => setLineClip(el, 0, isRtl));

      const revealBlock = async (key, refs, durPerLine) => {
        const list = linesRef.current[key];
        for (let i = 0; i < list.length; i++) {
          if (cancelToken.cancelled) return false;
          if (i > 0) {
            const prev = linesRef.current[key][i - 1];
            const curr = linesRef.current[key][i];
            if (prev && curr) {
              const ok = await flyDive({
                planeEl,
                fromPt: getEndpoint(prev, true),
                toPt: getEndpoint(curr, false),
                rtl: isRtl,
                cancelToken,
              });
              if (!ok) return false;
            }
          }
          const ok = await flyLine({
            planeEl,
            getLine: () => linesRef.current[key][i],
            getLineEl: () => refs.current[i],
            durationMs: durPerLine,
            forward: true,
            rtl: isRtl,
            cancelToken,
          });
          if (!ok) return false;
        }
        return true;
      };

      // Step 1: Greeting (~0.6s)
      if (!(await revealBlock("greeting", greetingLineRefs, GREETING_DUR_MS))) return;
      revealedStateRef.current.greeting = true;

      // Dive Greeting -> Name
      const lastG = linesRef.current.greeting.at(-1);
      const firstN = linesRef.current.name[0];
      if (lastG && firstN) {
        if (
          !(await flyDive({
            planeEl,
            fromPt: getEndpoint(lastG, true),
            toPt: getEndpoint(firstN, false),
            rtl: isRtl,
            cancelToken,
          }))
        )
          return;
      }

      // Step 2: Name (~0.6s)
      if (!(await revealBlock("name", nameLineRefs, NAME_DUR_MS))) return;
      revealedStateRef.current.name = true;

      // Dive Name -> Role
      const lastN = linesRef.current.name.at(-1);
      const firstR = linesRef.current.role[0];
      if (lastN && firstR) {
        if (
          !(await flyDive({
            planeEl,
            fromPt: getEndpoint(lastN, true),
            toPt: getEndpoint(firstR, false),
            rtl: isRtl,
            cancelToken,
          }))
        )
          return;
      }

      // Step 3: Role first pass
      if (!(await revealBlock("role", roleLineRefs, ROLE_LINE_DUR_MS))) return;

      // Dive Role -> USP
      const lastR = linesRef.current.role.at(-1);
      const firstU = linesRef.current.usp[0];
      if (lastR && firstU) {
        if (
          !(await flyDive({
            planeEl,
            fromPt: getEndpoint(lastR, true),
            toPt: getEndpoint(firstU, false),
            rtl: isRtl,
            cancelToken,
          }))
        )
          return;
      }

      // Step 4: USP line-by-line (~0.7s per line)
      if (!(await revealBlock("usp", uspLineRefs, USP_LINE_DUR_MS))) return;
      revealedStateRef.current.usp = true;

      // Fly off the reading-end edge and fade out
      const lastU = linesRef.current.usp.at(-1);
      if (lastU) {
        const dir = isRtl ? -1 : 1;
        const startPt = getEndpoint(lastU, true);
        const endPt = { x: startPt.x + dir * 115, y: startPt.y - 26 };
        const p1 = { x: startPt.x + dir * 40, y: startPt.y - 2 };
        const p2 = { x: startPt.x + dir * 82, y: startPt.y - 14 };
        await runSegment(
          EXIT_DUR_MS,
          (t) => {
            const pt = evalCubicBezier(startPt, p1, p2, endPt, t);
            setPlanePose(planeEl, pt.x, pt.y, pt.deg, 1 - t);
          },
          cancelToken
        );
      }
      if (planeEl) planeEl.style.opacity = "0";

      revealedStateRef.current.introDone = true;
      setShowCtas(true);
      setRoleLoopReady(true);
      if (LOOP_USP) setUspLoopReady(true);
    })();

    return () => {
      cancelToken.cancelled = true;
      if (cancelToken.rafId !== null) {
        window.cancelAnimationFrame(cancelToken.rafId);
      }
    };
  }, [
    shouldReduceMotion,
    isRtl,
    greetingLines.length > 0,
    nameLines.length > 0,
    roleLines.length > 0,
    uspLines.length > 0,
    flyLine,
    flyDive,
    runSegment,
  ]);

  // 2. Forever-Looping Role Line: hold 2.2s -> U-turn -> reverse hide -> switch phrase -> U-turn -> reveal
  useEffect(() => {
    if (shouldReduceMotion || !roleLoopReady) return;
    if (roleLines.length === 0) return;

    const cancelToken = { cancelled: false, rafId: null };
    const planeEl = rolePlaneRef.current;
    const dir = isRtl ? -1 : 1;

    const getEndpoint = (line, atEnd) => ({
      x: isRtl
        ? atEnd
          ? line.left
          : line.right
        : atEnd
        ? line.right
        : line.left,
      y: line.top + line.height * 0.5,
    });

    (async () => {
      // If arriving from a phrase swap, reveal the newly mounted phrase first
      if (roleNeedsRevealRef.current) {
        roleNeedsRevealRef.current = false;
        const list = linesRef.current.role;
        // Ensure all lines of the new phrase start hidden
        list.forEach((_, idx) => setLineClip(roleLineRefs.current[idx], 0, isRtl));
        // Smooth U-turn at start of first line
        if (list[0]) {
          const startPt = getEndpoint(list[0], false);
          await flyUTurn({
            planeEl,
            anchorPt: startPt,
            outwardDir: -dir,
            cancelToken,
          });
          if (cancelToken.cancelled) return;
        }
        for (let i = 0; i < list.length; i++) {
          if (cancelToken.cancelled) return;
          if (i > 0) {
            const prev = linesRef.current.role[i - 1];
            const curr = linesRef.current.role[i];
            if (prev && curr) {
              const ok = await flyDive({
                planeEl,
                fromPt: getEndpoint(prev, true),
                toPt: getEndpoint(curr, false),
                rtl: isRtl,
                cancelToken,
              });
              if (!ok) return;
            }
          }
          const ok = await flyLine({
            planeEl,
            getLine: () => linesRef.current.role[i],
            getLineEl: () => roleLineRefs.current[i],
            durationMs: ROLE_LINE_DUR_MS,
            forward: true,
            rtl: isRtl,
            cancelToken,
          });
          if (!ok) return;
        }
        if (planeEl) planeEl.style.opacity = "0";
      } else {
        linesRef.current.role.forEach((_, idx) =>
          setLineClip(roleLineRefs.current[idx], 1, isRtl)
        );
      }

      // Hold visible for 2.2s
      const held = await runSegment(ROLE_HOLD_MS, () => {}, cancelToken);
      if (!held) return;

      // Smooth U-turn at the end of the last role line
      const list = linesRef.current.role;
      const lastLine = list[list.length - 1];
      if (!lastLine) return;

      const okTurn = await flyUTurn({
        planeEl,
        anchorPt: getEndpoint(lastLine, true),
        outwardDir: dir,
        cancelToken,
      });
      if (!okTurn) return;

      // Fly back in reverse (end -> start) hiding each line behind the plane
      for (let i = list.length - 1; i >= 0; i--) {
        if (cancelToken.cancelled) return;
        if (i < list.length - 1) {
          const prev = linesRef.current.role[i + 1];
          const curr = linesRef.current.role[i];
          if (prev && curr) {
            const ok = await flyDive({
              planeEl,
              fromPt: getEndpoint(prev, false),
              toPt: getEndpoint(curr, true),
              rtl: !isRtl,
              cancelToken,
            });
            if (!ok) return;
          }
        }
        const ok = await flyLine({
          planeEl,
          getLine: () => linesRef.current.role[i],
          getLineEl: () => roleLineRefs.current[i],
          durationMs: Math.round(ROLE_LINE_DUR_MS * 0.78),
          forward: false,
          rtl: isRtl,
          cancelToken,
        });
        if (!ok) return;
      }

      // Switch to the alternating phrase (next effect run will reveal it)
      roleNeedsRevealRef.current = true;
      setRolePhraseIdx((idx) => (idx + 1) % rolePhrases.length);
    })();

    return () => {
      cancelToken.cancelled = true;
      if (cancelToken.rafId !== null) {
        window.cancelAnimationFrame(cancelToken.rafId);
      }
    };
  }, [
    shouldReduceMotion,
    roleLoopReady,
    rolePhraseIdx,
    roleLines.length > 0,
    isRtl,
    rolePhrases.length,
    flyLine,
    flyDive,
    flyUTurn,
    runSegment,
  ]);

  // 3. Optional USP Loop (only runs if LOOP_USP === true)
  useEffect(() => {
    if (!LOOP_USP || shouldReduceMotion || !uspLoopReady) return;
    if (uspLines.length === 0) return;

    const cancelToken = { cancelled: false, rafId: null };
    const planeEl = mainPlaneRef.current;
    const dir = isRtl ? -1 : 1;

    const getEndpoint = (line, atEnd) => ({
      x: isRtl
        ? atEnd
          ? line.left
          : line.right
        : atEnd
        ? line.right
        : line.left,
      y: line.top + line.height * 0.5,
    });

    (async () => {
      while (!cancelToken.cancelled) {
        if (!(await runSegment(USP_HOLD_MS, () => {}, cancelToken))) return;

        const list = linesRef.current.usp;
        const last = list[list.length - 1];
        if (!last) return;

        if (
          !(await flyUTurn({
            planeEl,
            anchorPt: getEndpoint(last, true),
            outwardDir: dir,
            cancelToken,
          }))
        )
          return;

        for (let i = list.length - 1; i >= 0; i--) {
          if (
            !(await flyLine({
              planeEl,
              getLine: () => linesRef.current.usp[i],
              getLineEl: () => uspLineRefs.current[i],
              durationMs: Math.round(USP_LINE_DUR_MS * 0.75),
              forward: false,
              rtl: isRtl,
              cancelToken,
            }))
          )
            return;
        }

        const first = list[0];
        if (first) {
          if (
            !(await flyUTurn({
              planeEl,
              anchorPt: getEndpoint(first, false),
              outwardDir: -dir,
              cancelToken,
            }))
          )
            return;
        }

        for (let i = 0; i < list.length; i++) {
          if (i > 0) {
            const prev = linesRef.current.usp[i - 1];
            const curr = linesRef.current.usp[i];
            if (prev && curr) {
              if (
                !(await flyDive({
                  planeEl,
                  fromPt: getEndpoint(prev, true),
                  toPt: getEndpoint(curr, false),
                  rtl: isRtl,
                  cancelToken,
                }))
              )
                return;
            }
          }
          if (
            !(await flyLine({
              planeEl,
              getLine: () => linesRef.current.usp[i],
              getLineEl: () => uspLineRefs.current[i],
              durationMs: USP_LINE_DUR_MS,
              forward: true,
              rtl: isRtl,
              cancelToken,
            }))
          )
            return;
        }
        if (planeEl) planeEl.style.opacity = "0";
      }
    })();

    return () => {
      cancelToken.cancelled = true;
      if (cancelToken.rafId !== null) {
        window.cancelAnimationFrame(cancelToken.rafId);
      }
    };
  }, [
    shouldReduceMotion,
    uspLoopReady,
    uspLines.length > 0,
    isRtl,
    flyLine,
    flyDive,
    flyUTurn,
    runSegment,
  ]);

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

  return (
    <Section id="home" isHero>
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 py-8 font-cockpit overflow-x-clip">
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
        <div
          ref={heroTextRef}
          className="relative order-2 lg:order-1 flex-1 min-w-0 w-full text-center lg:text-start"
        >
          {/* Plane overlays (disabled completely under prefers-reduced-motion) */}
          {!shouldReduceMotion && (
            <>
              <RevealPlane planeRef={mainPlaneRef} />
              <RevealPlane planeRef={rolePlaneRef} />
            </>
          )}

          {/* 1. "Hello, I'm" */}
          <p
            aria-label={greetingText}
            className="text-base sm:text-lg md:text-xl font-medium text-accent mb-2 grid"
          >
            <RevealLines
              text={greetingText}
              lines={greetingLines}
              lineRefs={greetingLineRefs}
              measureRef={greetingMeasureRef}
              instant={Boolean(shouldReduceMotion)}
            />
          </p>

          {/* 2. "Omar Ibrahim" (largest text) */}
          <h1
            aria-label={nameText}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-3 grid"
          >
            <RevealLines
              text={nameText}
              lines={nameLines}
              lineRefs={nameLineRefs}
              measureRef={nameMeasureRef}
              instant={Boolean(shouldReduceMotion)}
            />
          </h1>

          {/* 3. Alternating Role Line (reserves max height of both phrases) */}
          <h2
            aria-label={rolePhrases[0]}
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6 grid"
          >
            {/* Invisible height reservations for BOTH phrases so switching never shifts layout */}
            {rolePhrases.map((phrase) => (
              <span
                key={`reserve-${phrase}`}
                aria-hidden="true"
                className="invisible col-start-1 row-start-1 select-none pointer-events-none"
              >
                {phrase}
              </span>
            ))}
            <RevealLines
              text={activeRoleText}
              lines={roleLines}
              lineRefs={roleLineRefs}
              measureRef={roleMeasureRef}
              instant={Boolean(shouldReduceMotion)}
            />
          </h2>

          {/* 4. USP Paragraph */}
          <p
            aria-label={uspText}
            className="text-base sm:text-lg md:text-xl font-normal leading-[1.7] text-gray-600 dark:text-gray-400 max-w-2xl mb-8 grid mx-auto lg:mx-0"
          >
            <RevealLines
              text={uspText}
              lines={uspLines}
              lineRefs={uspLineRefs}
              measureRef={uspMeasureRef}
              instant={Boolean(shouldReduceMotion)}
            />
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
