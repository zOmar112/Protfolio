import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";
import { formatNumbers } from "../../utils/formatNumbers";

export default function About() {
  const { t } = useLanguage();

  return (
    <Section id="about" title={t.sections.about}>
      <div className="max-w-[720px] mx-auto flex flex-col">
        {/* Hook */}
        <h3 className="text-2xl sm:text-3xl font-semibold text-accent mb-6 leading-snug">
          {t.about.hook}
        </h3>

        {/* Paragraphs */}
        <div className="space-y-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>{formatNumbers(t.about.p1)}</p>
          <p>{formatNumbers(t.about.p2)}</p>
        </div>
      </div>
    </Section>
  );
}
