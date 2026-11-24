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
    testimonials: "Testimonials",
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
    connectedToolsLabel: "CONNECTED TOOLS & STACK",
    connectedConceptsLabel: "CONNECTED CAPABILITIES",
    leftGroupLabel: "Core Capabilities",
    rightGroupLabel: "Tools & Stack",
    hintText: "Hover or click any node to inspect connections",
    categories: [
      {
        id: "ml-data",
        tab: "ML TECHNIQUES",
        title: "Machine Learning & Data",
        description:
          "Building end-to-end ML pipelines, exploratory data analysis, and evaluated classification models on real-world datasets.",
        archLabel: "PYTHON-CORE NEURAL ARCHITECTURE",
        core: {
          id: "python",
          label: "Python",
          statusTitle: "Python Core",
          connected: [
            "Python",
            "Pandas",
            "NumPy",
            "Scikit-Learn",
            "Seaborn",
            "Jupyter Notebook",
          ],
        },
        leftNodes: [
          {
            id: "eda",
            label: "Exploratory Data Analysis (EDA)",
            links: ["jupyter", "pandas", "seaborn"],
          },
          {
            id: "prep",
            label: "Data Preprocessing & Cleaning",
            links: ["jupyter", "pandas", "sklearn"],
          },
          {
            id: "fe",
            label: "Feature Engineering",
            links: ["pandas", "sklearn", "pipelines"],
          },
          {
            id: "sup",
            label: "Supervised Classification",
            links: ["sklearn", "pipelines"],
          },
          {
            id: "unsup",
            label: "Unsupervised Learning",
            links: ["sklearn", "seaborn"],
          },
          {
            id: "eval",
            label: "Model Evaluation (ROC-AUC · F1)",
            links: ["sklearn", "seaborn", "pipelines"],
          },
        ],
        rightNodes: [
          { id: "jupyter", label: "Jupyter Notebook" },
          { id: "pandas", label: "Pandas & NumPy" },
          { id: "seaborn", label: "Seaborn Visualization" },
          { id: "sklearn", label: "Scikit-Learn" },
          { id: "pipelines", label: "End-to-End ML Pipelines" },
        ],
      },
      {
        id: "web-dev",
        tab: "WEB DEVELOPMENT",
        title: "Web Development",
        description:
          "Developing responsive, Arabic-first and interactive interfaces with clean component architectures and smooth motion.",
        archLabel: "REACT FRONTEND ARCHITECTURE",
        core: {
          id: "react",
          label: "React",
          statusTitle: "React Core",
          connected: [
            "React",
            "TypeScript",
            "Vite",
            "TailwindCSS",
            "Framer Motion",
          ],
        },
        leftNodes: [
          {
            id: "comp",
            label: "Component Architecture",
            links: ["ts", "vite"],
          },
          {
            id: "rtl",
            label: "Responsive & RTL Design",
            links: ["tailwind", "framer"],
          },
          {
            id: "sim",
            label: "Interactive Simulation UI",
            links: ["ts", "vite", "tailwind"],
          },
          {
            id: "motion",
            label: "Smooth UI Motion",
            links: ["framer", "tailwind"],
          },
          {
            id: "store",
            label: "E-Commerce & Admin Flows",
            links: ["ts", "tailwind", "vite"],
          },
        ],
        rightNodes: [
          { id: "ts", label: "TypeScript" },
          { id: "vite", label: "Vite" },
          { id: "tailwind", label: "TailwindCSS" },
          { id: "framer", label: "Framer Motion" },
        ],
      },
      {
        id: "cloud-ai",
        tab: "TOOLS & CLOUD",
        title: "Deployment, Backend & AI Workflow",
        description:
          "Cloud databases, authentication, continuous frontend deployment, and AI-accelerated software workflows.",
        archLabel: "CLOUD & AI WORKFLOW SYSTEM",
        core: {
          id: "cloud",
          label: "Cloud & AI",
          statusTitle: "Cloud & AI Core",
          connected: [
            "Supabase",
            "Vercel",
            "AI Coding Tools",
            "Claude API",
          ],
        },
        leftNodes: [
          {
            id: "db",
            label: "Cloud Database & Storage",
            links: ["supabase"],
          },
          {
            id: "auth",
            label: "Auth & Inventory Control",
            links: ["supabase", "vercel"],
          },
          {
            id: "deploy",
            label: "Continuous Deployment",
            links: ["vercel", "supabase"],
          },
          {
            id: "aidev",
            label: "AI-Assisted Development",
            links: ["aitools", "claude"],
          },
          {
            id: "llm",
            label: "LLM API Integration",
            links: ["claude", "aitools"],
          },
        ],
        rightNodes: [
          { id: "supabase", label: "Supabase" },
          { id: "vercel", label: "Vercel" },
          { id: "aitools", label: "AI Coding Tools" },
          { id: "claude", label: "Claude API" },
        ],
      },
      {
        id: "soft-skills",
        tab: "SOFT SKILLS",
        title: "Soft Skills",
        description:
          "Core interpersonal strengths that support calm problem-solving, analytical clarity, and rapid adaptation.",
        archLabel: "ANALYTICAL EXECUTION ARCHITECTURE",
        core: {
          id: "solving",
          label: "Problem Solving",
          statusTitle: "Problem Solving Core",
          connected: [
            "Calm Under Pressure",
            "Analytical Thinking",
            "Fast Learner",
            "Hackathon Teamwork",
          ],
        },
        leftNodes: [
          {
            id: "calm",
            label: "Calm Under Pressure",
            links: ["hackathon", "delivery"],
          },
          {
            id: "analytical",
            label: "Analytical Thinking",
            links: ["realdata", "docs"],
          },
          {
            id: "fast",
            label: "Fast Learner",
            links: ["prototyping", "delivery"],
          },
          {
            id: "teamwork",
            label: "Team Collaboration",
            links: ["hackathon", "docs"],
          },
        ],
        rightNodes: [
          { id: "realdata", label: "Real-Dataset Investigation" },
          { id: "prototyping", label: "Rapid Prototyping" },
          { id: "hackathon", label: "Hackathon Execution" },
          { id: "docs", label: "Clear Result Documentation" },
          { id: "delivery", label: "Self-Driven Delivery" },
        ],
      },
      {
        id: "exploring",
        tab: "CURRENTLY EXPLORING",
        title: "Currently Learning",
        description:
          "Expanding analytical depth with a strong applied focus on football performance metrics and aerodynamic simulation.",
        archLabel: "ACTIVE EXPLORATION RADAR",
        core: {
          id: "analysis",
          label: "Data Analysis",
          statusTitle: "Exploration Core",
          connected: [
            "Data Analysis",
            "Football Analytics",
            "Match & Player Metrics",
            "Panel Method Solver",
          ],
        },
        leftNodes: [
          {
            id: "football",
            label: "Football Analytics",
            links: ["sportsdata", "statviz", "pypandas"],
          },
          {
            id: "match",
            label: "Match & Tactical Analysis",
            links: ["sportsdata", "statviz"],
          },
          {
            id: "player",
            label: "Player Performance Metrics",
            links: ["pypandas", "statviz"],
          },
          {
            id: "panel",
            label: "Airfoil Panel Method",
            links: ["aerosim", "pypandas"],
          },
        ],
        rightNodes: [
          { id: "pypandas", label: "Python & Pandas" },
          { id: "sportsdata", label: "Match & Event Datasets" },
          { id: "statviz", label: "Performance Visualization" },
          { id: "aerosim", label: "Aerodynamic Simulation" },
        ],
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
  testimonials: {
    title: "Testimonials & Feedback",
    subtitle: "What mentors, teammates, and clients say about working with me.",
    items: [
      {
        id: "testimonial-1",
        name: "Dr. Ahmed Hassan",
        role: "Machine Learning Instructor & Academic Mentor",
        avatar: "",
        content:
          "Omar demonstrated an outstanding understanding of end-to-end data pipelines and classification modeling. His adult income prediction project achieved a 98% score thanks to rigorous data preprocessing, feature engineering, and thorough ROC-AUC evaluation.",
        rating: 5,
        project: "Adult Income Prediction Pipeline",
      },
      {
        id: "testimonial-2",
        name: "Kareem Mostafa",
        role: "Team Lead · Vortex-Gen Hackathon",
        avatar: "",
        content:
          "Working alongside Omar was a great experience. He rapidly implemented responsive simulation controls and integrated them with our aerodynamics engine under hackathon pressure, helping our team secure 3rd place.",
        rating: 5,
        project: "Vortex-Gen Aviation Simulator",
      },
      {
        id: "testimonial-3",
        name: "Sarah Al-Ghamdi",
        role: "Client & Brand Owner · Ber Store",
        avatar: "",
        content:
          "Omar delivered an exceptional Arabic-first online store with an intuitive admin dashboard and seamless WhatsApp ordering. His communication was prompt, calm, and highly professional throughout the project.",
        rating: 5,
        project: "Ber Store E-Commerce",
      },
    ],
  },
  footer: {
    intro:
      "Omar Ibrahim — Aviation Computers & Information student in Zagazig. Turning raw data into clear predictions through machine learning models built and tested on real datasets.",
    email: "imm5201978@gmail.com",
    whatsapp: "+201028570417",
    whatsappDisplay: "01028570417",
    copy: "Copy",
    copied: "Copied!",
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
    testimonials: "Testimonials",
  },
};

export default en;
