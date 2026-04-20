import type { Project, SkillCategory, Experience, Education, Certification } from "../types";

export const PERSONAL = {
  name: "Jay Rathod",
  title: "Senior Software Engineer",
  taglines: [
    "AI Engineer | RAG | Vector Databases",
    "Building Intelligent Systems at Scale",
    "MLOps | Azure | FastAPI | PyTorch",
  ],
  headline: "Building Intelligent Systems",
  bio: [
    "With 5+ years of experience across ML research and production engineering, I specialize in turning raw data into actionable intelligence. From fine-tuning large language models to deploying end-to-end MLOps pipelines, I bridge the gap between cutting-edge AI research and enterprise-grade software.",
    "Currently a Senior Software Developer at Techabbot, I engineer SQL Agents, RAG architectures, and resilient automation systems - all deployed on Azure at scale. Previously, I trained 10,000+ students and 500+ faculty on Generative AI and ML as a Consultant/Master Trainer at Edunet Foundation.",
  ],
  location: "Ahmedabad, Gujarat, India",
  email: "rathodjay3497@gmail.com",
  phone: "+91-7016915420",
  github: "https://github.com/JayRathod341997",
  linkedin: "https://www.linkedin.com/in/rathodjay3497/",
  hackerrank: "https://www.hackerrank.com/rathodjay4397",
};

