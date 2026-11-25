import { useState, useRef, useLayoutEffect, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";

/**
 * Computes subtle inward horizontal indentation for top/bottom nodes
 * so left & right columns form a smooth '(' and ')' arc around the core node.
 */
function getArcMarginClass(index, total, side) {
  if (total <= 2) return "";
  const mid = (total - 1) / 2;
  const normalizedDist = Math.abs(index - mid) / mid;

  if (side === "start") {
    if (normalizedDist > 0.85) return "ms-6 lg:ms-12";
    if (normalizedDist > 0.4) return "ms-2.5 lg:ms-5";
    return "ms-0";
  } else {
    if (normalizedDist > 0.85) return "me-6 lg:me-12";
    if (normalizedDist > 0.4) return "me-2.5 lg:me-5";
    return "me-0";
  }
}

function AtcTowerSvg({
  isActive,
  isCoreFocus,
  shouldReduceMotion,
  idSuffix,
  cabRef,
  radarRef,
  compact = false,
}) {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${
        compact
          ? "w-[74px] h-[92px]"
          : "w-[92px] h-[116px] lg:w-[104px] lg:h-[130px]"
      }`}
    >
      {/* Anchor at top radar antenna for spotlight beam origin */}
      {radarRef && (
        <span
          ref={radarRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-[12%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1"
        />
      )}
      {/* Anchor at angled glass control cab for curved connection spokes */}
      {cabRef && (
        <span
          ref={cabRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1"
        />
      )}

      <svg
        viewBox="0 0 120 148"
        className="w-full h-full overflow-visible drop-shadow-[0_6px_18px_rgba(37,99,235,0.28)] dark:drop-shadow-[0_6px_22px_rgba(34,211,238,0.25)]"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`atcShaft-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="45%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id={`atcCabGlass-${idSuffix}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#06b6d4" stopOpacity="0.62" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.92" />
          </linearGradient>
          <linearGradient id={`atcRoof-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
          <radialGradient id={`atcBeacon-${idSuffix}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a5f3fc" stopOpacity="1" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Subtle pulsing radar rings around roof antenna */}
        {!shouldReduceMotion && (
          <>
            <circle cx="60" cy="11" r="5" stroke="#22d3ee" strokeWidth="1.2" opacity="0.6">
              <animate attributeName="r" values="4;18" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="60" cy="11" r="5" stroke="#38bdf8" strokeWidth="1" opacity="0.45">
              <animate attributeName="r" values="4;18" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
            </circle>
          </>
        )}

        {/* Antenna beacon halo */}
        <circle
          cx="60"
          cy="11"
          r={isActive ? 8 : 5.5}
          fill={`url(#atcBeacon-${idSuffix})`}
        />

        {/* Roof Radar Antenna Mast & Dish */}
        <line x1="60" y1="12" x2="60" y2="27" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M51 19 Q60 15.5 69 19" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round" />
        <line x1="55" y1="23" x2="65" y2="23" stroke="#93c5fd" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="60" cy="11" r="2.6" fill="#e0f2fe" stroke="#22d3ee" strokeWidth="1.2" />

        {/* Roof Cap Overhang */}
        <path
          d="M27 33 L35 27 L85 27 L93 33 Z"
          fill={`url(#atcRoof-${idSuffix})`}
          stroke="#60a5fa"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <line x1="36" y1="27.5" x2="84" y2="27.5" stroke="#67e8f9" strokeWidth="1.2" strokeOpacity="0.85" strokeLinecap="round" />

        {/* Angled Panoramic Glass Control Cab */}
        <path
          d="M31 33 L89 33 L82 55 L38 55 Z"
          fill={`url(#atcCabGlass-${idSuffix})`}
          stroke={isActive ? "#67e8f9" : "#38bdf8"}
          strokeWidth={isActive ? "1.9" : "1.4"}
          strokeLinejoin="round"
        />
        {/* Glass Window Mullions */}
        <line x1="46" y1="33.5" x2="48.5" y2="54.5" stroke="#1e3a8a" strokeWidth="1.4" strokeOpacity="0.7" />
        <line x1="60" y1="33.5" x2="60" y2="54.5" stroke="#1e3a8a" strokeWidth="1.4" strokeOpacity="0.7" />
        <line x1="74" y1="33.5" x2="71.5" y2="54.5" stroke="#1e3a8a" strokeWidth="1.4" strokeOpacity="0.7" />
        {/* Glass Glint */}
        <path d="M36 36 L44 36 L41 49 L38 49 Z" fill="#ecfeff" fillOpacity="0.28" />

        {/* Observation Catwalk Ledge */}
        <rect x="33" y="55" width="54" height="5" rx="2" fill="#1d4ed8" stroke="#38bdf8" strokeWidth="1.1" />
        <line
          x1="37"
          y1="57.5"
          x2="83"
          y2="57.5"
          stroke="#22d3ee"
          strokeWidth="1"
          strokeOpacity={isActive || isCoreFocus ? "0.85" : "0.45"}
        />

        {/* Tapered Support Collar */}
        <path
          d="M40 60 L80 60 L72 72 L48 72 Z"
          fill="#1e40af"
          stroke="#3b82f6"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Slender Tapered Tower Shaft */}
        <path
          d="M49.5 72 L70.5 72 L76 132 L44 132 Z"
          fill={`url(#atcShaft-${idSuffix})`}
          stroke="#60a5fa"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Vertical Architectural Rib */}
        <line x1="60" y1="74" x2="60" y2="130" stroke="#67e8f9" strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="4 4" />
        {/* Accent Tower Slit Windows */}
        <rect x="57" y="82" width="6" height="2.5" rx="1" fill="#67e8f9" fillOpacity="0.75" />
        <rect x="57" y="95" width="6" height="2.5" rx="1" fill="#67e8f9" fillOpacity="0.55" />
        <rect x="57" y="108" width="6" height="2.5" rx="1" fill="#67e8f9" fillOpacity="0.4" />

        {/* Tower Base Plinth */}
        <path
          d="M36 132 L84 132 L89 140 L31 140 Z"
          fill="#1e3a8a"
          stroke="#3b82f6"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Cyan Base Horizon Glow Line */}
        <line x1="24" y1="141" x2="96" y2="141" stroke="#22d3ee" strokeWidth="1.6" strokeOpacity="0.65" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function NeuralCategoryBoard({ category, skillsData, lang, shouldReduceMotion }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [lockedNode, setLockedNode] = useState(null);

  const stageRef = useRef(null);
  const coreRef = useRef(null);
  const cabRef = useRef(null);
  const radarRef = useRef(null);
  const leftRefs = useRef({});
  const rightRefs = useRef({});
  const [coords, setCoords] = useState(null);

  const activeFocus = hoveredNode || lockedNode || {
    side: "core",
    id: category.core.id,
  };

  const getHighlightState = () => {
    const allLeftIds = new Set(category.leftNodes.map((n) => n.id));
    const allRightIds = new Set(category.rightNodes.map((n) => n.id));

    if (!activeFocus || activeFocus.side === "core") {
      return {
        isCoreFocus: true,
        activeLeftIds: allLeftIds,
        activeRightIds: allRightIds,
        statusTitle: category.core.statusTitle,
        statusLabel: skillsData.connectedToolsLabel,
        statusItems: category.core.connected,
      };
    }

    if (activeFocus.side === "left") {
      const node = category.leftNodes.find((n) => n.id === activeFocus.id);
      if (!node) {
        return {
          isCoreFocus: true,
          activeLeftIds: allLeftIds,
          activeRightIds: allRightIds,
          statusTitle: category.core.statusTitle,
          statusLabel: skillsData.connectedToolsLabel,
          statusItems: category.core.connected,
        };
      }
      const linkedRightIds = new Set(node.links || []);
      const linkedRightLabels = category.rightNodes
        .filter((r) => linkedRightIds.has(r.id))
        .map((r) => r.label);

      return {
        isCoreFocus: false,
        activeLeftIds: new Set([node.id]),
        activeRightIds: linkedRightIds,
        statusTitle: node.label,
        statusLabel: skillsData.connectedToolsLabel,
        statusItems: [category.core.label, ...linkedRightLabels],
      };
    }

    const rightNode = category.rightNodes.find((n) => n.id === activeFocus.id);
    if (!rightNode) {
      return {
        isCoreFocus: true,
        activeLeftIds: allLeftIds,
        activeRightIds: allRightIds,
        statusTitle: category.core.statusTitle,
        statusLabel: skillsData.connectedToolsLabel,
        statusItems: category.core.connected,
      };
    }

    const linkedLeftNodes = category.leftNodes.filter((l) =>
      l.links?.includes(rightNode.id)
    );
    const linkedLeftIds = new Set(linkedLeftNodes.map((l) => l.id));

    return {
      isCoreFocus: false,
      activeLeftIds: linkedLeftIds,
      activeRightIds: new Set([rightNode.id]),
      statusTitle: rightNode.label,
      statusLabel: skillsData.connectedConceptsLabel,
      statusItems: linkedLeftNodes.map((l) => l.label),
    };
  };

  const {
    isCoreFocus,
    activeLeftIds,
    activeRightIds,
    statusTitle,
    statusLabel,
    statusItems,
  } = getHighlightState();

  const measureGraph = useCallback(() => {
    const stageEl = stageRef.current;
    const coreEl = coreRef.current;
    if (!stageEl || !coreEl) return;

    const stageRect = stageEl.getBoundingClientRect();
    if (stageRect.width === 0 || stageRect.height === 0) return;

    const getCenter = (el) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left - stageRect.left + r.width / 2,
        y: r.top - stageRect.top + r.height / 2,
      };
    };

    const core = getCenter(coreEl);
    const cab = cabRef.current ? getCenter(cabRef.current) : core;
    const radar = radarRef.current ? getCenter(radarRef.current) : cab;
    const left = {};
    const right = {};

    category.leftNodes.forEach((node) => {
      const el = leftRefs.current[node.id];
      if (el) left[node.id] = getCenter(el);
    });

    category.rightNodes.forEach((node) => {
      const el = rightRefs.current[node.id];
      if (el) right[node.id] = getCenter(el);
    });

    setCoords({
      width: stageRect.width,
      height: stageRect.height,
      core,
      cab,
      radar,
      left,
      right,
    });
  }, [category]);

  const focusedTargetPoint =
    coords && activeFocus.side === "left"
      ? coords.left[activeFocus.id]
      : coords && activeFocus.side === "right"
      ? coords.right[activeFocus.id]
      : null;

  const isBeamActive = Boolean(!isCoreFocus && focusedTargetPoint);

  const beamGeo = (() => {
    if (!coords) return null;
    const cx = coords.cab.x;
    const cy = coords.cab.y;
    const tx = focusedTargetPoint ? focusedTargetPoint.x : cx + 100;
    const ty = focusedTargetPoint ? focusedTargetPoint.y : cy;
    const dx = tx - cx;
    const dy = ty - cy;
    const dist = Math.max(1, Math.hypot(dx, dy));
    const ux = dx / dist;
    const uy = dy / dist;
    const px = -uy;
    const py = ux;

    const farDist = dist + 48;
    const farCenterX = cx + ux * farDist;
    const farCenterY = cy + uy * farDist;
    const hw = Math.max(38, Math.min(54, dist * 0.12 + 18));
    const coreHw = hw * 0.45;

    const v1x = farCenterX + px * hw;
    const v1y = farCenterY + py * hw;
    const v2x = farCenterX - px * hw;
    const v2y = farCenterY - py * hw;

    const c1x = farCenterX + px * coreHw;
    const c1y = farCenterY + py * coreHw;
    const c2x = farCenterX - px * coreHw;
    const c2y = farCenterY - py * coreHw;

    const outerPath = `M ${cx} ${cy} L ${v1x.toFixed(1)} ${v1y.toFixed(1)} Q ${(farCenterX + ux * 8).toFixed(1)} ${(farCenterY + uy * 8).toFixed(1)} ${v2x.toFixed(1)} ${v2y.toFixed(1)} Z`;
    const corePath = `M ${cx} ${cy} L ${c1x.toFixed(1)} ${c1y.toFixed(1)} Q ${(farCenterX + ux * 6).toFixed(1)} ${(farCenterY + uy * 6).toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} Z`;

    return {
      cx,
      cy,
      farCenterX,
      farCenterY,
      outerPath,
      corePath,
    };
  })();

  useLayoutEffect(() => {
    measureGraph();
    const rafId = window.requestAnimationFrame(measureGraph);
    return () => window.cancelAnimationFrame(rafId);
  }, [measureGraph, lang]);

  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(() => measureGraph());
      observer.observe(stageEl);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", measureGraph, { passive: true });
    return () => window.removeEventListener("resize", measureGraph);
  }, [measureGraph]);

  useEffect(() => {
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => measureGraph());
    }
  }, [measureGraph]);

  const toggleLock = (side, id) => {
    if (side === "core") {
      setLockedNode(null);
      return;
    }
    setLockedNode((prev) =>
      prev && prev.side === side && prev.id === id ? null : { side, id }
    );
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
      onAnimationComplete={measureGraph}
    >
      {/* Card Title & Subtitle */}
      <div className="pb-5 mb-6 border-b border-gray-200/80 dark:border-gray-800/80 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {category.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed max-w-2xl">
            {category.description}
          </p>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500 hidden lg:inline-block shrink-0">
          {skillsData.hintText}
        </span>
      </div>

      {/* ── Inner Neural Architecture Diagram Box ── */}
      <div className="rounded-2xl border border-gray-200/90 dark:border-gray-800 bg-white/95 dark:bg-gray-950/80 p-4 sm:p-6 md:p-7 relative overflow-hidden">
        {/* Subtle Coordinate Grid & Center Blue Radial Glow (matches AviationBackground) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-65 dark:opacity-85"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.11) 0%, transparent 58%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-45 dark:opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Architecture Top Meta Row */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-6 border-b border-gray-100 dark:border-gray-800/80">
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest rtl:tracking-normal uppercase text-accent dark:text-blue-400">
            {category.archLabel}
          </span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {category.core.label}
            <span className="mx-1.5 text-accent dark:text-blue-400">·</span>
            {category.title}
          </span>
        </div>

        {/* ── Desktop / Tablet Interactive Node Graph (>= 768px) ── */}
        <div
          ref={stageRef}
          onMouseLeave={() => setHoveredNode(null)}
          className="hidden md:block relative py-3"
        >
          {/* SVG Neural Connections & Radar Spotlight Layer */}
          {coords && coords.width > 0 && (
            <svg
              width={coords.width}
              height={coords.height}
              viewBox={`0 0 ${coords.width} ${coords.height}`}
              className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id={`neuralSpokeActive-${category.id}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.75" />
                  <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.85" />
                </linearGradient>
                {beamGeo && (
                  <>
                    <linearGradient
                      id={`radarBeamOuter-${category.id}`}
                      gradientUnits="userSpaceOnUse"
                      x1={beamGeo.cx}
                      y1={beamGeo.cy}
                      x2={beamGeo.farCenterX}
                      y2={beamGeo.farCenterY}
                    >
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.48" />
                      <stop offset="35%" stopColor="#06b6d4" stopOpacity="0.22" />
                      <stop offset="75%" stopColor="#06b6d4" stopOpacity="0.10" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient
                      id={`radarBeamCore-${category.id}`}
                      gradientUnits="userSpaceOnUse"
                      x1={beamGeo.cx}
                      y1={beamGeo.cy}
                      x2={beamGeo.farCenterX}
                      y2={beamGeo.farCenterY}
                    >
                      <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0.68" />
                      <stop offset="25%" stopColor="#67e8f9" stopOpacity="0.36" />
                      <stop offset="70%" stopColor="#22d3ee" stopOpacity="0.14" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                    </linearGradient>
                  </>
                )}
                <filter
                  id={`cyanLineGlow-${category.id}`}
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

              {/* 0. Interactive Radar Spotlight Cone from Tower Cab directly to Hovered Node */}
              {beamGeo && (
                <motion.g
                  initial={false}
                  animate={{ opacity: isBeamActive ? 1 : 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                >
                  <motion.path
                    animate={{ d: beamGeo.outerPath }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.18, ease: "easeOut" }
                    }
                    fill={`url(#radarBeamOuter-${category.id})`}
                  />
                  <motion.path
                    animate={{ d: beamGeo.corePath }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.18, ease: "easeOut" }
                    }
                    fill={`url(#radarBeamCore-${category.id})`}
                  />
                </motion.g>
              )}

              {/* 1. Faint Background Cross-Mesh Curves (Left <-> Linked Right) */}
              {category.leftNodes.map((lNode) => {
                const p1 = coords.left[lNode.id];
                if (!p1) return null;
                return (lNode.links || []).map((rId) => {
                  const p2 = coords.right[rId];
                  if (!p2) return null;

                  const isMeshActive =
                    !isCoreFocus &&
                    activeLeftIds.has(lNode.id) &&
                    activeRightIds.has(rId);

                  const midX = (p1.x + p2.x) / 2;
                  const curvePull =
                    (p1.y + p2.y) / 2 < coords.cab.y ? -34 : 34;
                  const d = `M ${p1.x} ${p1.y} Q ${midX} ${
                    (p1.y + p2.y) / 2 + curvePull
                  } ${p2.x} ${p2.y}`;

                  return (
                    <path
                      key={`mesh-${lNode.id}-${rId}`}
                      d={d}
                      className="text-accent dark:text-blue-400 transition-opacity duration-300"
                      stroke="currentColor"
                      strokeWidth={isMeshActive ? 1.2 : 0.85}
                      strokeOpacity={isMeshActive ? 0.22 : 0.06}
                    />
                  );
                });
              })}

              {/* 2. Primary Spokes: ATC Control Cab -> Left Nodes */}
              {category.leftNodes.map((lNode) => {
                const p = coords.left[lNode.id];
                if (!p) return null;
                const isPrimaryTarget =
                  activeFocus.side === "left" && activeFocus.id === lNode.id;
                const isHighlighted = activeLeftIds.has(lNode.id);
                const c1x = coords.cab.x + (p.x - coords.cab.x) * 0.45;
                const d = `M ${coords.cab.x} ${coords.cab.y} C ${c1x} ${coords.cab.y}, ${c1x} ${p.y}, ${p.x} ${p.y}`;

                return (
                  <g key={`left-spoke-${lNode.id}`}>
                    {isPrimaryTarget && (
                      <path
                        d={d}
                        stroke="#22d3ee"
                        strokeWidth={6}
                        strokeOpacity={0.22}
                        strokeLinecap="round"
                      />
                    )}
                    <path
                      d={d}
                      className="text-accent dark:text-blue-400 transition-all duration-300"
                      stroke={
                        isPrimaryTarget
                          ? `url(#neuralSpokeActive-${category.id})`
                          : "currentColor"
                      }
                      filter={
                        isPrimaryTarget
                          ? `url(#cyanLineGlow-${category.id})`
                          : undefined
                      }
                      strokeWidth={
                        isPrimaryTarget
                          ? 2.6
                          : isHighlighted
                          ? isCoreFocus
                            ? 1.55
                            : 1.7
                          : 1.05
                      }
                      strokeOpacity={
                        isPrimaryTarget
                          ? 1
                          : isHighlighted
                          ? isCoreFocus
                            ? 0.55
                            : 0.45
                          : 0.12
                      }
                      strokeLinecap="round"
                    />
                    {isPrimaryTarget && !shouldReduceMotion && (
                      <g>
                        <circle r="6" fill="#22d3ee" opacity="0.35">
                          <animateMotion dur="1.25s" repeatCount="indefinite" path={d} />
                        </circle>
                        <circle r="2.8" fill="#ecfeff">
                          <animateMotion dur="1.25s" repeatCount="indefinite" path={d} />
                        </circle>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* 3. Primary Spokes: ATC Control Cab -> Right Nodes */}
              {category.rightNodes.map((rNode) => {
                const p = coords.right[rNode.id];
                if (!p) return null;
                const isPrimaryTarget =
                  activeFocus.side === "right" && activeFocus.id === rNode.id;
                const isHighlighted = activeRightIds.has(rNode.id);
                const c1x = coords.cab.x + (p.x - coords.cab.x) * 0.45;
                const d = `M ${coords.cab.x} ${coords.cab.y} C ${c1x} ${coords.cab.y}, ${c1x} ${p.y}, ${p.x} ${p.y}`;

                return (
                  <g key={`right-spoke-${rNode.id}`}>
                    {isPrimaryTarget && (
                      <path
                        d={d}
                        stroke="#22d3ee"
                        strokeWidth={6}
                        strokeOpacity={0.22}
                        strokeLinecap="round"
                      />
                    )}
                    <path
                      d={d}
                      className="text-accent dark:text-blue-400 transition-all duration-300"
                      stroke={
                        isPrimaryTarget
                          ? `url(#neuralSpokeActive-${category.id})`
                          : "currentColor"
                      }
                      filter={
                        isPrimaryTarget
                          ? `url(#cyanLineGlow-${category.id})`
                          : undefined
                      }
                      strokeWidth={
                        isPrimaryTarget
                          ? 2.6
                          : isHighlighted
                          ? isCoreFocus
                            ? 1.55
                            : 1.7
                          : 1.05
                      }
                      strokeOpacity={
                        isPrimaryTarget
                          ? 1
                          : isHighlighted
                          ? isCoreFocus
                            ? 0.55
                            : 0.45
                          : 0.12
                      }
                      strokeLinecap="round"
                    />
                    {isPrimaryTarget && !shouldReduceMotion && (
                      <g>
                        <circle r="6" fill="#22d3ee" opacity="0.35">
                          <animateMotion dur="1.25s" repeatCount="indefinite" path={d} />
                        </circle>
                        <circle r="2.8" fill="#ecfeff">
                          <animateMotion dur="1.25s" repeatCount="indefinite" path={d} />
                        </circle>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          )}

          {/* 3-Column Pill Nodes Layout */}
          <div className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center gap-6 lg:gap-12 min-h-[340px]">
            {/* Start Column: Core Capabilities / Techniques */}
            <div className="flex flex-col items-start gap-3.5">
              {category.leftNodes.map((node, idx) => {
                const isSelected =
                  activeFocus.side === "left" && activeFocus.id === node.id;
                const isHighlighted = activeLeftIds.has(node.id);
                const arcClass = getArcMarginClass(
                  idx,
                  category.leftNodes.length,
                  "start"
                );

                return (
                  <button
                    key={node.id}
                    ref={(el) => {
                      leftRefs.current[node.id] = el;
                    }}
                    type="button"
                    onMouseEnter={() =>
                      setHoveredNode({ side: "left", id: node.id })
                    }
                    onFocus={() =>
                      setHoveredNode({ side: "left", id: node.id })
                    }
                    onBlur={() => setHoveredNode(null)}
                    onClick={() => toggleLock("left", node.id)}
                    className={`${arcClass} px-4 py-2.5 rounded-2xl text-xs lg:text-sm font-medium border text-start transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      isSelected
                        ? "bg-cyan-50/90 dark:bg-cyan-950/75 border-cyan-400 dark:border-cyan-300 text-blue-900 dark:text-cyan-100 shadow-[0_0_16px_rgba(34,211,238,0.4)] dark:shadow-[0_0_20px_rgba(34,211,238,0.45)] -translate-y-0.5"
                        : isHighlighted && !isCoreFocus
                        ? "bg-blue-50/80 dark:bg-gray-900 border-accent/70 dark:border-blue-400/70 text-gray-900 dark:text-blue-200 shadow-xs"
                        : isCoreFocus
                        ? "bg-white dark:bg-gray-900 border-gray-200/90 dark:border-gray-800 text-gray-800 dark:text-gray-200 hover:border-cyan-400/80 dark:hover:border-cyan-400/70 shadow-2xs"
                        : "bg-gray-50/95 dark:bg-gray-900/75 border-gray-200/60 dark:border-gray-800/60 text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {node.label}
                  </button>
                );
              })}
            </div>

            {/* Center Column: Air Traffic Control (ATC) Tower Core Hub */}
            <div className="relative flex flex-col items-center justify-center px-2">
              <div
                aria-hidden="true"
                className={`absolute w-40 h-40 lg:w-48 lg:h-48 rounded-full blur-2xl pointer-events-none transition-all duration-300 ${
                  isBeamActive
                    ? "bg-cyan-400/25 dark:bg-cyan-400/30 scale-105"
                    : "bg-accent/20 dark:bg-blue-500/25"
                }`}
              />
              <button
                ref={coreRef}
                type="button"
                onMouseEnter={() =>
                  setHoveredNode({ side: "core", id: category.core.id })
                }
                onFocus={() =>
                  setHoveredNode({ side: "core", id: category.core.id })
                }
                onBlur={() => setHoveredNode(null)}
                onClick={() => toggleLock("core", category.core.id)}
                className={`relative z-10 flex flex-col items-center p-2 rounded-3xl transition-transform duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-400 ${
                  isCoreFocus ? "scale-[1.02]" : "hover:scale-[1.03]"
                }`}
              >
                <AtcTowerSvg
                  isActive={isBeamActive}
                  isCoreFocus={isCoreFocus}
                  shouldReduceMotion={shouldReduceMotion}
                  idSuffix={`desktop-${category.id}`}
                  cabRef={cabRef}
                  radarRef={radarRef}
                />
                <span className="mt-1.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs lg:text-sm font-bold tracking-wide rtl:tracking-normal text-blue-900 dark:text-cyan-100 bg-blue-50/95 dark:bg-blue-950/85 border border-blue-200/90 dark:border-cyan-400/40 shadow-xs">
                  <span
                    className={`w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] ${
                      shouldReduceMotion ? "" : "animate-pulse"
                    }`}
                  />
                  {category.core.label}
                </span>
              </button>
            </div>

            {/* End Column: Connected Tools & Libraries */}
            <div className="flex flex-col items-end gap-4">
              {category.rightNodes.map((node, idx) => {
                const isSelected =
                  activeFocus.side === "right" && activeFocus.id === node.id;
                const isHighlighted = activeRightIds.has(node.id);
                const arcClass = getArcMarginClass(
                  idx,
                  category.rightNodes.length,
                  "end"
                );

                return (
                  <button
                    key={node.id}
                    ref={(el) => {
                      rightRefs.current[node.id] = el;
                    }}
                    type="button"
                    onMouseEnter={() =>
                      setHoveredNode({ side: "right", id: node.id })
                    }
                    onFocus={() =>
                      setHoveredNode({ side: "right", id: node.id })
                    }
                    onBlur={() => setHoveredNode(null)}
                    onClick={() => toggleLock("right", node.id)}
                    className={`${arcClass} px-4 py-2.5 rounded-2xl text-xs lg:text-sm font-medium border text-end transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      isSelected
                        ? "bg-cyan-50/90 dark:bg-cyan-950/75 border-cyan-400 dark:border-cyan-300 text-blue-900 dark:text-cyan-100 shadow-[0_0_16px_rgba(34,211,238,0.4)] dark:shadow-[0_0_20px_rgba(34,211,238,0.45)] -translate-y-0.5"
                        : isHighlighted && !isCoreFocus
                        ? "bg-blue-50/80 dark:bg-gray-900 border-accent/70 dark:border-blue-400/70 text-gray-900 dark:text-blue-200 shadow-xs"
                        : isCoreFocus
                        ? "bg-white dark:bg-gray-900 border-gray-200/90 dark:border-gray-800 text-gray-800 dark:text-gray-200 hover:border-cyan-400/80 dark:hover:border-cyan-400/70 shadow-2xs"
                        : "bg-gray-50/95 dark:bg-gray-900/75 border-gray-200/60 dark:border-gray-800/60 text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {node.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Mobile Responsive ATC Tower Hub (< 768px) ── */}
        <div className="md:hidden relative z-10 flex flex-col items-center py-2">
          <div className="relative flex flex-col items-center justify-center mb-2">
            <div
              aria-hidden="true"
              className="absolute w-32 h-32 rounded-full bg-cyan-400/20 dark:bg-cyan-400/25 blur-xl pointer-events-none"
            />
            <button
              type="button"
              onClick={() => toggleLock("core", category.core.id)}
              className="relative z-10 flex flex-col items-center cursor-pointer focus:outline-none"
            >
              <AtcTowerSvg
                isActive={!isCoreFocus}
                isCoreFocus={isCoreFocus}
                shouldReduceMotion={shouldReduceMotion}
                idSuffix={`mobile-${category.id}`}
                compact
              />
              <span className="mt-1 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-blue-900 dark:text-cyan-100 bg-blue-50/95 dark:bg-blue-950/85 border border-blue-200/90 dark:border-cyan-400/40 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                {category.core.label}
              </span>
            </button>
          </div>

          <div
            aria-hidden="true"
            className="w-0.5 h-6 bg-gradient-to-b from-accent to-accent/25 mb-3"
          />

          <div className="w-full space-y-4">
            <div className="p-3.5 rounded-xl border border-gray-200/80 dark:border-gray-800/90 bg-gray-50/70 dark:bg-gray-900/60">
              <span className="block text-[11px] font-semibold uppercase tracking-wider rtl:tracking-normal text-accent dark:text-blue-400 mb-2.5">
                {skillsData.leftGroupLabel}
              </span>
              <div className="flex flex-wrap gap-2">
                {category.leftNodes.map((node) => {
                  const isHighlighted = activeLeftIds.has(node.id);
                  const isSelected =
                    activeFocus.side === "left" && activeFocus.id === node.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => toggleLock("left", node.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-accent text-white border-accent shadow-xs"
                          : isHighlighted && !isCoreFocus
                          ? "bg-blue-50 dark:bg-blue-950/70 border-accent text-accent dark:text-blue-300"
                          : isCoreFocus
                          ? "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200"
                          : "bg-white/60 dark:bg-gray-900/40 border-gray-200/50 dark:border-gray-800/50 text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {node.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-200/80 dark:border-gray-800/90 bg-gray-50/70 dark:bg-gray-900/60">
              <span className="block text-[11px] font-semibold uppercase tracking-wider rtl:tracking-normal text-accent dark:text-blue-400 mb-2.5">
                {skillsData.rightGroupLabel}
              </span>
              <div className="flex flex-wrap gap-2">
                {category.rightNodes.map((node) => {
                  const isHighlighted = activeRightIds.has(node.id);
                  const isSelected =
                    activeFocus.side === "right" && activeFocus.id === node.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => toggleLock("right", node.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-accent text-white border-accent shadow-xs"
                          : isHighlighted && !isCoreFocus
                          ? "bg-blue-50 dark:bg-blue-950/70 border-accent text-accent dark:text-blue-300"
                          : isCoreFocus
                          ? "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200"
                          : "bg-white/60 dark:bg-gray-900/40 border-gray-200/50 dark:border-gray-800/50 text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {node.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Connected Status Bar ── */}
        <div className="relative z-10 mt-6 px-4 sm:px-5 py-3.5 rounded-xl border border-gray-200/90 dark:border-gray-800 bg-gray-50/95 dark:bg-gray-900/85 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2.5 shrink-0">
            <span
              className={`w-2 h-2 rounded-full bg-accent dark:bg-blue-400 shrink-0 ${
                shouldReduceMotion ? "" : "animate-pulse"
              }`}
            />
            <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
              {statusTitle}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm sm:justify-end">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider rtl:tracking-normal text-accent dark:text-blue-400 me-1">
              {statusLabel}:
            </span>
            {statusItems.map((item, index) => (
              <span
                key={item}
                className="inline-flex items-center font-medium text-gray-700 dark:text-gray-200"
              >
                {item}
                {index < statusItems.length - 1 && (
                  <span className="mx-2 text-accent/70 dark:text-blue-400/70">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { t, lang } = useLanguage();
  const skillsData = t.skills;
  const categories = skillsData?.categories || [];
  const shouldReduceMotion = useReducedMotion();

  const [activeTabId, setActiveTabId] = useState(
    () => categories[0]?.id || "ml-data"
  );

  const activeCategory =
    categories.find((c) => c.id === activeTabId) || categories[0];

  if (!activeCategory) return null;

  return (
    <Section id="skills" title={t.sections.skills}>
      <div className="max-w-5xl mx-auto">
        {/* ── Top Segmented Pill Tab Bar ── */}
        <div className="flex justify-center mb-8">
          <div
            role="tablist"
            aria-label={t.sections.skills}
            className="inline-flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 p-1.5 rounded-2xl sm:rounded-full border border-gray-200/90 dark:border-gray-800 bg-white/85 dark:bg-gray-900/80 backdrop-blur-md shadow-xs"
          >
            {categories.map((cat) => {
              const isActive = cat.id === activeCategory.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveTabId(cat.id)}
                  className={`relative px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-full text-xs font-semibold tracking-wide rtl:tracking-normal transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeSkillsTabPill"
                      className="absolute inset-0 rounded-xl sm:rounded-full bg-accent shadow-sm shadow-blue-600/25"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  )}
                  <span className="relative z-10">{cat.tab}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Main Outer Card ── */}
        <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-gray-50/75 dark:bg-gray-900/60 backdrop-blur-sm p-5 sm:p-7 md:p-8 shadow-xs transition-colors duration-300">
          <AnimatePresence mode="wait">
            <NeuralCategoryBoard
              key={activeCategory.id}
              category={activeCategory}
              skillsData={skillsData}
              lang={lang}
              shouldReduceMotion={shouldReduceMotion}
            />
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
