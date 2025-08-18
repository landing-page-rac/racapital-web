'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { AboutUsPrinciple } from '../types';
import { renderRichTextContent } from '@/shared/utils/contentRenderer';

interface PrinciplesWidgetProps {
  principles?: AboutUsPrinciple[];
}

const PrinciplesWidget: React.FC<PrinciplesWidgetProps> = ({ principles = [] }) => {
  const [activePrinciple, setActivePrinciple] = useState<AboutUsPrinciple | null>(
    principles.length > 0 ? principles[0] : null
  );

  return (
    <section className="relative z-20">
      <div className="flex flex-col lg:flex-row">
        {/* Left Column - Principles */}
        <div className="lg:w-1/2 bg-[#1763F7] flex flex-col relative z-30 pt-10">
          <h2 className="text-white text-xl uppercase mb-12 tracking-wider px-10">
            Our Principles
          </h2>

          <div className="space-y-6">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                className={`cursor-pointer transition-all duration-300 ${activePrinciple === principle
                  ? 'bg-white p-6 shadow-lg'
                  : 'p-6'
                  }`}
                onClick={() => setActivePrinciple(principle)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`text-4xl lg:text-5xl font-bold ${activePrinciple === principle ? 'text-[#1763F7]' : 'text-white'
                    }`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <p className={`text-lg lg:text-xl leading-relaxed ${activePrinciple === principle ? 'text-gray-800' : 'text-white'
                    }`}>
                    {principle.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column - Description and Image */}
        <div className="lg:w-1/2 bg-transparent flex flex-col relative z-30">
          <div className="flex-1 flex flex-col px-10 py-16">
            <AnimatePresence mode="wait">
              {activePrinciple && (
                <motion.div
                  key={activePrinciple.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-white space-y-6"
                >
                  <div className="text-lg lg:text-xl leading-relaxed">
                    {renderRichTextContent(activePrinciple.description)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Principle Image */}
          {activePrinciple && (
            <div className="w-full mt-8">
              <motion.div
                className="relative w-full h-64 lg:h-72"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Image
                  src={activePrinciple.image.image.url}
                  alt={activePrinciple.image.alternativeText || "Principle image"}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesWidget; 