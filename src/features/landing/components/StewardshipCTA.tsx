import React from 'react';
import Image from 'next/image';
import { ReportBanner } from '../types';
import cta2Img from '../assets/cta-2.png';

interface StewardshipCTAProps {
  reportBanner?: ReportBanner;
}

const StewardshipCTA: React.FC<StewardshipCTAProps> = ({ reportBanner }) => {
  const handleDownload = () => {
    if (reportBanner?.attachment?.media?.url) {
      // Create a temporary link element to trigger download
      const link = document.createElement('a');
      link.href = reportBanner.attachment.media.url;
      link.download = reportBanner.attachment.alternativeText || 'stewardship-report';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section className="bg-[#002E73] border border-[#0a2342] px-4 md:px-8 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center md:items-stretch">
        <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
          <div className="relative transform ">
            <Image
              src={cta2Img}
              alt="Fourth Annual Stewardship Report"
              className="object-contain w-full max-w-sm md:max-w-md"
              style={{ maxHeight: '300px' }}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
          <div className="text-white text-xl font-normal mb-4 md:mb-6">
            {reportBanner?.text || 'Dive in below for our Fourth Annual Stewardship Report.'}
          </div>
          <button
            onClick={handleDownload}
            disabled={!reportBanner?.attachment?.media?.url}
            className="text-white underline text-lg font-medium hover:text-blue-300 transition-colors w-fit mx-auto md:mx-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download Report &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};

export default StewardshipCTA; 