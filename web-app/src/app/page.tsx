'use client';
import { useAppSelector } from '@/lib/store';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import OurTeam from '@/components/OurTeam';
import Clients from '@/components/Clients';
import Footer from '@/components/Footer';

export default function HomePage() {
  const { direction } = useAppSelector(state => state.ui);
  
  return (
    <div dir={direction} className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <OurTeam />
        <Clients />
        {/* White gap between Clients and Footer */}
        <div className="white-gap"></div>
      </main>
      <Footer />
    </div>
  );
}
