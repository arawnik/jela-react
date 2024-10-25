import { ContactForm } from '@/models/contact-form';
import { Education, Experience, Introduction, Keyword, KeywordType } from '@/models/cover-models';

const API_BASE_URL = 'http://localhost:8083/api';
/*
export class JelaApi {
  // Return static frontpage data
  static async getFrontpageData(): Promise<CoverInfo> {
    return {
      title: 'John Doe - Software Developer',
      description: 'Building web applications with React, Django, and TypeScript',
      introduction: 'Intro Building web applications with React, Django, and TypeScript',
    };
  }

  // Return static projects data
  static async getProjects(): Promise<Project[]> {
    return [
      {
        id: 1,
        name: 'Portfolio Website',
        description: 'A personal portfolio website built with React and Django.',
        url: 'https://example.com/portfolio',
      },
      {
        id: 2,
        name: 'E-Commerce Platform',
        description: 'A full-stack e-commerce platform with user authentication and payment integration.',
        url: 'https://example.com/ecommerce',
      },
    ];
  }

  // Simulate form submission
  static async submitContactForm(formData: ContactForm): Promise<void> {
    console.log('Mock contact form submitted:', formData);
    // Here you can simulate a success response, no need for an actual HTTP request
  }
}*/

export class JelaApi {
  // Helper function to handle fetch requests and errors
  private static async fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}`);
    }
    return response.json();
  }

  // Fetch Introduction data
  public static async getIntroduction(): Promise<Introduction | null> {
    return JelaApi.fetchJson<Introduction>(`${API_BASE_URL}/introduction/`);
  }

  // Fetch Experiences data
  public static async getExperiences(): Promise<Experience[]> {
    return JelaApi.fetchJson<Experience[]>(`${API_BASE_URL}/experiences/`);
  }

  // Fetch Educations data
  public static async getEducations(): Promise<Education[]> {
    return JelaApi.fetchJson<Education[]>(`${API_BASE_URL}/educations/`);
  }

  // Fetch Keywords by type
  public static async getKeywords(type: KeywordType): Promise<Keyword[]> {
    return JelaApi.fetchJson<Keyword[]>(`${API_BASE_URL}/keywords/${type}/`);
  }

  public static async submitContactForm(formData: ContactForm) {
    throw new Error('Method not implemented.');
  }

  public static async getProjects() {
    throw new Error('Method not implemented.');
  }
}

export default JelaApi;
