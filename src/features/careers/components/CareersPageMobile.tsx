'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { NavItem } from '@/features/landing/types';
import Container from '@/shared/components/ui/Container';
import Navbar from '@/features/landing/components/Navbar';
import { FooterMobile } from '@/features/landing';
import { JobListing } from '../hooks/useCareersData';
import superGraphic from '@/features/landing/assets/super-graphic-white.png';

interface CareersPageMobileProps {
  navItems: NavItem[];
  jobListings: JobListing[];
}

const JobAccordionItem: React.FC<{
  job: JobListing;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ job, isOpen, onToggle }) => {
  return (
    <motion.div
      className="border-t border-b border-white/20 last:border-b-0 py-5"
      initial={false}
      animate={{ height: 'auto' }}
    >
      <motion.button
        className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors duration-200 cursor-pointer"
        onClick={onToggle}
        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-white/60 min-w-[3rem]">
            {job.order}
          </span>
          <div>
            <h3 className="text-xl font-semibold text-white">
              {job.title}
            </h3>
            <p className="text-white mt-1">
              {job.level.toUpperCase()}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white text-2xl font-light cursor-pointer"
        >
          +
        </motion.div>
      </motion.button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 pl-20">
          <p className="text-white/80 text-lg leading-relaxed mb-6">
            {job.description}
          </p>
          <motion.button
            className="bg-white text-[#0D52E5] px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors duration-200 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CareersPageMobile: React.FC<CareersPageMobileProps> = ({
  navItems,
  jobListings,
}) => {
  const [openJobId, setOpenJobId] = useState<string | null>(null);

  const handleJobToggle = (jobId: string) => {
    setOpenJobId(openJobId === jobId ? null : jobId);
  };

  return (
    <div className="min-h-screen bg-[#0D52E5] text-white relative overflow-hidden">
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
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-[#0D52E5]/20"></div>
      </motion.div>

      {/* Navbar */}
      <Navbar navItems={navItems} />

      <Container maxWidth="7xl" className="relative z-10">
        <div className="py-20 px-4">
          {/* Hero Section */}
          <motion.div
            className="max-w-full mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.2
              }}
            >
              Careers
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/90 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.4
              }}
            >
              Unlock your potential by collaborating with experts, driving innovation, and making an impact at every level.
            </motion.p>
          </motion.div>

          {/* Job Listings Section */}
          <motion.div
            className="max-w-full mx-auto mt-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            <div className="rounded-2xl overflow-hidden">
              {jobListings.map((job) => (
                <JobAccordionItem
                  key={job.id}
                  job={job}
                  isOpen={openJobId === job.id}
                  onToggle={() => handleJobToggle(job.id)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Footer */}
      <FooterMobile />
    </div>
  );
};

export default CareersPageMobile; 