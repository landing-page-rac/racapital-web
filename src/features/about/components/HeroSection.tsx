'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../../landing/components/Navbar';
import { stats } from '../../landing/components/StatsBar';
import PrinciplesWidget from './PrinciplesWidget';
import { useLandingPageData } from '../../landing/hooks/useLandingPageData';
import superGraphic from '../../landing/assets/super-graphic-1.png';

const HeroSection: React.FC = () => {
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
    <section className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden">
      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src={superGraphic}
          alt="Background Graphic"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0"></div>
      </motion.div>

      {/* Navbar */}
      <Navbar navItems={navItems} />

      {/* Content */}
      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-36">
          <div>
            {/* Title - Fade in down */}
            <motion.h1
              className="text-4xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.2
              }}
            >
              Relevance and Alliance Capital (RAC)
            </motion.h1>

            {/* Description - Fade in left */}
            <motion.p
              className="text-lg md:text-xl text-gray-100 leading-relaxed max-w-4xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.4
              }}
            >
              is an independent and privately owned multi-family office, investment & corporate finance advisory firm. We partner with leading family groups and institutions to promote value creation and competitive edge. Headquartered in Indonesia, RAC operates in the key market of one of the most promising region
            </motion.p>
          </div>
        </div>

        {/* Stats with number animation */}
        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-52 mx-auto z-20"
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
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.8 + index * 0.2
              }}
            >
              <div className="text-white text-5xl md:text-6xl font-bold mb-2">
                {animatedStats[index]}
              </div>
              <div className="text-white text-lg md:text-xl opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <PrinciplesWidget />
    </section>
  );
};

export default HeroSection;
