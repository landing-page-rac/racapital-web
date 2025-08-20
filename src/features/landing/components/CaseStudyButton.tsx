'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const CaseStudyButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push('/case-studies');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="mx-auto block mt-10 px-10 py-4 border-2 border-white text-white text-xl rounded transition-colors hover:bg-white hover:text-[#1763F7] font-light hover:cursor-pointer"
    >
      MORE CASE STUDIES
    </button>
  );
};

export default CaseStudyButton; 