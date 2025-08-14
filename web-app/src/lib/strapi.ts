const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

const IMAGE_URLS = {
  heroBackgrounds: [
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1920&h=1080&fit=crop',
  ],
  profiles: [
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&face=center',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&face=center',
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=500&fit=crop&face=center',
  ],
};

class StrapiService {
  private baseURL: string;

  constructor() {
    this.baseURL = `${STRAPI_URL}/api`;
  }

  async get<T>(endpoint: string, params?: Record<string, any>) {
    try {
      const url = new URL(`${this.baseURL}${endpoint}`);
      if (params) {
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      }


      const response = await fetch(url.toString(), {
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        cache: 'no-store'
      });


      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(`API Error: ${response.status} - ${response.statusText}`, errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Strapi fetch error:', { endpoint, error });
      return null;
    }
  }

  async post<T>(endpoint: string, data: any) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
        cache: 'no-store'
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Strapi post error:', error);
      return null;
    }
  }

  // ✅ CORRECT API ENDPOINTS
  async getHeroSlides() { 
    return this.get('/hero-slides?populate=*'); 
  }
  
  async getTeamMembers() { 
    return this.get('/team-members?populate=*'); 
  }
  
  async getServices() { 
    return this.get('/legal-services?populate=*'); 
  }
  
  async getTestimonials() { 
    return this.get('/client-testimonials?populate=*'); 
  }
  
  async subscribeEmail(email: string) { 
    return this.post('/subscribers', { email }); 
  }
  
  async searchContent(query: string) { 
    return this.get('/search', { q: query }); 
  }
}

export const strapiService = new StrapiService();

// ✅ UPDATED FALLBACK DATA WITH TRANSLATION KEYS
export const fallbackData = {
  heroSlides: [
    {
      id: 1,
      titleKey: 'hero.title1',
      descriptionKey: 'hero.description1',
      backgroundVideo: '/videos/office.mp4',
      profileImage: IMAGE_URLS.profiles[0],
    },
    {
      id: 2,
      titleKey: 'hero.title2',
      descriptionKey: 'hero.description2',
      backgroundImage: IMAGE_URLS.heroBackgrounds[1],
      backgroundVideo: null,
      profileImage: IMAGE_URLS.profiles[1],
    },
    {
      id: 3,
      titleKey: 'hero.title3',
      descriptionKey: 'hero.description3',
      backgroundImage: IMAGE_URLS.heroBackgrounds[2],
      backgroundVideo: null,
      profileImage: IMAGE_URLS.profiles[2],
    }
  ],
  
  teamMembers: [
    {
      id: 1,
      name: 'Ahmed Al-Rashid',
      position: 'Senior Legal Consultant',
      image: IMAGE_URLS.profiles[0],
      socials: { 
        whatsapp: 'https://wa.me/1234567890', 
        phone: 'tel:+1234567890', 
        email: 'mailto:ahmed@legalfirm.com' 
      },
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'Corporate Law Specialist',
      image: IMAGE_URLS.profiles[1],
      socials: { 
        whatsapp: 'https://wa.me/1234567891', 
        phone: 'tel:+1234567891', 
        email: 'mailto:sarah@legalfirm.com' 
      },
    },
    {
      id: 3,
      name: 'Mohammed Hassan',
      position: 'Litigation Attorney',
      image: IMAGE_URLS.profiles[2],
      socials: { 
        whatsapp: 'https://wa.me/1234567892', 
        phone: 'tel:+1234567892', 
        email: 'mailto:mohammed@legalfirm.com' 
      },
    },
  ],
  
  testimonials: [
    {
      id: 1,
      text: 'With the help of the hospitable staff of Al Safar and Partners I was able to get my work done without any hassle. The help I received helped me a great deal to overcome the issues that I faced. I was always updated about my case and my queries never went unanswered.',
      author: 'Mohammed Saif',
      position: 'CEO',
      company: 'Tech Solutions Ltd',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&face=center',
    },
  ],
  
  services: [
    { id: 1, title: 'Legal Consultation Services', slug: 'legal-consultation' },
    { id: 2, title: 'Foreign Investment Services', slug: 'foreign-investment' },
    { id: 3, title: 'Contracts', slug: 'contracts' },
    { id: 4, title: 'Notarization', slug: 'notarization' },
    { id: 5, title: 'Insurance', slug: 'insurance' },
    { id: 6, title: 'Banks and Financial Institutions', slug: 'banking' },
    { id: 7, title: 'Corporate Governance Services', slug: 'corporate-governance' },
    { id: 8, title: 'Companies Liquidation', slug: 'liquidation' },
  ],
};

export { IMAGE_URLS };
