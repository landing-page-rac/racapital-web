import React from 'react';
import Image from 'next/image';
import { InsightData } from '../types';

interface InsightListCardProps {
  insight: InsightData;
  linkText?: string;
  linkHref?: string;
}

const InsightListCard: React.FC<InsightListCardProps> = ({
  insight,
  linkText = "Read more",
  linkHref = "#"
}) => {
  return (
    <div className="flex flex-col items-start w-full max-w-xs mx-auto cursor-pointer group">
      {/* Image */}
      <div className="w-full h-48 mb-6 overflow-hidden">
        <Image
          src={insight.image.image.url}
          alt={insight.image.alternativeText || insight.title}
          width={insight.image.image.width}
          height={insight.image.image.height}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col w-full">
        <div className="text-sm font-medium text-white uppercase tracking-widest mb-2">
          Insight
        </div>

        {/* Title */}
        <h3 className="text-2xl font-light text-white mb-4 leading-snug group-hover:text-[#0C52E6] transition-colors">
          {insight.title}
        </h3>

        {/* Clickable Link */}
        <a
          href={linkHref}
          className="text-white text-lg underline hover:text-[#0C52E6] transition-colors"
        >
          {linkText} <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
};

export default InsightListCard; 