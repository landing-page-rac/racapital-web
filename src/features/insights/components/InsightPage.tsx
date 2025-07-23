import React from 'react';
import Navbar from '../../landing/components/Navbar';
import { useLandingPageData } from '../../landing/hooks/useLandingPageData';

const InsightPage: React.FC = () => {
  const { navItems } = useLandingPageData();

  return (
    <div className="min-h-screen bg-white">
      <Navbar navItems={navItems} />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#041E42] mb-6">
              Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our latest perspectives on finance, investment strategies, and market trends.
            </p>
          </div>

          <div className="mt-16">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold text-[#041E42] mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-600">
                We&apos;re working on bringing you comprehensive insights and analysis.
                Stay tuned for our latest research and perspectives.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InsightPage; 