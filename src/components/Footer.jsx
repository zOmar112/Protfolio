import { useLanguage } from "../context/LanguageContext";

function isFilled(val) {
  return Boolean(val && val.trim() !== "");
}

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useLanguage();
  const contact = t.contact;
  const footer = t.footer;

  const hasEmail = isFilled(contact.email);
  const hasWhatsapp = isFilled(contact.whatsapp);
  const hasGithub = isFilled(contact.socials?.github);
  const hasLinkedin = isFilled(contact.socials?.linkedin);

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12">
          {/* Column 1: Short intro */}
          <div>
            <span className="text-xl font-black tracking-wider text-accent block mb-3">
              OI
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              {footer.intro}
            </p>
          </div>

          {/* Column 2: Contact links (hidden if values are empty) */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              {footer.contactTitle}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {hasEmail && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
              {hasWhatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
                  >
                    {contact.whatsapp}
                  </a>
                </li>
              )}
              <li>
                <a
                  href="#contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors inline-block"
                >
                  {t.sections.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Logo + Social icons */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              {footer.socialTitle}
            </h4>
            <div className="flex items-center gap-3">
              {hasGithub && (
                <a
                  href={contact.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:text-accent hover:border-accent dark:hover:border-accent transition-colors cursor-pointer"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </a>
              )}
              {hasLinkedin && (
                <a
                  href={contact.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:text-accent hover:border-accent dark:hover:border-accent transition-colors cursor-pointer"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-gray-100 dark:border-gray-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-500 gap-2">
          <p>
            © {new Date().getFullYear()} Omar Ibrahim. {footer.rights}
          </p>
          <a
            href="#home"
            className="hover:text-accent transition-colors"
          >
            ↑ Top
          </a>
        </div>
      </div>
    </footer>
  );
}
