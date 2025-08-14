import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About us',
        services: 'Services',
        blog: 'Blog',
        team: 'Our Team',
        contact: 'Contact us',
        book: 'Book Appointment',
      },
      hero: {
        title1: 'Professional Legal Excellence',
        description1: 'Leading legal consultation services providing comprehensive support for individuals and businesses across all legal matters.',
        title2: 'Expert Legal Consultation',
        description2: 'Decades of experience in corporate law, litigation, and legal advisory services with proven track record.',
        title3: 'Comprehensive Legal Services',
        description3: 'Specialized legal expertise covering all aspects of business and personal legal requirements.',
        readMore: 'Read More',
      },
      team: {
        title: 'Our Team',
        subtitle: 'Meet our experienced legal professionals who are dedicated to providing exceptional service and expertise in all areas of law.',
      },
      clients: {
        title: 'What our clients are saying',
        subtitle: 'Discover how we have helped our clients achieve their legal goals with professional excellence and dedication.',
      },
      footer: {
        subscribe: 'Subscribe',
        subscribePlaceholder: 'Enter your email',
        subscribeSuccess: 'Thank you for subscribing!',
        subscribeError: 'Email already subscribed',
        copyright: '© 2024 . All rights reserved.',
      },
      search: {
        placeholder: 'Search services, team members...',
        results: 'Search Results',
        team: 'Team Members',
        services: 'Services',
        noResults: 'No results found',
      },
    }
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        about: 'من نحن',
        services: 'الخدمات',
        blog: 'المدونة',
        team: 'فريقنا',
        contact: 'اتصل بنا',
        book: 'حجز موعد',
      },
      hero: {
        title1: 'التميز القانوني المهني',
        description1: 'خدمات الاستشارات القانونية الرائدة التي تقدم الدعم الشامل للأفراد والشركات في جميع الأمور القانونية.',
        title2: 'استشارات قانونية متخصصة',
        description2: 'عقود من الخبرة في القانون التجاري والتقاضي وخدمات الاستشارات القانونية مع سجل حافل بالنجاحات.',
        title3: 'خدمات قانونية شاملة',
        description3: 'خبرة قانونية متخصصة تغطي جميع جوانب المتطلبات القانونية للأعمال والأفراد.',
        readMore: 'اقرأ المزيد',
      },
      team: {
        title: 'فريقنا',
        subtitle: 'تعرف على فريق المحامين المتخصصين لدينا الذين يكرسون جهودهم لتقديم خدمات استثنائية وخبرة في جميع مجالات القانون.',
      },
      clients: {
        title: 'ماذا يقول عملاؤنا',
        subtitle: 'اكتشف كيف ساعدنا عملاءنا في تحقيق أهدافهم القانونية بامتياز وتفانٍ مهني.',
      },
      footer: {
        subscribe: 'اشتراك',
        subscribePlaceholder: 'أدخل بريدك الإلكتروني',
        subscribeSuccess: 'شكراً لك على الاشتراك!',
        subscribeError: 'البريد الإلكتروني مشترك مسبقاً',
        copyright: '© 2024 . جميع الحقوق محفوظة.',
      },
      search: {
        placeholder: 'البحث عن الخدمات، أعضاء الفريق...',
        results: 'نتائج البحث',
        team: 'أعضاء الفريق',
        services: 'الخدمات',
        noResults: 'لم يتم العثور على نتائج',
      },
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
