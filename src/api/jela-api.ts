import { ContactForm } from '@/models/contact-form';
import { Education, Experience, Introduction, Keyword, KeywordType } from '@/models/cover-models';
import { i18n } from 'next-i18next';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export class JelaApi {
  // Helper function to handle GET requests with language header
  private static async fetchJson<T>(url: string): Promise<T> {
    const currentLanguage = i18n?.language || 'en';

    const response = await fetch(url, {
      headers: {
        'Accept-Language': currentLanguage,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}`);
    }
    return response.json();
  }

  // Helper function to handle POST requests with language header
  private static async fetchPostJson<T>(url: string, body: any): Promise<T> {
    const currentLanguage = i18n?.language || 'en';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': currentLanguage,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.errors) {
        throw errorData.errors;
      }

      throw { message: errorData.message || `Failed to post to ${url}` };
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

  // Submit Contact Form
  public static async submitContactForm(formData: ContactForm & { captchaToken: string }) {
    return JelaApi.fetchPostJson(`${API_BASE_URL}/contact/`, formData);
  }

  public static async getProjects() {
    throw new Error('Method not implemented.');
  }
}

export default JelaApi;
