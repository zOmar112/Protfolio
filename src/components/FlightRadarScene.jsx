/* Flight Radar Scene: faint SVG world grid, city hubs (Cairo accent), great-circle arcs & moving planes */
const CITIES = [
  { id: "cai", code: "CAI", x: 560, y: 248, isCairo: true, chip: true },
  { id: "dxb", code: "DXB", x: 648, y: 262, chip: true },
  { id: "lhr", code: "LHR", x: 465, y: 158, chip: true },
  { id: "cdg", code: "CDG", x: 482, y: 176, chip: false },
  { id: "jfk", code: "JFK", x: 268, y: 196, chip: false },
  { id: "ruh", code: "RUH", x: 612, y: 274, chip: false },
  { id: "hnd", code: "HND", x: 856, y: 214, chip: false },
];

const ARCS = [
  { id: "cai-lhr", d: "M 560 248 Q 505 182 465 158" },
  { id: "cai-dxb", d: "M 560 248 Q 608 236 648 262" },
  { id: "lhr-jfk", d: "M 465 158 Q 360 120 268 196" },
  { id: "dxb-hnd", d: "M 648 262 Q 758 188 856 214" },
  { id: "cai-cdg", d: "M 560 248 Q 518 202 482 176" },
  { id: "cai-ruh", d: "M 560 248 Q 590 258 612 274" },
];

/* Moving planes use transform/opacity keyframes only (2 hidden on mobile to keep mobile ultra-light) */
const PLANES = [
  {
    id: "p1",
    anim: "radar-plane-cai-lhr",
    dur: "18s",
    delay: "0s",
    staticX: "51%",
    staticY: "39%",
    staticRot: -50,
    mobile: true,
  },
  {
    id: "p2",
    anim: "radar-plane-dxb-hnd",
    dur: "22s",
    delay: "-6s",
    staticX: "74%",
    staticY: "42%",
    staticRot: 76,
    mobile: true,
  },
  {
    id: "p3",
    anim: "radar-plane-lhr-jfk",
    dur: "24s",
    delay: "-10s",
    staticX: "36%",
    staticY: "31%",
    staticRot: -102,
    mobile: false,
  },
  {
    id: "p4",
    anim: "radar-plane-cai-dxb",
    dur: "15s",
    delay: "-4s",
    staticX: "60%",
    staticY: "49%",
    staticRot: 96,
    mobile: false,
  },
];

