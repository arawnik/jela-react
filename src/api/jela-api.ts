import { Project } from '@/models/project';
import { ContactForm } from '@/models/contact-form';
import { CoverInfo } from '@/models/cover-info';

const API_BASE_URL = 'http://localhost:8000/api';

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
}

/*export class JelaApi {
  // Fetch the frontpage cover data
  static async getFrontpageData(): Promise<CoverInfo> {
    const res = await fetch(`${API_BASE_URL}/frontpage`);
    if (!res.ok) {
      throw new Error('Failed to fetch frontpage data');
    }
    const data: CoverInfo = await res.json();
    return data;
  }

  // Fetch the projects data
  static async getProjects(): Promise<Project[]> {
    const res = await fetch(`${API_BASE_URL}/projects`);
    if (!res.ok) {
      throw new Error('Failed to fetch projects');
    }
    const data: Project[] = await res.json();
    return data;
  }

  // Submit contact form data
  static async submitContactForm(formData: ContactForm): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error('Failed to submit contact form');
    }
  }
}*/
