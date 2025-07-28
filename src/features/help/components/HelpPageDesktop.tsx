'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '../../landing/components/Navbar';
import HelpForm from './HelpForm';
import { Footer } from '@/features/landing';
import superGraphic from '../../landing/assets/super-graphic-white.png';
import { NAV_ITEMS } from '@/shared/constants/navigation';

const HelpPageDesktop: React.FC = () => {
  return (
    <main className="bg-[#0D52E5] relative min-h-screen">
      <Navbar navItems={NAV_ITEMS} />
      <div className="absolute inset-0">
        <Image
          src={superGraphic.src}
          alt="Background Graphic"
          className="w-full h-full object-cover opacity-30"
          fill
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto mt-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-10">
              How Can We <br /><u>Support</u> You?
            </h1>
            <p className="text-2xl text-white/90 max-w-lg mb-10">
              Nothing beats a one-on-one discussion. If you&apos;d like to learn more about our tailored solutions, drop us a line and one of our consultants will reach out shortly.
            </p>

            <button
              type="submit"
              className="text-white py-4 px-6 font-medium hover:bg-blue-700 transition-colors border w-1/2"
            >
              XXXXX
            </button>
          </div>

          {/* Right Column */}
          <HelpForm />
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default HelpPageDesktop; 