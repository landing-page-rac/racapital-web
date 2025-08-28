'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import racIcon from '../../../features/landing/assets/rac-icon.png';
import superGraphic from '../../../features/landing/assets/super-graphic-1.png';
import Navbar from '../../../features/landing/components/Navbar';
import { NAV_ITEMS } from '../../../shared/constants/navigation';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Loading..."
}) => {
  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden">
        {/* Navbar */}
        <Navbar navItems={NAV_ITEMS} />

        <div className="flex items-center justify-center min-h-screen">
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

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <Image
                src={racIcon}
                alt="RAC Capital"
                width={120}
                height={120}
                className="mx-auto"
                priority
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-blue-300 text-lg mb-12"
            >
              Strategic Investment Solutions
            </motion.p>

            {/* Loading Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center"
            >
              <div className="flex space-x-2">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-3 h-3 bg-blue-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-white/70 text-sm mt-6"
            >
              {message}
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
