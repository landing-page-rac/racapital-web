import React from 'react';
import Navbar from '../../landing/components/Navbar';
import { useLandingPageData } from '../../landing/hooks/useLandingPageData';
import { useInsightsData } from '../hooks/useInsightsData';
import InsightListCard from './InsightListCard';
import ContactSection from '@/shared/components/ui/ContactSection';
import Footer from '@/features/landing/components/Footer';

const InsightPage: React.FC = () => {
  const { navItems } = useLandingPageData();
  const { insights } = useInsightsData();

  console.log('Insights data:', insights);

  return (
    <div className="min-h-screen bg-white">
      <Navbar navItems={navItems} />
      <main className="pt-5">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-[#041E42] mb-6">
              Insights
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {insights && insights.length > 0 ? (
              insights.map((insight) => (
                <InsightListCard
                  key={insight.id}
                  image={insight.image}
                  title={insight.title}
                  linkText={insight.linkText}
                  linkHref={insight.linkHref}
                />
              ))
            ) : (
              <div className="text-center text-gray-600 col-span-full">
                <p>No insights available</p>
              </div>
            )}
          </div>
        </div>

        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default InsightPage; 