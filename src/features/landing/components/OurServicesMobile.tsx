'use client';

import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    number: '01',
    title: 'Family Office Management',
    description: 'Comprehensive wealth management and family governance solutions',
    icon: '🏢',
  },
  {
    number: '02',
    title: 'Financial Advisory',
    description: 'Strategic financial planning and investment guidance',
    icon: '📊',
  },
  {
    number: '03',
    title: 'Alternative Investment Management',
    description: 'Diversified investment strategies and portfolio optimization',
    icon: '💎',
  },
];

const OurServicesMobile: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-[#06306B] to-[#051F42] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed max-w-2xl mx-auto">
            Comprehensive financial solutions tailored to your unique needs and goals
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-6">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                transition: { duration: 0.3 }
              }}
            >
              <div className="flex items-start gap-4">
                {/* Icon and Number */}
                <div className="flex flex-col items-center">
                  <div className="text-3xl mb-2">{service.icon}</div>
                  <div className="bg-blue-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                    {service.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
            Learn More About Our Services
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default OurServicesMobile; 