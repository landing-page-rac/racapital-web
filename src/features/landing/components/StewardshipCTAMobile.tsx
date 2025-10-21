'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ReportBanner } from '../types';
import { Modal, DownloadForm } from '../../../shared/components/ui';

interface StewardshipCTAMobileProps {
  reportBanner?: ReportBanner;
}

const StewardshipCTAMobile: React.FC<StewardshipCTAMobileProps> = ({ reportBanner }) => {
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
      <section className="bg-gradient-to-br from-[#002E73] to-[#001F4D] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Image */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {imageUrl ? (
                <div className="relative w-full h-[250px] sm:h-[300px] bg-white/5">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    className="object-contain p-4"
                    sizes="100vw"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-[250px] sm:h-[300px] bg-[#001F4D]">
                  <span className="text-white/50 text-lg">No image available</span>
                </div>
              )}
            </motion.div>

            {/* Content */}
            <motion.div
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-blue-100 text-base sm:text-lg leading-relaxed mb-6">
                {reportBanner?.text || 'Dive in below for our comprehensive annual report showcasing our commitment to excellence and sustainable growth.'}
              </p>

              {/* CTA Button */}
              <motion.button
                onClick={() => setIsModalOpen(true)}
                disabled={!reportBanner?.attachment?.media?.url}
                className="inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: reportBanner?.attachment?.media?.url ? 1.05 : 1 }}
                whileTap={{ scale: reportBanner?.attachment?.media?.url ? 0.95 : 1 }}
              >
                Download Report
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
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

export default StewardshipCTAMobile; 