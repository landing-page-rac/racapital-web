'use client'
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import hero1 from '../assets/hero-1.png';

interface InsightCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  linkText: string;
  linkHref: string;
  image?: StaticImageData;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  subtitle,
  description,
  linkText,
  linkHref,
  image = hero1,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full max-w-md h-[480px] rounded-xl overflow-hidden shadow-lg bg-[#0a2342] group cursor-pointer transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div
        className="absolute left-0 top-0 w-full transition-all duration-500"
        style={{
          height: hovered ? '20%' : '60%',
          zIndex: 1,
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />
      </div>
      {/* Overlay/Content */}
      <div
        className="absolute left-0 bottom-0 w-full flex flex-col justify-end px-6 py-6 transition-all duration-500 backdrop-blur-md"
        style={{
          height: hovered ? '88%' : '48%',
          background: 'linear-gradient(180deg, rgba(10,35,66,0.92) 80%, rgba(10,35,66,0.85) 95%, rgba(10,35,66,0.0) 100%)',
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
        <a
          href={linkHref}
          className="text-white underline text-base font-medium mt-auto hover:text-blue-300 transition-colors"
        >
          {linkText} &rarr;
        </a>
      </div>
    </div>
  );
};

export default InsightCard; 