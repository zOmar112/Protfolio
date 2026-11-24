import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";

export default function Home() {
  const { t } = useLanguage();
  const [hasCv, setHasCv] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    fetch("/cv.pdf", { method: "HEAD" })
      .then((res) => {
        const contentType = res.headers.get("content-type") || "";
        if (res.ok && !contentType.includes("text/html")) {
          setHasCv(true);
        } else {
          setHasCv(false);
        }
      })
      .catch(() => setHasCv(false));
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section id="home" isHero>
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 py-8">
        {/* Photo: above text on mobile (order-1), next to text on desktop (lg:order-2) */}
        <div className="order-1 lg:order-2 flex-shrink-0">
          <div className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 aspect-square rounded-2xl overflow-hidden border border-accent relative">
            {imgError ? (
              <div
                aria-label="Omar Ibrahim"
                className="w-full h-full rounded-2xl bg-accent/10 text-accent flex items-center justify-center text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight select-none"
              >
                OI
              </div>
            ) : (
              <img
                src="/me.jpg"
                alt="Omar Ibrahim"
                className="w-full h-full object-cover rounded-2xl block opacity-100"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "50% 20%",
                  display: "block",
                  opacity: 1,
                }}
                onError={() => setImgError(true)}
              />
            )}
          </div>
        </div>

        {/* Text: below photo on mobile (order-2), next to photo on desktop (lg:order-1) */}
        <div className="order-2 lg:order-1 flex-1 text-center lg:text-start">
          {/* 1. "Hello, I'm" */}
          <p className="text-base sm:text-lg md:text-xl font-medium text-accent mb-2">
            {t.home.greeting}
          </p>

          {/* 2. "Omar Ibrahim" (largest text) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
            {t.home.name}
          </h1>

          {/* 3. "Data & Machine Learning Student" */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
            {t.home.role}
          </h2>

          {/* 4. USP */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed mb-8">
            {t.home.usp}
          </p>

          {/* 5. Two buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button
              onClick={scrollToProjects}
              className="px-6 py-3 rounded-xl bg-accent hover:opacity-90 text-white font-medium transition-all duration-200 shadow-sm cursor-pointer hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
            >
              {t.home.viewWork}
            </button>

            {hasCv && (
              <a
                href="/cv.pdf"
                download
                className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:border-accent dark:hover:border-accent font-medium transition-all duration-200 text-gray-800 dark:text-gray-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
              >
                {t.home.downloadCv}
              </a>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
