import { useState, useEffect } from "react";

/* Flight Radar Scene: static dot-matrix world map (Europe/Africa/MENA), real city coords, curved routes, tangent-rotated planes & subtle HUD */

const PLANE_PATH =
  "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";

// Same Equirectangular projection bounds used to generate /public/world-dots.svg
const MAP_W = 1200;
const MAP_H = 675;
const LON_MIN = -26;
const LON_MAX = 84;
const LAT_MAX = 65;
const LAT_MIN = -8;

function project(lon, lat) {
  return {
    x: Number((((lon - LON_MIN) / (LON_MAX - LON_MIN)) * MAP_W).toFixed(1)),
    y: Number((((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * MAP_H).toFixed(1)),
  };
}

const CITIES = [
  { id: "cai", code: "CAI", lon: 31.2357, lat: 30.0444, isCairo: true, dx: 11, dy: 4 },
  { id: "dxb", code: "DXB", lon: 55.2708, lat: 25.2048, dx: 9, dy: 4 },
  { id: "ruh", code: "RUH", lon: 46.6753, lat: 24.7136, dx: 9, dy: 12 },
  { id: "ist", code: "IST", lon: 28.9784, lat: 41.0082, dx: 9, dy: -4 },
  { id: "lhr", code: "LHR", lon: -0.4543, lat: 51.47, dx: -30, dy: -6 },
  { id: "cdg", code: "CDG", lon: 2.5479, lat: 49.0097, dx: -28, dy: 12 },
  { id: "fra", code: "FRA", lon: 8.5622, lat: 50.0379, dx: 9, dy: -5 },
  { id: "fco", code: "FCO", lon: 12.2389, lat: 41.8003, dx: -28, dy: 11 },
].map((city) => ({ ...city, ...project(city.lon, city.lat) }));

const CITY_BY_ID = Object.fromEntries(CITIES.map((c) => [c.id, c]));
const CAI = CITY_BY_ID.cai;

// Build a curved great-circle-like quadratic Bezier arc between two projected cities
function buildArc(from, to, bend = 0.22) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy) || 1;
  // Bend gently northward (negative y) like northern-hemisphere great-circle tracks
  const nx = -dy / dist;
  const ny = dx / dist;
  const sign = ny <= 0 ? 1 : -1;
  const cx = Number((mx + nx * dist * bend * sign).toFixed(1));
  const cy = Number((my + ny * dist * bend * sign).toFixed(1));
  return {
    x0: from.x,
    y0: from.y,
    cx,
    cy,
    x1: to.x,
    y1: to.y,
    d: `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`,
  };
}

// Evaluate point & analytical tangent rotation (deg) along a quadratic Bezier at t in [0,1]
function evalArc(arc, t) {
  const mt = 1 - t;
  const x = mt * mt * arc.x0 + 2 * mt * t * arc.cx + t * t * arc.x1;
  const y = mt * mt * arc.y0 + 2 * mt * t * arc.cy + t * t * arc.y1;
  const tx = 2 * mt * (arc.cx - arc.x0) + 2 * t * (arc.x1 - arc.cx);
  const ty = 2 * mt * (arc.cy - arc.y0) + 2 * t * (arc.y1 - arc.cy);
  // Plane SVG nose points UP (-90 deg), so add +90 deg to atan2(ty, tx)
  const deg = (Math.atan2(ty, tx) * 180) / Math.PI + 90;
  return {
    x: Number(x.toFixed(1)),
    y: Number(y.toFixed(1)),
    deg: Number(deg.toFixed(1)),
  };
}

const ROUTES = [
  { id: "cai-lhr", to: "lhr", bend: 0.22 },
  { id: "cai-cdg", to: "cdg", bend: 0.2 },
  { id: "cai-fra", to: "fra", bend: 0.2 },
  { id: "cai-fco", to: "fco", bend: 0.24 },
  { id: "cai-ist", to: "ist", bend: 0.22 },
  { id: "cai-ruh", to: "ruh", bend: 0.22 },
  { id: "cai-dxb", to: "dxb", bend: 0.24 },
].map((r) => ({
  ...r,
  arc: buildArc(CAI, CITY_BY_ID[r.to], r.bend),
}));

const ROUTE_BY_ID = Object.fromEntries(ROUTES.map((r) => [r.id, r]));

// 5 staggered aircraft flying along Cairo routes (3 visible on mobile, 5 on sm+)
const FLIGHTS = [
  { id: "fl-lhr", routeId: "cai-lhr", dur: "20s", delay: "-3s", staticT: 0.56, mobile: true },
  { id: "fl-dxb", routeId: "cai-dxb", dur: "16s", delay: "-8s", staticT: 0.52, mobile: true },
  { id: "fl-ist", routeId: "cai-ist", dur: "14s", delay: "-1s", staticT: 0.58, mobile: true },
  { id: "fl-fra", routeId: "cai-fra", dur: "19s", delay: "-11s", staticT: 0.42, mobile: false },
  { id: "fl-fco", routeId: "cai-fco", dur: "17s", delay: "-6s", staticT: 0.64, mobile: false },
];

