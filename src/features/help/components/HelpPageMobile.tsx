'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../landing/components/Navbar';
import HelpFormMobile from './HelpFormMobile';
import { NAV_ITEMS } from '@/shared/constants/navigation';
import superGraphic from '../../landing/assets/super-graphic-white.png';
import Image from 'next/image';
import { Footer } from '@/features/landing';

// Navigation items configuration


const HelpPageMobile: React.FC = () => {
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
      <div className="relative z-10 px-4 py-16">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
            How Can We <br /><span className="underline decoration-2 underline-offset-4">Support</span> You?
          </h1>
          <p className="text-lg leading-relaxed text-white/90 max-w-2xl mx-auto px-4">
            Nothing beats a one-on-one discussion. If you&apos;d like to learn more about our tailored solutions, drop us a line and one of our consultants will reach out shortly.
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <HelpFormMobile />
        </motion.div>
      </div>

      <Footer />
    </main>
  );
};

export default HelpPageMobile; 