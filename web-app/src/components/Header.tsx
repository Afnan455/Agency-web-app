"use client";
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector, toggleLanguage, setSearchOpen } from '@/lib/store';
import { strapiService, fallbackData } from '@/lib/strapi';
import SearchModal from './SearchModal';

export default function Header() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { language, direction } = useAppSelector(state => state.ui);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // ✅ Added mobile menu state
  
  // ✅ SAFE INITIALIZATION WITH FALLBACK SERVICES
  const [services, setServices] = useState(fallbackData?.services || []);

  const isServicePage = pathname?.startsWith('/services');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await strapiService.getServices();
        
        if (data && data.data && data.data.length > 0) {
          // Strapi has services data - use it
          setServices(data.data.map((service: any) => ({
            id: service.id,
            title: service.attributes?.title || service.title,
            slug: service.attributes?.slug || service.slug,
          })));
        } else {
          // Strapi is empty - use fallback services
          setServices(fallbackData?.services || []);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        //  Always fall back to fallback data on error
        setServices(fallbackData?.services || []);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', language);
  }, [language, direction, i18n]);

  // ✅ Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Navbar */}

<header 
  className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
    isServicePage ? 'bg-[#4B2615] backdrop-blur-md border-b border-white/10' : ''
  }`} 
  dir={direction}
>


        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo - Show only on service pages */}
            <div className="flex items-center">
              {isServicePage && (
                <Link href="/" className="flex items-center">
                  <img 
                    src="/arabic-logo.png" 
                    alt="Company Logo" 
                    className="h-10 w-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </Link>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-white/80 text-[15px] font-medium transition-colors">
                {t('nav.home')}
              </Link>
              <Link href="/about" className="text-white hover:text-white/80 text-[15px] font-medium transition-colors">
                {t('nav.about')}
              </Link>
              
              {/* Services Button */}
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="text-white hover:text-white/80 text-[15px] font-medium transition-colors flex items-center space-x-1"
              >
                <span>{t('nav.services')}</span>
                <svg className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <Link href="/blog" className="text-white hover:text-white/80 text-[15px] font-medium transition-colors">
                {t('nav.blog')}
              </Link>
              <Link href="#team" className="text-white hover:text-white/80 text-[15px] font-medium transition-colors">
                {t('nav.team')}
              </Link>
              <Link href="/contact" className="text-white hover:text-white/80 text-[15px] font-medium transition-colors">
                {t('nav.contact')}
              </Link>
            </nav>

            {/* Right Side Actions - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <button 
                onClick={() => dispatch(setSearchOpen(true))}
                className="text-white hover:text-white/80 p-2 rounded-full hover:bg-white/10 transition-all"
                aria-label="Search"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>

              <button 
                onClick={() => dispatch(toggleLanguage())}
                className="text-white hover:text-white/80 px-3 py-2 rounded-lg border border-white/20 text-sm font-medium transition-all"
              >
                {language.toUpperCase()}
              </button>

              <Link 
                href="/book-appointment"
                className="bg-white text-[#4B2615] px-6 py-3 rounded-lg text-[14px] font-semibold hover:bg-gray-100 transition-all shadow-lg"
              >
                {t('nav.book')}
              </Link>
            </div>

            {/* ✅ Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              {/* Mobile Search Button */}
              <button 
                onClick={() => dispatch(setSearchOpen(true))}
                className="text-white hover:text-white/80 p-2 rounded-full hover:bg-white/10 transition-all"
                aria-label="Search"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>

              {/* Mobile Language Toggle */}
              <button 
                onClick={() => dispatch(toggleLanguage())}
                className="text-white hover:text-white/80 px-2 py-1 rounded border border-white/20 text-xs font-medium transition-all"
              >
                {language.toUpperCase()}
              </button>

              {/* Hamburger Menu Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors ml-2"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* ✅ Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-[#4B2615] border-t border-white/10 shadow-xl">
              <nav className="px-6 py-4 space-y-4">
                <Link 
                  href="/" 
                  className="block text-white hover:text-white/80 text-[15px] font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.home')}
                </Link>
                <Link 
                  href="/about" 
                  className="block text-white hover:text-white/80 text-[15px] font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.about')}
                </Link>
                <button 
                  onClick={() => {
                    setIsServicesOpen(!isServicesOpen);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-white hover:text-white/80 text-[15px] font-medium transition-colors py-2 flex items-center justify-between"
                >
                  <span>{t('nav.services')}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <Link 
                  href="/blog" 
                  className="block text-white hover:text-white/80 text-[15px] font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.blog')}
                </Link>
                <Link 
                  href="#team" 
                  className="block text-white hover:text-white/80 text-[15px] font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.team')}
                </Link>
                <Link 
                  href="/contact" 
                  className="block text-white hover:text-white/80 text-[15px] font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.contact')}
                </Link>
                
                {/* Mobile Book Appointment Button */}
                <div className="pt-4 border-t border-white/20">
                  <Link 
                    href="/book-appointment"
                    className="block bg-white text-[#4B2615] px-4 py-3 rounded-lg text-[14px] font-semibold hover:bg-gray-100 transition-all text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('nav.book')}
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Half Screen Brown Services Dropdown */}
      {isServicesOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsServicesOpen(false)}
          />
          
          <div 
            className="fixed top-0 left-0 right-0 z-50 bg-[#4B2615] overflow-y-auto rounded-b-3xl shadow-2xl" 
            style={{ height: '50vh' }}
          >
            <div className="h-full">
              
              {/* Header with Arabic Logo */}
              <div className="flex items-center justify-between p-8 border-b border-white/20">
                <div className="flex items-center">
                  <img 
                    src="/arabic-logo.png" 
                    alt="Arabic Logo" 
                    className="h-16 w-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <button 
                  onClick={() => setIsServicesOpen(false)}
                  className="text-white hover:text-white/80 p-2 rounded-full hover:bg-white/10 transition-all"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Services List */}
              <div className="p-8 overflow-y-auto" style={{ height: 'calc(50vh - 120px)' }}>
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    {direction === 'rtl' ? 'خدماتنا القانونية' : 'Our Legal Services'}
                  </h2>
                  
                  <div className="space-y-1">
                    {/* ✅ SAFE RENDERING WITH PROPER FALLBACK */}
                    {services && services.length > 0 ? (
                      services.map((service) => (
                        <Link 
                          key={service.id}
                          href={`/services/${service.slug}`}
                          className="block px-6 py-4 text-white hover:bg-white/10 transition-all duration-200 rounded-lg group border-b border-white/5 last:border-b-0"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-medium group-hover:text-white/90">
                              {service.title}
                            </span>
                            <svg 
                              className={`w-5 h-5 text-white/50 group-hover:text-white/80 transition-colors ${direction === 'rtl' ? 'rotate-180' : ''}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="text-center text-white/70 py-8">
                        {direction === 'rtl' ? 'لا توجد خدمات متاحة' : 'No services available'}
                      </div>
                    )}
                  </div>

                  {/* ✅ Featured Legal Consultation Service */}
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <Link 
                      href="/services/legal-consultation"
                      className="block text-center bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-all duration-300 group"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white/90">
                        {direction === 'rtl' ? 'خدمات الاستشارات القانونية' : 'Legal Consultation Services'}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {direction === 'rtl' 
                          ? 'خدمات استشارية قانونية شاملة للأفراد والشركات' 
                          : 'Comprehensive legal advisory services for individuals and businesses'
                        }
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      <SearchModal />
    </>
  );
}
