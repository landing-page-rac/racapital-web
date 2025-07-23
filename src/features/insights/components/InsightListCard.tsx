import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface InsightListCardProps {
  image: StaticImageData;
  title: string;
  linkText?: string;
  linkHref?: string;
}

const InsightListCard: React.FC<InsightListCardProps> = ({
  image,
  title,
  linkText = "Read more",
  linkHref = "#"
}) => {
  return (
    <div className="flex flex-col items-start w-full max-w-xs mx-auto cursor-pointer group">
      {/* Image */}
      <div className="w-full h-48 mb-6 rounded-md overflow-hidden">
        <Image
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col w-full">
        {/* Insight Label */}
        <div className="text-sm font-medium text-[#041E42] uppercase tracking-widest mb-2">
          Insight
        </div>

        {/* Title */}
        <h3 className="text-2xl font-light text-[#041E42] mb-4 leading-snug group-hover:text-[#0C52E6] transition-colors">
          {title}
        </h3>

        {/* Clickable Link */}
        <a
          href={linkHref}
          className="text-[#041E42] text-lg underline hover:text-[#0C52E6] transition-colors"
        >
          {linkText} <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
};

export default InsightListCard; 