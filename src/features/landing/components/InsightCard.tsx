'use client'
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import hero1 from '../assets/hero-1.png';

interface ApiImageData {
  url: string;
  width: number;
  height: number;
}

interface InsightCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  linkText: string;
  linkHref: string;
  image?: StaticImageData | ApiImageData | string;
  documentId?: string;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  subtitle,
  description,
  linkText,
  linkHref,
  image = hero1,
  documentId,
}) => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  // Determine the image source, width, and height based on the image type
  let src: string;
  let width: number | undefined;
  let height: number | undefined;

  if (typeof image === 'string') {
    // Local image or simple URL
    src = image;
  } else if ('url' in image) {
    // API image data
    src = image.url;
    width = image.width;
    height = image.height;
  } else {
    // StaticImageData
    src = image.src;
    width = image.width;
    height = image.height;
  }

  const handleClick = () => {
    if (documentId) {
      // Navigate to insight detail page
      router.push(`/insights/${documentId}`);
    } else if (linkHref) {
      // Use custom linkHref if provided
      router.push(linkHref);
    }
  };

  return (
    <div
      className="relative w-full max-w-md h-full flex flex-col rounded-xl overflow-hidden shadow-lg bg-[#0a2342] group cursor-pointer transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Image */}
      <div
        className="absolute left-0 top-0 w-full transition-all duration-500"
        style={{
          height: hovered ? '20%' : '60%',
          zIndex: 1,
        }}
      >
        {width && height ? (
          <Image
            src={src}
            alt={title}
            width={width}
            height={height}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        ) : (
          <Image
            src={src}
            alt={title}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />
      </div>
      {/* Overlay/Content */}
      <div
        className="absolute left-0 bottom-0 w-full flex flex-col justify-end px-6 py-6 transition-all duration-500 backdrop-blur-md"
        style={{
          height: hovered ? '88%' : '48%',
          background: 'linear-gradient(180deg, rgba(10,35,66,0.0) 0%, rgba(10,35,66,0.0) 20%, rgba(10,35,66,0.2) 40%, rgba(10,35,66,0.5) 60%, rgba(10,35,66,0.8) 80%, rgba(10,35,66,0.95) 100%)',
          zIndex: 2,
        }}
      >
        {subtitle && (
          <div className="uppercase text-sm tracking-widest text-gray-300 mb-2">{subtitle}</div>
        )}
        <div className="text-white text-2xl font-light mb-2 leading-snug">{title}</div>
        {description && (
          <div className={`text-gray-200 text-base mb-4 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>{description}</div>
        )}
        <div className="text-white underline text-base font-medium mt-auto hover:text-blue-300 transition-colors">
          {linkText} &rarr;
        </div>
      </div>
    </div>
  );
};

export default InsightCard; 