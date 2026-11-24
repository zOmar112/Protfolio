import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";
import Footer from "../Footer";

function QuoteIcon() {
  return (
    <svg
      className="w-8 h-8 text-accent/20 dark:text-blue-400/20 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      className="w-4 h-4 text-amber-500 fill-amber-500"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function Testimonials() {
  const { t } = useLanguage();
  const testimonials = t.testimonials;
  const items = testimonials?.items || [];
  const shouldReduceMotion = useReducedMotion();

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
    <>
      <Section id="testimonials" title={t.sections.testimonials}>
        <div className="max-w-6xl mx-auto">
          {testimonials?.subtitle && (
            <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 -mt-6 mb-12 max-w-2xl mx-auto">
              {testimonials.subtitle}
            </p>
          )}

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {items.map((item) => {
              const initials = item.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("");

              return (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/50 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700"
                >
                  <div>
                    {/* Top Row: Stars + Quote Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: item.rating || 5 }).map((_, i) => (
                          <StarIcon key={i} />
                        ))}
                      </div>
                      <QuoteIcon />
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
                      "{item.content}"
                    </p>
                  </div>

                  {/* Author Meta Footer */}
                  <div className="pt-4 border-t border-gray-200/80 dark:border-gray-800/80 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Avatar Initials Placeholder */}
                      <div className="w-10 h-10 rounded-full bg-accent/10 dark:bg-blue-500/15 border border-accent/25 text-accent dark:text-blue-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {item.role}
                        </p>
                      </div>
                    </div>

                    {item.project && (
                      <span className="hidden sm:inline-block px-2.5 py-1 text-[11px] font-medium rounded-md bg-white dark:bg-gray-800 text-accent dark:text-blue-400 border border-gray-200 dark:border-gray-700/60 flex-shrink-0">
                        {item.project}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Section>
      <Footer />
    </>
  );
}
