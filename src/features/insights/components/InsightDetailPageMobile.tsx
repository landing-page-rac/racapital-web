'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../../landing/components/Navbar';
import { ContactSectionMobile } from '@/shared/components';
import { FooterMobile } from '@/features/landing';
import superGraphic from '../../landing/assets/super-graphic-1.png';
import { NAV_ITEMS } from '@/shared/constants/navigation';
import { InsightData } from '../types';
import { renderRichTextContent } from '@/shared/utils/contentRenderer';
import { InsightAccordion, InsightService } from './sections';
import { Modal, DownloadForm } from '@/shared/components/ui';

interface InsightDetailPageMobileProps {
  insight: InsightData;
}

const InsightDetailPageMobile: React.FC<InsightDetailPageMobileProps> = ({ insight }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract file key from URL by removing the S3 base URL
  const getFileKey = (url: string) => {
    const baseUrl = 'https://rac-content-bucket.s3.ap-southeast-3.amazonaws.com';
    return url.replace(baseUrl, '').replace(/^\//, ''); // Remove leading slash if present
  };

  const handleDownload = (formData: { fullName: string; email: string; phone: string }) => {
    console.log('Download requested with form data:', formData);
    console.log('File URL:', insight.attachment?.media?.url);
  };

  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden">
        <Navbar navItems={NAV_ITEMS} />

        {/* Background Pattern */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src={superGraphic}
            alt="Background Graphic"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#051F42]/30 to-[#051F42]/60"></div>
        </motion.div>

        <main className="relative z-10 pt-5">
          <div className="mx-auto px-4 sm:px-6 pt-4 pb-8">
            {/* Mobile Header */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-lg uppercase tracking-widest text-blue-300 font-medium mb-4">
                PERSPECTIVE
              </div>
              <h1 className="text-3xl text-white leading-tight font-bold">
                {insight.title}
              </h1>
            </motion.div>

            {/* Mobile Main Image */}
            {insight.image && (
              <motion.div
                className="mb-8 -mx-4 px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative w-full h-72 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={insight.mainImage.image.url}
                    alt={insight.image.alternativeText || insight.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </motion.div>
            )}

            {/* Mobile Service */}
            <InsightService insight={insight} />

            {/* Mobile Content */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="prose prose-invert prose-sm max-w-none text-white leading-relaxed">
                {renderRichTextContent(insight.content)}
              </div>
            </motion.div>

            {/* Mobile Additional Image */}
            {insight.image && (
              <motion.div
                className="mb-8 -mx-4 px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="relative w-full h-56 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={insight.image.image.url}
                    alt={insight.image.alternativeText || insight.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </motion.div>
            )}

            {/* Mobile Accordion */}
            <InsightAccordion insight={insight} />

            {/* Mobile Quote */}
            {insight.quote && (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-6 border border-white/20">
                  <blockquote className="text-white text-lg italic leading-relaxed">
                    {renderRichTextContent(insight.quote)}
                  </blockquote>
                </div>
              </motion.div>
            )}

            {/* Mobile Attachment */}
            {insight.attachment && insight.attachment.media.url && (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-blue-300 text-sm uppercase tracking-wider mb-3">
                    Attachment
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-white hover:text-blue-300 transition-colors duration-200 flex items-center text-lg w-full text-left"
                  >
                    <span className="mr-3 text-xl">📎</span>
                    {insight.attachment.media.name || 'Download Summary File'}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DownloadForm
          title={insight.title || 'Insight'}
          collectionType="Insight"
          collectionIdentifier={insight.documentId}
          fileKey={getFileKey(insight.attachment.media.url)}
          fileUrl={insight.attachment.media.url}
          onDownload={handleDownload}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      <ContactSectionMobile />
      <FooterMobile />
    </div>
  );
};

export default InsightDetailPageMobile;
