'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/lib/store';
import { strapiService, fallbackData } from '@/lib/strapi';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchPage() {
  const { t } = useTranslation();
  const { direction } = useAppSelector(state => state.ui);
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState({ team: [], services: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) return;
      
      setLoading(true);
      try {
        // Search in team members
        const teamData = await strapiService.getTeamMembers();
        const teamResults = (teamData?.data || fallbackData.teamMembers).filter((member: any) =>
          member.name?.toLowerCase().includes(query.toLowerCase()) ||
          member.position?.toLowerCase().includes(query.toLowerCase())
        );

        // Search in services
        const servicesData = await strapiService.getServices();
        const serviceResults = (servicesData?.data || fallbackData.services).filter((service: any) =>
          service.title?.toLowerCase().includes(query.toLowerCase())
        );

        setResults({
          team: teamResults,
          services: serviceResults
        });
      } catch (error) {
        console.error('Search error:', error);
        setResults({ team: [], services: [] });
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  return (
    <div className="min-h-screen bg-white" dir={direction}>
      {/* Header Spacer */}
      <div className="pt-20">
        
        {/* Back Navigation */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center text-[#4B2615]/70 hover:text-[#4B2615] text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Search Results Content */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#4B2615] mb-4">
              {t('search.results')}
            </h1>
            <p className="text-xl text-[#4B2615]/70">
              Search results for: <span className="font-semibold">"{query}"</span>
            </p>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#4B2615] border-t-transparent"></div>
            </div>
          )}

          {!loading && (
            <>
              {/* Services Results */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-[#4B2615] mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t('search.services')} ({results.services.length})
                </h2>
                
                {results.services.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.services.map((service: any) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}`}
                        className="block p-6 bg-[#4B2615] rounded-lg hover:bg-[#5A2F1A] transition-all duration-300 group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white/90">
                              {service.title}
                            </h3>
                            <p className="text-white/70 text-sm">
                              Professional legal consultation services
                            </p>
                          </div>
                          <svg className="w-5 h-5 text-white/50 group-hover:text-white/80 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">{t('search.noResults')} for services</p>
                  </div>
                )}
              </section>

              {/* Team Results */}
              <section>
                <h2 className="text-2xl font-bold text-[#4B2615] mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {t('search.team')} ({results.team.length})
                </h2>
                
                {results.team.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {results.team.map((member: any) => (
                      <div key={member.id} className="bg-[#643F2E] rounded-2xl overflow-hidden shadow-lg">
                        <div className="aspect-[4/5] overflow-hidden">
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={300}
                            height={375}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="p-6 text-center">
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {member.name}
                          </h3>
                          <p className="text-white/80 text-sm mb-4">
                            {member.position}
                          </p>
                          <div className="flex justify-center space-x-4">
                            <a href={member.socials?.whatsapp} className="text-white/80 hover:text-green-400 transition-colors">
                              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
                              </svg>
                            </a>
                            <a href={member.socials?.phone} className="text-white/80 hover:text-blue-400 transition-colors">
                              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                              </svg>
                            </a>
                            <a href={member.socials?.email} className="text-white/80 hover:text-red-400 transition-colors">
                              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">{t('search.noResults')} for team members</p>
                  </div>
                )}
              </section>

              {/* No Results */}
              {results.team.length === 0 && results.services.length === 0 && !loading && (
                <div className="text-center py-16">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">{t('search.noResults')}</h3>
                  <p className="text-gray-500 mb-6">Try different keywords or browse our services directly</p>
                  <Link 
                    href="/"
                    className="inline-block bg-[#4B2615] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#5A2F1A] transition-colors"
                  >
                    Go Home
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
