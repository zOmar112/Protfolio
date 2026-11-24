import { useState, useEffect, useRef } from "react";

const TRAIL_LENGTH = 6;
const LERP_FACTOR = 0.2;

/* ── 32px Airplane SVG (24x24 viewBox, nose pointing up) ── */
function PlaneSvg() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      className="block text-accent dark:text-blue-400"
      style={{
        filter: "drop-shadow(0 2px 4px rgba(37, 99, 235, 0.35))",
      }}
    >
      <path
        fill="currentColor"
        d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
      />
    </svg>
  );
}

export default function PlaneCursor() {
  const [enabled, setEnabled] = useState(false);

  const containerRef = useRef(null);
  const planeRef = useRef(null);
  const trailRefs = useRef([]);

  const hasMoved = useRef(false);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const currentAngle = useRef(0);
  const isHovering = useRef(false);

  const trailPositions = useRef(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))
  );

  // Enable only on fine-pointer devices when reduced motion is not preferred
  useEffect(() => {
    const fineQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateEnabled = () => {
      setEnabled(fineQuery.matches && !motionQuery.matches);
    };

    updateEnabled();
    fineQuery.addEventListener("change", updateEnabled);
    motionQuery.addEventListener("change", updateEnabled);

    return () => {
      fineQuery.removeEventListener("change", updateEnabled);
      motionQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  // Mouse tracking and requestAnimationFrame lerp loop (no setState on mousemove)
  useEffect(() => {
    if (!enabled) return;

    const setContainerVisible = (visible) => {
      if (containerRef.current) {
        containerRef.current.style.opacity = visible ? "1" : "0";
      }
    };

    const handleMouseMove = (e) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

      if (!hasMoved.current) {
        hasMoved.current = true;
        currentPos.current.x = e.clientX;
        currentPos.current.y = e.clientY;
        for (let i = 0; i < TRAIL_LENGTH; i++) {
          trailPositions.current[i].x = e.clientX;
          trailPositions.current[i].y = e.clientY;
        }
      }

      const target = e.target instanceof Element ? e.target : null;
      isHovering.current = Boolean(
        target &&
          target.closest("a, button, [role='button'], .cursor-pointer, label")
      );

      setContainerVisible(true);
    };

    const handleMouseLeave = () => {
      setContainerVisible(false);
    };

    const handleWindowBlur = () => {
      setContainerVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("blur", handleWindowBlur);

    let animId;
    const animate = () => {
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;

      currentPos.current.x += dx * LERP_FACTOR;
      currentPos.current.y += dy * LERP_FACTOR;

      // Rotate to movement direction (nose points up, so +90deg); keep last angle when still
      const dist = Math.hypot(dx, dy);
      if (dist > 0.5) {
        const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        let angleDiff = (targetAngle - currentAngle.current) % 360;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;
        currentAngle.current += angleDiff * 0.3;
      }

      const scale = isHovering.current ? 1.25 : 1;
      if (planeRef.current) {
        planeRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%) rotate(${currentAngle.current}deg) scale(${scale})`;
      }

      // Update short fading trail of 6 small dots
      let leaderX = currentPos.current.x;
      let leaderY = currentPos.current.y;
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const dot = trailPositions.current[i];
        dot.x += (leaderX - dot.x) * 0.35;
        dot.y += (leaderY - dot.y) * 0.35;

        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
        }

        leaderX = dot.x;
        leaderY = dot.y;
      }

      animId = window.requestAnimationFrame(animate);
    };

    animId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("blur", handleWindowBlur);
      window.cancelAnimationFrame(animId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: 0,
        transition: "opacity 150ms ease",
      }}
    >
      {/* Short fading trail of 6 small dots */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, idx) => {
        const size = Math.max(2, 6 - idx * 0.6);
        const opacity = Math.max(0.08, 0.45 - idx * 0.065);

        return (
          <div
            key={idx}
            ref={(el) => (trailRefs.current[idx] = el)}
            className="rounded-full bg-accent dark:bg-blue-400"
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              pointerEvents: "none",
              willChange: "transform",
            }}
          />
        );
      })}

      {/* 32px Airplane Cursor */}
      <div
        ref={planeRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "32px",
          height: "32px",
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        <PlaneSvg />
      </div>
    </div>
  );
}
