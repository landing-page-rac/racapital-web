import React from 'react';
import Navbar from '../../landing/components/Navbar';
import { useLandingPageData } from '../../landing/hooks/useLandingPageData';

const HelpPage: React.FC = () => {
  const { navItems } = useLandingPageData();

  return (
    <div className="min-h-screen bg-white">
      <Navbar navItems={navItems} />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#041E42] mb-6">
              How We Can Help
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive range of financial services and advisory solutions
              tailored to meet your unique needs and goals.
            </p>
          </div>

          <div className="mt-16">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold text-[#041E42] mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-600">
                We&apos;re working on bringing you detailed information about our services,
                expertise areas, and how we can support your financial objectives.
                Stay tuned for our comprehensive service offerings.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpPage; 