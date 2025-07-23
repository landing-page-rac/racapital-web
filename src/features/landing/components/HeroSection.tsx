'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroSection as HeroSectionType } from '../types';
import Container from '../../../shared/components/ui/Container';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import hero1 from '../assets/hero-1.png';
import hero2 from '../assets/hero-2.png';
import hero3 from '../assets/hero-3.png';

interface HeroSectionProps {
  heroSection: HeroSectionType;
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroSection }) => {
  const scrollY = useScrollAnimation();
  const { scrollYProgress } = useScroll();

  // Calculate scroll-based transformations
  const maxScroll = 500; // Maximum scroll distance for full effect
  const scrollProgress = Math.min(scrollY / maxScroll, 1);

  // Center image grows from 60% to 80% width
  const centerImageWidth = 50 + (scrollProgress * 20);

  // Side images shrink and move outward
  const sideImageWidth = 30 - (scrollProgress * 5);
  const sideImageOffset = scrollProgress * 10;

  // Parallax transforms for images
  const leftImageY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const centerImageY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rightImageY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section className="relative bg-gradient-to-br from-[#041E42] via-[#002d72] to-[#0C52E6] text-white overflow-hidden">
      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0 bg-opacity-90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}></div>
      </motion.div>

      <Container maxWidth="7xl" className="relative z-10">
        <div className="py-10 lg:py-20">
          {/* Text Content */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            {/* Main Headline */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.2
              }}
            >
              {heroSection.headline}
            </motion.h1>
          </div>

          {/* Scroll-responsive Images */}
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center justify-center w-full max-w-6xl mx-auto px-4">
              {/* Left Image */}
              <motion.div
                className="relative transition-all duration-300 ease-out bottom-32 left-10"
                style={{
                  width: `${sideImageWidth}%`,
                  transform: `translateX(-${sideImageOffset}%)`,
                  y: leftImageY,
                }}
                initial={{ opacity: 0, x: -100, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.4
                }}
                whileHover={{
                  scale: 1.05,
                  rotateY: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <Image
                  src={hero2}
                  alt="Hero Image 1"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-lg shadow-2xl"
                  style={{ aspectRatio: '3/2' }}
                />
              </motion.div>

              {/* Center Image */}
              <motion.div
                className="relative transition-all duration-300 ease-out mx-4 z-20"
                style={{
                  width: `${centerImageWidth}%`,
                  y: centerImageY,
                }}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: 0.6
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <Image
                  src={hero1}
                  alt="Hero Image 2"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover rounded-lg shadow-2xl"
                  style={{ aspectRatio: '4/3' }}
                />
              </motion.div>

              {/* Right Image */}
              <motion.div
                className="relative transition-all duration-300 ease-out top-32 right-14"
                style={{
                  width: `${sideImageWidth}%`,
                  transform: `translateX(${sideImageOffset}%)`,
                  y: rightImageY,
                }}
                initial={{ opacity: 0, x: 100, rotateY: 15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.4
                }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <Image
                  src={hero3}
                  alt="Hero Image 3"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-lg shadow-2xl"
                  style={{ aspectRatio: '3/2' }}
                />
              </motion.div>
            </div>
          </div>

          {/* Hero Text Content */}
          <motion.div
            className="max-w-4xl mx-auto text-center mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.8
            }}
          >
            <motion.h2
              className="text-3xl font-light text-white mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 1.0
              }}
            >
              You set the <span className="underline font-bold">goal</span>, we clear the <span className="underline font-bold">path</span>. We are here to guide your growth through strategic, hands-on advisory.
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-100 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 1.2
              }}
            >
              <span className="font-bold">Relevance and Alliance Capital (RAC)</span> is an independent, privately owned multi-family office and corporate-finance advisory firm. We work hand-in-hand with family groups and institutions to create lasting value and sharpen their competitive edge. Based in Indonesia, we&apos;re perfectly positioned to serve one of the world&apos;s fastest-growing markets.
            </motion.p>
          </motion.div>

        </div>
      </Container>
    </section >
  );
};

export default HeroSection; 