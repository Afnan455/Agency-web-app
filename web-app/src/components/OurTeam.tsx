"use client";
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/lib/store';
import { strapiService, fallbackData } from '@/lib/strapi';
import Image from 'next/image';

// Remove this line:
// import { ChevronLeft, ChevronRight, MapPin, Mail, Phone } from 'lucide-react';

export default function OurTeam() {
  const { t } = useTranslation();
  const { direction } = useAppSelector(state => state.ui);
  const [members, setMembers] = useState(fallbackData.teamMembers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const data = await strapiService.getTeamMembers();
        
        if (data && data.data && data.data.length > 0) {
          setMembers(data.data.map((member: any) => ({
            id: member.id,
            name: member.attributes?.name || member.name,
            position: member.attributes?.position || member.position,
            image: member.attributes?.imageUrl || member.imageUrl || fallbackData.teamMembers[0].image,
            socials: {
              whatsapp: member.attributes?.whatsapp || member.whatsapp || '#',
              phone: member.attributes?.phone || member.phone || '#',
              email: member.attributes?.email || member.email || '#'
            }
          })));
        } else {
          setMembers(fallbackData.teamMembers);
        }
      } catch (error) {
        console.error('Error fetching team data:', error);
        setMembers(fallbackData.teamMembers);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeamData();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-100 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#4B2615] border-t-transparent"></div>
      </section>
    );
  }

  return (
    <section id="team" className="py-20 bg-gray-100" dir={direction}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#4B2615] mb-6">
            {t('team.title')}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            {t('team.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div key={member.id} className="bg-[#643F2E] rounded-2xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/5] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={375}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                  {/* WhatsApp Icon - Inline SVG */}
                  <a 
                    href={member.socials.whatsapp} 
                    className="text-white/80 hover:text-green-400 transition-colors duration-200"
                    aria-label={`${member.name} WhatsApp`}
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
                    </svg>
                  </a>
                  
                  {/* Phone Icon - Inline SVG */}
                  <a 
                    href={member.socials.phone} 
                    className="text-white/80 hover:text-blue-400 transition-colors duration-200"
                    aria-label={`${member.name} Phone`}
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </a>
                  
                  {/* Email Icon - Inline SVG */}
                  <a 
                    href={member.socials.email} 
                    className="text-white/80 hover:text-red-400 transition-colors duration-200"
                    aria-label={`${member.name} Email`}
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
