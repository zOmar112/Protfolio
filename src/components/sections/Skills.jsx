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

function NeuralCategoryBoard({ category, skillsData, lang, shouldReduceMotion }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [lockedNode, setLockedNode] = useState(null);

  const stageRef = useRef(null);
  const coreRef = useRef(null);
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
      left,
      right,
    });
  }, [category]);

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
          {/* SVG Neural Connections Layer */}
          {coords && coords.width > 0 && (
            <svg
              width={coords.width}
              height={coords.height}
              viewBox={`0 0 ${coords.width} ${coords.height}`}
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
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
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#2563eb" stopOpacity="0.98" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
                </linearGradient>
              </defs>

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
                    (p1.y + p2.y) / 2 < coords.core.y ? -34 : 34;
                  const d = `M ${p1.x} ${p1.y} Q ${midX} ${
                    (p1.y + p2.y) / 2 + curvePull
                  } ${p2.x} ${p2.y}`;

                  return (
                    <path
                      key={`mesh-${lNode.id}-${rId}`}
                      d={d}
                      className="text-accent dark:text-blue-400 transition-opacity duration-300"
                      stroke="currentColor"
                      strokeWidth={isMeshActive ? 1.25 : 0.85}
                      strokeOpacity={isMeshActive ? 0.28 : 0.08}
                    />
                  );
                });
              })}

              {/* 2. Primary Spokes: Left Nodes -> Core */}
              {category.leftNodes.map((lNode) => {
                const p = coords.left[lNode.id];
                if (!p) return null;
                const isHighlighted = activeLeftIds.has(lNode.id);
                const c1x = p.x + (coords.core.x - p.x) * 0.45;
                const d = `M ${p.x} ${p.y} C ${c1x} ${p.y}, ${c1x} ${coords.core.y}, ${coords.core.x} ${coords.core.y}`;

                return (
                  <path
                    key={`left-spoke-${lNode.id}`}
                    d={d}
                    className="text-accent dark:text-blue-400 transition-all duration-300"
                    stroke={
                      isHighlighted && !isCoreFocus
                        ? `url(#neuralSpokeActive-${category.id})`
                        : "currentColor"
                    }
                    strokeWidth={
                      isHighlighted ? (isCoreFocus ? 1.65 : 2.35) : 1.1
                    }
                    strokeOpacity={
                      isHighlighted ? (isCoreFocus ? 0.62 : 0.95) : 0.14
                    }
                  />
                );
              })}

              {/* 3. Primary Spokes: Core -> Right Nodes */}
              {category.rightNodes.map((rNode) => {
                const p = coords.right[rNode.id];
                if (!p) return null;
                const isHighlighted = activeRightIds.has(rNode.id);
                const c1x = coords.core.x + (p.x - coords.core.x) * 0.55;
                const d = `M ${coords.core.x} ${coords.core.y} C ${c1x} ${coords.core.y}, ${c1x} ${p.y}, ${p.x} ${p.y}`;

                return (
                  <path
                    key={`right-spoke-${rNode.id}`}
                    d={d}
                    className="text-accent dark:text-blue-400 transition-all duration-300"
                    stroke={
                      isHighlighted && !isCoreFocus
                        ? `url(#neuralSpokeActive-${category.id})`
                        : "currentColor"
                    }
                    strokeWidth={
                      isHighlighted ? (isCoreFocus ? 1.65 : 2.35) : 1.1
                    }
                    strokeOpacity={
                      isHighlighted ? (isCoreFocus ? 0.62 : 0.95) : 0.14
                    }
                  />
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
                    className={`${arcClass} px-4 py-2.5 rounded-2xl text-xs lg:text-sm font-medium border text-start transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isSelected
                        ? "bg-blue-50 dark:bg-blue-950/90 border-accent dark:border-blue-400 text-accent dark:text-blue-300 shadow-sm shadow-blue-500/15 -translate-y-0.5"
                        : isHighlighted && !isCoreFocus
                        ? "bg-blue-50/80 dark:bg-gray-900 border-accent/70 dark:border-blue-400/70 text-gray-900 dark:text-blue-200 shadow-xs"
                        : isCoreFocus
                        ? "bg-white dark:bg-gray-900 border-gray-200/90 dark:border-gray-800 text-gray-800 dark:text-gray-200 hover:border-accent/60 dark:hover:border-blue-400/60 shadow-2xs"
                        : "bg-gray-50/95 dark:bg-gray-900/75 border-gray-200/60 dark:border-gray-800/60 text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {node.label}
                  </button>
                );
              })}
            </div>

            {/* Center Column: Glowing Core Hub */}
            <div className="relative flex items-center justify-center px-2">
              <div
                aria-hidden="true"
                className="absolute w-36 h-36 lg:w-44 lg:h-44 rounded-full bg-accent/20 dark:bg-blue-500/25 blur-2xl pointer-events-none"
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
                className={`relative z-10 px-7 lg:px-9 py-3.5 lg:py-4 rounded-3xl text-base lg:text-lg font-bold tracking-wide rtl:tracking-normal text-white bg-accent border-2 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent ${
                  isCoreFocus
                    ? "border-blue-300 dark:border-blue-300/80 shadow-[0_0_28px_rgba(37,99,235,0.4)] dark:shadow-[0_0_36px_rgba(59,130,246,0.5)] scale-[1.02]"
                    : "border-blue-400/70 shadow-[0_0_18px_rgba(37,99,235,0.28)] hover:scale-[1.03]"
                }`}
              >
                {category.core.label}
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
                    className={`${arcClass} px-4 py-2.5 rounded-2xl text-xs lg:text-sm font-medium border text-end transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isSelected
                        ? "bg-blue-50 dark:bg-blue-950/90 border-accent dark:border-blue-400 text-accent dark:text-blue-300 shadow-sm shadow-blue-500/15 -translate-y-0.5"
                        : isHighlighted && !isCoreFocus
                        ? "bg-blue-50/80 dark:bg-gray-900 border-accent/70 dark:border-blue-400/70 text-gray-900 dark:text-blue-200 shadow-xs"
                        : isCoreFocus
                        ? "bg-white dark:bg-gray-900 border-gray-200/90 dark:border-gray-800 text-gray-800 dark:text-gray-200 hover:border-accent/60 dark:hover:border-blue-400/60 shadow-2xs"
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

        {/* ── Mobile Responsive Neural Hub (< 768px) ── */}
        <div className="md:hidden relative z-10 flex flex-col items-center py-2">
          <div className="relative flex items-center justify-center mb-2">
            <div
              aria-hidden="true"
              className="absolute w-28 h-28 rounded-full bg-accent/20 dark:bg-blue-500/25 blur-xl pointer-events-none"
            />
            <button
              type="button"
              onClick={() => toggleLock("core", category.core.id)}
              className="relative z-10 px-7 py-3 rounded-3xl text-base font-bold text-white bg-accent border-2 border-blue-300/80 shadow-[0_0_24px_rgba(37,99,235,0.35)] cursor-pointer"
            >
              {category.core.label}
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
