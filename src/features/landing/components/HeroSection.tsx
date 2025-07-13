'use client';

import Image from 'next/image';
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

  // Calculate scroll-based transformations
  const maxScroll = 500; // Maximum scroll distance for full effect
  const scrollProgress = Math.min(scrollY / maxScroll, 1);

  // Center image grows from 60% to 80% width
  const centerImageWidth = 40 + (scrollProgress * 20);

  // Side images shrink and move outward
  const sideImageWidth = 20 - (scrollProgress * 5);
  const sideImageOffset = scrollProgress * 10;

  return (
    <section className="relative bg-gradient-to-br from-[#041E42] via-[#002d72] to-[#0C52E6] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-opacity-90">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}></div>
      </div>

      <Container maxWidth="7xl" className="relative z-10">
        <div className="py-10 lg:py-20">
          {/* Text Content */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {heroSection.headline}
            </h1>
          </div>

          {/* Scroll-responsive Images */}
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center justify-center w-full max-w-6xl mx-auto px-4">
              {/* Left Image */}
              <div
                className="relative transition-all duration-300 ease-out"
                style={{
                  width: `${sideImageWidth}%`,
                  transform: `translateX(-${sideImageOffset}%)`,
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
              </div>

              {/* Center Image */}
              <div
                className="relative transition-all duration-300 ease-out mx-4"
                style={{
                  width: `${centerImageWidth}%`,
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
              </div>

              {/* Right Image */}
              <div
                className="relative transition-all duration-300 ease-out"
                style={{
                  width: `${sideImageWidth}%`,
                  transform: `translateX(${sideImageOffset}%)`,
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
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <p className="text-sm text-gray-300 mb-4">Trusted by leading institutions</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold">$2.5B+</div>
              <div className="text-sm">Assets Under Management</div>
              <div className="text-2xl font-bold">15+</div>
              <div className="text-sm">Years Experience</div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm">Client Relationships</div>
            </div>
          </div>

          <div className='h-64'></div>
          <div className='h-64'></div>
          <div className='h-64'></div>
          <div className='h-64'></div>
          <div className='h-64'></div>
        </div>
      </Container>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 lg:h-20"
        >
          <path
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="white"
          />
        </svg>
      </div>

    </section >
  );
};

export default HeroSection; 