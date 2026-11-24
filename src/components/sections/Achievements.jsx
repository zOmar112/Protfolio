import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";
import { formatNumbers } from "../../utils/formatNumbers";

function AchievementIcon({ type }) {
  if (type === "trophy") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.004-6.375a3.375 3.375 0 00-6.75 0v3h6.75v-3zM4.5 7.5a2.25 2.25 0 012.25-2.25h1.5A2.25 2.25 0 0110.5 7.5v.75a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 8.25V7.5zm15 0a2.25 2.25 0 00-2.25-2.25h-1.5A2.25 2.25 0 0013.5 7.5v.75a2.25 2.25 0 002.25 2.25h1.5A2.25 2.25 0 0019.5 8.25V7.5z"
        />
      </svg>
    );
  }

  // default: star / distinction badge
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-accent"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}

export default function Achievements() {
  const { t } = useLanguage();
  const achievementsData = t.achievements;
  const items = achievementsData?.items;
  const shouldReduceMotion = useReducedMotion();

  // If fewer than 2 real achievements remain, hide this section entirely
  if (!items || items.length < 2) {
    return null;
  }

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
    <Section id="achievements" title={t.sections.achievements}>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {items.slice(0, 3).map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700"
          >
            <div>
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <AchievementIcon type={item.icon} />
              </div>

              {/* Achievement in two words */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1.5">
                {formatNumbers(item.title)}
              </h3>

              {/* Issuer */}
              <p className="text-xs sm:text-sm font-medium text-accent mb-4">
                {item.issuer}
              </p>

              {/* Two-line description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {formatNumbers(item.description)}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
