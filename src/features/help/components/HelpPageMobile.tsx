'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '../../landing/components/Navbar';
import HelpFormMobile from './HelpFormMobile';
import { Footer } from '@/features/landing';
import superGraphic from '../../landing/assets/super-graphic-white.png';
import { NAV_ITEMS } from '@/shared/constants/navigation';
import { ContactUsData, AttachmentData } from '../types';
import { renderRichTextContent } from '@/shared/utils/contentRenderer';

interface HelpPageMobileProps {
  data: ContactUsData;
}

const HelpPageMobile: React.FC<HelpPageMobileProps> = ({ data }) => {
  const handleDownload = (attachment: AttachmentData) => {
    const link = document.createElement('a');
    link.href = attachment.media.url;
    link.download = attachment.media.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
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
      <div className="relative z-10 px-4 p-5">
        {/* Header Section */}
        <div className="text-white mb-8">
          <h1 className="text-3xl font-bold mb-6">
            {renderRichTextContent(data.title)}
          </h1>
          <p className="text-lg text-white/90 mb-6">
            {data.description}
          </p>

          {/* Attachment Buttons */}
          {data.attachment && data.attachment.length > 0 && (
            <div className="space-y-3 mb-8">
              {data.attachment.map((attachment, index) => (
                <button
                  key={index}
                  onClick={() => handleDownload(attachment)}
                  className="text-white py-3 px-4 font-medium hover:bg-blue-700 transition-colors border w-full text-left text-sm"
                >
                  📎 {attachment.alternativeText || attachment.media.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Form Section */}
        <HelpFormMobile data={data} />
      </div>

      <Footer />
    </main>
  );
};

export default HelpPageMobile; 