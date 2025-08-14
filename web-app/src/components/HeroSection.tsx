'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppSelector } from '@/lib/hooks';

interface HeroSlide {
  id: number;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  image: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: {
      en: 'Legal Excellence',
      ar: 'التميز القانوني'
    },
    description: {
      en: 'Providing exceptional legal services with decades of experience in corporate law, litigation, and international business.',
      ar: 'نقدم خدمات قانونية استثنائية مع عقود من الخبرة في القانون التجاري والمرافعات والأعمال الدولية.'
    },
    image: '/images/riyadh-night.jpg'
  },
  {
    id: 2,
    title: {
      en: 'Trusted Partners',
      ar: 'شركاء موثوقون'
    },
    description: {
      en: 'Your trusted legal partner for all business and personal legal matters in Saudi Arabia and beyond.',
      ar: 'شريكك القانوني الموثوق لجميع المسائل القانونية التجارية والشخصية في المملكة العربية السعودية وما بعدها.'
    },
    image: '/images/riyadh-night.jpg'
  },
  {
    id: 3,
    title: {
      en: 'Vision 2030',
      ar: 'رؤية 2030'
    },
    description: {
      en: 'Supporting Saudi Arabia\'s Vision 2030 with comprehensive legal services for modern business needs.',
      ar: 'ندعم رؤية المملكة العربية السعودية 2030 من خلال خدمات قانونية شاملة لاحتياجات الأعمال الحديثة.'
    },
    image: '/images/riyadh-night.jpg'
  },
  {
    id: 4,
    title: {
      en: 'International Expertise',
      ar: 'الخبرة الدولية'
    },
    description: {
      en: 'Global legal expertise with deep understanding of Saudi Arabian law and international business practices.',
      ar: 'خبرة قانونية عالمية مع فهم عميق للقانون السعودي وممارسات الأعمال الدولية.'
    },
    image: '/images/riyadh-night.jpg'
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language, isRTL } = useAppSelector(state => state.language);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getCurrentText = (text: { en: string; ar: string }) => {
    return language === 'ar' ? text.ar : text.en;
  };

  return (
    <section className="relative h-screen flex items-center" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroSlides[currentSlide].image})`,
          }}
        >
          {/* Dark Brown Overlay - Reduced opacity to show the Riyadh night background */}
          <div className="absolute inset-0 bg-primary-brown/20"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            {/* Navigation Arrow */}
            <button 
              onClick={prevSlide}
              className="mb-8 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Main Content */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                {getCurrentText(heroSlides[currentSlide].title)}
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
                {getCurrentText(heroSlides[currentSlide].description)}
              </p>
              <button className="bg-white text-primary-brown px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {language === 'ar' ? 'اقرأ المزيد' : 'Read More'}
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex flex-col space-y-2 mt-8">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Content - Floating Portrait */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Portrait Container - Brown Rectangle */}
              <div className="w-80 h-96 bg-primary-brown rounded-lg relative overflow-hidden shadow-2xl">
                {/* Portrait Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-72 h-88 bg-secondary-brown rounded-lg flex items-center justify-center relative overflow-hidden">
                    {/* Actual Portrait Image */}
                    <img 
                      src="/images/portrait.jpg" 
                      alt={language === 'ar' ? 'صورة احترافية' : 'Professional Portrait'} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
