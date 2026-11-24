/* Night Airport Scene: bottom 35vh perspective runway, taxiway, terminal, control tower & landing aircraft */

const PLANE_PATH =
  "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";

const SKY_STARS = [
  { id: "s1", cx: 110, cy: 26, r: 1.1, op: 0.45, mobile: true },
  { id: "s2", cx: 235, cy: 52, r: 0.9, op: 0.35, mobile: false },
  { id: "s3", cx: 360, cy: 18, r: 1.2, op: 0.5, mobile: true },
  { id: "s4", cx: 485, cy: 44, r: 0.8, op: 0.3, mobile: false },
  { id: "s5", cx: 590, cy: 22, r: 1.0, op: 0.4, mobile: true },
  { id: "s6", cx: 715, cy: 36, r: 0.9, op: 0.35, mobile: false },
  { id: "s7", cx: 830, cy: 16, r: 1.2, op: 0.45, mobile: true },
  { id: "s8", cx: 945, cy: 48, r: 0.9, op: 0.35, mobile: false },
  { id: "s9", cx: 1060, cy: 24, r: 1.1, op: 0.4, mobile: true },
  { id: "s10", cx: 1190, cy: 38, r: 0.9, op: 0.35, mobile: false },
  { id: "s11", cx: 1320, cy: 20, r: 1.1, op: 0.45, mobile: true },
  { id: "s12", cx: 165, cy: 88, r: 0.8, op: 0.25, mobile: false },
  { id: "s13", cx: 420, cy: 96, r: 0.9, op: 0.28, mobile: false },
  { id: "s14", cx: 895, cy: 82, r: 0.8, op: 0.25, mobile: false },
  { id: "s15", cx: 1270, cy: 76, r: 0.9, op: 0.3, mobile: true },
];

const HORIZON_LIGHTS = [
  { id: "h1", cx: 95, cy: 173, warm: true, mobile: false },
  { id: "h2", cx: 155, cy: 175, warm: false, mobile: true },
  { id: "h3", cx: 245, cy: 174, warm: true, mobile: false },
  { id: "h4", cx: 340, cy: 172, warm: true, mobile: true },
  { id: "h5", cx: 430, cy: 175, warm: false, mobile: false },
  { id: "h6", cx: 525, cy: 174, warm: true, mobile: true },
  { id: "h7", cx: 845, cy: 174, warm: true, mobile: true },
  { id: "h8", cx: 915, cy: 172, warm: false, mobile: false },
  { id: "h9", cx: 985, cy: 175, warm: true, mobile: true },
  { id: "h10", cx: 1395, cy: 174, warm: false, mobile: false },
];

// Perspective runway edge lights: left edge (240,320)->(678,178), right edge (1200,320)->(762,178)
const RUNWAY_EDGE_LIGHTS = [
  { id: "l1", cx: 306, cy: 299, r: 2.3, delay: "0s", mobile: true },
  { id: "l2", cx: 386, cy: 273, r: 2.0, delay: "0.25s", mobile: false },
  { id: "l3", cx: 458, cy: 249, r: 1.8, delay: "0.5s", mobile: true },
  { id: "l4", cx: 522, cy: 229, r: 1.6, delay: "0.75s", mobile: false },
  { id: "l5", cx: 579, cy: 210, r: 1.4, delay: "1.0s", mobile: true },
  { id: "l6", cx: 628, cy: 194, r: 1.2, delay: "1.25s", mobile: false },
  { id: "l7", cx: 668, cy: 181, r: 1.0, delay: "1.5s", mobile: true },
  { id: "r1", cx: 1134, cy: 299, r: 2.3, delay: "0.12s", mobile: true },
  { id: "r2", cx: 1054, cy: 273, r: 2.0, delay: "0.37s", mobile: false },
  { id: "r3", cx: 982, cy: 249, r: 1.8, delay: "0.62s", mobile: true },
  { id: "r4", cx: 918, cy: 229, r: 1.6, delay: "0.87s", mobile: false },
  { id: "r5", cx: 861, cy: 210, r: 1.4, delay: "1.12s", mobile: true },
  { id: "r6", cx: 812, cy: 194, r: 1.2, delay: "1.37s", mobile: false },
  { id: "r7", cx: 772, cy: 181, r: 1.0, delay: "1.62s", mobile: true },
];

