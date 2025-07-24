'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import principleImage from '../assets/principle.png';

interface Principle {
  id: number;
  number: string;
  title: string;
  description: string;
}

const principles: Principle[] = [
  {
    id: 1,
    number: "01",
    title: "Operational excellence brought you here, but approaching forward requires a different game play.",
    description: "Our wisdom stems from the understanding that we do not possess all the necessary knowledge to recreate what you have created – but we know how to preserve it."
  },
  {
    id: 2,
    number: "02",
    title: "Governance is the defining factor in the inch game of scaling good to great.",
    description: "We strictly believe that everyone must double down on the avenue they perform best, and our horse is in value creation; Each of our advice traces back to what you would appreciate the most, gradually building a partnership that serves upon trust, mutual interest, and synergy."
  },
  {
    id: 3,
    number: "03",
    title: "It takes a village to build a legacy.",
    description: "As a result, we deliver value-adding companionship throughout your journey."
  }
];

const PrinciplesWidget: React.FC = () => {
  const [activePrinciple, setActivePrinciple] = useState<Principle>(principles[0]);

  return (
    <section className="relative z-20">
      <div className="flex flex-col lg:flex-row">
        {/* Left Column - Principles */}
        <div className="lg:w-1/2 bg-[#1763F7] flex flex-col relative z-30 pt-10">
          <h2 className="text-white text-xl uppercase mb-12 tracking-wider px-10">
            Our Principles
          </h2>

          <div className="space-y-6">
            {principles.map((principle) => (
              <motion.div
                key={principle.id}
                className={`cursor-pointer transition-all duration-300 ${activePrinciple.id === principle.id
                  ? 'bg-white p-6 shadow-lg'
                  : 'p-6'
                  }`}
                onClick={() => setActivePrinciple(principle)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`text-4xl lg:text-5xl font-bold ${activePrinciple.id === principle.id ? 'text-[#1763F7]' : 'text-white'
                    }`}>
                    {principle.number}
                  </div>
                  <p className={`text-lg lg:text-xl leading-relaxed ${activePrinciple.id === principle.id ? 'text-gray-800' : 'text-white'
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
              <motion.div
                key={activePrinciple.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-white space-y-6"
              >
                <p className="text-lg lg:text-xl leading-relaxed">
                  {activePrinciple.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Principle Image */}
          <div className="w-full mt-8">
            <motion.div
              className="relative w-full h-64 lg:h-72"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Image
                src={principleImage}
                alt="Dice in motion"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrinciplesWidget; 