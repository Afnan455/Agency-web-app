"use client";
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/lib/store';
import { Swiper, SwiperSlide } from 'swiper/react';
// ✅ CRITICAL: Import Autoplay from modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { strapiService, fallbackData, IMAGE_URLS } from '@/lib/strapi';
import Image from 'next/image';

// ✅ CRITICAL: Import required CSS files
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; // ← This is essential for autoplay

export default function Hero() {
  const { t } = useTranslation();
  const { direction, language } = useAppSelector(state => state.ui);
  const [slides, setSlides] = useState(fallbackData.heroSlides);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await strapiService.getHeroSlides();
        
        if (data && data.data && data.data.length > 0) {
          
          const processedSlides = data.data.map((slide: any, index: number) => ({
            id: slide.id || (index + 1),
            title: t(`hero.title${slide.id || (index + 1)}`),
            description: t(`hero.description${slide.id || (index + 1)}`),
            backgroundVideo: slide.attributes?.backgroundVideoUrl || slide.backgroundVideoUrl || null,
            backgroundImage: (slide.attributes?.backgroundVideoUrl || slide.backgroundVideoUrl) 
              ? null 
              : (slide.attributes?.backgroundImageUrl || slide.backgroundImageUrl || IMAGE_URLS.heroBackgrounds[index]),
            profileImage: slide.attributes?.profileImageUrl || slide.profileImageUrl || IMAGE_URLS.profiles[index],
          }));
          
          setSlides(processedSlides);
        } else {
          const translatedFallback = fallbackData.heroSlides.map((slide) => ({
            ...slide,
            title: t(slide.titleKey || `hero.title${slide.id}`),
            description: t(slide.descriptionKey || `hero.description${slide.id}`),
          }));
          setSlides(translatedFallback);
        }
      } catch (error) {
        const translatedFallback = fallbackData.heroSlides.map((slide) => ({
          ...slide,
          title: t(`hero.title${slide.id}`),
          description: t(`hero.description${slide.id}`),
        }));
        setSlides(translatedFallback);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHeroData();
  }, [t, language]);

  if (loading) {
    return (
      <section className="min-h-screen bg-[#4B2615] flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-white border-t-transparent"></div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden pt-20" dir={direction}>
      
      {/* Navigation Dots */}
      <div className={`absolute top-1/2 transform -translate-y-1/2 z-20 hidden lg:block ${direction === 'rtl' ? 'right-8' : 'left-8'}`}>
        <div className="flex flex-col space-y-4">
          {slides.map((_, i) => (
            <button 
              key={i} 
              className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/40 hover:bg-white/60'}`} 
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ✅ FIXED: Properly configured Swiper with autoplay */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // ✅ Include Autoplay module
        navigation
        pagination={{ clickable: true }}
        loop={true} // ✅ Enable loop for continuous autoplay
        autoplay={{
          delay: 5000, // ✅ 5 seconds between slides
          disableOnInteraction: false, // ✅ Continue autoplay after user interaction
          pauseOnMouseEnter: true, // ✅ Pause when hovering
        }}
        speed={800} // ✅ Smooth transition speed
        className="h-[calc(100vh-5rem)]"
        onAutoplayTimeLeft={(s, time, progress) => {
        }}
        onSlideChange={() => console.log('🎬 Slide changed')}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              
              {/* Video/Image Background */}
              {slide.backgroundVideo ? (
                <div className="absolute inset-0 w-full h-full">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: 'grayscale(100%) brightness(0.7)' }}
                    onError={(e) => {
                      (e.target as HTMLVideoElement).style.display = 'none';
                      const parent = (e.target as HTMLVideoElement).parentNode as HTMLElement;
                      if (parent) {
                        parent.style.background = 'linear-gradient(135deg, #4B2615 0%, #643F2E 100%)';
                      }
                    }}
                  >
                    <source src={slide.backgroundVideo} type="video/mp4" />
                    <source src={slide.backgroundVideo} type="video/webm" />
                  </video>
                </div>
              ) : (
                slide.backgroundImage && (
                  <Image
                    src={slide.backgroundImage}
                    alt="Hero background"
                    fill
                    className="object-cover"
                    style={{ filter: 'grayscale(100%) brightness(0.7)' }}
                    priority
                    unoptimized
                  />
                )
              )}

              {/* Gradient Overlay */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, rgba(75, 38, 21, 0.68) 0%, rgba(75, 38, 21, 0.28) 100%)'
                }}
              />

              {/* Content */}
              <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
                <div className={`grid lg:grid-cols-2 gap-12 xl:gap-20 items-center w-full ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                  
                  {/* Dynamic Text Content */}
                  <div className="text-white space-y-8">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg lg:text-xl xl:text-2xl text-white/90 leading-relaxed max-w-2xl">
                      {slide.description}
                    </p>
                    <button className="bg-white text-[#4B2615] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all shadow-xl">
                      {t('hero.readMore')}
                    </button>
                  </div>

                  {/* Profile Card */}
                  <div className="flex justify-center lg:justify-end">
                    <div className="w-80 h-96 lg:w-[400px] lg:h-[500px] bg-[#643F2E] rounded-2xl overflow-hidden shadow-2xl">
                      <Image 
                        src={slide.profileImage} 
                        alt="Professional portrait"
                        width={400}
                        height={500}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
