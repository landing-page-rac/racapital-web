import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface ApiImageData {
  url: string;
  width: number;
  height: number;
}

interface CaseStudyCardProps {
  image: StaticImageData | ApiImageData | string;
  label: string;
  title: string;
  description: string;
  link: string;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ image, label, title, description }) => {
  // Determine the image source, width, and height based on the image type
  let src: string;
  let width: number | undefined;
  let height: number | undefined;

  if (typeof image === 'string') {
    // Local image or simple URL
    src = image;
    width = 400; // Default width
    height = 300; // Default height
  } else if ('url' in image) {
    // API image data
    src = image.url;
    width = image.width || 400;
    height = image.height || 300;
  } else {
    // StaticImageData
    src = image.src;
    width = image.width || 400;
    height = image.height || 300;
  }

  return (
    <div className="flex flex-col items-start w-full max-w-sm mx-auto">
      <div className="w-full h-48 mb-6 rounded-md overflow-hidden">
        <Image
          src={src}
          alt={title}
          className="w-full h-full object-cover"
          width={width}
          height={height}
        />
      </div>
      <div className="uppercase text-white/80 text-sm tracking-widest mb-2">{label}</div>
      <div className="text-white text-2xl font-light mb-4 leading-snug">{title}</div>
      <a href="#" className="text-white/90 text-lg underline hover:text-white transition-colors">
        {description} <span aria-hidden>→</span>
      </a>
    </div>
  );
};

export default CaseStudyCard; 