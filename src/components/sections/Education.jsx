import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";

export default function Education() {
  const { t } = useLanguage();
  const { study } = t.education;

  return (
    <Section id="education" title={t.sections.education}>
      <div className="w-full max-w-4xl mx-auto">
        {/* Single full-width Study card */}
        <div className="p-6 sm:p-8 md:p-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 transition-colors">
          {/* Degree title */}
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {study.degree}
          </h3>

          {/* Meta details */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {study.institution}
            </span>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <span>{study.location}</span>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <span>{study.year}</span>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <span>{study.expectedGraduation}</span>
            {study.gpa && (
              <>
                <span className="text-gray-300 dark:text-gray-700">•</span>
                <span className="text-accent font-medium">{study.gpa}</span>
              </>
            )}
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
              <span>{study.completed}</span>
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