export const PROJECTS: Project[] = [
  {
    id: "sql-agent",
    title: "NL-to-SQL Agent",
    description:
      "Engineered an enterprise SQL Agent enabling users to interact with multiple databases using natural language. Leverages NLP and LLMs to generate accurate, secure SQL queries at scale - deployed on Azure OpenAI, Azure ML, and Azure App Service.",
    techStack: ["Azure OpenAI", "LangChain", "FastAPI", "Azure ML", "Python"],
    githubUrl: undefined,
    liveUrl: undefined,
    featured: true,
    size: "large",
    accentColor: "primary",
  },
  {
    id: "mlops-hotel",
    title: "Hotel Booking Cancellation Predictor",
    description:
      "Production-grade end-to-end MLOps pipeline predicting hotel booking cancellations. Automated full ML lifecycle: data ingestion, feature engineering, training, evaluation, and versioned artifact management with CI/CD.",
    techStack: ["Python", "Scikit-learn", "Jenkins", "Docker", "MLflow", "Azure"],
    githubUrl: undefined,
    liveUrl: undefined,
    featured: true,
    size: "medium",
    accentColor: "secondary",
  },
  {
    id: "ai-nutrition",
    title: "AI Nutrition App",
    description:
      "Personalized AI meal recommendation system integrating OpenAI and Ollama. Generates 7-day plans based on 20+ health parameters, auto-detects 150+ allergen conflicts via image analysis, and supports 30+ regional cuisines.",
    techStack: ["LangChain", "RAG", "OpenAI", "Ollama", "Python"],
    githubUrl: undefined,
    liveUrl: undefined,
    featured: true,
    size: "medium",
    accentColor: "tertiary",
  },
  {
    id: "mindpulse",
    title: "MindPulse - Mental Health Insights",
    description:
      "AI-powered mental health diagnosis system combining Brain MRI-based tumor detection (CNNs) with NLP sentiment analysis to provide personalized mental health insights.",
    techStack: ["Deep Learning", "NLP", "PyTorch", "Streamlit", "Python"],
    githubUrl: undefined,
    liveUrl: undefined,
    featured: false,
    size: "small",
    accentColor: "primary",
  },
  {
    id: "anomaly-video",
    title: "Video Anomaly Detection",
    description:
      "ML model for detecting anomalies in multivariate video streams using computer vision. Optimized for scalability with real-time analysis and minimal false positives.",
    techStack: ["Python", "Computer Vision", "OpenCV", "Machine Learning"],
    githubUrl: undefined,
    liveUrl: undefined,
    featured: false,
    size: "small",
    accentColor: "secondary",
  },
  {
    id: "browser-automation",
    title: "Resilient Browser Automation",
    description:
      "Auto-healing browser automation system with self-repairing CSS selectors and XPath expressions, significantly reducing maintenance overhead and increasing web scraping success rates.",
    techStack: ["Python", "Selenium", "NLP", "ML", "Azure"],
    githubUrl: undefined,
    liveUrl: undefined,
    featured: false,
    size: "small",
    accentColor: "tertiary",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "AI / ML",
    icon: "model_training",
    accentColor: "primary",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Hugging Face",
      "MLflow",
      "Deep Learning",
      "NLP"
    ],
  },
  {
    name: "AI Engineering",
    icon: "database",
    accentColor: "secondary",
    skills: [
      "LangChain",
      "LangGraph",
      "Azure OpenAI",
      "ChromaDB",
      "Pinecone",
      "Prompt Engineering",
      "RAG Architectures",
    ],
  },
  {
    name: "Backend & APIs",
    icon: "code",
    accentColor: "tertiary",
    skills: [
      "FastAPI",
      "Python",
      "NodeJs",
      "PostgreSQL",
      "MongoDB",
      "ReactJS"
    ],
  },
  {
    name: "Cloud & MLOps",
    icon: "cloud_done",
    accentColor: "primary",
    skills: [
      "Azure AI Studio",
      "AWS Sagemaker",
      "Azure DevOps",
      "Docker",
      "CI/CD Pipelines",
      "MLOps Pipelines",
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: "techabbot",
    company: "TechAbbot",
    role: "Senior Software Developer",
    period: "Nov 2025 - Present",
    location: "Ahmedabad, India",
    companyUrl: "https://techabbot.com/",
    isCurrent: true,
    description: [
      "Engineered an SQL Agent enabling users to interact with multiple databases using natural language, leveraging NLP and LLMs, deployed on Azure OpenAI, Azure ML, and Azure App Service.",
      "Implemented a resilient browser automation system with auto-healing capabilities for CSS selectors and XPath, reducing maintenance overhead and increasing web scraping success rates.",
    ],
  },
  {
    id: "edunet",
    company: "Edunet Foundation - Microsoft, IBM & SAP",
    role: "Consultant / AI Master Trainer",
    period: "Oct 2023 - Nov 2025",
    location: "Delhi, India",
    companyUrl: "https://edunetfoundation.org/",
    description: [
      "Fine-tuned large language models using hyperparameter optimization and advanced training techniques; deployed using Azure ML, Azure AI Studio, and Azure DevOps pipelines.",
      "Delivered hands-on training programs on ML, Generative AI, NLP, and ReactJS leveraging Microsoft Azure services in collaboration with Microsoft, TCS, and SAP.",
      "Delivered training in Machine Learning, Deep Learning, and AI to 10,000+ students and 500+ faculty across academic and enterprise settings.",
    ],
  },
  {
    id: "measureone",
    company: "MeasureOne",
    role: "Software Engineer",
    period: "Mar 2022 - Oct 2023",
    location: "Ahmedabad, India",
    companyUrl: "https://www.measureone.com/",
    description: [
      "Designed and maintained scalable data pipelines, optimized ML models, and implemented end-to-end MLOps workflows for reliable cloud deployment.",
      "Reduced API response time through query optimization, caching, and efficient request handling.",
      "Engineered automated data scraping and ingestion scripts, streamlining data collection for analytics and modeling.",
    ],
  },
  {
    id: "ltimindtree",
    company: "LTIMindtree",
    role: "Software Engineer",
    period: "Aug 2020 - Mar 2022",
    location: "Mumbai, India",
    companyUrl: "https://www.ltimindtree.com/",
    description: [
      "Monitored applications using AppDynamics, identifying performance bottlenecks and optimizing efficiency.",
      "Implemented rigorous testing strategies for regression models, ensuring accuracy, bias reduction, and performance improvements.",
    ],
  },
  {
    id: "toshiba",
    company: "TOSHIBA",
    role: "Machine Learning Intern",
    period: "2019 - 2020",
    location: "Bengaluru, India",
    companyUrl: "https://toshiba-india.com/",
    description: [
      "Developed key modules for Wave Clustering, enabling efficient pattern recognition in time-series waveforms.",
      "Designed and implemented an algorithm to detect anomalies in uni-variate waveforms from power grid systems.",
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    institution: "Indian Institute of Technology, Tirupati",
    degree: "M.Tech CSE",
    period: "2018 - 2020",
    location: "Tirupati, India",
    grade: "8.63 / 10",
  },
  {
    institution: "G.H.Patel College of Engineering and Technology",
    degree: "B.E. Computer Engineering",
    period: "2014 - 2018",
    location: "Anand, India",
    grade: "8.69 / 10",
  },
];

export const CERTIFICATIONS: Certification[] = [
  { title: "ReactJS & Redux", url: undefined },
  {
    title: "Programming for Everybody",
    url: "https://coursera.org/share/f2d22aac5fc916148e0dd4397fb25805",
  },
  {
    title: "Git and GitHub",
    url: "https://coursera.org/share/89dc67e456ae63a6bb82d13944329d44",
  },
  { title: "AWS Cloud Technical", url: undefined },
  {
    title: "Machine Learning with Python",
    url: "https://coursera.org/share/f0c8124625495a812465bc7393917815",
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
