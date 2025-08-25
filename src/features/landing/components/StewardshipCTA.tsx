'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ReportBanner } from '../types';
import cta2Img from '../assets/cta-2.png';
import { Modal, DownloadForm } from '../../../shared/components/ui';

interface StewardshipCTAProps {
  reportBanner?: ReportBanner;
}

const StewardshipCTA: React.FC<StewardshipCTAProps> = ({ reportBanner }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract file key from URL by removing the S3 base URL
  const getFileKey = (url: string) => {
    const baseUrl = 'https://rac-content-bucket.s3.ap-southeast-3.amazonaws.com';
    return url.replace(baseUrl, '').replace(/^\//, ''); // Remove leading slash if present
  };

  const handleDownload = (formData: { fullName: string; email: string; phone: string }) => {
    // Here you can implement the actual download logic
    console.log('Download requested with form data:', formData);
    console.log('File URL:', reportBanner?.attachment?.media?.url);

    // For now, just close the modal
    setIsModalOpen(false);

    // You can add actual download logic here:
    // window.open(reportBanner?.attachment?.media?.url, '_blank');
  };

  return (
    <>
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
              onClick={() => setIsModalOpen(true)}
              disabled={!reportBanner?.attachment?.media?.url}
              className="text-white underline text-lg font-medium hover:text-blue-300 transition-colors w-fit mx-auto md:mx-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Download Report &rarr;
            </button>
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DownloadForm
          title="Fourth Annual Stewardship Report"
          collectionType="ReportBanner"
          collectionIdentifier={reportBanner?.attachment?.media?.url || ''}
          fileKey={reportBanner?.attachment?.media?.url ? getFileKey(reportBanner.attachment.media.url) : ''}
          fileUrl={reportBanner?.attachment?.media?.url || ''}
          onDownload={handleDownload}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default StewardshipCTA; 