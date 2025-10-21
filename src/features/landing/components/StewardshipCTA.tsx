'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ReportBanner } from '../types';
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

  const imageUrl = reportBanner?.attachment?.media?.url;
  const imageAlt = reportBanner?.attachment?.alternativeText || 'Stewardship Report';

  return (
    <>
      <section className="bg-[#002E73] border border-[#0a2342] overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-stretch min-h-[400px]">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
            {imageUrl ? (
              <div className="relative w-full h-full min-h-[300px] md:min-h-[400px]">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full min-h-[300px] md:min-h-[400px] bg-[#001F4D] rounded-lg">
                <span className="text-white/50 text-lg">No image available</span>
              </div>
            )}
          </div>

          {/* Right side - Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12 text-center md:text-left">
            <div className="text-white text-xl md:text-2xl font-normal mb-6 md:mb-8 leading-relaxed">
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
          title="Stewardship Report"
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