"use client";
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/lib/store';
import { strapiService, fallbackData } from '@/lib/strapi';
import Image from 'next/image';

export default function Clients() {
  const { t } = useTranslation();
  const { direction } = useAppSelector(state => state.ui);
  const [testimonials, setTestimonials] = useState(fallbackData.testimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchTestimonials = async () => {
    try {
      const data = await strapiService.getTestimonials();
      
      if (data && data.data && data.data.length > 0) {
        setTestimonials(data.data.map((testimonial: any) => ({
          id: testimonial.id,
          text: testimonial.attributes?.text || testimonial.text,
          author: testimonial.attributes?.author || testimonial.author,
          position: testimonial.attributes?.position || testimonial.position,
          company: testimonial.attributes?.company || testimonial.company,
          image: testimonial.attributes?.imageUrl || testimonial.imageUrl || fallbackData.testimonials[0].image,
        })));
      } else {
        setTestimonials(fallbackData.testimonials);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials(fallbackData.testimonials);
    } finally {
      setLoading(false);
    }
  };
  
  fetchTestimonials();
}, []);


  if (loading) {
    return (
      <section className="py-20 bg-[#4B2615] flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#4B2615]" dir={direction}>
      <div className="max-w-7xl mx-auto px-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className={`grid lg:grid-cols-[400px,1fr] gap-12 items-center ${direction === 'rtl' ? 'lg:grid-cols-[1fr,400px]' : ''}`}>
            
            {/* Client Image */}
            <div className={`flex justify-center ${direction === 'rtl' ? 'lg:order-2' : 'lg:order-1'}`}>
              <div className="w-[400px] h-[400px] bg-[#643F2E] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Testimonial Content */}
            <div className={`text-white space-y-6 ${direction === 'rtl' ? 'lg:order-1 text-right' : 'lg:order-2 text-left'}`}>
              <h2 className="text-4xl font-bold mb-6">
                {t('clients.title')}
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                {t('clients.subtitle')}
              </p>
              
              <blockquote className="text-white/95 text-xl leading-relaxed mb-8 relative">
                <div className={`text-6xl text-white/20 absolute -top-4 ${direction === 'rtl' ? '-right-2' : '-left-2'}`}>"</div>
                <p className="relative z-10">
                  {testimonial.text}
                </p>
              </blockquote>
              
              <div className="space-y-2">
                <h4 className="text-2xl font-bold">{testimonial.author}</h4>
                <p className="text-white/70 text-lg">{testimonial.position}{testimonial.company ? `, ${testimonial.company}` : ''}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
