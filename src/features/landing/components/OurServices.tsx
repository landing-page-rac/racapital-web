'use client';

import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    number: '01',
    lines: ['Family Office', 'Management'],
    description: 'Comprehensive wealth management and family governance solutions',
  },
  {
    number: '02',
    lines: ['Financial', 'Advisory'],
    description: 'Strategic financial planning and investment guidance',
  },
  {
    number: '03',
    lines: ['Alternative Investment', 'Management'],
    description: 'Diversified investment strategies and portfolio optimization',
  },
];

const OurServices: React.FC = () => (
  <section className="bg-gradient-to-br from-[#06306B] to-[#051F42] py-16 px-8">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Our Services
        </h2>
        <p className="text-blue-100 text-xl leading-relaxed max-w-3xl mx-auto">
          Comprehensive financial solutions tailored to your unique needs and goals
        </p>
      </motion.div>

      {/* Services Row */}
      <div className="flex justify-center gap-16 lg:gap-24 xl:gap-32">
        {services.map((service, index) => (
          <motion.div
            key={service.number}
            className="text-center group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            {/* Number Badge */}
            <div className="bg-blue-500 text-white text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              {service.number}
            </div>

            {/* Service Lines */}
            <div className="mb-4">
              {service.lines.map((line, idx) => (
                <div
                  key={idx}
                  className="text-white text-2xl lg:text-3xl font-light leading-tight mb-1 group-hover:text-blue-200 transition-colors duration-300"
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-blue-100 text-base leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/25 text-lg">
          Learn More About Our Services
        </button>
      </motion.div>
    </div>
  </section>
);

export default OurServices; 