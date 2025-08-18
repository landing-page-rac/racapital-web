'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../../landing/components/Navbar';
// Remove the hardcoded stats import - will use API data instead
import PrinciplesWidget from './PrinciplesWidget';
import { NAV_ITEMS } from '@/shared/constants/navigation';
import superGraphic from '../../landing/assets/super-graphic-1.png';
import { AboutUsData } from '../types';

interface HeroSectionProps {
  data?: AboutUsData | null;
  isLoading?: boolean;
  error?: Error | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const metrics = useMemo(() => data?.hero?.metrics || [], [data?.hero?.metrics]);
  const [animatedStats, setAnimatedStats] = useState(metrics.map(() => 0));

  useEffect(() => {
    if (metrics.length === 0) return;

    const animateNumbers = () => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setAnimatedStats(metrics.map((stat) => {
          const targetValue = parseInt(stat.value);
          const currentValue = Math.floor(targetValue * progress);
          return currentValue;
        }));

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedStats(metrics.map(stat => parseInt(stat.value)));
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    // Start animation after a delay
    const timer = setTimeout(animateNumbers, 800);
    return () => clearTimeout(timer);
  }, [metrics]);

  return (
    <section className="relative bg-[#051F42] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <Image
          src={superGraphic}
          alt="Background Graphic"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      {/* Navbar */}
      <Navbar navItems={NAV_ITEMS} />

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
              {data?.hero?.title || "Relevance and Alliance Capital (RAC)"}
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
              {data?.hero?.body || "is an independent and privately owned multi-family office, investment & corporate finance advisory firm. We partner with leading family groups and institutions to promote value creation and competitive edge. Headquartered in Indonesia, RAC operates in the key market of one of the most promising region"}
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
          {metrics.map((stat, index) => (
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
      <PrinciplesWidget principles={data?.principles} />
    </section>
  );
};

export default HeroSection;
