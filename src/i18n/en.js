const en = {
  dir: "ltr",
  nav: {
    logo: "OI",
    home: "Home",
    about: "About",
    education: "Education",
    skills: "Skills",
    experience: "Experience",
    services: "Services",
    projects: "Projects",
    achievements: "Achievements",
    contact: "Contact",
    connect: "Connect Me",
  },
  home: {
    greeting: "Hello, I'm",
    name: "Omar Ibrahim",
    role: "Data & Machine Learning Student",
    usp: "I help teams and organizations turn raw data into clear predictions through machine learning models I build and test on real datasets.",
    viewWork: "View My Work",
    downloadCv: "Download CV",
  },
  about: {
    hook: "Turning raw data into clear predictions",
    p1: "I'm Omar Ibrahim, a third-year Aviation Computers and Information student in Zagazig. I help teams and organizations turn raw data into clear predictions through machine learning models I build and test on real datasets. In my machine learning course I built an end-to-end pipeline that predicts whether income exceeds $50K (project score 98), and an exploratory analysis with data cleaning and feature engineering on the Home Credit Default Risk dataset.",
    p2: "I also contributed to Vortex-Gen, a virtual aviation wind tunnel that our team extended with educational content on several aviation topics, and we placed third in a hackathon. I'm passionate about football and would welcome a chance to apply data analysis to performance, match, or player analysis.",
  },
  education: {
    study: {
      degree: "B.Sc. in Aviation Computers and Information",
      institution: "Zagazig National University",
      location: "Zagazig",
      year: "Third Year",
      expectedGraduation: "Expected Graduation: 2028",
      coursesLabel: "Key Courses",
      courses: "Aviation and ATC systems, database systems, operating systems, computer architecture, data science",
      completed: "Completed: Machine Learning for Data Analysis, NTI (120 hours)",
      inProgressBadge: "In progress",
      inProgressCourse: "Machine Learning course, National Telecommunication Institute (NTI): certificate coming soon",
    },
    certificatesTitle: "Certificates",
    certificates: [
      {
        id: "nti-ml",
        logoText: "NTI",
        badge: "Coming Soon",
        title: "Machine Learning for Data Analysis",
        duration: "120 hours",
        issuer: "National Telecommunication Institute (NTI)",
        description:
          "Course covering data preprocessing and exploration, supervised and unsupervised learning, model evaluation, and data visualization, with hands-on projects on real-world datasets.",
        skillsLabel: "KEY LEARNINGS & SKILLS:",
        skills: [
          "Data Preprocessing",
          "EDA",
          "Feature Engineering",
          "Supervised Learning",
          "Unsupervised Learning",
          "Model Evaluation",
          "scikit-learn",
        ],
        placeholderText: "Certificate will be added soon",
      },
    ],
  },
  skills: {
    items: [
      {
        id: "ml-data",
        title: "Machine Learning & Data",
        description:
          "Building end-to-end ML pipelines, exploratory analysis, and data modeling on real datasets.",
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
        title: "Web Development",
        description:
          "Developing responsive, modern user interfaces with clean component architectures and motion.",
        tags: ["React", "Vite", "TypeScript", "TailwindCSS", "Framer Motion"],
      },
      {
        id: "backend-deploy",
        title: "Deployment & Backend",
        description:
          "Cloud databases, authentication management, and continuous frontend deployment.",
        tags: ["Supabase", "Vercel"],
      },
      {
        id: "ai-dev",
        title: "AI-Assisted Development",
        description:
          "Accelerating software workflows using AI developer tooling and language model APIs.",
        tags: ["AI Coding Tools", "Claude API"],
      },
      {
        id: "soft-skills",
        title: "Soft Skills",
        description:
          "Core interpersonal strengths that support calm problem-solving and rapid adaptation.",
        tags: [
          "Calm Under Pressure",
          "Fast Learner",
          "Problem Solving",
          "Analytical Thinking",
        ],
      },
      {
        id: "learning",
        title: "Currently Learning",
        description:
          "Expanding analytical depth with a strong focus on sports and performance metrics.",
        tags: ["Data Analysis", "Football Analytics"],
      },
    ],
  },
  experience: {
    challengeLabel: "Challenge",
    actionsLabel: "Actions",
    resultLabel: "Result",
    items: [
      {
        id: "ber-store",
        role: "Founder & Builder",
        company: "Ber Store",
        type: "Personal Project",
        date: "2024",
        challenge: "Developing an intuitive Arabic e-commerce solution enabling zero-friction mobile purchases via WhatsApp without an engineering team.",
        actions: [
          "Built an Arabic women's abaya e-commerce store using AI coding tools.",
          "Implemented an admin panel for product inventory and catalog management.",
          "Integrated WhatsApp order flow for frictionless customer checkout.",
          "Managed image uploads and media asset storage via Supabase.",
        ],
        result: "Successfully launched the live storefront with streamlined WhatsApp checkout and full self-service inventory management.",
        tags: ["React", "Vite", "TailwindCSS", "Supabase", "Vercel"],
      },
      {
        id: "vortex-gen-hackathon",
        role: "Participant, Vortex-Gen Team",
        company: "Aviation Hackathon",
        type: "Hackathon",
        date: "2024",
        challenge: "Simulating aerodynamic airfoil behaviors interactively in real time for educational visualization.",
        actions: [
          "Implemented interactive educational aviation modules for the virtual wind tunnel.",
          "Integrated responsive simulation UI controls with the core aerodynamic solver.",
        ],
        result: "Awarded third place in the hackathon.",
        tags: ["React", "TypeScript"],
      },
    ],
  },
  services: {
    deliverLabel: "What I Deliver",
    problemLabel: "Problem It Solves",
    outcomeLabel: "Outcome for the Client",
    items: [
      {
        id: "ml-tabular",
        icon: "chart",
        title: "Machine Learning Models for Tabular Data",
        deliver:
          "A trained and evaluated classification model with a short summary of results.",
        problem: "Data exists but gives no clear prediction.",
        outcome: "Clear predictions and a documented evaluation.",
        tags: ["Machine Learning", "Scikit-Learn", "EDA", "Classification"],
      },
      {
        id: "arabic-ecommerce",
        icon: "cart",
        title: "Arabic E-commerce Websites",
        deliver:
          "An Arabic-first online store with admin panel, image uploads, and WhatsApp ordering.",
        problem:
          "Small business owners want to sell online without a technical team.",
        outcome:
          "The owner manages products and receives orders by themselves.",
        tags: ["E-Commerce", "React", "Supabase", "WhatsApp Checkout"],
      },
    ],
  },
  projects: {
    viewProject: "View Project",
    demo: "Demo",
    viewDetails: "View Details",
    closeModal: "Close modal",
    problemLabel: "Problem",
    roleLabel: "Role",
    solutionLabel: "Solution",
    toolsLabel: "Tools",
    resultLabel: "Result",
    items: [
      {
        id: "adult-income-prediction",
        badge: "Course Project",
        title: "Adult Income Prediction",
        oneLiner: "End-to-end ML classification pipeline predicting income bracket from census data.",
        cover: "/projects/adult-income.webp",
        problem:
          "Predict whether an individual's annual income exceeds $50,000 using the UCI Adult Census Income dataset.",
        role: "Machine Learning Developer (Data preprocessing, modeling, evaluation)",
        solution:
          "End-to-end machine learning pipeline including data cleaning and exploratory data analysis; tested classification algorithms evaluated using ROC-AUC and F1-score.",
        tools: "Python, Pandas, Scikit-Learn, Jupyter Notebook",
        result: "Project score: 98/100.",
        tags: ["Python", "Machine Learning", "EDA", "Data Cleaning", "Classification"],
        viewLink: "https://github.com/zOmar112/Adult-Income-Prediction",
        demoLink: "",
      },
      {
        id: "home-credit-default-risk",
        badge: "Course Project",
        title: "Home Credit Default Risk EDA",
        oneLiner: "Exploratory analysis, feature engineering, and data cleaning on credit risk data.",
        cover: "/projects/home-credit.webp",
        problem:
          "Understand the Home Credit Default Risk data and prepare it for modeling.",
        role: "Data Analyst & Feature Engineer",
        solution:
          "Exploratory data analysis, domain-specific data cleaning, and feature engineering.",
        tools: "Python, Pandas, Seaborn, Jupyter Notebook",
        result: "Identified key credit risk indicators and engineered domain-specific interaction features to improve baseline data quality.",
        tags: ["Python", "Pandas", "Seaborn", "EDA", "Feature Engineering"],
        viewLink: "https://github.com/zOmar112/Home-Credit-Default-Risk-EDA",
        demoLink: "",
      },
      {
        id: "vortex-gen",
        badge: "Team Project — Hackathon",
        title: "Vortex-Gen",
        oneLiner: "Virtual aviation wind tunnel with airfoil simulation and educational content.",
        cover: "/projects/vortex-gen.png",
        problem: "Lack of accessible web simulation tools for students to visualize real-time airfoil airflow.",
        role: "Frontend Developer & Simulation UI integration",
        solution:
          "A virtual aviation wind tunnel (airfoil simulation web app) extended with educational content on several aviation topics; currently improving accuracy with a Panel Method solver that supports NACA geometry and uploaded .dat files.",
        tools: "React, Vite, TypeScript",
        result: "Third place in the Aviation Hackathon.",
        tags: ["React", "TypeScript", "Vite", "Simulation"],
        viewLink: "https://github.com/zOmar112/vortex.beta",
        demoLink: "https://vortex-gen.vercel.app/",
      },
      {
        id: "ber-store",
        badge: "Personal Project",
        title: "Ber Store",
        oneLiner: "Arabic-first abaya e-commerce store built with AI coding tools.",
        cover: "/projects/ber-store.webp",
        problem: "Need for an intuitive Arabic online store allowing customers to complete orders over WhatsApp without technical complexity.",
        role: "Sole builder, using AI coding tools.",
        solution:
          "Arabic abaya store with admin panel, WhatsApp order flow, image uploads, dark mode.",
        tools: "React, Vite, TailwindCSS, Supabase, Vercel, Framer Motion",
        result: "Delivered a fully responsive live store with self-hosted admin control and instant WhatsApp ordering.",
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
        title: "Third Place",
        issuer: "Aviation Hackathon",
        description:
          "Awarded third place with team Vortex-Gen for developing a virtual wind tunnel with aviation educational content.",
      },
      {
        id: "ml-score-98",
        icon: "star",
        title: "Score 98",
        issuer: "Machine Learning Course",
        description:
          "Achieved a project score of 98/100 for building an end-to-end income classification pipeline.",
      },
    ],
  },
  contact: {
    heading: "Get in Touch",
    subheading:
      "Looking for a machine learning model, a data analysis collaboration, or a clean web application? Let's connect.",
    emailLabel: "Email",
    email: "",
    whatsappLabel: "WhatsApp",
    whatsapp: "",
    socials: {
      github: "https://github.com/zOmar112",
      linkedin: "https://www.linkedin.com/in/omarsolimn",
    },
    copy: "Copy",
    copied: "Copied!",
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@example.com",
      subject: "Subject",
      subjectPlaceholder: "Project inquiry or opportunity",
      message: "Message",
      messagePlaceholder: "How can I help you?",
      submit: "Send Message",
    },
  },
  footer: {
    intro:
      "Omar Ibrahim — Aviation Computers & Information student in Zagazig. Turning raw data into clear predictions through machine learning models built and tested on real datasets.",
  },
  sections: {
    home: "Home",
    about: "About Me",
    education: "Education",
    skills: "Skills",
    experience: "Experience",
    services: "Services",
    projects: "Projects",
    achievements: "Achievements",
    contact: "Contact",
  },
};

export default en;
