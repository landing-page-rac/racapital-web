import React from 'react';

const CaseStudyButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="mx-auto block mt-10 px-10 py-4 border-2 border-white text-white text-xl rounded transition-colors hover:bg-white hover:text-[#1763F7] font-light"
  >
    MORE CASE STUDIES
  </button>
);

export default CaseStudyButton; 