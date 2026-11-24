import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const ALL_NAV_KEYS = [
  "home",
  "about",
  "education",
  "skills",
  "experience",
  "services",
  "projects",
  "achievements",
  "contact",
];

/* ── Icons ── */
function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 md:w-5 md:h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 7.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 md:w-5 md:h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { lang, t, toggleLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Dynamically filter out navbar links for sections that are hidden
  const navKeys = ALL_NAV_KEYS.filter((key) => {
    if (key === "achievements" && (!t.achievements?.items || t.achievements.items.length < 2)) return false;
    if (key === "experience" && (!t.experience?.items || t.experience.items.length === 0)) return false;
    if (key === "services" && (!t.services?.items || t.services.items.length === 0)) return false;
    if (key === "projects" && (!t.projects?.items || t.projects.items.length === 0)) return false;
    return true;
  });

  useEffect(() => {
    const handleScroll = () => {
      // Blur navbar when scrolled down a little (> 20px)
      setIsScrolled(window.scrollY > 20);

      // If at the very bottom of the document, highlight the last visible section
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection(navKeys[navKeys.length - 1] || "contact");
        return;
      }

      const scrollPosition = window.scrollY + 160;
      for (let i = navKeys.length - 1; i >= 0; i--) {
        const section = document.getElementById(navKeys[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navKeys[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navKeys]);

  const handleNav = (key) => {
    setMobileOpen(false);
    const el = document.getElementById(key);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800/80 shadow-xs"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNav("home");
          }}
          className="flex items-center hover:opacity-85 transition-opacity cursor-pointer"
          aria-label="Omar Ibrahim"
        >
          <img
            src="/logo.png"
            alt="Omar Ibrahim"
            className="w-10 h-10 rounded-xl object-contain"
          />
        </a>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium">
          {navKeys.map((key) => {
            const isActive = activeSection === key;
            return (
              <li key={key}>
                <button
                  onClick={() => handleNav(key)}
                  className={`relative py-1 transition-colors cursor-pointer ${
                    isActive
                      ? "text-accent font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent"
                  }`}
                >
                  {t.nav[key]}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 inset-x-0 h-0.5 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right controls: Always visible on all screens */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* "Connect Me" button in accent color with gentle hover lift */}
          <button
            onClick={() => handleNav("contact")}
            className="px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-accent hover:opacity-90 text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 cursor-pointer whitespace-nowrap"
          >
            {t.nav.connect}
          </button>

          {/* AR/EN toggle */}
          <button
            onClick={toggleLang}
            className="px-2 sm:px-2.5 py-1 rounded-lg text-xs sm:text-sm font-semibold border border-gray-300 dark:border-gray-700 hover:border-accent dark:hover:border-accent transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            aria-label="Toggle language"
          >
            {lang === "en" ? "عربي" : "EN"}
          </button>

          {/* Dark mode button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-accent dark:hover:border-accent transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-1.5 sm:p-2 text-gray-700 dark:text-gray-200 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800"
          >
            <ul className="flex flex-col py-3 px-4 gap-1 text-sm font-medium">
              {navKeys.map((key) => {
                const isActive = activeSection === key;
                return (
                  <li key={key}>
                    <button
                      onClick={() => handleNav(key)}
                      className={`w-full text-start py-2 px-3 rounded-lg transition-colors cursor-pointer ${
                        isActive
                          ? "bg-accent/10 text-accent font-semibold"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {t.nav[key]}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
