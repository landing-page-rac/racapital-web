'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '../../landing/components/Navbar';
import HelpForm from './HelpForm';
import { Footer } from '@/features/landing';
import superGraphic from '../../landing/assets/super-graphic-white.png';
import { NAV_ITEMS } from '@/shared/constants/navigation';
import { ContactUsData, AttachmentData } from '../types';
import { renderRichTextContent } from '@/shared/utils/contentRenderer';
import { Modal, DownloadForm } from '@/shared/components/ui';

interface HelpPageDesktopProps {
  data: ContactUsData;
}

const HelpPageDesktop: React.FC<HelpPageDesktopProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState<AttachmentData | null>(null);

  // Extract file key from URL by removing the S3 base URL
  const getFileKey = (url: string) => {
    const baseUrl = 'https://rac-content-bucket.s3.ap-southeast-3.amazonaws.com';
    return url.replace(baseUrl, '').replace(/^\//, ''); // Remove leading slash if present
  };

  const handleDownloadClick = (attachment: AttachmentData) => {
    setSelectedAttachment(attachment);
    setIsModalOpen(true);
  };

  const handleDownload = (formData: { fullName: string; email: string; phone: string }) => {
    // Here you can implement the actual download logic
    console.log('Download requested with form data:', formData);
    console.log('File URL:', selectedAttachment?.media?.url);

    // For now, just close the modal
    setIsModalOpen(false);
    setSelectedAttachment(null);

    // You can add actual download logic here:
    // window.open(selectedAttachment?.media?.url, '_blank');
  };

  return (
    <>
      <main className="bg-[#0D52E5] relative min-h-screen">
        <Navbar navItems={NAV_ITEMS} />
        <div className="absolute inset-0">
          <Image
            src={superGraphic.src}
            alt="Background Graphic"
            className="w-full h-full object-cover opacity-30"
            fill
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto mt-20 mb-10">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="text-white">
              {renderRichTextContent(data.title)}
              <p className="text-2xl text-white/90 max-w-lg mb-10">
                {data.description}
              </p>

              {/* Attachment Buttons */}
              {data.attachment && data.attachment.length > 0 && (
                <div className="space-y-3">
                  {data.attachment.map((attachment, index) => (
                    <button
                      key={index}
                      onClick={() => handleDownloadClick(attachment)}
                      className="text-white py-4 px-6 font-medium hover:bg-blue-700 transition-colors border w-full text-left"
                    >
                      📎 {attachment.alternativeText || attachment.media.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column */}
            <HelpForm data={data} />
          </div>
        </div>

        <Footer />
      </main>

      <Modal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        setSelectedAttachment(null);
      }}>
        {selectedAttachment && (
          <DownloadForm
            title={selectedAttachment.alternativeText || selectedAttachment.media.name}
            collectionType="ContactUs"
            collectionIdentifier={data.documentId}
            fileKey={getFileKey(selectedAttachment.media.url)}
            fileUrl={selectedAttachment.media.url}
            onDownload={handleDownload}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedAttachment(null);
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default HelpPageDesktop; 