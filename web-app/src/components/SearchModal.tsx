"use client";
import { useState, useEffect, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector, setSearchOpen, setSearchQuery, setSearchResults } from '@/lib/store';
import { strapiService, fallbackData } from '@/lib/strapi';
import LoadingSpinner from './LoadingSpinner';

export default function SearchModal() {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { searchOpen, searchQuery, searchResults, direction } = useAppSelector(state => state.ui);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      dispatch(setSearchResults({ team: [], services: [] }));
      return;
    }

    setLoading(true);
    dispatch(setSearchQuery(query));

    try {
      const results = await strapiService.searchContent(query);
      
      if (results) {
        dispatch(setSearchResults({
          team: results.data.team || [],
          services: results.data.services || [],
        }));
      } else {
        // Fallback to local search
        const teamResults = fallbackData.teamMembers.filter(member =>
          member.name.toLowerCase().includes(query.toLowerCase()) ||
          member.position.toLowerCase().includes(query.toLowerCase())
        );

        const serviceResults = fallbackData.services.filter(service =>
          service.title.toLowerCase().includes(query.toLowerCase())
        );

        dispatch(setSearchResults({ team: teamResults, services: serviceResults }));
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search form submission - redirect to search page
  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      dispatch(setSearchOpen(false));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOpen) {
        dispatch(setSearchOpen(false));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, dispatch]);

  if (!searchOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-24" 
      dir={direction}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          dispatch(setSearchOpen(false));
        }
      }}
    >
      <div className="w-full max-w-2xl bg-[#4B2615] rounded-lg shadow-xl mx-4">
        <div className="p-6">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
              placeholder={t('search.placeholder')}
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white/40"
              autoFocus
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-white text-[#4B2615] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Search
            </button>
            <button 
              type="button"
              onClick={() => dispatch(setSearchOpen(false))}
              className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close search"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </form>
          
          {/* Quick Preview Results */}
          {loading && (
            <div className="py-8">
              <LoadingSpinner />
            </div>
          )}

          {searchQuery && !loading && (
            <div className="text-white">
              <h3 className="text-lg font-semibold mb-4">{t('search.results')} (Quick Preview)</h3>
              
              {searchResults.services.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2 text-white/80">{t('search.services')}</h4>
                  <div className="space-y-2">
                    {searchResults.services.slice(0, 3).map((service: any) => (
                      <div
                        key={service.id}
                        className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                        onClick={() => {
                          router.push(`/services/${service.slug}`);
                          dispatch(setSearchOpen(false));
                        }}
                      >
                        {service.title}
                      </div>
                    ))}
                    {searchResults.services.length > 3 && (
                      <div className="text-white/60 text-sm px-3">
                        +{searchResults.services.length - 3} more services
                      </div>
                    )}
                  </div>
                </div>
              )}

              {searchResults.team.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2 text-white/80">{t('search.team')}</h4>
                  <div className="space-y-2">
                    {searchResults.team.slice(0, 3).map((member: any) => (
                      <div key={member.id} className="p-3 bg-white/10 rounded-lg">
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-white/70">{member.position}</div>
                      </div>
                    ))}
                    {searchResults.team.length > 3 && (
                      <div className="text-white/60 text-sm px-3">
                        +{searchResults.team.length - 3} more team members
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* View All Results Button */}
              {(searchResults.services.length > 0 || searchResults.team.length > 0) && (
                <div className="text-center mt-6 pt-4 border-t border-white/20">
                  <button
                    onClick={handleSearchSubmit}
                    className="bg-white text-[#4B2615] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    View All Results ({searchResults.services.length + searchResults.team.length})
                  </button>
                </div>
              )}

              {searchResults.services.length === 0 && searchResults.team.length === 0 && (
                <p className="text-white/70 text-center py-8">{t('search.noResults')}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
