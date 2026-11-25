import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";
import { formatNumbers } from "../../utils/formatNumbers";

export default function Certificates() {
  const { t } = useLanguage();
  const { certificates } = t.education;

  if (!certificates || certificates.length === 0) return null;

  return (
    <Section id="certificates" title={t.sections.certificates || t.education.certificatesTitle}>
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="p-6 sm:p-8 md:p-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 transition-colors shadow-xs"
          >
            {/* Top row: NTI logo box + Coming Soon badge */}
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center font-bold text-sm tracking-wide text-accent flex-shrink-0">
                {cert.logoText}
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/25">
                {cert.badge}
              </span>
            </div>

            {/* Title + Duration */}
            <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-snug">
                {cert.title}
              </h3>
              {cert.duration && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-200/70 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300/60 dark:border-gray-700/60 flex-shrink-0">
                  {formatNumbers(cert.duration)}
                </span>
              )}
            </div>
            <p className="text-sm sm:text-base font-medium text-accent mb-4">
              {cert.issuer}
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
              {formatNumbers(cert.description)}
            </p>

            {/* Key learnings & skills */}
            {cert.skills && cert.skills.length > 0 && (
              <div className="mb-6">
                <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
                  {cert.skillsLabel}
                </span>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Dashed placeholder box for upcoming certificate */}
            <div className="w-full rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-950/30 px-4 py-8 flex items-center justify-center text-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {cert.placeholderText}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
