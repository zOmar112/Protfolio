/* Clouds Scene: soft layered drifting clouds + tiny plane crossing every 20s */
const CLOUDS = [
  {
    id: "c1",
    top: "12%",
    w: "w-56 md:w-80",
    h: "h-16 md:h-24",
    dur: "58s",
    delay: "-12s",
    mobile: true,
    opacity: "opacity-70 dark:opacity-55",
  },
  {
    id: "c2",
    top: "30%",
    w: "w-64 md:w-96",
    h: "h-20 md:h-28",
    dur: "74s",
    delay: "-38s",
    mobile: true,
    opacity: "opacity-60 dark:opacity-45",
  },
  {
    id: "c3",
    top: "56%",
    w: "w-52 md:w-80",
    h: "h-16 md:h-24",
    dur: "64s",
    delay: "-24s",
    mobile: false,
    opacity: "opacity-55 dark:opacity-40",
  },
  {
    id: "c4",
    top: "74%",
    w: "w-72 md:w-[26rem]",
    h: "h-20 md:h-28",
    dur: "82s",
    delay: "-52s",
    mobile: false,
    opacity: "opacity-50 dark:opacity-35",
  },
];

export default function CloudsScene({ isDark, reducedMotion, isPaused }) {
  const playState = isPaused ? "paused" : "running";

  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes cloud-drift {
          0% { transform: translate3d(-35vw, 0, 0); }
          100% { transform: translate3d(120vw, 0, 0); }
        }
        @keyframes cloud-plane-cross {
          0% {
            transform: translate3d(-16vw, 4vh, 0);
            opacity: 0;
          }
          10% { opacity: 0.6; }
          85% { opacity: 0.5; }
          100% {
            transform: translate3d(118vw, -10vh, 0);
            opacity: 0;
          }
        }
      `}</style>

      {/* Soft Layered Clouds (pure CSS blurred blobs, transform only) */}
      {CLOUDS.map((cloud, idx) => (
        <div
          key={cloud.id}
          aria-hidden="true"
          className={`${!cloud.mobile ? "hidden md:block" : ""} absolute left-0 ${cloud.w} ${cloud.h} ${cloud.opacity} will-change-transform`}
          style={{
            top: cloud.top,
            animationName: reducedMotion ? "none" : "cloud-drift",
            animationDuration: cloud.dur,
            animationDelay: cloud.delay,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: playState,
            transform: reducedMotion
              ? `translate3d(${12 + idx * 20}vw, 0, 0)`
              : undefined,
          }}
        >
          {/* Main cloud body */}
          <div
            className={`w-full h-full rounded-full blur-xl ${
              isDark
                ? "bg-blue-950/75 border-t border-blue-200/20"
                : "bg-white/80 border-t border-white"
            }`}
          />
          {/* Secondary upper puff */}
          <div
            className={`absolute -top-4 left-1/4 w-1/2 h-full rounded-full blur-lg ${
              isDark ? "bg-slate-800/55" : "bg-blue-50/85"
            }`}
          />
        </div>
      ))}

      {/* One tiny plane crossing slowly with a thin contrail every 20s */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-[24%] flex items-center will-change-transform"
        style={{
          animationName: reducedMotion ? "none" : "cloud-plane-cross",
          animationDuration: "20s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: playState,
          transform: reducedMotion ? "translate3d(44vw, 0, 0)" : undefined,
          opacity: reducedMotion ? (isDark ? 0.35 : 0.45) : undefined,
        }}
      >
        <div className="flex items-center" style={{ transform: "rotate(-7deg)" }}>
          {/* Thin contrail */}
          <div
            className="w-28 sm:w-44 h-[1.5px] rounded-full"
            style={{
              background: isDark
                ? "linear-gradient(90deg, transparent 0%, rgba(147, 197, 253, 0.14) 55%, rgba(219, 234, 254, 0.4) 100%)"
                : "linear-gradient(90deg, transparent 0%, rgba(37, 99, 235, 0.1) 55%, rgba(37, 99, 235, 0.35) 100%)",
            }}
          />
          {/* Tiny plane SVG */}
          <svg
            viewBox="0 0 24 24"
            className={`w-4 h-4 -ms-0.5 ${
              isDark ? "text-blue-200/55" : "text-accent/65"
            }`}
            style={{ transform: "rotate(90deg)" }}
            fill="currentColor"
          >
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