// Generate smooth GPU-composited transform/opacity keyframes along each Bezier arc
const FLIGHT_KEYFRAMES_CSS = FLIGHTS.map((flight) => {
  const { arc } = ROUTE_BY_ID[flight.routeId];
  const steps = 10;
  const frames = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const pct = Math.round(t * 100);
    const pt = evalArc(arc, t);
    const opacity = i === 0 || i === steps ? 0 : i === 1 || i === steps - 1 ? 0.72 : 0.85;
    frames.push(
      `${pct}% { transform: translate(${pt.x}px, ${pt.y}px) rotate(${pt.deg}deg); opacity: ${opacity}; }`
    );
  }
  return `@keyframes fr-${flight.id} { ${frames.join(" ")} }`;
}).join("\n");

const HUD_READOUTS = [
  "FL350 · 480 kt",
  "FL370 · 492 kt",
  "FL340 · 468 kt",
  "FL380 · 504 kt",
];

export default function FlightRadarScene({
  isDark,
  reducedMotion,
  isPaused,
  isPreview = false,
}) {
  const isStatic = reducedMotion || isPreview;
  const playState = isPaused || isStatic ? "paused" : "running";
  const p = isPreview ? "fr-prev" : "fr-main";
  const [hudIdx, setHudIdx] = useState(0);

  useEffect(() => {
    if (isStatic || isPaused) return;
    const id = window.setInterval(() => {
      setHudIdx((prev) => (prev + 1) % HUD_READOUTS.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [isStatic, isPaused]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {!isPreview && (
        <style>{`
          @keyframes fr-cairo-pulse {
            0% { transform: scale(0.75); opacity: 0.72; }
            100% { transform: scale(3.4); opacity: 0; }
          }
          @keyframes fr-hud-blink {
            0%, 49% { opacity: 0.85; }
            50%, 100% { opacity: 0.2; }
          }
          ${FLIGHT_KEYFRAMES_CSS}
        `}</style>
      )}

      {/* Full-screen dot-matrix map, routes, cities & tangent-aligned planes in one shared viewBox */}
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="block w-full h-full"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          {/* Faint route gradient */}
          <linearGradient id={`${p}-route-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              stopColor={isDark ? "#60a5fa" : "#2563eb"}
              stopOpacity={isDark ? "0.14" : "0.14"}
            />
            <stop
              offset="50%"
              stopColor={isDark ? "#38bdf8" : "#3b82f6"}
              stopOpacity={isDark ? "0.34" : "0.26"}
            />
            <stop
              offset="100%"
              stopColor={isDark ? "#60a5fa" : "#2563eb"}
              stopOpacity={isDark ? "0.16" : "0.14"}
            />
          </linearGradient>

          {/* Short fading trail behind each aircraft (local +y is behind tail) */}
          <linearGradient id={`${p}-plane-trail`} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={isDark ? "#7dd3fc" : "#2563eb"}
              stopOpacity={isDark ? "0.55" : "0.4"}
            />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Subtle latitude / longitude graticule lines */}
        <g
          stroke={isDark ? "#60a5fa" : "#2563eb"}
          strokeOpacity={isDark ? "0.055" : "0.05"}
          strokeWidth="0.7"
          strokeDasharray="3 6"
        >
          <line x1="0" y1="135" x2="1200" y2="135" />
          <line x1="0" y1="270" x2="1200" y2="270" />
          <line x1="0" y1="405" x2="1200" y2="405" />
          <line x1="0" y1="540" x2="1200" y2="540" />
          <line x1="240" y1="0" x2="240" y2="675" />
          <line x1="480" y1="0" x2="480" y2="675" />
          <line x1="720" y1="0" x2="720" y2="675" />
          <line x1="960" y1="0" x2="960" y2="675" />
        </g>

        {/* Pre-generated static dot-matrix world map (Europe, Africa & Middle East) */}
        <image
          href="/world-dots.svg"
          x="0"
          y="0"
          width={MAP_W}
          height={MAP_H}
          opacity={isDark ? 0.24 : 0.22}
          preserveAspectRatio="none"
        />

        {/* Curved great-circle dashed routes from Cairo */}
        {ROUTES.map((route) => (
          <path
            key={route.id}
            d={route.arc.d}
            stroke={`url(#${p}-route-grad)`}
            strokeWidth={isPreview ? "2.4" : "1.25"}
            strokeDasharray="4 5"
          />
        ))}

        {/* City Dots & Monospace Airport Code Labels */}
        {CITIES.map((city) => (
          <g key={city.id}>
            {/* Pulsing accent ring on Cairo */}
            {city.isCairo && (
              <circle
                cx={city.x}
                cy={city.y}
                r={isPreview ? "10" : "5.5"}
                stroke={isDark ? "#60a5fa" : "#2563eb"}
                strokeWidth={isPreview ? "2.5" : "1.5"}
                style={
                  isStatic
                    ? { opacity: 0.4 }
                    : {
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      animationName: "fr-cairo-pulse",
                      animationDuration: "2.8s",
                      animationTimingFunction: "ease-out",
                      animationIterationCount: "infinite",
                      animationPlayState: playState,
                    }
                }
              />
            )}

            {/* City dot */}
            <circle
              cx={city.x}
              cy={city.y}
              r={city.isCairo ? (isPreview ? 7 : 4.6) : isPreview ? 4 : 2.6}
              fill={
                city.isCairo
                  ? isDark
                    ? "#3b82f6"
                    : "#2563eb"
                  : isDark
                    ? "#93c5fd"
                    : "#2563eb"
              }
              fillOpacity={city.isCairo ? 0.92 : isDark ? 0.62 : 0.48}
            />

            {/* Tiny uppercase monospace code label (hidden in tiny thumbnail preview) */}
            {!isPreview && (
              <text
                x={city.x + city.dx}
                y={city.y + city.dy}
                fontSize={city.isCairo ? "10.5" : "9"}
                fontFamily='"B612 Mono", ui-monospace, monospace'
                fontWeight={city.isCairo ? "700" : "600"}
                letterSpacing="0.06em"
                fill={
                  city.isCairo
                    ? isDark
                      ? "#93c5fd"
                      : "#1d4ed8"
                    : isDark
                      ? "#bfdbfe"
                      : "#1e40af"
                }
                opacity={city.isCairo ? (isDark ? 0.62 : 0.52) : isDark ? 0.4 : 0.36}
              >
                {city.code}
              </text>
            )}
          </g>
        ))}

        {/* Moving Airplane Icons (20px) with Tangent Rotation & Fading Trails */}
        {FLIGHTS.map((flight) => {
          const { arc } = ROUTE_BY_ID[flight.routeId];
          const staticPt = evalArc(arc, flight.staticT);
          return (
            <g
              key={flight.id}
              className={!flight.mobile && !isPreview ? "hidden sm:block" : undefined}
              style={
                isStatic
                  ? {
                    transform: `translate(${staticPt.x}px, ${staticPt.y}px) rotate(${staticPt.deg}deg)`,
                    opacity: isDark ? 0.72 : 0.58,
                  }
                  : {
                    animationName: `fr-${flight.id}`,
                    animationDuration: flight.dur,
                    animationDelay: flight.delay,
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                    animationPlayState: playState,
                    willChange: "transform, opacity",
                  }
              }
            >
              {/* Short fading trail directly behind tail (+y in local plane coords) */}
              <line
                x1="0"
                y1="9"
                x2="0"
                y2={isPreview ? "46" : "34"}
                stroke={`url(#${p}-plane-trail)`}
                strokeWidth={isPreview ? "3.2" : "1.8"}
                strokeLinecap="round"
              />
              {/* 20px Airplane Icon centered at (0,0) */}
              <g
                transform={
                  isPreview
                    ? "scale(1.55) translate(-11.5, -12)"
                    : "scale(0.86) translate(-11.5, -12)"
                }
              >
                <path
                  d={PLANE_PATH}
                  fill={isDark ? "#93c5fd" : "#2563eb"}
                  fillOpacity={isDark ? "0.86" : "0.72"}
                />
              </g>
            </g>
          );
        })}
      </svg>

      {/* Subtle Corner HUD (hidden in thumbnail preview) */}
      {!isPreview && (
        <div
          aria-hidden="true"
          className={`hidden sm:flex fixed bottom-6 right-6 flex-col items-end gap-0.5 select-none pointer-events-none ${isDark ? "text-blue-200/40" : "text-blue-900/35"
            }`}
          style={{
            fontFamily: '"B612 Mono", ui-monospace, monospace',
          }}
        >
          <div className="flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase font-semibold">
            <span
              className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-emerald-400" : "bg-emerald-600"
                }`}
              style={
                isStatic
                  ? { opacity: 0.7 }
                  : {
                    animationName: "fr-hud-blink",
                    animationDuration: "1.4s",
                    animationIterationCount: "infinite",
                    animationPlayState: playState,
                  }
              }
            />
            <span>LIVE TRACKING</span>
          </div>
          <div className="text-[10px] tracking-[0.08em] opacity-85">
            {HUD_READOUTS[hudIdx]}
          </div>
        </div>
      )}
    </div>
  );
}
