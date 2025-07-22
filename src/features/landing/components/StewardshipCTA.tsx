import React from 'react';
import Image from 'next/image';
import cta2Img from '../assets/cta-2.png';

const StewardshipCTA: React.FC = () => (
  <section className="bg-[#0a2342] border border-[#0a2342] px-4 md:px-8 overflow-hidden">
    <div className="flex flex-col md:flex-row items-center md:items-stretch">
      <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
        <div className="relative transform ">
          <Image
            src={cta2Img}
            alt="Fourth Annual Stewardship Report"
            className="object-contain w-full max-w-sm md:max-w-md"
            style={{ maxHeight: '300px' }}
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center text-center md:text-left">
        <div className="text-white text-xl font-normal mb-4 md:mb-6">
          Dive in below for our Fourth Annual Stewardship Report.
        </div>
        <a
          href="#"
          className="text-white underline text-lg font-medium hover:text-blue-300 transition-colors w-fit mx-auto md:mx-0"
        >
          Download Here &rarr;
        </a>
      </div>
    </div>
  </section>
);

export default StewardshipCTA; 