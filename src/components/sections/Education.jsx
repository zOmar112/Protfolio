import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";
import { formatNumbers } from "../../utils/formatNumbers";

export default function Education() {
  const { t } = useLanguage();
  const { study, certificatesTitle, certificates } = t.education;

  return (
    <Section id="education" title={t.sections.education}>
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
        {/* Study card */}
        <div className="p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 transition-colors">
          {/* University logo and name at the top */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/university-logo.png"
              alt="Zagazig National University logo"
              className="w-[56px] h-[56px] rounded-full object-contain flex-shrink-0"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {study.institution}
            </h3>
          </div>

          {/* Degree title */}
          <h4 className="text-lg sm:text-xl font-semibold text-accent mb-3">
            {study.degree}
          </h4>

          {/* Meta details */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
            <span>{study.location}</span>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <span>{study.year}</span>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <span>{formatNumbers(study.expectedGraduation)}</span>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-6 space-y-3">
            {/* Key courses (one line) */}
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {study.coursesLabel}:{" "}
              </span>
              <span>{study.courses}</span>
            </p>

            {/* Completed ML course line */}
            <p className="text-sm sm:text-base text-accent font-medium leading-relaxed flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
              <span>{formatNumbers(study.completed)}</span>
            </p>

            {/* In-progress NTI course line */}
            {study.inProgressCourse && (
              <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed flex flex-wrap items-center gap-2.5 pt-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25 flex-shrink-0">
                  {study.inProgressBadge || "In progress"}
                </span>
                <span>{formatNumbers(study.inProgressCourse)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Certificates area */}
        {certificates && certificates.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {certificatesTitle}
            </h3>

            <div className="space-y-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 transition-colors"
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

                  {/* Title + Duration & Issuer */}
                  <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-snug">
                      {cert.title}
                    </h4>
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
          </div>
        )}
      </div>
    </Section>
  );
}
