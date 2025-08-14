'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useAppSelector } from '@/lib/hooks';

interface Testimonial {
  id: number;
  clientName: {
    en: string;
    ar: string;
  };
  company: {
    en: string;
    ar: string;
  };
  role: {
    en: string;
    ar: string;
  };
  content: {
    en: string;
    ar: string;
  };
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    clientName: {
      en: 'Abdullah Al-Saud',
      ar: 'عبدالله آل سعود'
    },
    company: {
      en: 'Saudi Investment Bank',
      ar: 'بنك الاستثمار السعودي'
    },
    role: {
      en: 'CEO',
      ar: 'الرئيس التنفيذي'
    },
    content: {
      en: 'The legal expertise and professional approach of Mohammed Bin Abdulaziz Al-Ajlan Law Firm have been instrumental in our business success. Their deep understanding of Saudi law and international business practices is exceptional.',
      ar: 'الخبرة القانونية والنهج المهني لمكتب محمد بن عبدالعزيز العجلان للمحاماة كانت أساسية في نجاح أعمالنا. فهمهم العميق للقانون السعودي وممارسات الأعمال الدولية استثنائي.'
    },
    rating: 5,
    image: '/images/portrait.jpg'
  },
  {
    id: 2,
    clientName: {
      en: 'Fatima Al-Zahra',
      ar: 'فاطمة الزهراء'
    },
    company: {
      en: 'Riyadh Real Estate',
      ar: 'العقارات الرياض'
    },
    role: {
      en: 'Managing Director',
      ar: 'المدير العام'
    },
    content: {
      en: 'Working with this law firm has been a game-changer for our real estate projects. Their attention to detail and strategic legal advice have protected our interests and ensured project success.',
      ar: 'العمل مع هذا المكتب القانوني كان نقطة تحول لمشاريعنا العقارية. اهتمامهم بالتفاصيل والنصائح القانونية الاستراتيجية حمت مصالحنا وضمنت نجاح المشروع.'
    },
    rating: 5,
    image: '/images/portrait.jpg'
  },
  {
    id: 3,
    clientName: {
      en: 'Khalid Al-Rashid',
      ar: 'خالد الرشيد'
    },
    company: {
      en: 'Gulf Trading Company',
      ar: 'شركة الخليج التجارية'
    },
    role: {
      en: 'General Manager',
      ar: 'المدير العام'
    },
    content: {
      en: 'The team\'s expertise in international business law has been invaluable for our cross-border operations. They provide clear, practical solutions to complex legal challenges.',
      ar: 'خبرة الفريق في قانون الأعمال الدولية كانت لا تقدر بثمن لعملياتنا عبر الحدود. يقدمون حلولاً واضحة وعملية للتحديات القانونية المعقدة.'
    },
    rating: 5,
    image: '/images/portrait.jpg'
  }
];

export default function ClientsTestimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { language, isRTL } = useAppSelector(state => state.language);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  const getCurrentText = (text: { en: string; ar: string }) => {
    return language === 'ar' ? text.ar : text.en;
  };

  return (
    <section className="py-20 bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-brown mb-4">
            {language === 'ar' ? 'آراء العملاء' : 'Client Testimonials'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'ماذا يقول عملاؤنا عن خدماتنا القانونية المتميزة'
              : 'What our clients say about our exceptional legal services'
            }
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-primary-brown text-white rounded-full hover:bg-secondary-brown transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-primary-brown text-white rounded-full hover:bg-secondary-brown transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          {/* Testimonial Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
              <div className="text-center">
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-primary-brown rounded-full flex items-center justify-center">
                    <Quote size={32} className="text-white" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, index) => (
                    <Star key={index} size={24} className="text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 italic">
                  "{getCurrentText(testimonials[currentTestimonial].content)}"
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={getCurrentText(testimonials[currentTestimonial].clientName)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg text-primary-brown">
                      {getCurrentText(testimonials[currentTestimonial].clientName)}
                    </div>
                    <div className="text-gray-600">
                      {getCurrentText(testimonials[currentTestimonial].role)} - {getCurrentText(testimonials[currentTestimonial].company)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-primary-brown' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Client Logos Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-primary-brown text-center mb-12">
            {language === 'ar' ? 'عملاؤنا المميزون' : 'Our Distinguished Clients'}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {/* Client Logo Placeholders */}
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 font-semibold text-sm">
                    {language === 'ar' ? 'شعار العميل' : 'Client Logo'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-primary-brown rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              {language === 'ar' ? 'استعد لنجاحك القانوني' : 'Ready for Your Legal Success?'}
            </h3>
            <p className="text-xl mb-8 opacity-90">
              {language === 'ar' 
                ? 'تواصل معنا اليوم للحصول على استشارة قانونية مجانية'
                : 'Contact us today for a free legal consultation'
              }
            </p>
            <button className="bg-white text-primary-brown px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {language === 'ar' ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
