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

function GmailIcon({ className = "w-5 h-5 shrink-0" }) {
  return (
    <svg className={className} viewBox="52 42 88 66" fill="none">
      <path fill="#4285F4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
      <path fill="#34A853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
      <path fill="#FBBC04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" />
      <path fill="#EA4335" d="M72 74V48l24 18 24-18v26L96 92" />
      <path fill="#C5221F" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-5 h-5 text-[#25D366] shrink-0" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function PhoneCallIcon({ className = "w-5 h-5 shrink-0" }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}

function getPlatformLogo(name = "", url = "") {
  const target = `${name} ${url}`.toLowerCase();
  if (target.includes("mostaql")) return "/platforms/mostaql.jpg";
  if (target.includes("upwork")) return "/platforms/upwork.jpg";
  if (target.includes("khamsat")) return "/platforms/khamsat.jpg";
  if (target.includes("nafezly")) return "/platforms/nafezly.jpg";
  if (target.includes("kafiil")) return "/platforms/kafiil.jpg";
  return null;
}

export default function Footer() {
  const { t, lang } = useLanguage();
  const isRtl = lang === "ar";
  const footer = t.footer;

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Top 3-Section Row: LET'S CONNECT | Central Logo Emblem | WHO I AM? */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-center">
          {/* Left Column: LET'S CONNECT */}
          <div className="flex flex-col items-start text-start">
            <h4 className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-accent dark:text-blue-400 mb-3">
              {footer.connectHeading || (isRtl ? "لنبقى على تواصل" : "LET'S CONNECT")}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5 max-w-sm">
              {footer.connectText ||
                (isRtl
                  ? "متاح دائماً لمناقشة مشاريع تحليل البيانات وتعلّم الآلة والتعاون الأكاديمي والتقني."
                  : "Always open to discussing data analysis, machine learning projects, and academic collaborations.")}
            </p>
            {/* Social & Contact Icon Buttons matching LinkedIn & GitHub style */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="https://github.com/zOmar112"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:text-accent hover:border-accent dark:hover:border-accent transition-all cursor-pointer shadow-2xs hover:-translate-y-0.5"
                aria-label="GitHub"
                title="GitHub"
              >
                <GitHubIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/omarsolimn"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:text-accent hover:border-accent dark:hover:border-accent transition-all cursor-pointer shadow-2xs hover:-translate-y-0.5"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href={`mailto:${footer.email}`}
                className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-accent dark:hover:border-accent transition-all cursor-pointer shadow-2xs hover:-translate-y-0.5"
                title={`Gmail: ${footer.email}`}
                aria-label="Gmail"
              >
                <GmailIcon />
              </a>
              <a
                href={`https://wa.me/${footer.whatsapp?.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-[#25D366] dark:hover:border-[#25D366] transition-all cursor-pointer shadow-2xs hover:-translate-y-0.5"
                title={`WhatsApp: ${footer.whatsappDisplay}`}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
              <a
                href={`tel:${footer.whatsapp || "+201028570417"}`}
                className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:text-emerald-500 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all cursor-pointer shadow-2xs hover:-translate-y-0.5"
                title={isRtl ? `اتصال فوري: ${footer.whatsappDisplay}` : `Call Directly: ${footer.whatsappDisplay}`}
                aria-label="Call Directly"
              >
                <PhoneCallIcon />
              </a>
            </div>
          </div>

          {/* Center Column: Big Glowing Logo Emblem matching Image 2 */}
          <div className="flex flex-col items-center justify-center my-4 lg:my-0">
            <div className="relative group">
              {/* Soft Aviation Ambient Halo */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-accent/20 dark:bg-blue-500/20 blur-xl scale-125 pointer-events-none group-hover:scale-140 transition-transform duration-500"
              />
              <img
                src="/logo.png"
                alt="Omar Ibrahim"
                className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain rounded-2xl drop-shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: WHO I AM? */}
          <div className="flex flex-col items-start lg:items-end text-start lg:text-end">
            <h4 className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-accent dark:text-blue-400 mb-3">
              {footer.whoHeading || (isRtl ? "من أنا؟" : "WHO I AM?")}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              {footer.intro}
            </p>
          </div>
        </div>

        {/* Divider matching Image 2 */}
        <div className="border-t border-gray-200 dark:border-gray-800/80 my-8 sm:my-10" />

        {/* Centered Freelance Platforms Squircle App Icons matching Image 2 */}
        {footer.freelance && footer.freelance.length > 0 && (
          <div className="flex items-center justify-center flex-wrap gap-3.5 sm:gap-4 mb-6">
            {footer.freelance.map((platform) => {
              const logoSrc = getPlatformLogo(platform.name, platform.url);
              return (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xs hover:scale-115 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer shrink-0 p-0.5"
                  title={platform.name}
                  aria-label={platform.name}
                >
                  {logoSrc && (
                    <img
                      src={logoSrc}
                      alt={platform.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  )}
                </a>
              );
            })}
          </div>
        )}

        {/* Centered Copyright matching Image 2 */}
        <div className="text-center font-mono text-xs text-gray-500 dark:text-gray-500">
          © <span className="number-highlight">2026</span> Omar Ibrahim.{" "}
          {footer.allRightsReserved || (isRtl ? "جميع الحقوق محفوظة." : "All Rights Reserved.")}
        </div>
      </div>
    </footer>
  );
}
