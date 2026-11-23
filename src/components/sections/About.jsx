import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";

export default function About() {
  const { t } = useLanguage();

  return (
    <Section id="about" title={t.sections.about}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Main story */}
        <div className="lg:col-span-8 flex flex-col">
          {/* Hook */}
          <h3 className="text-2xl sm:text-3xl font-semibold text-accent mb-6 leading-snug">
            {t.about.hook}
          </h3>

          {/* Paragraphs */}
          <div className="space-y-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>

          {/* Tech tags */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-wrap gap-2.5">
              {t.about.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700/60 transition-colors hover:border-accent dark:hover:border-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Small side card */}
        <div className="lg:col-span-4 w-full">
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500 mb-4">
              {t.about.card.title}
            </h4>
            <ul className="space-y-3.5 text-sm sm:text-base text-gray-800 dark:text-gray-200">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                <span>{t.about.card.student}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                <span>{t.about.card.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                <span>{t.about.card.faculty}</span>
              </li>
              <li className="pt-2 border-t border-gray-200/60 dark:border-gray-800/80">
                <div className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-accent/10 text-accent">
                  {t.about.card.openTo}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
