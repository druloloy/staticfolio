export interface Meta {
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  siteImage: string;
  twitterHandle: string;
}

export interface Social {
  github: string;
  linkedin: string;
}

export interface Personal {
  name: string;
  nickname: string;
  title: string;
  roles: string[];
  location: string;
  email: string;
  website: string;
  tagline: string;
  bio: string;
  available: boolean;
  social: Social;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  type: string;
  location: string;
  period: string;
  current: boolean;
  summary: string;
  highlights: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string | null;
  repo: string | null;
  featured: boolean;
  placeholder: boolean;
}

export interface Award {
  title: string;
  org: string;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
}

export interface Portfolio {
  meta: Meta;
  personal: Personal;
  experience: Experience[];
  skills: Record<string, string[]>;
  projects: Project[];
  awards: Award[];
  education: Education[];
}
