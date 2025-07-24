'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../../landing/components/Navbar';
import { stats } from '../../landing/components/StatsBar';
import PrinciplesWidget from './PrinciplesWidget';
import { useLandingPageData } from '../../landing/hooks/useLandingPageData';
import superGraphic from '../../landing/assets/super-graphic-1.png';
import Container from '../../../shared/components/ui/Container';

const HeroSectionMobile: React.FC = () => {
  const { navItems } = useLandingPageData();
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const animateNumbers = () => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setAnimatedStats(stats.map((stat) => {
          const targetValue = parseInt(stat.value);
          const currentValue = Math.floor(targetValue * progress);
          return currentValue;
        }));

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedStats(stats.map(stat => parseInt(stat.value)));
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    // Start animation after a delay
    const timer = setTimeout(animateNumbers, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden min-h-screen">
      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Image
          src={superGraphic}
          alt="Background Graphic"
          fill
          className="object-cover opacity-30"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#051F42]/50 to-[#051F42]/80"></div>
      </motion.div>

      {/* Navbar */}
      <Navbar navItems={navItems} />

      <Container maxWidth="7xl" className="relative z-10">
        <div className="pt-8 pb-8 px-4">
          {/* Floating Background Elements */}
          <motion.div
            className="absolute top-20 left-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.div
            className="absolute top-40 right-6 w-16 h-16 bg-blue-400/10 rounded-full blur-xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
          />

          {/* Main Content */}
          <div className="relative z-20">
            {/* Title - Fade in down */}
            <motion.h1
              className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.2
              }}
            >
              Relevance and Alliance Capital (RAC)
            </motion.h1>

            {/* Description - Fade in up */}
            <motion.p
              className="text-base sm:text-lg text-gray-100 leading-relaxed text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.4
              }}
            >
              is an independent and privately owned multi-family office, investment & corporate finance advisory firm. We partner with leading family groups and institutions to promote value creation and competitive edge. Headquartered in Indonesia, RAC operates in the key market of one of the most promising region
            </motion.p>

            {/* Stats with number animation - Mobile optimized grid */}
            <motion.div
              className="grid grid-cols-2 gap-6 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.6
              }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: 0.8 + index * 0.2
                  }}
                >
                  <div className="text-white text-3xl sm:text-4xl font-bold mb-2">
                    {animatedStats[index]}
                  </div>
                  <div className="text-white text-sm sm:text-base opacity-90">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Additional mobile-specific content */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 1.0
              }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Our Commitment
                </h3>
                <p className="text-sm text-gray-200 leading-relaxed">
                  We are dedicated to building lasting partnerships and delivering exceptional value to our clients through innovative financial solutions and strategic guidance.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Principles Widget - Mobile optimized */}
      <div className="relative z-20">
        <PrinciplesWidget />
      </div>
    </section>
  );
};

export default HeroSectionMobile; 