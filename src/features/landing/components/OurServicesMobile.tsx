'use client';

import React from 'react';
import { FeaturedService } from '../types';

interface OurServicesMobileProps {
  featuredServices: FeaturedService[];
}

const OurServicesMobile: React.FC<OurServicesMobileProps> = ({ featuredServices }) => {
  // Transform API data to match the component's expected format - only using name like desktop version
  const services = featuredServices.map((service, index) => ({
    number: String(index + 1).padStart(2, '0'),
    lines: service.name.split(' ').length === 1
      ? [service.name]
      : service.name.split(' ').reduce((acc: string[], word: string, i: number, arr: string[]) => {
        // Split service name into two lines for better display
        const midPoint = Math.ceil(arr.length / 2);
        if (i < midPoint) {
          acc[0] = (acc[0] || '') + (acc[0] ? ' ' : '') + word;
        } else {
          acc[1] = (acc[1] || '') + (acc[1] ? ' ' : '') + word;
        }
        return acc;
      }, ['', ''])
  }));
  return (
    <section className="bg-[#06306B] py-8 px-4">
      <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-5">Our Services</h2>
      <div className="flex flex-col justify-center gap-8 max-w-md mx-auto">
        {services.map((service) => (
          <div key={service.number} className="flex gap-3">
            <div className="text-white text-lg md:text-xl mb-2 opacity-80">{service.number}</div>
            <div>
              {service.lines.filter(line => line.trim()).map((line, idx) => (
                <div key={idx} className="text-white text-lg md:text-2xl font-light leading-snug">
                  {line}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServicesMobile; 