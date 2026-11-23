import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import Section from "../Section";
import Footer from "../Footer";

function isFilled(val) {
  return Boolean(val && val.trim() !== "");
}

function CopyIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
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

export default function Contact() {
  const { t } = useLanguage();
  const contact = t.contact;
  const form = contact.form;

  const [copiedKey, setCopiedKey] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipient = isFilled(contact.email) ? contact.email : "";
    const subject = encodeURIComponent(formData.subject || "Contact from Portfolio");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  const hasEmail = isFilled(contact.email);
  const hasWhatsapp = isFilled(contact.whatsapp);
  const hasGithub = isFilled(contact.socials?.github);
  const hasLinkedin = isFilled(contact.socials?.linkedin);

  return (
    <>
      <Section id="contact" title={t.sections.contact}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {contact.heading}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {contact.subheading}
              </p>

              {/* Direct copyable contact cards */}
              <div className="space-y-4 mb-8">
                {hasEmail && (
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block mb-0.5">
                        {contact.emailLabel}
                      </span>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                        {contact.email}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(contact.email, "email")}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-700 hover:border-accent dark:hover:border-accent text-gray-700 dark:text-gray-300 flex items-center gap-1.5 transition-all duration-200 cursor-pointer flex-shrink-0 hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0"
                      aria-label="Copy Email"
                    >
                      {copiedKey === "email" ? (
                        <>
                          <CheckIcon />
                          <span>{contact.copied}</span>
                        </>
                      ) : (
                        <>
                          <CopyIcon />
                          <span>{contact.copy}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {hasWhatsapp && (
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block mb-0.5">
                        {contact.whatsappLabel}
                      </span>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                        {contact.whatsapp}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(contact.whatsapp, "whatsapp")}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-700 hover:border-accent dark:hover:border-accent text-gray-700 dark:text-gray-300 flex items-center gap-1.5 transition-all duration-200 cursor-pointer flex-shrink-0 hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0"
                      aria-label="Copy WhatsApp"
                    >
                      {copiedKey === "whatsapp" ? (
                        <>
                          <CheckIcon />
                          <span>{contact.copied}</span>
                        </>
                      ) : (
                        <>
                          <CopyIcon />
                          <span>{contact.copy}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Social Icons (opens in new tab) */}
            <div>
              <div className="flex items-center gap-3">
                {hasGithub && (
                  <a
                    href={contact.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:text-accent hover:border-accent dark:hover:border-accent transition-colors cursor-pointer"
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
                    className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:text-accent hover:border-accent dark:hover:border-accent transition-colors cursor-pointer"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: 4-Field Mailto Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 space-y-4"
            >
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  {form.name}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={form.namePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  {form.email}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={form.emailPlaceholder}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  {form.subject}
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder={form.subjectPlaceholder}
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  {form.message}
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={form.messagePlaceholder}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-accent hover:opacity-90 text-white font-medium text-sm transition-all duration-200 shadow-sm cursor-pointer hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
              >
                {form.submit}
              </button>
            </form>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
}
