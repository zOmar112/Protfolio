import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";
import { formatNumbers } from "../../utils/formatNumbers";

export default function Education() {
  const { t } = useLanguage();
  const { study } = t.education;

  return (
    <Section id="education" title={t.sections.education}>
      <div className="w-full max-w-4xl mx-auto">
        {/* Study card */}
        <div className="p-6 sm:p-8 md:p-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 transition-colors shadow-xs">
          {/* University logo and name at the top */}
          <div className="flex items-center gap-4 mb-5">
            <img
              src="/university-logo.png"
              alt="Zagazig National University logo"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-contain flex-shrink-0 drop-shadow-xs"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {study.institution}
              </h3>
              <h4 className="text-base sm:text-lg md:text-xl font-semibold text-accent mt-1">
                {study.degree}
              </h4>
            </div>
          </div>

          {/* Meta details */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
            <span>{study.location}</span>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <span>{study.year}</span>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <span>{formatNumbers(study.expectedGraduation)}</span>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-6 space-y-3.5">
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
      </div>
    </Section>
  );
}