// Pulsing amber approach lights leading toward runway threshold
const APPROACH_AMBER_LIGHTS = [
  { id: "a1", cx: 720, cy: 314, r: 2.6, delay: "0s" },
  { id: "a2", cx: 720, cy: 300, r: 2.3, delay: "0.18s" },
  { id: "a3", cx: 720, cy: 287, r: 2.0, delay: "0.36s" },
  { id: "a4", cx: 720, cy: 275, r: 1.8, delay: "0.54s" },
  { id: "a5", cx: 720, cy: 264, r: 1.6, delay: "0.72s" },
];

// Blue taxiway edge lights along taxiway branching right to terminal apron
const TAXIWAY_BLUE_LIGHTS = [
  { id: "t1", cx: 968, cy: 238, mobile: true },
  { id: "t2", cx: 1024, cy: 227, mobile: false },
  { id: "t3", cx: 1082, cy: 217, mobile: true },
  { id: "t4", cx: 1142, cy: 208, mobile: false },
  { id: "t5", cx: 1204, cy: 201, mobile: true },
  { id: "t6", cx: 1268, cy: 196, mobile: true },
  { id: "t7", cx: 992, cy: 251, mobile: false },
  { id: "t8", cx: 1054, cy: 238, mobile: true },
  { id: "t9", cx: 1118, cy: 226, mobile: false },
  { id: "t10", cx: 1184, cy: 216, mobile: true },
  { id: "t11", cx: 1254, cy: 208, mobile: false },
  { id: "t12", cx: 1322, cy: 202, mobile: true },
];

// Terminal lit windows
const TERMINAL_WINDOWS = [
  1176, 1188, 1200, 1212, 1230, 1242, 1254, 1272, 1284, 1296, 1314, 1326, 1344,
];

