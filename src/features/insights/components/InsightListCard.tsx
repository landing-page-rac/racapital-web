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
    <div className="flex flex-col cursor-pointer group">
      {/* Image */}
      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col">
        {/* Insight Label */}
        <div className="text-sm font-medium text-[#041E42] uppercase tracking-widest mb-2">
          Insight
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-[#041E42] mb-4 leading-tight group-hover:text-[#0C52E6] transition-colors">
          {title}
        </h3>

        {/* Clickable Link */}
        <div className="flex justify-end">
          <a
            href={linkHref}
            className="text-[#041E42] font-medium hover:text-[#0C52E6] transition-colors flex items-center gap-2"
          >
            {linkText} →
          </a>
        </div>
      </div>
    </div>
  );
};

export default InsightListCard; 