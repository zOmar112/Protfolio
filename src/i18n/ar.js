const ar = {
  dir: "rtl",
  nav: {
    logo: "OI",
    home: "الرئيسية",
    about: "عني",
    education: "التعليم",
    skills: "المهارات",
    experience: "الخبرة",
    services: "الخدمات",
    projects: "المشاريع",
    achievements: "الإنجازات",
    contact: "تواصل",
    connect: "تواصل معي",
  },
  home: {
    greeting: "مرحباً، أنا",
    name: "عمر إبراهيم",
    role: "طالب علوم البيانات وتعلّم الآلة",
    usp: "أساعد الفرق والمؤسسات على تحويل البيانات الخام إلى تنبؤات واضحة من خلال نماذج تعلّم آلة أبنيها وأختبرها على بيانات حقيقية.",
    viewWork: "عرض أعمالي",
    downloadCv: "تحميل السيرة الذاتية",
  },
  about: {
    hook: "أحوّل البيانات الخام إلى تنبؤات واضحة",
    p1: "أنا عمر إبراهيم، طالب في السنة الثالثة بقسم حاسبات ومعلومات طيران في الزقازيق. أساعد الفرق والمؤسسات على تحويل البيانات الخام إلى تنبؤات واضحة من خلال نماذج Machine Learning أبنيها وأختبرها على بيانات حقيقية. خلال دراستي لمقرر Machine Learning، قمت ببناء Pipeline متكامل للتنبؤ بما إذا كان الدخل يتجاوز 50 ألف دولار (بتقييم 98 للمشروع)، بالإضافة إلى تحليل استكشافي مع Data Cleaning وFeature Engineering على مجموعة بيانات Home Credit Default Risk.",
    p2: "كما ساهمت في مشروع Vortex-Gen، وهو نفق رياح افتراضي للطيران قام فريقنا بتطويره عبر إضافة محتوى تعليمي حول موضوعات متعددة في مجال الطيران، وحصدنا المركز الثالث في Hackathon. لديّ شغف كبير بكرة القدم، وأرحب دائماً بفرصة لتطبيق Data Analysis على تحليل الأداء والمباريات واللاعبين.",
  },
  education: {
    study: {
      degree: "بكالوريوس حاسبات ومعلومات طيران",
      institution: "جامعة الزقازيق الأهلية",
      location: "الزقازيق",
      year: "السنة الثالثة",
      expectedGraduation: "التخرج المتوقع: 2028",
      coursesLabel: "المقررات الرئيسية",
      courses: "نظم الطيران والمراقبة الجوية (ATC)، نظم قواعد البيانات، نظم التشغيل، بنية الحاسب، علم البيانات",
      completed: "أنجزت: كورس Machine Learning for Data Analysis، المعهد القومي للاتصالات (NTI) (120 ساعة)",
      inProgressBadge: "قيد التقدم",
      inProgressCourse: "كورس تعلّم الآلة، المعهد القومي للاتصالات (NTI): الشهادة قريبًا",
    },
    certificatesTitle: "الشهادات",
    certificates: [
      {
        id: "nti-ml",
        logoText: "NTI",
        badge: "قريبًا",
        title: "Machine Learning for Data Analysis",
        duration: "120 ساعة",
        issuer: "المعهد القومي للاتصالات (NTI)",
        description:
          "كورس يغطي معالجة البيانات واستكشافها، التعلّم الموجه وغير الموجه، تقييم النماذج، وتصوّر البيانات، مع مشاريع عملية على مجموعات بيانات حقيقية.",
        skillsLabel: "أهم المهارات والمحاور:",
        skills: [
          "Data Preprocessing",
          "EDA",
          "Feature Engineering",
          "Supervised Learning",
          "Unsupervised Learning",
          "Model Evaluation",
          "scikit-learn",
        ],
        placeholderText: "ستتم إضافة الشهادة قريبًا",
      },
    ],
  },
  skills: {
    items: [
      {
        id: "ml-data",
        title: "تعلم الآلة والبيانات",
        description:
          "بناء مسارات تعلم آلة متكاملة، والتحليل الاستكشافي للبيانات، ونمذجتها على مجموعات بيانات واقعية.",
        tags: [
          "Python",
          "Pandas",
          "NumPy",
          "Scikit-Learn",
          "Seaborn",
          "Jupyter",
          "Feature Engineering",
        ],
      },
      {
        id: "web-dev",
        title: "تطوير الويب",
        description:
          "تطوير واجهات مستخدم تفاعلية وحديثة وسريعة الاستجابة بتصميم أنيق وحركات سلسة.",
        tags: ["React", "Vite", "TypeScript", "TailwindCSS", "Framer Motion"],
      },
      {
        id: "backend-deploy",
        title: "النشر والواجهات الخلفية",
        description:
          "إدارة قواعد البيانات السحابية والمصادقة، وضمان النشر الآلي المستمر للتطبيقات.",
        tags: ["Supabase", "Vercel"],
      },
      {
        id: "ai-dev",
        title: "التطوير بمساعدة الذكاء الاصطناعي",
        description:
          "تسريع وتطوير البرمجيات باستخدام أدوات البرمجة الذكية وواجهات نماذج اللغة البرمجية.",
        tags: ["AI Coding Tools", "Claude API"],
      },
      {
        id: "soft-skills",
        title: "المهارات الشخصية",
        description:
          "سمات شخصية تعزز العمل الجماعي الهادئ وسرعة التكيف والتنفيذ الفعال.",
        tags: [
          "الهدوء تحت الضغط",
          "سرعة التعلّم",
          "حل المشكلات",
          "التفكير التحليلي",
        ],
      },
      {
        id: "learning",
        title: "أتعلمه حالياً",
        description:
          "تعميق المهارات التحليلية مع تركيز تطبيقي على تحليلات وأداء كرة القدم.",
        tags: ["Data Analysis", "Football Analytics"],
      },
    ],
  },
  experience: {
    challengeLabel: "التحدي",
    actionsLabel: "الإجراءات",
    resultLabel: "النتيجة",
    items: [
      {
        id: "ber-store",
        role: "المؤسس والمطوّر",
        company: "متجر بِرّ (Ber Store)",
        type: "مشروع شخصي",
        date: "2024",
        challenge: "تطوير متجر إلكتروني عربي سهل الاستخدام يتيح الشراء السريع عبر واتساب دون الحاجة لفريق تقني.",
        actions: [
          "بناء متجر إلكتروني للعبايات النسائية باللغة العربية بالاعتماد على أدوات البرمجة بالذكاء الاصطناعي.",
          "تطوير لوحة تحكم إدارية (Admin Panel) لإدارة المنتجات والمخزون.",
          "تنفيذ مسار طلب مباشر عبر WhatsApp لتسهيل تجربة الشراء للعملاء.",
          "إدارة وتخزين صور المنتجات والوسائط عبر Supabase.",
        ],
        result: "إطلاق المتجر بنجاح مع مسار طلب مباشر عبر WhatsApp ونظام إدارة مخزون ذاتي متكامل.",
        tags: ["React", "Vite", "TailwindCSS", "Supabase", "Vercel"],
      },
      {
        id: "vortex-gen-hackathon",
        role: "مشارك، فريق Vortex-Gen",
        company: "هاكاثون الطيران",
        type: "هاكاثون",
        date: "2024",
        challenge: "محاكاة الخصائص الديناميكية الهوائية للأجنحة بشكل تفاعلي ولحظي للأغراض التعليمية.",
        actions: [
          "تطوير وحدات تعليمية تفاعلية لمشروع نفق الرياح الافتراضي للطيران.",
          "دمج واجهات المحاكاة التفاعلية مع نموذج الحسابات الديناميكية الهوائية.",
        ],
        result: "حصد المركز الثالث في الهاكاثون.",
        tags: ["React", "TypeScript"],
      },
    ],
  },
  services: {
    deliverLabel: "ما أقدمه",
    problemLabel: "المشكلة التي يحلها",
    outcomeLabel: "النتيجة للعميل",
    items: [
      {
        id: "ml-tabular",
        icon: "chart",
        title: "نماذج تعلّم الآلة للبيانات الجدولية",
        deliver: "نموذج تصنيف مدرّب ومُقيَّم مع ملخص موجز للنتائج.",
        problem: "توفر البيانات دون تقديم تنبؤات أو مخرجات واضحة.",
        outcome: "الحصول على تنبؤات واضحة وتقييم موثق وشامل.",
        tags: ["Machine Learning", "Scikit-Learn", "EDA", "Classification"],
      },
      {
        id: "arabic-ecommerce",
        icon: "cart",
        title: "متاجر إلكترونية باللغة العربية",
        deliver:
          "متجر إلكتروني متكامل يدعم العربية أولاً، مع لوحة تحكم، رفع صور، ومسار طلب عبر WhatsApp.",
        problem:
          "رغبة أصحاب الأنشطة التجارية في البيع أونلاين دون الحاجة لفريق تقني.",
        outcome: "تمكين صاحب المتجر من إدارة المنتجات واستلام الطلبات بنفسه.",
        tags: ["E-Commerce", "React", "Supabase", "WhatsApp Checkout"],
      },
    ],
  },
  projects: {
    viewProject: "عرض المشروع",
    demo: "عرض تجريبي",
    viewDetails: "عرض التفاصيل",
    closeModal: "إغلاق النافذة",
    problemLabel: "المشكلة",
    roleLabel: "الدور",
    solutionLabel: "الحل",
    toolsLabel: "الأدوات",
    resultLabel: "النتيجة",
    items: [
      {
        id: "adult-income-prediction",
        badge: "مشروع دراسي",
        title: "Adult Income Prediction",
        oneLiner: "Pipeline متكامل لتعلّم الآلة للتنبؤ بفئة الدخل من بيانات التعداد السكاني.",
        cover: "/projects/adult-income.webp",
        problem:
          "التنبؤ بما إذا كان الدخل السنوي للفرد يتجاوز 50,000 دولار باستخدام مجموعة بيانات UCI Adult Census Income.",
        role: "مطور تعلم الآلة (معالجة البيانات، بناء النماذج، والتقييم)",
        solution:
          "بناء مسار تعلّم آلة متكامل يشمل تنظيف البيانات والتحليل الاستكشافي للبيانات؛ واختبار خوارزميات التصنيف وتقييمها بدقة.",
        tools: "Python, Pandas, Scikit-Learn, Jupyter Notebook",
        result: "تقييم المشروع: 98/100.",
        tags: ["Python", "Machine Learning", "EDA", "Data Cleaning", "Classification"],
        viewLink: "https://github.com/zOmar112/Adult-Income-Prediction",
        demoLink: "",
      },
      {
        id: "home-credit-default-risk",
        badge: "مشروع دراسي",
        title: "Home Credit Default Risk EDA",
        oneLiner: "تحليل استكشافي شامل، وهندسة الخصائص، وتنظيف البيانات لمخاطر الائتمان.",
        cover: "/projects/home-credit.webp",
        problem:
          "فهم بيانات Home Credit Default Risk وتجهيزها لمرحلة بناء النماذج.",
        role: "محلل بيانات وهندسة خصائص",
        solution:
          "إجراء تحليل استكشافي للبيانات، وتنظيف البيانات وفقاً لمتطلبات المجال، وهندسة الخصائص.",
        tools: "Python, Pandas, Seaborn, Jupyter Notebook",
        result: "تحديد أبرز مؤشرات مخاطر الائتمان وهندسة خصائص تفاعلية مخصصة لتحسين جودة البيانات.",
        tags: ["Python", "Pandas", "Seaborn", "EDA", "Feature Engineering"],
        viewLink: "https://github.com/zOmar112/Home-Credit-Default-Risk-EDA",
        demoLink: "",
      },
      {
        id: "vortex-gen",
        badge: "مشروع جماعي — هاكاثون",
        title: "Vortex-Gen",
        oneLiner: "نفق رياح افتراضي للطيران مع محاكاة أجنحة ومحتوى تعليمي.",
        cover: "/projects/vortex-gen.png",
        problem: "صعوبة وصول الطلاب لأدوات محاكاة تفاعلية عبر الويب لتصور تدفق الهواء حول الأجنحة لحظياً.",
        role: "مطور الواجهة الأمامية ودمج واجهات المحاكاة",
        solution:
          "نفق رياح افتراضي للطيران (تطبيق ويب لمحاكاة الأجنحة) مع محتوى تعليمي حول موضوعات طيران متعددة؛ يتم حالياً تحسين الدقة عبر Panel Method Solver يدعم أشكال NACA وملفات .dat المرفوعة.",
        tools: "React, Vite, TypeScript",
        result: "المركز الثالث في هاكاثون الطيران.",
        tags: ["React", "TypeScript", "Vite", "Simulation"],
        viewLink: "https://github.com/zOmar112/vortex.beta",
        demoLink: "https://vortex-gen.vercel.app/",
      },
      {
        id: "ber-store",
        badge: "مشروع شخصي",
        title: "متجر بِرّ (Ber Store)",
        oneLiner: "متجر عبايات إلكتروني يدعم العربية أولاً، بُني بأدوات البرمجة بالذكاء الاصطناعي.",
        cover: "/projects/ber-store.webp",
        problem: "الحاجة لمتجر إلكتروني عربي سهل الاستخدام يتيح الشراء السلس عبر واتساب دون الحاجة لفريق برمجي.",
        role: "المطوّر الوحيد، باستخدام أدوات البرمجة بالذكاء الاصطناعي.",
        solution:
          "متجر عبايات عربي مع لوحة تحكم إدارية، مسار طلب عبر WhatsApp، رفع صور، ووضع داكن.",
        tools: "React, Vite, TailwindCSS, Supabase, Vercel, Framer Motion",
        result: "تسليم متجر إلكتروني متكامل وسريع مع لوحة تحكم كاملة ومسار طلب فوري عبر WhatsApp.",
        tags: ["React", "TailwindCSS", "Supabase", "Vercel", "Framer Motion"],
        viewLink: "https://github.com/zOmar112/ber",
        demoLink: "https://ber-git-main-omar-ber-store.vercel.app/",
      },
    ],
  },
  achievements: {
    items: [
      {
        id: "hackathon-third",
        icon: "trophy",
        title: "المركز الثالث",
        issuer: "هاكاثون الطيران",
        description:
          "حصد المركز الثالث مع فريق Vortex-Gen لتطوير نفق رياح افتراضي للطيران مدعوم بمحتوى تعليمي.",
      },
      {
        id: "ml-score-98",
        icon: "star",
        title: "درجة 98",
        issuer: "مقرر تعلّم الآلة",
        description:
          "الحصول على تقييم 98/100 عن مشروع بناء مسار متكامل لتصنيف الدخل.",
      },
    ],
  },
  contact: {
    heading: "تواصل معي",
    subheading:
      "هل تبحث عن نموذج تعلّم آلة، أو تعاون في تحليل البيانات، أو تطبيق ويب مخصص؟ يسعدني تواصلك.",
    emailLabel: "البريد الإلكتروني",
    email: "",
    whatsappLabel: "واتساب",
    whatsapp: "",
    socials: {
      github: "https://github.com/zOmar112",
      linkedin: "https://www.linkedin.com/in/omarsolimn",
    },
    copy: "نسخ",
    copied: "تم النسخ!",
    form: {
      name: "الاسم",
      namePlaceholder: "اسمك الكامل",
      email: "البريد الإلكتروني",
      emailPlaceholder: "you@example.com",
      subject: "الموضوع",
      subjectPlaceholder: "استفسار عن مشروع أو فرصة عمل",
      message: "الرسالة",
      messagePlaceholder: "كيف يمكنني مساعدتك؟",
      submit: "إرسال الرسالة",
    },
  },
  footer: {
    intro:
      "عمر إبراهيم — طالب حاسبات ومعلومات طيران في الزقازيق. أساعد في تحويل البيانات الخام إلى تنبؤات واضحة عبر نماذج تعلّم آلة مبنية ومُختبرة على بيانات حقيقية.",
  },
  sections: {
    home: "الرئيسية",
    about: "عني",
    education: "التعليم",
    skills: "المهارات",
    experience: "الخبرة",
    services: "الخدمات",
    projects: "المشاريع",
    achievements: "الإنجازات",
    contact: "تواصل معي",
  },
};

export default ar;
