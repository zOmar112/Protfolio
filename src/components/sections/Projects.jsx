import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";

function LinkButton({ href, children, variant = "primary" }) {
  if (!href || href.trim() === "") return null;

  const base =
    "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-md active:translate-y-0";
  const styles =
    variant === "primary"
      ? `${base} bg-accent text-white hover:opacity-90 shadow-sm`
      : `${base} border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-accent dark:hover:border-accent`;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
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

export default function Projects() {
  const { t } = useLanguage();
  const projectsData = t.projects;
  const items = projectsData?.items;
  const shouldReduceMotion = useReducedMotion();

  if (!items || items.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
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
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: "easeOut",
      },
    },
  };

  return (
    <Section id="projects" title={t.sections.projects}>
      <motion.div
        className="space-y-10 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {items.map((project) => (
          <motion.div
            key={project.id}
            variants={cardVariants}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700"
          >
            {/* Cover image placeholder */}
            <div className="w-full h-48 sm:h-56 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center relative">
              {project.cover ? (
                <img
                  src={project.cover}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl sm:text-4xl font-bold text-gray-300 dark:text-gray-700 select-none text-center px-4">
                  {project.title}
                </span>
              )}

              {/* Badge */}
              <span className="absolute top-4 start-4 px-3 py-1 rounded-full text-xs font-semibold bg-accent/90 text-white backdrop-blur-sm shadow-sm">
                {project.badge}
              </span>
            </div>

            {/* Card body */}
            <div className="p-6 sm:p-8">
              {/* Title + one-liner */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1.5">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6">
                {project.oneLiner}
              </p>

              {/* Detail fields in Problem / Role / Solution / Tools / Result order */}
              <div className="space-y-3.5 text-sm sm:text-base mb-6">
                <DetailField label={projectsData.problemLabel} value={project.problem} />
                <DetailField label={projectsData.roleLabel} value={project.role} />
                <DetailField label={projectsData.solutionLabel} value={project.solution} />
                <DetailField label={projectsData.toolsLabel} value={project.tools} />
                <DetailField label={projectsData.resultLabel} value={project.result} accent />
              </div>

              {/* Tech tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-gray-200/60 dark:border-gray-800/80">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action buttons (hidden if link is empty or starts with [FILL) */}
              <div className="flex flex-wrap gap-3">
                <LinkButton href={project.viewLink} variant="primary">
                  {projectsData.viewProject}
                </LinkButton>
                <LinkButton href={project.demoLink} variant="secondary">
                  {projectsData.demo}
                </LinkButton>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function DetailField({ label, value, accent = false }) {
  if (!value) return null;
  return (
    <div>
      <span className="font-semibold text-gray-900 dark:text-gray-100 block mb-0.5">
        {label}:
      </span>
      <p
        className={`leading-relaxed ${
          accent
            ? "text-accent font-medium"
            : "text-gray-600 dark:text-gray-400"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
