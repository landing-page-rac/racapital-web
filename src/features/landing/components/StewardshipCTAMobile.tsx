'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import cta2Img from '../assets/cta-2.png';

const StewardshipCTAMobile: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-[#002E73] to-[#001F4D] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Image */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative inline-block">
              <Image
                src={cta2Img}
                alt="Fourth Annual Stewardship Report"
                className="object-contain w-full max-w-xs"
                style={{ maxHeight: '200px' }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white text-xl sm:text-2xl font-semibold mb-4">
              Fourth Annual Stewardship Report
            </h3>
            <p className="text-blue-100 text-base sm:text-lg leading-relaxed mb-6">
              Dive in below for our comprehensive annual report showcasing our commitment to excellence and sustainable growth.
            </p>

            {/* CTA Button */}
            <motion.a
              href="#"
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Report
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StewardshipCTAMobile; 