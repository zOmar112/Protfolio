import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";
import Footer from "../Footer";

function QuoteMarksIcon() {
  return (
    <svg
      className="w-5 h-5 text-accent dark:text-blue-400"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

function ChatMessageIcon() {
  return (
    <svg
      className="w-4 h-4 rtl:scale-x-[-1]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

export default function Testimonials() {
  const { t } = useLanguage();
  const testimonials = t.testimonials;
  const shouldReduceMotion = useReducedMotion();
  const [modalOpen, setModalOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "", feedback: "" });

  const handleLeaveTestimonial = () => {
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipient = "imm5201978@gmail.com";
    const subject = encodeURIComponent(`Testimonial from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nRole: ${formData.role}\n\nFeedback:\n${formData.feedback}`
    );
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    setFormSent(true);
    setTimeout(() => {
      setModalOpen(false);
      setFormSent(false);
      setFormData({ name: "", role: "", feedback: "" });
    }, 2000);
  };

  return (
    <>
      <Section id="testimonials">
        <div className="max-w-5xl mx-auto">
          {/* Header row mirroring the reference image */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-gray-200/60 dark:border-gray-800/80">
            <div>
              {/* Category small kicker tag */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-semibold tracking-widest uppercase text-accent dark:text-blue-400">
                  {testimonials.sectionNum}
                </span>
              </div>

              {/* Subtitle / Description */}
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                {testimonials.subtitle}
              </p>
            </div>

            {/* "Leave a Testimonial" Pill Button with soft glow */}
            <button
              type="button"
              onClick={handleLeaveTestimonial}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-accent/90 hover:bg-accent text-white shadow-md shadow-accent/20 dark:shadow-blue-600/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer self-start md:self-auto shrink-0"
            >
              <ChatMessageIcon />
              <span>{testimonials.leaveButton}</span>
            </button>
          </div>

          {/* Central Neural / Awaiting Card matching the image */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
            className="rounded-3xl border border-gray-200/90 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/50 backdrop-blur-sm p-8 sm:p-12 md:p-16 flex flex-col items-center justify-center text-center relative overflow-hidden"
          >
            {/* Soft blue glow matching portfolio theme */}
            <div
              aria-hidden="true"
              className="absolute w-56 h-56 rounded-full bg-accent/10 dark:bg-blue-500/15 blur-3xl pointer-events-none"
            />

            {/* Quote Marks Hub Box with soft border glow */}
            <div className="w-14 h-14 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950/80 shadow-sm flex items-center justify-center mb-6">
              <QuoteMarksIcon />
            </div>

            {/* Mini Upper Kicker */}
            <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-widest uppercase text-accent dark:text-blue-400 mb-3">
              {testimonials.badge}
            </span>

            {/* Card Main Title */}
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
              {testimonials.placeholderTitle}
            </h3>

            {/* Card Sub-description */}
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
              {testimonials.placeholderText}
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Modal for "Leave a Testimonial" */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100 dark:border-gray-800">
              <h4 className="text-base font-bold text-gray-900 dark:text-white">
                {testimonials.leaveButton}
              </h4>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            {formSent ? (
              <div className="py-8 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
                ✓ Thank you! Opening your email client to send your feedback.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Ahmed Hassan"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Your Role / Relationship
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Mentor / Project Teammate / Client"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Your Testimonial / Feedback
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.feedback}
                    onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                    placeholder="Share your thoughts about working with Omar..."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:border-accent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-accent text-white font-medium text-xs sm:text-sm hover:opacity-90 shadow-sm transition-all cursor-pointer"
                >
                  Send via Email
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