export default function FlightRadarScene({ isDark, reducedMotion, isPaused }) {
  const playState = isPaused ? "paused" : "running";

  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes cairo-pulse-ring {
          0% { transform: scale(0.7); opacity: 0.7; }
          100% { transform: scale(3.2); opacity: 0; }
        }
        @keyframes radar-plane-cai-lhr {
          0% { transform: translate3d(56vw, 49.5vh, 0) rotate(-42deg); opacity: 0; }
          10% { opacity: 0.65; }
          50% { transform: translate3d(51vw, 39vh, 0) rotate(-48deg); opacity: 0.65; }
          90% { opacity: 0.65; }
          100% { transform: translate3d(46.5vw, 31.5vh, 0) rotate(-54deg); opacity: 0; }
        }
        @keyframes radar-plane-dxb-hnd {
          0% { transform: translate3d(64.8vw, 52.4vh, 0) rotate(62deg); opacity: 0; }
          10% { opacity: 0.6; }
          50% { transform: translate3d(75vw, 42.5vh, 0) rotate(78deg); opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translate3d(85.6vw, 42.8vh, 0) rotate(94deg); opacity: 0; }
        }
        @keyframes radar-plane-lhr-jfk {
          0% { transform: translate3d(46.5vw, 31.6vh, 0) rotate(-78deg); opacity: 0; }
          10% { opacity: 0.55; }
          50% { transform: translate3d(36.2vw, 29.5vh, 0) rotate(-98deg); opacity: 0.55; }
          90% { opacity: 0.55; }
          100% { transform: translate3d(26.8vw, 39.2vh, 0) rotate(-118deg); opacity: 0; }
        }
        @keyframes radar-plane-cai-dxb {
          0% { transform: translate3d(56vw, 49.6vh, 0) rotate(82deg); opacity: 0; }
          12% { opacity: 0.6; }
          50% { transform: translate3d(60.5vw, 48.2vh, 0) rotate(94deg); opacity: 0.6; }
          88% { opacity: 0.6; }
          100% { transform: translate3d(64.8vw, 52.4vh, 0) rotate(106deg); opacity: 0; }
        }
      `}</style>

      {/* Full-screen faint SVG world grid map */}
      <svg
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
        className="block w-full h-full"
        fill="none"
        aria-hidden="true"
      >
        {/* Faint latitude & longitude graticule lines */}
        <g
          className={isDark ? "stroke-blue-400/[0.07]" : "stroke-blue-600/[0.06]"}
          strokeWidth="0.8"
          strokeDasharray="3 5"
        >
          <line x1="0" y1="100" x2="1000" y2="100" />
          <line x1="0" y1="200" x2="1000" y2="200" />
          <line x1="0" y1="300" x2="1000" y2="300" />
          <line x1="0" y1="400" x2="1000" y2="400" />
          <line x1="200" y1="0" x2="200" y2="500" />
          <line x1="400" y1="0" x2="400" y2="500" />
          <line x1="600" y1="0" x2="600" y2="500" />
          <line x1="800" y1="0" x2="800" y2="500" />
        </g>

        {/* Simple stylized minimal SVG continent silhouettes (no map images) */}
        <g
          className={
            isDark
              ? "fill-blue-400/[0.05] stroke-blue-400/[0.1]"
              : "fill-blue-600/[0.045] stroke-blue-600/[0.09]"
          }
          strokeWidth="1"
        >
          {/* Americas */}
          <path d="M135 125 L255 110 L300 170 L275 235 L210 255 L170 215 Z" />
          <path d="M245 275 L315 285 L345 355 L295 435 L265 405 L250 330 Z" />
          {/* Europe */}
          <path d="M445 125 L545 112 L580 155 L545 198 L465 202 L442 165 Z" />
          {/* Africa */}
          <path d="M455 225 L575 222 L612 275 L575 395 L520 408 L480 320 L448 265 Z" />
          {/* Middle East & Asia */}
          <path d="M585 130 L845 120 L895 190 L845 265 L745 288 L645 285 L590 230 Z" />
          {/* Australia */}
          <path d="M785 345 L875 340 L895 398 L815 415 L775 385 Z" />
        </g>

        {/* Curved great-circle flight arcs */}
        {ARCS.map((arc) => (
          <path
            key={arc.id}
            d={arc.d}
            className={
              isDark ? "stroke-blue-400/25" : "stroke-blue-600/20"
            }
            strokeWidth="1.2"
            strokeDasharray="4 5"
          />
        ))}

        {/* City dots & Cairo pulse ring */}
        {CITIES.map((city) => (
          <g key={city.id}>
            {city.isCairo && !reducedMotion && (
              <circle
                cx={city.x}
                cy={city.y}
                r="5"
                className="stroke-accent dark:stroke-blue-400"
                strokeWidth="1.4"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animationName: "cairo-pulse-ring",
                  animationDuration: "2.8s",
                  animationTimingFunction: "ease-out",
                  animationIterationCount: "infinite",
                  animationPlayState: playState,
                }}
              />
            )}
            <circle
              cx={city.x}
              cy={city.y}
              r={city.isCairo ? 4 : 2.6}
              className={
                city.isCairo
                  ? "fill-accent dark:fill-blue-400"
                  : isDark
                  ? "fill-blue-300/60"
                  : "fill-blue-600/45"
              }
            />
          </g>
        ))}

        {/* 3 low-opacity floating airport code chips: CAI, DXB, LHR */}
        {CITIES.filter((c) => c.chip).map((city) => (
          <g key={`chip-${city.id}`} opacity={isDark ? 0.38 : 0.35}>
            <rect
              x={city.x + 8}
              y={city.y - 12}
              width="32"
              height="16"
              rx="4"
              className={
                city.isCairo
                  ? "fill-accent/20 stroke-accent/60"
                  : isDark
                  ? "fill-blue-950/70 stroke-blue-400/40"
                  : "fill-white/80 stroke-blue-500/35"
              }
              strokeWidth="0.9"
            />
            <text
              x={city.x + 24}
              y={city.y - 1}
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="monospace"
              fontWeight="600"
              className={
                city.isCairo
                  ? "fill-accent dark:fill-blue-300"
                  : isDark
                  ? "fill-blue-200"
                  : "fill-blue-800"
              }
            >
              {city.code}
            </text>
          </g>
        ))}
      </svg>

      {/* Tiny plane icons moving smoothly along arcs (transform & opacity only) */}
      {PLANES.map((plane) => (
        <div
          key={plane.id}
          aria-hidden="true"
          className={`${!plane.mobile ? "hidden md:block" : ""} absolute top-0 left-0 w-4 h-4 text-accent dark:text-blue-300 will-change-transform`}
          style={
            reducedMotion
              ? {
                  left: plane.staticX,
                  top: plane.staticY,
                  transform: `rotate(${plane.staticRot}deg)`,
                  opacity: 0.45,
                }
              : {
                  animationName: plane.anim,
                  animationDuration: plane.dur,
                  animationDelay: plane.delay,
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  animationPlayState: playState,
                }
          }
        >
          <svg viewBox="0 0 24 24" className="w-full h-full block" fill="currentColor">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
