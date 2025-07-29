import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface CaseStudyCardProps {
  image: StaticImageData | string;
  label: string;
  title: string;
  description: string;
  link: string;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ image, label, title, description }) => (
  <div className="flex flex-col items-start w-full max-w-sm mx-auto">
    <div className="w-full h-48 mb-6 rounded-md overflow-hidden">
      <Image src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="uppercase text-white/80 text-sm tracking-widest mb-2">{label}</div>
    <div className="text-white text-2xl font-light mb-4 leading-snug">{title}</div>
    <a href="#" className="text-white/90 text-lg underline hover:text-white transition-colors">
      {description} <span aria-hidden>→</span>
    </a>
  </div>
);

export default CaseStudyCard; 