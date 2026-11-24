import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";
import Footer from "../Footer";

function ChatBubbleIcon() {
  return (
    <svg
      className="w-10 h-10 text-accent dark:text-blue-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-.974-.962 4.095 4.095 0 00.584-1.977C3.197 16.55 2.25 14.39 2.25 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
      />
    </svg>
  );
}

export default function Testimonials() {
  const { t } = useLanguage();
  const testimonials = t.testimonials;
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <Section id="testimonials" title={t.sections.testimonials}>
        <div className="max-w-4xl mx-auto">
          {testimonials?.subtitle && (
            <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 -mt-6 mb-10 max-w-xl mx-auto">
              {testimonials.subtitle}
            </p>
          )}

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
            className="rounded-3xl border border-dashed border-gray-300 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/40 p-8 sm:p-12 md:p-16 flex flex-col items-center justify-center text-center relative overflow-hidden"
          >
            {/* Subtle background glow */}
            <div
              aria-hidden="true"
              className="absolute w-48 h-48 rounded-full bg-accent/10 dark:bg-blue-500/10 blur-3xl pointer-events-none"
            />

            {/* Badge */}
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/25 mb-6">
              {testimonials.badge}
            </span>

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-accent/10 dark:bg-blue-500/15 border border-accent/20 flex items-center justify-center mb-5">
              <ChatBubbleIcon />
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {testimonials.placeholderTitle}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
              {testimonials.placeholderText}
            </p>
          </motion.div>
        </div>
      </Section>
      <Footer />
    </>
  );
}
