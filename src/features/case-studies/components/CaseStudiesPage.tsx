import React from 'react';
import Navbar from '../../landing/components/Navbar';
import { useLandingPageData } from '../../landing/hooks/useLandingPageData';
import { useCaseStudiesData } from '../hooks/useCaseStudiesData';
import CaseStudyCard from './CaseStudyCard';
import ContactSection from '@/shared/components/ui/ContactSection';
import Footer from '@/features/landing/components/Footer';

const CaseStudiesPage: React.FC = () => {
  const { navItems } = useLandingPageData();
  const { caseStudies } = useCaseStudiesData();

  console.log('Case studies data:', caseStudies);

  return (
    <div className="min-h-screen bg-white">
      <Navbar navItems={navItems} />
      <main className="pt-5">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-[#041E42] mb-6">
              Case Studies
            </h1>
          </div>

          <div className="flex flex-wrap justify-center gap-8 min-h-96">
            {caseStudies && caseStudies.length > 0 ? (
              caseStudies.map((caseStudy) => (
                <CaseStudyCard
                  key={caseStudy.id}
                  image={caseStudy.image}
                  title={caseStudy.title}
                />
              ))
            ) : (
              <div className="text-center text-gray-600">
                <p>No case studies available</p>
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

export default CaseStudiesPage;   