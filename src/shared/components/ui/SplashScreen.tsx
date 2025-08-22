'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import racIcon from '../../../features/landing/assets/rac-icon.png';
import superGraphic from '../../../features/landing/assets/super-graphic-1.png';

interface SplashScreenProps {
  isVisible: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#051F42] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: {
              duration: 0.8,
              ease: "easeInOut"
            }
          }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Pattern */}
          <motion.div
            className="absolute inset-0"
            exit={{
              opacity: 0,
              scale: 1.1,
              transition: {
                duration: 0.6,
                ease: "easeInOut"
              }
            }}
          >
            <Image
              src={superGraphic}
              alt="Background Graphic"
              fill
              className="object-cover opacity-20"
              priority
            />
          </motion.div>

          {/* Content */}
          <motion.div
            className="relative z-10 text-center"
            exit={{
              opacity: 0,
              y: -50,
              scale: 0.9,
              transition: {
                duration: 0.5,
                ease: "easeInOut"
              }
            }}
          >
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
              Loading...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