export default function NightAirportScene({
  isDark,
  reducedMotion,
  isPaused,
  isPreview = false,
}) {
  const isStatic = reducedMotion || isPreview;
  const playState = isPaused || isStatic ? "paused" : "running";
  const p = isPreview ? "na-prev" : "na-main";

  return (
    <div className="absolute inset-0 overflow-hidden">
      {!isPreview && (
        <style>{`
          @keyframes na-edge-twinkle {
            0%, 100% { opacity: 0.28; }
            50% { opacity: 0.92; }
          }
          @keyframes na-amber-pulse {
            0%, 65%, 100% { opacity: 0.22; transform: scale(0.9); }
            28% { opacity: 0.95; transform: scale(1.25); }
          }
          @keyframes na-tower-beacon {
            0%, 42%, 100% { opacity: 0.15; }
            50%, 62% { opacity: 0.95; }
          }
          @keyframes na-tail-strobe {
            0%, 72%, 100% { opacity: 0.08; }
            78%, 86% { opacity: 1; }
          }
          @keyframes na-plane-approach {
            0% {
              transform: translate(190px, 34px) rotate(112deg) scale(1.18, 0.88);
              opacity: 0;
            }
            8% {
              transform: translate(275px, 72px) rotate(110deg) scale(1.14, 0.86);
              opacity: 0.88;
            }
            42% {
              transform: translate(555px, 198px) rotate(104deg) scale(1.02, 0.84);
              opacity: 0.9;
            }
            56% {
              transform: translate(672px, 248px) rotate(88deg) scale(0.9, 0.84);
              opacity: 0.9;
            }
            64% {
              transform: translate(716px, 260px) rotate(12deg) scale(0.76, 0.78);
              opacity: 0.88;
            }
            74% {
              transform: translate(720px, 224px) rotate(0deg) scale(0.48, 0.56);
              opacity: 0.75;
            }
            86% {
              transform: translate(720px, 186px) rotate(0deg) scale(0.22, 0.28);
              opacity: 0;
            }
            100% {
              transform: translate(720px, 186px) rotate(0deg) scale(0.22, 0.28);
              opacity: 0;
            }
          }
        `}</style>
      )}

      {/* Sky tint: deep navy night in Dark mode, softened dusk in Light mode */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: isDark
            ? "linear-gradient(180deg, rgba(4, 9, 22, 0.22) 0%, rgba(7, 17, 38, 0.52) 62%, rgba(10, 22, 46, 0.78) 100%)"
            : "linear-gradient(180deg, rgba(219, 234, 254, 0.12) 0%, rgba(148, 163, 184, 0.14) 64%, rgba(30, 58, 138, 0.18) 100%)",
        }}
      />

      {/* Bottom 35vh Airport Scene (24vh on small mobile, 100% in switcher thumbnail preview) */}
      <div
        className={
          isPreview
            ? "absolute inset-0 pointer-events-none"
            : "absolute inset-x-0 bottom-0 h-[24vh] sm:h-[30vh] md:h-[35vh] min-h-[150px] max-h-[380px] pointer-events-none"
        }
      >
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio={isPreview ? "xMidYMid slice" : "xMidYMax slice"}
          className="block w-full h-full"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            {/* Horizon city glow */}
            <radialGradient id={`${p}-city-glow`} cx="50%" cy="100%" r="60%">
              <stop
                offset="0%"
                stopColor={isDark ? "#38bdf8" : "#3b82f6"}
                stopOpacity={isDark ? "0.18" : "0.11"}
              />
              <stop
                offset="48%"
                stopColor={isDark ? "#f59e0b" : "#60a5fa"}
                stopOpacity={isDark ? "0.07" : "0.05"}
              />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>

            {/* Conical aircraft landing light beam (bright at nose y=3.5, fading forward to y=-24) */}
            <linearGradient id={`${p}-landing-beam`} x1="0.5" y1="1" x2="0.5" y2="0">
              <stop
                offset="0%"
                stopColor={isDark ? "#e0f2fe" : "#3b82f6"}
                stopOpacity={isDark ? "0.36" : "0.24"}
              />
              <stop
                offset="60%"
                stopColor={isDark ? "#bae6fd" : "#60a5fa"}
                stopOpacity={isDark ? "0.1" : "0.07"}
              />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0" />
            </linearGradient>

            {/* Runway asphalt gradient */}
            <linearGradient id={`${p}-runway-asphalt`} x1="0.5" y1="0" x2="0.5" y2="1">
              <stop
                offset="0%"
                stopColor={isDark ? "#0d1b36" : "#334155"}
                stopOpacity={isDark ? "0.72" : "0.24"}
              />
              <stop
                offset="100%"
                stopColor={isDark ? "#071022" : "#1e293b"}
                stopOpacity={isDark ? "0.9" : "0.32"}
              />
            </linearGradient>
          </defs>

          {/* Very faint sky stars */}
          <g>
            {SKY_STARS.map((star) => (
              <circle
                key={star.id}
                cx={star.cx}
                cy={star.cy}
                r={star.r}
                fill={isDark ? "#e0f2fe" : "#64748b"}
                opacity={isDark ? star.op : star.op * 0.28}
                className={!star.mobile && !isPreview ? "hidden sm:block" : undefined}
              />
            ))}
          </g>

          {/* Faint horizon city glow */}
          <ellipse cx="720" cy="180" rx="680" ry="72" fill={`url(#${p}-city-glow)`} />

          {/* Distant city skyline silhouette along horizon */}
          <path
            d="M0 178 L70 178 L70 169 L92 169 L92 178 L140 178 L140 166 L165 166 L165 178 L230 178 L230 170 L262 170 L262 178 L330 178 L330 163 L354 163 L354 178 L420 178 L420 169 L448 169 L448 178 L515 178 L515 167 L542 167 L542 178 L835 178 L835 169 L862 169 L862 178 L910 178 L910 165 L936 165 L936 178 L1440 178 L1440 182 L0 182 Z"
            fill={isDark ? "#1e3a5f" : "#334155"}
            fillOpacity={isDark ? "0.36" : "0.14"}
          />

          {/* Distant horizon lights */}
          {HORIZON_LIGHTS.map((hl) => (
            <circle
              key={hl.id}
              cx={hl.cx}
              cy={hl.cy}
              r="1.3"
              fill={hl.warm ? "#fcd34d" : "#93c5fd"}
              opacity={isDark ? 0.42 : 0.2}
              className={!hl.mobile && !isPreview ? "hidden sm:block" : undefined}
            />
          ))}

          {/* Ground plane below horizon */}
          <rect
            x="0"
            y="178"
            width="1440"
            height="142"
            fill={isDark ? "#050d1d" : "#1e293b"}
            fillOpacity={isDark ? "0.82" : "0.14"}
          />

          {/* Control Tower Silhouette (mid-right) */}
          <g>
            {/* Shaft */}
            <polygon
              points="1096,179 1114,179 1110,127 1100,127"
              fill={isDark ? "#172b4d" : "#334155"}
              fillOpacity={isDark ? "0.85" : "0.34"}
            />
            {/* Observation cab */}
            <polygon
              points="1086,115 1124,115 1117,127 1093,127"
              fill={isDark ? "#1e3a5f" : "#1e293b"}
              fillOpacity={isDark ? "0.92" : "0.42"}
            />
            {/* Cab glowing window strip */}
            <polygon
              points="1090,118 1120,118 1117,123 1093,123"
              fill={isDark ? "#7dd3fc" : "#2563eb"}
              fillOpacity={isDark ? "0.42" : "0.28"}
            />
            {/* Roof & antenna */}
            <rect
              x="1084"
              y="112"
              width="42"
              height="3"
              rx="1"
              fill={isDark ? "#254672" : "#334155"}
              fillOpacity={isDark ? "0.88" : "0.4"}
            />
            <line
              x1="1105"
              y1="112"
              x2="1105"
              y2="103"
              stroke={isDark ? "#60a5fa" : "#475569"}
              strokeOpacity={isDark ? "0.55" : "0.38"}
              strokeWidth="1.4"
            />
            {/* Blinking red tower beacon */}
            <circle
              cx="1105"
              cy="102"
              r="2.4"
              fill="#ef4444"
              style={
                isStatic
                  ? { opacity: isDark ? 0.72 : 0.45 }
                  : {
                      animationName: "na-tower-beacon",
                      animationDuration: "1.6s",
                      animationIterationCount: "infinite",
                      animationPlayState: playState,
                    }
              }
            />
          </g>

          {/* Terminal Building Silhouette (right) */}
          <g>
            <path
              d="M1158 180 L1158 158 L1218 153 L1358 153 L1382 162 L1382 180 Z"
              fill={isDark ? "#132544" : "#334155"}
              fillOpacity={isDark ? "0.86" : "0.3"}
            />
            {/* Subtle roofline highlight */}
            <line
              x1="1218"
              y1="153"
              x2="1358"
              y2="153"
              stroke={isDark ? "#60a5fa" : "#475569"}
              strokeOpacity={isDark ? "0.28" : "0.24"}
              strokeWidth="1.2"
            />
            {/* Lit terminal windows */}
            {TERMINAL_WINDOWS.map((wx, idx) => (
              <rect
                key={wx}
                x={wx}
                y="163"
                width="6"
                height="4"
                rx="0.6"
                fill={idx % 3 === 0 ? "#fde68a" : "#bae6fd"}
                fillOpacity={isDark ? (idx % 2 === 0 ? 0.48 : 0.3) : 0.24}
              />
            ))}
          </g>

          {/* Taxiway asphalt branching from runway right edge to apron */}
          <polygon
            points="926,232 958,254 1390,204 1390,188"
            fill={isDark ? "#0b172e" : "#334155"}
            fillOpacity={isDark ? "0.76" : "0.2"}
          />
          <line
            x1="948"
            y1="242"
            x2="1370"
            y2="196"
            stroke={isDark ? "#fbbf24" : "#64748b"}
            strokeOpacity={isDark ? "0.22" : "0.2"}
            strokeWidth="1"
            strokeDasharray="6 6"
          />

          {/* 2 Tiny Parked Plane Silhouettes on the terminal apron */}
          <g
            transform="translate(1168, 186) rotate(-52) scale(0.72)"
            fill={isDark ? "#28456e" : "#334155"}
            fillOpacity={isDark ? "0.65" : "0.34"}
          >
            <path d={PLANE_PATH} />
          </g>
          <g
            transform="translate(1278, 181) rotate(-38) scale(0.62)"
            fill={isDark ? "#28456e" : "#334155"}
            fillOpacity={isDark ? "0.6" : "0.3"}
            className={!isPreview ? "hidden sm:block" : undefined}
          >
            <path d={PLANE_PATH} />
          </g>

          {/* Blue Taxiway Edge Lights */}
          {TAXIWAY_BLUE_LIGHTS.map((light) => (
            <circle
              key={light.id}
              cx={light.cx}
              cy={light.cy}
              r="1.7"
              fill={isDark ? "#38bdf8" : "#2563eb"}
              opacity={isDark ? 0.65 : 0.38}
              className={!light.mobile && !isPreview ? "hidden sm:block" : undefined}
            />
          ))}

          {/* Main Perspective Runway Trapezoid */}
          <polygon
            points="678,178 762,178 1200,320 240,320"
            fill={`url(#${p}-runway-asphalt)`}
          />

          {/* Runway Perspective Edge Lines */}
          <line
            x1="678"
            y1="178"
            x2="240"
            y2="320"
            stroke={isDark ? "#cbd5e1" : "#334155"}
            strokeOpacity={isDark ? "0.24" : "0.22"}
            strokeWidth="1.4"
          />
          <line
            x1="762"
            y1="178"
            x2="1200"
            y2="320"
            stroke={isDark ? "#cbd5e1" : "#334155"}
            strokeOpacity={isDark ? "0.24" : "0.22"}
            strokeWidth="1.4"
          />

          {/* Threshold Stripes ("Piano Keys") */}
          <g
            fill={isDark ? "#e2e8f0" : "#475569"}
            fillOpacity={isDark ? "0.26" : "0.22"}
          >
            <polygon points="455,296 476,296 462,312 438,312" />
            <polygon points="502,296 522,296 512,312 489,312" />
            <polygon points="548,296 568,296 562,312 540,312" />
            <polygon points="596,296 616,296 612,312 591,312" />
            <polygon points="824,296 844,296 849,312 828,312" />
            <polygon points="872,296 892,296 900,312 878,312" />
            <polygon points="918,296 938,296 951,312 928,312" />
            <polygon points="964,296 985,296 1002,312 978,312" />
          </g>

          {/* Perspective White Dashed Centerline */}
          <g
            fill={isDark ? "#e2e8f0" : "#475569"}
            fillOpacity={isDark ? "0.34" : "0.24"}
          >
            <rect x="718.8" y="182" width="2.4" height="5" rx="0.6" />
            <rect x="718.5" y="191" width="3" height="7" rx="0.6" />
            <rect x="718.2" y="203" width="3.6" height="9" rx="0.8" />
            <rect x="717.8" y="218" width="4.4" height="12" rx="1" />
            <rect x="717.4" y="237" width="5.2" height="15" rx="1" />
          </g>

          {/* Approach-Light Lane of Pulsing Amber Dots */}
          {APPROACH_AMBER_LIGHTS.map((light) => (
            <circle
              key={light.id}
              cx={light.cx}
              cy={light.cy}
              r={light.r}
              fill={isDark ? "#fbbf24" : "#d97706"}
              style={
                isStatic
                  ? { opacity: isDark ? 0.55 : 0.34 }
                  : {
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      animationName: "na-amber-pulse",
                      animationDuration: "1.8s",
                      animationDelay: light.delay,
                      animationIterationCount: "infinite",
                      animationPlayState: playState,
                    }
              }
            />
          ))}

          {/* Twinkling White Runway Edge Lights */}
          {RUNWAY_EDGE_LIGHTS.map((light) => (
            <circle
              key={light.id}
              cx={light.cx}
              cy={light.cy}
              r={light.r}
              fill={isDark ? "#f8fafc" : "#334155"}
              className={!light.mobile && !isPreview ? "hidden sm:block" : undefined}
              style={
                isStatic
                  ? { opacity: isDark ? 0.65 : 0.36 }
                  : {
                      animationName: "na-edge-twinkle",
                      animationDuration: "2.4s",
                      animationDelay: light.delay,
                      animationIterationCount: "infinite",
                      animationPlayState: playState,
                    }
              }
            />
          ))}

          {/* Landing Aircraft (56px plane SVG with nav lights, tail strobe & landing beam) */}
          <g
            style={
              isStatic
                ? {
                    transform: isPreview
                      ? "translate(520px, 118px) rotate(102deg) scale(1.45, 1.1)"
                      : "translate(540px, 148px) rotate(102deg) scale(1.05, 0.85)",
                    opacity: isDark ? 0.82 : 0.55,
                  }
                : {
                    animationName: "na-plane-approach",
                    animationDuration: "14s",
                    animationTimingFunction: "cubic-bezier(0.28, 0.08, 0.25, 1)",
                    animationIterationCount: "infinite",
                    animationPlayState: playState,
                    willChange: "transform, opacity",
                  }
            }
          >
            {/* Center the 24x24 airplane icon around (0,0) and scale to ~56px */}
            <g transform="scale(2.35) translate(-11.5, -12)">
              {/* Conical forward-down landing-light beam */}
              <polygon
                points="11.5,3.5 3.5,-24 19.5,-24"
                fill={`url(#${p}-landing-beam)`}
              />

              {/* Airplane silhouette */}
              <path
                d={PLANE_PATH}
                fill={isDark ? "#cbd5e1" : "#1e3a5f"}
                fillOpacity={isDark ? "0.78" : "0.52"}
                stroke={isDark ? "#e2e8f0" : "#0f172a"}
                strokeOpacity={isDark ? "0.35" : "0.22"}
                strokeWidth="0.4"
              />

              {/* Left wing tip navigation light (RED) */}
              <circle
                cx="2.2"
                cy="14.8"
                r="0.85"
                fill="#ef4444"
                opacity={isDark ? 0.95 : 0.72}
              />

              {/* Right wing tip navigation light (GREEN) */}
              <circle
                cx="20.8"
                cy="14.8"
                r="0.85"
                fill="#22c55e"
                opacity={isDark ? 0.95 : 0.72}
              />

              {/* White tail strobe flashing every 1.2s */}
              <circle
                cx="11.5"
                cy="21.4"
                r="1.05"
                fill="#ffffff"
                style={
                  isStatic
                    ? { opacity: isDark ? 0.85 : 0.55 }
                    : {
                        animationName: "na-tail-strobe",
                        animationDuration: "1.2s",
                        animationIterationCount: "infinite",
                        animationPlayState: playState,
                      }
                }
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
