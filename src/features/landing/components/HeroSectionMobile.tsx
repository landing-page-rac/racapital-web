'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { NavItem } from '../types';
import Container from '../../../shared/components/ui/Container';
import Navbar from './Navbar';
import { RichTextParagraph } from '@/shared/types';
import { renderInlineBlock } from '@/shared/utils/contentRenderer';
import hero1 from '../assets/hero-1.png';
import hero2 from '../assets/hero-2.png';
import hero3 from '../assets/hero-3.png';
import superGraphic from '../assets/super-graphic-1.png';

interface HeroSectionMobileProps {
  navItems: NavItem[];
  aboutUsIntro?: RichTextParagraph;
}

const HeroSectionMobile: React.FC<HeroSectionMobileProps> = ({ navItems, aboutUsIntro }) => {
  return (
    <section className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden min-h-screen">
      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Image
          src={superGraphic}
          alt="Background Graphic"
          fill
          className="object-cover opacity-30"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#051F42]/50 to-[#051F42]/80"></div>
      </motion.div>

      {/* Navbar */}
      <Navbar navItems={navItems} />

      <Container maxWidth="7xl" className="relative z-10">
        <div className="pt-8 pb-8 px-4">
          {/* Floating Background Elements */}
          <motion.div
            className="absolute top-20 left-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.div
            className="absolute top-40 right-6 w-16 h-16 bg-blue-400/10 rounded-full blur-xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
          />

          {/* Main Content */}
          <div className="relative z-20">
            {/* Main Headline */}
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h1 className="text-2xl sm:text-5xl font-bold leading-tight mb-3">
                Building Your Tomorrow&apos;s
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100">
                  Fortune, Today
                </span>
              </h1>
            </motion.div>

            {/* Hero Image with Overlay */}
            <motion.div
              className="relative mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={hero1}
                  alt="RAC Capital Management"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: '16/10' }}
                />
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#051F42]/80 via-transparent to-transparent"></div>

                {/* Floating Badge */}
                <motion.div
                  className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <span className="text-white text-sm font-medium">RAC Capital</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed max-w-md mx-auto">
                You set the <span className="font-semibold text-white">goal</span>, we clear the <span className="font-semibold text-white">path</span>.
              </p>
            </motion.div>

            {/* Supporting Images Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="relative group">
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={hero2}
                    alt="Financial Advisory"
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ aspectRatio: '4/3' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white text-sm font-medium">Advisory</span>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={hero3}
                    alt="Investment Strategy"
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ aspectRatio: '4/3' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white text-sm font-medium">Strategy</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-lg mx-auto">
                {aboutUsIntro ? (
                  renderInlineBlock(aboutUsIntro, 1)
                ) : (
                  <>
                    <span className="font-semibold text-white">Relevance and Alliance Capital (RAC)</span> is an independent, privately owned multi-family office and corporate-finance advisory firm. We work hand-in-hand with family groups and institutions to create lasting value and sharpen their competitive edge.
                  </>
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSectionMobile;