'use client';

import React from 'react';
import Image from 'next/image';
import racIcon from '../../../features/landing/assets/rac-icon.png';
import superGraphic from '../../../features/landing/assets/super-graphic-1.png';
import Navbar from '../../../features/landing/components/Navbar';
import { NAV_ITEMS } from '../../../shared/constants/navigation';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Loading..."
}) => {
  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-[#051F42] via-[#002d72] to-[#051F42] text-white overflow-hidden">
        {/* Navbar */}
        <Navbar navItems={NAV_ITEMS} />

        <div className="flex items-center justify-center min-h-screen">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            <Image
              src={superGraphic}
              alt="Background Graphic"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Logo */}
            <div className="mb-8">
              <Image
                src={racIcon}
                alt="RAC Capital"
                width={120}
                height={120}
                className="mx-auto"
                priority
              />
            </div>

            {/* Tagline */}
            <p className="text-blue-300 text-lg mb-12">
              Strategic Investment Solutions
            </p>

            {/* Loading Animation */}
            <div className="flex justify-center">
              <div className="flex space-x-2">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"
                    style={{
                      animationDelay: `${index * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Loading Text */}
            <p className="text-white/70 text-sm mt-6">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
