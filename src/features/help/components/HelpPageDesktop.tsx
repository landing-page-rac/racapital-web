'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '../../landing/components/Navbar';
import HelpForm from './HelpForm';
import { Footer } from '@/features/landing';
import superGraphic from '../../landing/assets/super-graphic-white.png';
import { NAV_ITEMS } from '@/shared/constants/navigation';
import { ContactUsData, AttachmentData } from '../types';
import { renderRichTextContent } from '@/shared/utils/contentRenderer';

interface HelpPageDesktopProps {
  data: ContactUsData;
}

const HelpPageDesktop: React.FC<HelpPageDesktopProps> = ({ data }) => {
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
                    onClick={() => handleDownload(attachment)}
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
  );
};

export default HelpPageDesktop; 