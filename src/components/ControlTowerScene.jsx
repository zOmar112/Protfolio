/* Control Tower Scene: low-contrast SVG airport silhouette at viewport bottom */
const EDGE_LIGHTS = [
  { id: "l1", cx: 140, cy: 238, delay: "0s" },
  { id: "l2", cx: 280, cy: 229, delay: "0.4s" },
  { id: "l3", cx: 430, cy: 221, delay: "0.8s" },
  { id: "l4", cx: 590, cy: 214, delay: "1.2s" },
  { id: "l5", cx: 750, cy: 208, delay: "1.6s" },
  { id: "l6", cx: 910, cy: 203, delay: "0.2s" },
  { id: "r1", cx: 240, cy: 256, delay: "0.6s" },
  { id: "r2", cx: 410, cy: 244, delay: "1.0s" },
  { id: "r3", cx: 585, cy: 233, delay: "1.4s" },
  { id: "r4", cx: 760, cy: 224, delay: "1.8s" },
  { id: "r5", cx: 930, cy: 216, delay: "0.3s" },
];

export default function ControlTowerScene({ isDark, reducedMotion, isPaused }) {
  const playState = isPaused ? "paused" : "running";

  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes tower-beacon-blink {
          0%, 45%, 100% { opacity: 0.25; }
          50%, 75% { opacity: 0.95; }
        }
        @keyframes tower-beam-rotate {
          0% { transform: rotate(-18deg); opacity: 0.55; }
          50% { transform: rotate(22deg); opacity: 0.28; }
          100% { transform: rotate(-18deg); opacity: 0.55; }
        }
        @keyframes runway-light-blink {
          0%, 100% { opacity: 0.22; }
          50% { opacity: 0.8; }
        }
        @keyframes tower-plane-takeoff {
          0% {
            transform: translate3d(4vw, 0vh, 0) rotate(86deg) scale(0.82);
            opacity: 0;
          }
          8% {
            transform: translate3d(14vw, -0.5vh, 0) rotate(85deg) scale(0.86);
            opacity: 0.55;
          }
          36% {
            transform: translate3d(42vw, -2vh, 0) rotate(78deg) scale(0.95);
            opacity: 0.6;
          }
          65% {
            transform: translate3d(68vw, -16vh, 0) rotate(56deg) scale(1);
            opacity: 0.5;
          }
          92% {
            transform: translate3d(94vw, -44vh, 0) rotate(44deg) scale(0.92);
            opacity: 0;
          }
          100% {
            transform: translate3d(96vw, -46vh, 0) rotate(44deg) scale(0.92);
            opacity: 0;
          }
        }
      `}</style>

      {/* Bottom Airport Horizon Container: 20vh on mobile, 30vh on desktop */}
      <div className="absolute inset-x-0 bottom-0 h-[20vh] md:h-[30vh] min-h-[120px] max-h-[320px] pointer-events-none">
        {/* Faint rotating light beam from tower (desktop only, transform/opacity only) */}
        <div
          className="hidden md:block absolute right-[13.5%] bottom-[64%] w-[46vw] h-[140px] pointer-events-none"
          style={{
            transformOrigin: "100% 50%",
            animationName: reducedMotion ? "none" : "tower-beam-rotate",
            animationDuration: "10s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationPlayState: playState,
            opacity: reducedMotion ? 0.3 : undefined,
          }}
        >
          <div
            className="w-full h-full"
            style={{
              background: isDark
                ? "linear-gradient(270deg, rgba(59, 130, 246, 0.14) 0%, rgba(56, 189, 248, 0.04) 45%, transparent 100%)"
                : "linear-gradient(270deg, rgba(37, 99, 235, 0.09) 0%, rgba(59, 130, 246, 0.025) 45%, transparent 100%)",
              clipPath: "polygon(100% 48%, 0% 10%, 0% 90%)",
            }}
          />
        </div>

        {/* Plane taking off from runway every 12s (transform & opacity only) */}
        <div
          className="absolute left-0 bottom-[16%] w-8 h-8 text-accent dark:text-blue-400 will-change-transform"
          style={{
            animationName: reducedMotion ? "none" : "tower-plane-takeoff",
            animationDuration: "12s",
            animationTimingFunction: "cubic-bezier(0.32, 0, 0.67, 0.9)",
            animationIterationCount: "infinite",
            animationPlayState: playState,
            transform: reducedMotion
              ? "translate3d(46vw, -9vh, 0) rotate(62deg) scale(0.95)"
              : undefined,
            opacity: reducedMotion ? 0.45 : undefined,
          }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full block" fill="currentColor">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </div>

        {/* Minimal SVG Airport Silhouette: Runway + Perspective Markings + Control Tower */}
        <svg
          viewBox="0 0 1440 270"
          preserveAspectRatio="none"
          className="block w-full h-full"
          fill="none"
          aria-hidden="true"
        >
          {/* Horizon ground plane */}
          <path
            d="M0 198 L1440 198 L1440 270 L0 270 Z"
            className="fill-blue-600/[0.045] dark:fill-blue-400/[0.055]"
          />

          {/* Runway strip in perspective */}
          <polygon
            points="0,262 1180,198 1265,198 315,270 0,270"
            className="fill-blue-700/[0.06] dark:fill-blue-300/[0.07]"
          />

          {/* Runway outer edge lines */}
          <line
            x1="0"
            y1="262"
            x2="1180"
            y2="198"
            className="stroke-blue-600/20 dark:stroke-blue-400/20"
            strokeWidth="1.2"
          />
          <line
            x1="315"
            y1="270"
            x2="1265"
            y2="198"
            className="stroke-blue-600/20 dark:stroke-blue-400/20"
            strokeWidth="1.2"
          />

          {/* Dashed runway centerline */}
          <line
            x1="120"
            y1="266"
            x2="1220"
            y2="198"
            className="stroke-blue-600/30 dark:stroke-blue-300/30"
            strokeWidth="2"
            strokeDasharray="18 14"
            strokeLinecap="round"
          />

          {/* Tiny blinking runway edge lights in perspective */}
          {EDGE_LIGHTS.map((pt) => (
            <circle
              key={pt.id}
              cx={pt.cx}
              cy={pt.cy}
              r="2.2"
              className="fill-accent dark:fill-cyan-300"
              style={{
                animationName: reducedMotion ? "none" : "runway-light-blink",
                animationDuration: "2.6s",
                animationDelay: pt.delay,
                animationIterationCount: "infinite",
                animationPlayState: playState,
                opacity: reducedMotion ? 0.4 : undefined,
              }}
            />
          ))}

          {/* Control Tower Silhouette on the Right */}
          <g className="fill-blue-900/[0.14] dark:fill-blue-300/[0.16]">
            {/* Base terminal wing */}
            <rect x="1165" y="176" width="170" height="24" rx="2" />
            {/* Tower shaft */}
            <polygon points="1234,176 1258,176 1254,84 1238,84" />
            {/* Tower neck */}
            <rect x="1224" y="76" width="44" height="10" rx="2" />
            {/* Observation cab (trapezoid) */}
            <polygon points="1216,52 1276,52 1268,76 1224,76" />
            {/* Cab roof */}
            <polygon points="1212,46 1280,46 1276,52 1216,52" />
            {/* Antenna mast */}
            <rect x="1245" y="24" width="2" height="22" />
          </g>

          {/* Subtle cab window strip */}
          <polygon
            points="1222,56 1270,56 1265,67 1227,67"
            className="fill-accent/25 dark:fill-cyan-300/25"
          />

          {/* Small blinking beacon light at top of tower */}
          <circle
            cx="1246"
            cy="22"
            r="3.5"
            className="fill-accent dark:fill-cyan-300"
            style={{
              animationName: reducedMotion ? "none" : "tower-beacon-blink",
              animationDuration: "2.2s",
              animationIterationCount: "infinite",
              animationPlayState: playState,
              opacity: reducedMotion ? 0.6 : undefined,
            }}
          />
        </svg>
      </div>
    </div>
  );
}
