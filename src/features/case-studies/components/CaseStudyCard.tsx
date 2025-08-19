'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CaseStudyData } from '../types';

interface CaseStudyCardProps {
  caseStudy: CaseStudyData;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ caseStudy }) => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/case-studies/${caseStudy.documentId}`);
  };

  return (
    <div
      className="relative w-full max-w-sm h-[500px] flex flex-col rounded-xl overflow-hidden shadow-lg bg-[#0a2342] group cursor-pointer transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Image */}
      <div
        className="absolute left-0 top-0 w-full transition-all duration-500"
        style={{
          height: hovered ? '50%' : '60%',
          zIndex: 1,
        }}
      >
        <Image
          src={caseStudy.image.image.url}
          alt={caseStudy.image.alternativeText || caseStudy.title}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />
      </div>
      {/* Overlay/Content */}
      <div
        className="absolute left-0 bottom-0 w-full flex flex-col justify-end px-6 py-6 transition-all duration-500 backdrop-blur-md"
        style={{
          height: hovered ? '50%' : '48%',
          background: 'linear-gradient(180deg, rgba(10,35,66,0.0) 0%, rgba(10,35,66,0.0) 20%, rgba(10,35,66,0.2) 40%, rgba(10,35,66,0.5) 60%, rgba(10,35,66,0.8) 80%, rgba(10,35,66,0.95) 100%)',
          zIndex: 2,
        }}
      >
        <div className="uppercase text-sm tracking-widest text-gray-300 mb-2">Case Study</div>
        <div className="text-white text-2xl font-light mb-2 leading-snug">{caseStudy.title}</div>
        <div className="text-white underline text-base font-medium mt-auto hover:text-blue-300 transition-colors">
          Explore Approaches &rarr;
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCard; 