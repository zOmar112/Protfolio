/* Night Sky Scene: slow twinkling stars + soft shooting-star plane trails */
const STARS = [
  { id: "s1", left: "8%", top: "14%", size: 2.5, dur: "4.2s", delay: "0s" },
  { id: "s2", left: "16%", top: "28%", size: 2, dur: "5.4s", delay: "1.1s" },
  { id: "s3", left: "24%", top: "12%", size: 3, dur: "4.8s", delay: "0.6s" },
  { id: "s4", left: "32%", top: "36%", size: 2, dur: "6.1s", delay: "2.0s" },
  { id: "s5", left: "41%", top: "18%", size: 2.5, dur: "5.0s", delay: "0.4s" },
  { id: "s6", left: "48%", top: "9%", size: 2, dur: "4.6s", delay: "1.5s" },
  { id: "s7", left: "56%", top: "26%", size: 3, dur: "5.8s", delay: "2.4s" },
  { id: "s8", left: "63%", top: "15%", size: 2, dur: "4.4s", delay: "0.9s" },
  { id: "s9", left: "72%", top: "32%", size: 2.5, dur: "5.2s", delay: "1.7s" },
  { id: "s10", left: "79%", top: "11%", size: 3, dur: "6.0s", delay: "0.3s" },
  { id: "s11", left: "86%", top: "24%", size: 2, dur: "4.7s", delay: "2.2s" },
  { id: "s12", left: "92%", top: "16%", size: 2.5, dur: "5.5s", delay: "1.2s" },
  { id: "s13", left: "12%", top: "54%", size: 2, dur: "5.6s", delay: "1.9s" },
  { id: "s14", left: "27%", top: "62%", size: 2.5, dur: "4.9s", delay: "0.7s" },
  { id: "s15", left: "44%", top: "49%", size: 2, dur: "6.2s", delay: "2.6s" },
  { id: "s16", left: "61%", top: "58%", size: 2.5, dur: "4.5s", delay: "1.4s" },
  { id: "s17", left: "77%", top: "48%", size: 2, dur: "5.3s", delay: "0.5s" },
  { id: "s18", left: "89%", top: "64%", size: 2.5, dur: "5.9s", delay: "2.1s" },
  { id: "s19", left: "19%", top: "78%", size: 2, dur: "4.8s", delay: "1.0s" },
  { id: "s20", left: "52%", top: "82%", size: 2.5, dur: "5.7s", delay: "0.2s" },
  { id: "s21", left: "83%", top: "80%", size: 2, dur: "4.3s", delay: "1.6s" },
];

const TRAILS = [
  { id: "t1", top: "18%", left: "-10%", dur: "14s", delay: "0s", angle: 16 },
  { id: "t2", top: "42%", left: "-15%", dur: "18s", delay: "5s", angle: 12 },
  { id: "t3", top: "66%", left: "-12%", dur: "21s", delay: "11s", angle: 19 },
];

export default function NightSkyScene({ isDark, reducedMotion, isPaused }) {
  const playState = isPaused ? "paused" : "running";

  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes star-twinkle {
          0%, 100% {
            opacity: 0.18;
            transform: scale(0.85);
          }
          50% {
            opacity: 0.72;
            transform: scale(1.15);
          }
        }
        @keyframes shooting-plane-trail {
          0% {
            transform: translate3d(0, 0, 0);
            opacity: 0;
          }
          12% {
            opacity: 0.5;
          }
          60% {
            opacity: 0.35;
          }
          100% {
            transform: translate3d(125vw, 24vh, 0);
            opacity: 0;
          }
        }
      `}</style>

      {/* Slow Twinkling Stars (transform & opacity only) */}
      {STARS.map((star) => (
        <span
          key={star.id}
          aria-hidden="true"
          className="absolute rounded-full bg-blue-600/35 dark:bg-blue-200/75 will-change-transform"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationName: reducedMotion ? "none" : "star-twinkle",
            animationDuration: star.dur,
            animationDelay: star.delay,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationPlayState: playState,
            opacity: reducedMotion ? (isDark ? 0.4 : 0.25) : undefined,
          }}
        />
      ))}

      {/* Soft Shooting-Star Plane Trails (transform & opacity only) */}
      {!reducedMotion &&
        TRAILS.map((trail) => (
          <div
            key={trail.id}
            aria-hidden="true"
            className="absolute flex items-center will-change-transform"
            style={{
              top: trail.top,
              left: trail.left,
              animationName: "shooting-plane-trail",
              animationDuration: trail.dur,
              animationDelay: trail.delay,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: playState,
            }}
          >
            <div
              className="flex items-center"
              style={{ transform: `rotate(${trail.angle}deg)` }}
            >
              {/* Contrail fade tail */}
              <div
                className="w-28 sm:w-44 h-[1.5px] rounded-full"
                style={{
                  background: isDark
                    ? "linear-gradient(90deg, transparent 0%, rgba(96, 165, 250, 0.22) 60%, rgba(186, 230, 253, 0.65) 100%)"
                    : "linear-gradient(90deg, transparent 0%, rgba(37, 99, 235, 0.14) 60%, rgba(37, 99, 235, 0.45) 100%)",
                }}
              />
              {/* Tiny plane tip */}
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 text-accent/70 dark:text-blue-200/80 -ms-0.5"
                style={{ transform: "rotate(90deg)" }}
                fill="currentColor"
              >
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
          </div>
        ))}
    </div>
  );
}
