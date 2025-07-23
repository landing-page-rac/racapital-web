import React from 'react';
import Navbar from '../../landing/components/Navbar';
import { useLandingPageData } from '../../landing/hooks/useLandingPageData';
import { useEventsData } from '../hooks/useEventsData';
import ParallaxEventsList from './ParallaxEventsList';
import ContactSection from '@/shared/components/ui/ContactSection';
import Footer from '@/features/landing/components/Footer';

const EventsPage: React.FC = () => {
  const { navItems } = useLandingPageData();
  const { events } = useEventsData();

  console.log('Events data:', events);

  return (
    <div className="min-h-screen bg-white">
      <Navbar navItems={navItems} />
      <main className="pt-5">
        <ParallaxEventsList events={events} />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default EventsPage; 