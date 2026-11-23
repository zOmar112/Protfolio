import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";

function ServiceIcon({ type }) {
  if (type === "chart") {
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
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    );
  }

  // default / cart icon
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
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  );
}

export default function Services() {
  const { t } = useLanguage();
  const servicesData = t.services;
  const items = servicesData?.items;
  const shouldReduceMotion = useReducedMotion();

  if (!items || items.length === 0) {
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
    <Section id="services" title={t.sections.services}>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {items.map((service) => (
          <motion.div
            key={service.id}
            variants={cardVariants}
            className="p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700"
          >
            <div>
              {/* Service Icon */}
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <ServiceIcon type={service.icon} />
              </div>

              {/* Service Name */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {service.title}
              </h3>

              {/* Delivery, Problem, Outcome */}
              <div className="space-y-4 text-sm sm:text-base">
                {/* What I Deliver */}
                <div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100 block mb-1">
                    {servicesData.deliverLabel}:
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {service.deliver}
                  </p>
                </div>

                {/* Problem It Solves */}
                <div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100 block mb-1">
                    {servicesData.problemLabel}:
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {service.problem}
                  </p>
                </div>

                {/* Outcome for the Client */}
                <div>
                  <span className="font-semibold text-accent block mb-1">
                    {servicesData.outcomeLabel}:
                  </span>
                  <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                    {service.outcome}
                  </p>
                </div>
              </div>
            </div>

            {/* Tags */}
            {service.tags && service.tags.length > 0 && (
              <div className="mt-8 pt-4 border-t border-gray-200/60 dark:border-gray-800/80 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
