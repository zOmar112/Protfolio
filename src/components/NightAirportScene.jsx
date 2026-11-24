/* Night Airport Scene: bottom 30vh (20vh mobile) perspective runway, taxiway, approach lights & landing plane */
const RUNWAY_WHITE_LIGHTS = [
  { id: "lw1", cx: 210, cy: 252, delay: "0s", mobile: true },
  { id: "lw2", cx: 345, cy: 235, delay: "0.35s", mobile: false },
  { id: "lw3", cx: 465, cy: 220, delay: "0.7s", mobile: true },
  { id: "lw4", cx: 565, cy: 208, delay: "1.05s", mobile: false },
  { id: "lw5", cx: 645, cy: 198, delay: "1.4s", mobile: true },
  { id: "rw1", cx: 1230, cy: 252, delay: "0.2s", mobile: true },
  { id: "rw2", cx: 1095, cy: 235, delay: "0.55s", mobile: false },
  { id: "rw3", cx: 975, cy: 220, delay: "0.9s", mobile: true },
  { id: "rw4", cx: 875, cy: 208, delay: "1.25s", mobile: false },
  { id: "rw5", cx: 795, cy: 198, delay: "1.6s", mobile: true },
];

const TAXIWAY_LIGHTS = [
  { id: "tx1", cx: 1040, cy: 236, color: "green", mobile: true },
  { id: "tx2", cx: 1110, cy: 228, color: "blue", mobile: false },
  { id: "tx3", cx: 1180, cy: 221, color: "green", mobile: true },
  { id: "tx4", cx: 1250, cy: 215, color: "blue", mobile: true },
  { id: "tx5", cx: 1320, cy: 210, color: "green", mobile: false },
  { id: "tx6", cx: 1385, cy: 206, color: "blue", mobile: true },
];

const APPROACH_LIGHTS = [
  { id: "ap1", cx: 720, cy: 262, delay: "0s" },
  { id: "ap2", cx: 720, cy: 244, delay: "0.22s" },
  { id: "ap3", cx: 720, cy: 228, delay: "0.44s" },
  { id: "ap4", cx: 720, cy: 214, delay: "0.66s" },
  { id: "ap5", cx: 720, cy: 202, delay: "0.88s" },
];

