import { v4 as uuidv4 } from 'uuid';

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  type: 'list' | 'paragraph';
  items: CustomSectionItem[];
}

export interface CustomSectionItem {
  id: string;
  title?: string;
  subtitle?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface ResumePage {
  id: string;
  pageNumber: number;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  customSections: CustomSection[];
}

export interface TemplateData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    imageUrl?: string;
  };
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  customSections: CustomSection[];
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    imageUrl?: string;
  };
  pages: ResumePage[];
}