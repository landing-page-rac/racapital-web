'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Metric } from '../types';

interface StatsBarMobileProps {
  metrics?: Metric[];
}

const StatsBarMobile: React.FC<StatsBarMobileProps> = ({ metrics }) => {
  // Fallback data if no metrics are provided
  const fallbackStats = [
    {
      value: '999',
      label: 'Total Project Worth',
    },
    {
      value: '999',
      label: 'Total Clients',
    },
    {
      value: '999',
      label: 'Years of Experience',
    },
  ];

  const stats = metrics || fallbackStats;

  return (
    <section className="bg-[#1763F7] py-10 px-4">
      <div className="flex flex-row justify-center items-center gap-8 mx-auto">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-white text-4xl sm:text-5xl font-bold mb-2">{stat.value}</div>
            <div className="text-white text-base sm:text-lg opacity-90">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsBarMobile; 