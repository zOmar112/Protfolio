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

function StarIcon({ filled = true, className = "w-5 h-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
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
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({ name: "", role: "", feedback: "" });

  const handleLeaveTestimonial = () => {
    setRating(5);
    setHoveredRating(0);
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipient = "imm5201978@gmail.com";
    const subject = encodeURIComponent(`Testimonial (${rating}★) from ${formData.name}`);
    const starsText = "★".repeat(rating) + "☆".repeat(5 - rating);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nRole: ${formData.role}\nRating: ${rating}/5 (${starsText})\n\nFeedback:\n${formData.feedback}`
    );
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    setFormSent(true);
    setTimeout(() => {
      setModalOpen(false);
      setFormSent(false);
      setFormData({ name: "", role: "", feedback: "" });
      setRating(5);
      setHoveredRating(0);
    }, 2000);
  };

  const activeRating = hoveredRating || rating;

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

          {/* Central Neural / Awaiting Card */}
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
            <div className="w-14 h-14 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950/80 shadow-sm flex items-center justify-center mb-5">
              <QuoteMarksIcon />
            </div>

            {/* 5-Star Rating Preview Badge */}
            <div className="flex items-center gap-1.5 text-amber-400 dark:text-amber-400 mb-3 drop-shadow-[0_0_8px_rgba(251,191,36,0.35)]">
              {[1, 2, 3, 4, 5].map((s) => (
                <StarIcon key={s} filled className="w-5 h-5" />
              ))}
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
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {formSent ? (
              <div className="py-8 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
                {testimonials.successMessage || "✓ Thank you! Opening your email client to send your feedback."}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {testimonials.nameLabel || "Your Name"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={testimonials.namePlaceholder || "e.g. Dr. Ahmed Hassan"}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {testimonials.roleLabel || "Your Role / Relationship"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder={testimonials.rolePlaceholder || "e.g. Mentor / Project Teammate / Client"}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:border-accent"
                  />
                </div>

                {/* Interactive Star Rating Selector */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {testimonials.ratingLabel || "Rating"}
                    </label>
                    <span className="text-xs font-bold text-amber-500 dark:text-amber-400">
                      {activeRating} / 5
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-1.5 p-2 rounded-xl bg-gray-50/80 dark:bg-gray-950/60 border border-gray-200/80 dark:border-gray-800"
                    onMouseLeave={() => setHoveredRating(0)}
                  >
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = star <= activeRating;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          className="p-1 rounded-lg text-amber-400 hover:scale-120 active:scale-95 transition-transform cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          aria-label={`${star} star${star > 1 ? "s" : ""}`}
                        >
                          <StarIcon
                            filled={isFilled}
                            className={`w-7 h-7 transition-colors ${
                              isFilled
                                ? "text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                                : "text-gray-300 dark:text-gray-700"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {testimonials.feedbackLabel || "Your Testimonial / Feedback"}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.feedback}
                    onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                    placeholder={testimonials.feedbackPlaceholder || "Share your thoughts about working with Omar..."}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:border-accent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-accent text-white font-medium text-xs sm:text-sm hover:opacity-90 shadow-sm transition-all cursor-pointer"
                >
                  {testimonials.sendButton || "Send via Email"}
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
