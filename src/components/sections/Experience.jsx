import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";

export default function Experience() {
  const { t } = useLanguage();
  const experienceData = t.experience;
  const items = experienceData?.items;

  // If there are no entries, hide this section completely
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Section id="experience" title={t.sections.experience}>
      <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-3.5 md:before:left-4 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-800 rtl:before:right-3.5 rtl:md:before:right-4 rtl:before:left-auto">
        {items.map((entry) => (
          <div
            key={entry.id}
            className="relative flex items-start gap-6 md:gap-8"
          >
            {/* Timeline node */}
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white dark:bg-gray-950 border-2 border-accent flex items-center justify-center flex-shrink-0 z-10 shadow-xs mt-1">
              <span className="w-2 h-2 rounded-full bg-accent" />
            </div>

            {/* Timeline Card */}
            <div className="flex-1 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {entry.company}
                  </h3>
                  <p className="text-sm sm:text-base font-medium text-accent">
                    {entry.role}
                    {entry.type && (
                      <span className="text-gray-400 dark:text-gray-500 font-normal">
                        {" "}
                        • {entry.type}
                      </span>
                    )}
                  </p>
                </div>
                {entry.date && (
                  <span className="text-xs sm:text-sm font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700/60">
                    {entry.date}
                  </span>
                )}
              </div>

              {/* Challenge / Actions / Result */}
              <div className="space-y-4 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                {/* Challenge */}
                <div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100 block mb-1">
                    {experienceData.challengeLabel}:
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {entry.challenge}
                  </p>
                </div>

                {/* Actions */}
                <div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100 block mb-1.5">
                    {experienceData.actionsLabel}:
                  </span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-600 dark:text-gray-400 leading-relaxed ps-1">
                    {entry.actions.map((action, idx) => (
                      <li key={idx}>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Result */}
                <div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100 block mb-1">
                    {experienceData.resultLabel}:
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    {entry.result}
                  </p>
                </div>
              </div>

              {/* Tech Tags */}
              {entry.tags && entry.tags.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200/60 dark:border-gray-800/80 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
