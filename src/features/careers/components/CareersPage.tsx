import React from 'react';
import Navbar from '../../landing/components/Navbar';
import { useLandingPageData } from '../../landing/hooks/useLandingPageData';

const CareersPage: React.FC = () => {
  const { navItems } = useLandingPageData();

  return (
    <div className="min-h-screen bg-white">
      <Navbar navItems={navItems} />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#041E42] mb-6">
              Careers
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our team of financial professionals and be part of a company
              that&apos;s shaping the future of investment management.
            </p>
          </div>

          <div className="mt-16">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold text-[#041E42] mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-600">
                We&apos;re working on bringing you information about career opportunities,
                company culture, and how to join our growing team.
                Stay tuned for our careers portal.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CareersPage; 