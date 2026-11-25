import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

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

function MailIcon() {
  return (
    <svg className="w-4 h-4 text-accent dark:text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity rtl:rotate-180 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-accent dark:group-hover:text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

/* Custom platform monochrome icons */
function UpworkIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.077.008-.043c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.704-2.704 2.704zm0-8.14c-3.14 0-5.466 2.228-6.096 5.56-1.096-1.636-1.782-3.693-1.921-5.698H7.669v7.12c0 2.072-1.685 3.757-3.757 3.757-2.071 0-3.756-1.685-3.756-3.757V4.88H0v7.12c0 3.659 2.977 6.637 6.636 6.637 3.66 0 6.637-2.978 6.637-6.637v-1.156c.645.922 1.464 1.761 2.455 2.404l-1.932 9.072h2.951l1.43-6.721c.732.176 1.496.273 2.285.273 3.14 0 5.696-2.556 5.696-5.696 0-3.14-2.556-5.696-5.696-5.696z" />
    </svg>
  );
}

function MostaqlIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v1.069m7.5 0c-2.483-.173-5.017-.173-7.5 0" />
    </svg>
  );
}

function KhamsatIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function NafezlyIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function KafiilIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function getPlatformIcon(name = "", url = "") {
  const target = `${name} ${url}`.toLowerCase();
  if (target.includes("upwork")) return <UpworkIcon />;
  if (target.includes("mostaql")) return <MostaqlIcon />;
  if (target.includes("khamsat")) return <KhamsatIcon />;
  if (target.includes("nafezly")) return <NafezlyIcon />;
  if (target.includes("kafiil")) return <KafiilIcon />;
  return <ExternalLinkIcon />;
}

export default function Footer() {
  const { t, lang } = useLanguage();
  const isRtl = lang === "ar";
  const footer = t.footer;
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* 3-Column Grid on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Column 1: Brand & Socials (left-aligned on LTR, right-aligned on RTL) */}
          <div className="flex flex-col items-start text-start">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/logo.png"
                alt="Omar Ibrahim"
                className="w-11 h-11 rounded-xl object-contain shadow-xs"
              />
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                {t.home?.name || "Omar Ibrahim"}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5 max-w-sm">
              {footer.intro}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/zOmar112"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:text-accent hover:border-accent dark:hover:border-accent transition-colors cursor-pointer"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/omarsolimn"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:text-accent hover:border-accent dark:hover:border-accent transition-colors cursor-pointer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Direct Contact */}
          <div className="flex flex-col items-start text-start">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
              {isRtl ? "التواصل المباشر" : "DIRECT CONTACT"}
            </h4>
            <div className="flex flex-col gap-3 w-full max-w-sm">
              {/* Email Pill */}
              <div className="inline-flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/60 shadow-2xs hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                <a
                  href={`mailto:${footer.email}`}
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-accent dark:hover:text-blue-400 transition-colors cursor-pointer truncate"
                >
                  <MailIcon />
                  <span className="truncate">{footer.email}</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(footer.email, "email")}
                  className="p-1 rounded-md hover:bg-gray-200/60 dark:hover:bg-gray-800 transition-colors cursor-pointer group shrink-0"
                  title={copiedKey === "email" ? footer.copied : footer.copy}
                  aria-label="Copy Email"
                >
                  {copiedKey === "email" ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>

              {/* WhatsApp Pill */}
              <div className="inline-flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/60 shadow-2xs hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                <a
                  href={`https://wa.me/${footer.whatsapp?.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer truncate"
                >
                  <WhatsAppIcon />
                  <span dir="ltr">{footer.whatsappDisplay}</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(footer.whatsappDisplay, "whatsapp")}
                  className="p-1 rounded-md hover:bg-gray-200/60 dark:hover:bg-gray-800 transition-colors cursor-pointer group shrink-0"
                  title={copiedKey === "whatsapp" ? footer.copied : footer.copy}
                  aria-label="Copy WhatsApp"
                >
                  {copiedKey === "whatsapp" ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
            </div>
          </div>

          {/* Column 3: Freelance Platforms with Icons */}
          <div className="flex flex-col items-start text-start">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
              {isRtl ? (footer.freelanceLabel || "منصات العمل الحر") : "HIRE ME ON FREELANCE PLATFORMS"}
            </h4>
            {footer.freelance && footer.freelance.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {footer.freelance.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-blue-400 hover:border-accent/60 dark:hover:border-blue-400/60 shadow-2xs hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 cursor-pointer"
                  >
                    {getPlatformIcon(platform.name, platform.url)}
                    <span>{platform.name}</span>
                    <ExternalLinkIcon />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar: Divider & Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-900 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            © <span className="number-highlight">2026</span> Omar Ibrahim
          </p>
        </div>
      </div>
    </footer>
  );
}