export default function NightAirportScene({ isDark, reducedMotion, isPaused }) {
  const playState = isPaused ? "paused" : "running";

  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes airport-edge-blink {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.85; }
        }
        @keyframes airport-approach-pulse {
          0%, 60%, 100% { opacity: 0.18; transform: scale(0.9); }
          25% { opacity: 0.9; transform: scale(1.25); }
        }
        @keyframes airport-landing-descent {
          0% {
            transform: translate3d(-26vw, -30vh, 0) scale(0.45);
            opacity: 0;
          }
          14% {
            transform: translate3d(-18vw, -22vh, 0) scale(0.55);
            opacity: 0.72;
          }
          58% {
            transform: translate3d(-4vw, -6vh, 0) scale(0.82);
            opacity: 0.85;
          }
          82% {
            transform: translate3d(0vw, 1vh, 0) scale(0.95);
            opacity: 0.55;
          }
          100% {
            transform: translate3d(1vw, 2vh, 0) scale(1);
            opacity: 0;
          }
        }
      `}</style>

      {/* Softened dusk sky overlay in Light mode; deep navy night sky in Dark mode */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: isDark
            ? "linear-gradient(180deg, rgba(4, 9, 22, 0.25) 0%, rgba(7, 16, 36, 0.55) 70%, rgba(11, 22, 48, 0.8) 100%)"
            : "linear-gradient(180deg, rgba(219, 234, 254, 0.15) 0%, rgba(148, 163, 184, 0.12) 65%, rgba(30, 58, 138, 0.16) 100%)",
        }}
      />

      {/* Bottom 20vh (mobile) / 30vh (desktop) Airport Horizon */}
      <div className="absolute inset-x-0 bottom-0 h-[20vh] md:h-[30vh] min-h-[120px] max-h-[320px] pointer-events-none">
        {/* Faint City Glow on Horizon */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[26%] h-20 pointer-events-none"
          style={{
            background: isDark
              ? "radial-gradient(ellipse 65% 80% at 50% 100%, rgba(56, 189, 248, 0.12) 0%, rgba(37, 99, 235, 0.06) 45%, transparent 78%)"
              : "radial-gradient(ellipse 65% 80% at 50% 100%, rgba(37, 99, 235, 0.08) 0%, rgba(59, 130, 246, 0.03) 45%, transparent 78%)",
          }}
        />

        {/* Distant Plane Landing Lights descending every 14s (transform & opacity only) */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 bottom-[28%] -ml-5 flex items-center gap-2 will-change-transform"
          style={{
            animationName: reducedMotion ? "none" : "airport-landing-descent",
            animationDuration: "14s",
            animationTimingFunction: "cubic-bezier(0.25, 0.1, 0.3, 1)",
            animationIterationCount: "infinite",
            animationPlayState: playState,
            transform: reducedMotion
              ? "translate3d(-10vw, -12vh, 0) scale(0.75)"
              : undefined,
            opacity: reducedMotion ? (isDark ? 0.55 : 0.35) : undefined,
          }}
        >
          {/* Left wingtip red nav dot */}
          <span className="w-1 h-1 rounded-full bg-rose-400/70 dark:bg-rose-400/80" />
          {/* Twin landing headlights */}
          <span
            className="w-2 h-2 rounded-full bg-blue-100 dark:bg-white"
            style={{
              boxShadow: isDark
                ? "0 0 10px 3px rgba(186, 230, 253, 0.65)"
                : "0 0 7px 2px rgba(59, 130, 246, 0.35)",
            }}
          />
          <span
            className="w-2 h-2 rounded-full bg-blue-100 dark:bg-white"
            style={{
              boxShadow: isDark
                ? "0 0 10px 3px rgba(186, 230, 253, 0.65)"
                : "0 0 7px 2px rgba(59, 130, 246, 0.35)",
            }}
          />
          {/* Right wingtip green nav dot */}
          <span className="w-1 h-1 rounded-full bg-emerald-400/70 dark:bg-emerald-400/80" />
        </div>

        {/* Perspective Runway, Taxiway & Approach Lights SVG */}
        <svg
          viewBox="0 0 1440 270"
          preserveAspectRatio="none"
          className="block w-full h-full"
          fill="none"
          aria-hidden="true"
        >
          {/* Ground horizon strip */}
          <rect
            x="0"
            y="194"
            width="1440"
            height="76"
            className={
              isDark ? "fill-[#071226]/75" : "fill-blue-950/[0.08]"
            }
          />

          {/* Subtle horizon silhouette skyline */}
          <path
            d="M0 194 L180 194 L180 186 L210 186 L210 194 L320 194 L320 182 L342 182 L342 194 L1060 194 L1060 184 L1095 184 L1095 194 L1210 194 L1210 179 L1238 179 L1238 194 L1440 194"
            className={
              isDark ? "fill-blue-400/[0.08]" : "fill-blue-900/[0.07]"
            }
          />

          {/* Main Perspective Runway Trapezoid */}
          <polygon
            points="660,194 780,194 1280,270 160,270"
            className={
              isDark ? "fill-blue-300/[0.07]" : "fill-blue-950/[0.08]"
            }
          />

          {/* Runway Perspective Edge Lines */}
          <line
            x1="660"
            y1="194"
            x2="160"
            y2="270"
            className={isDark ? "stroke-blue-200/20" : "stroke-blue-900/18"}
            strokeWidth="1.2"
          />
          <line
            x1="780"
            y1="194"
            x2="1280"
            y2="270"
            className={isDark ? "stroke-blue-200/20" : "stroke-blue-900/18"}
            strokeWidth="1.2"
          />

          {/* Taxiway branch line */}
          <line
            x1="1010"
            y1="238"
            x2="1410"
            y2="204"
            className={isDark ? "stroke-emerald-300/15" : "stroke-emerald-700/15"}
            strokeWidth="1.2"
            strokeDasharray="8 8"
          />

          {/* Approach-light line pulsing sequentially toward the horizon */}
          {APPROACH_LIGHTS.map((light) => (
            <circle
              key={light.id}
              cx={light.cx}
              cy={light.cy}
              r="2.4"
              className={isDark ? "fill-sky-200" : "fill-blue-600/70"}
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                animationName: reducedMotion
                  ? "none"
                  : "airport-approach-pulse",
                animationDuration: "2.2s",
                animationDelay: light.delay,
                animationIterationCount: "infinite",
                animationPlayState: playState,
                opacity: reducedMotion ? (isDark ? 0.45 : 0.3) : undefined,
              }}
            />
          ))}

          {/* Tiny blinking white runway edge lights */}
          {RUNWAY_WHITE_LIGHTS.map((light) => (
            <circle
              key={light.id}
              cx={light.cx}
              cy={light.cy}
              r="2.1"
              className={`${!light.mobile ? "hidden sm:block" : ""} ${
                isDark ? "fill-white" : "fill-blue-700/65"
              }`}
              style={{
                animationName: reducedMotion ? "none" : "airport-edge-blink",
                animationDuration: "2.8s",
                animationDelay: light.delay,
                animationIterationCount: "infinite",
                animationPlayState: playState,
                opacity: reducedMotion ? (isDark ? 0.5 : 0.3) : undefined,
              }}
            />
          ))}

          {/* Green / Blue taxiway light pattern */}
          {TAXIWAY_LIGHTS.map((light) => (
            <circle
              key={light.id}
              cx={light.cx}
              cy={light.cy}
              r="2"
              className={`${!light.mobile ? "hidden sm:block" : ""} ${
                light.color === "green"
                  ? isDark
                    ? "fill-emerald-400/75"
                    : "fill-emerald-600/50"
                  : isDark
                  ? "fill-blue-400/75"
                  : "fill-blue-600/50"
              }`}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
