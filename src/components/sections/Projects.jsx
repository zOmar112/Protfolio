import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";
import { formatNumbers } from "../../utils/formatNumbers";

function LinkButton({ href, children, variant = "primary" }) {
  if (!href || href.trim() === "" || href.startsWith("[FILL")) return null;

  const base =
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-md active:translate-y-0";
  const styles =
    variant === "primary"
      ? `${base} bg-accent text-white hover:opacity-90 shadow-sm`
      : `${base} border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-accent dark:hover:border-accent`;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 rtl:rotate-180"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
        />
      </svg>
    </a>
  );
}

function DetailField({ label, value, accent = false }) {
  if (!value) return null;
  return (
    <div>
      <span className="font-semibold text-gray-900 dark:text-gray-100 block mb-1 text-sm sm:text-base">
        {label}:
      </span>
      <p
        className={`leading-relaxed text-sm sm:text-base ${
          accent
            ? "text-accent font-medium"
            : "text-gray-700 dark:text-gray-300"
        }`}
      >
        {formatNumbers(value)}
      </p>
    </div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const projectsData = t.projects;
  const items = projectsData?.items;
  const shouldReduceMotion = useReducedMotion();

  const [selectedProject, setSelectedProject] = useState(null);
  const lastFocusedElementRef = useRef(null);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const openModal = (project, element) => {
    lastFocusedElementRef.current = element || document.activeElement;
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    if (!selectedProject) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
      if (lastFocusedElementRef.current) {
        lastFocusedElementRef.current.focus?.();
      }
    };
  }, [selectedProject]);

  if (!items || items.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <Section id="projects" title={t.sections.projects}>
      {/* 3 columns on desktop (>=1024px), 2 on tablet, 1 on mobile */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {items.map((project) => (
          <motion.div
            key={project.id}
            variants={cardVariants}
            onClick={(e) => openModal(project, e.currentTarget)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModal(project, e.currentTarget);
              }
            }}
            tabIndex={0}
            role="button"
            aria-haspopup="dialog"
            className="h-full flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 overflow-hidden transition-all duration-300 hover:-translate-y-[6px] hover:border-accent/60 dark:hover:border-accent/70 hover:shadow-[0_12px_28px_-6px_rgba(37,99,235,0.18),0_0_0_1px_rgba(37,99,235,0.2)] dark:hover:shadow-[0_12px_30px_-6px_rgba(59,130,246,0.25),0_0_0_1px_rgba(59,130,246,0.28)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {/* Cover image or placeholder */}
            <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center relative overflow-hidden flex-shrink-0">
              {project.cover ? (
                <img
                  src={project.cover}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              ) : (
                <span className="text-2xl sm:text-3xl font-bold text-gray-300 dark:text-gray-700 select-none text-center px-4">
                  {project.title}
                </span>
              )}

              {/* Badge */}
              <span className="absolute top-3.5 start-3.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/90 text-white backdrop-blur-sm shadow-sm">
                {project.badge}
              </span>
            </div>

            {/* Compact card body */}
            <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
              <div>
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>

                {/* One-liner description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                  {formatNumbers(project.oneLiner)}
                </p>

                {/* 3-4 tech tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700/60"
                      >
                        {formatNumbers(tag)}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-1.5 py-0.5 text-xs text-gray-400 dark:text-gray-500 font-medium self-center">
                        <span className="number-highlight">+{project.tags.length - 4}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* View Details button */}
              <div className="pt-2">
                <button
                  type="button"
                  tabIndex={-1}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-sm group-hover:bg-accent group-hover:text-white group-hover:border-accent dark:group-hover:bg-accent dark:group-hover:text-white dark:group-hover:border-accent transition-colors duration-200 pointer-events-none"
                >
                  <span>{projectsData.viewDetails || "View Details"}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 rtl:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            {/* Dark translucent backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              onClick={closeModal}
            />

            {/* Centered Modal: max-width 720px, max-height 85vh, internal scroll */}
            <motion.div
              ref={modalRef}
              tabIndex={-1}
              className="relative w-full max-w-[720px] max-h-[85vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col z-10 focus:outline-none"
              initial={
                shouldReduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95, y: 15 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.95, y: 15 }
              }
              transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModal}
                aria-label={projectsData.closeModal || "Close"}
                className="absolute top-4 end-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Internal scrollable area */}
              <div className="overflow-y-auto flex-1">
                {/* Cover / Placeholder */}
                <div className="w-full h-52 sm:h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center relative flex-shrink-0">
                  {selectedProject.cover ? (
                    <img
                      src={selectedProject.cover}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl sm:text-4xl font-bold text-gray-300 dark:text-gray-700 select-none text-center px-4">
                      {selectedProject.title}
                    </span>
                  )}

                  {/* Badge */}
                  <span className="absolute top-4 start-4 px-3 py-1 rounded-full text-xs font-semibold bg-accent/90 text-white backdrop-blur-sm shadow-sm">
                    {selectedProject.badge}
                  </span>
                </div>

                {/* Detailed body */}
                <div className="p-6 sm:p-8">
                  {/* Title */}
                  <h3
                    id="modal-project-title"
                    className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight"
                  >
                    {selectedProject.title}
                  </h3>

                  {/* One-liner */}
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {formatNumbers(selectedProject.oneLiner)}
                  </p>

                  {/* Full fields: Problem / Role / Solution / Tools / Result */}
                  <div className="space-y-4 mb-6">
                    <DetailField label={projectsData.problemLabel} value={selectedProject.problem} />
                    <DetailField label={projectsData.roleLabel} value={selectedProject.role} />
                    <DetailField label={projectsData.solutionLabel} value={selectedProject.solution} />
                    <DetailField label={projectsData.toolsLabel} value={selectedProject.tools} />
                    <DetailField label={projectsData.resultLabel} value={selectedProject.result} accent />
                  </div>

                  {/* Full Tech tags */}
                  {selectedProject.tags && selectedProject.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-gray-200/70 dark:border-gray-800/80">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs sm:text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action buttons (hidden if link is empty or [FILL) */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200/70 dark:border-gray-800/80">
                    <LinkButton href={selectedProject.viewLink} variant="primary">
                      {projectsData.viewProject}
                    </LinkButton>
                    <LinkButton href={selectedProject.demoLink} variant="secondary">
                      {projectsData.demo}
                    </LinkButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  );
}
