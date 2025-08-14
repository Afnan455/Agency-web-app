export interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  socials: {
    whatsapp?: string;
    phone?: string;
    email?: string;
  };
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  description?: string;
  content?: string;
}

export interface HeroSlide {
  id: number;
  title: string;
  description: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  profileImage: string;
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  position: string;
  company?: string;
  image: string;
}

export interface Language {
  code: 'en' | 'ar';
  name: string;
  dir: 'ltr' | 'rtl';
}

export interface SearchResults {
  team: TeamMember[];
  services: Service[];
}

export interface UIState {
  language: 'en' | 'ar';
  direction: 'ltr' | 'rtl';
  searchOpen: boolean;
  searchQuery: string;
  searchResults: SearchResults;
  isLoading: boolean;
  formStates: {
    subscriptionEmail: string;
    subscriptionStatus: 'idle' | 'loading' | 'success' | 'error';
    subscriptionMessage: string;
  };
}
