export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  size?: "large" | "medium" | "small";
  accentColor?: "primary" | "secondary" | "tertiary";
}

export interface SkillCategory {
  name: string;
  icon: string;
  accentColor: "primary" | "secondary" | "tertiary";
  skills: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  isCurrent?: boolean;
  companyUrl?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  grade: string;
}

export interface Certification {
  title: string;
  url?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}
