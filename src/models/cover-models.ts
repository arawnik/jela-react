export interface Introduction {
  title: string;
  content: string;
  tagline: string;
  avatar: string; // URL for the avatar image
  small_avatar: string; // URL for the small avatar image
  pdf: string; // URL for the PDF file
}

export interface Company {
  name: string;
  description: string;
}

export interface Institution {
  name: string;
  department: string;
  description: string;
}

export interface Proficiency {
  name: string;
  description: string;
  scale: number;
  order: number;
}

export enum KeywordType {
  Language = 'LA', // Programming Language
  Skill = 'SK', // Skill
  Technology = 'TE', // Technology
}

export interface Keyword {
  name: string;
  type: KeywordType; // LANGUAGE, SKILL, or TECHNOLOGY
  proficiency: Proficiency;
  order: number;
  display: boolean;
}

export interface Experience {
  title: string;
  description: string;
  company: Company;
  keywords: Keyword[];
  start_date: string; // Date in string format
  end_date: string; // Date in string format or null
}

export interface Education {
  title: string;
  description: string;
  institution: Institution;
  start_date: string;
  end_date: string;
}
