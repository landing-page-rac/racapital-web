import React from 'react';
import Image from 'next/image';
import ctaImg from '../assets/cta.png';

const StewardshipCTA: React.FC = () => (
  <div className="flex flex-col md:flex-row items-center md:items-stretch bg-[#e4e4e4] rounded-sm">
    <div className="flex-shrink-0 w-full md:w-1/3">
      <Image
        src={ctaImg}
        alt="Stewardship Report Preview"
        className="object-cover w-full h-32 md:h-full rounded-md md:rounded-sm"
        style={{ minHeight: '100px', maxHeight: '120px' }}
      />
    </div>
    <div className="flex-1 flex flex-col justify-center px-4 py-2 md:py-0">
      <div className="text-[#0a2342] text-lg md:text-2xl font-normal mb-2 md:mb-0">
        Dive in below for our Fourth Annual Stewardship Report.
      </div>
      <a
        href="#"
        className="text-[#0a2342] underline text-base md:text-lg font-medium hover:text-blue-700 transition-colors w-fit"
      >
        Download Here &rarr;
      </a>
    </div>
  </div>
);

export default StewardshipCTA; 