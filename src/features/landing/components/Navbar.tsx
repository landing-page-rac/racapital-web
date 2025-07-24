'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from '../types';
import Container from '../../../shared/components/ui/Container';
import racIcon from '../assets/rac-icon.png';

interface NavbarProps {
  navItems: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ navItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-transparent sticky top-0 z-50 transition-all duration-300">
      <Container maxWidth="7xl">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={racIcon}
              alt="RAC Capital Management"
              width={100}
              height={100}
              className="w-28 h-28 lg:w-52 lg:h-10 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'text-white hover:text-blue-200 px-3 py-2 text-sm font-medium transition-colors duration-200',
                    'focus:outline-none focus:text-blue-200'
                  )}
                  {...(item.isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-200"
              aria-expanded="false"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <span className="sr-only">Open main menu</span>
              <AnimatePresence mode="wait">
                {!isMenuOpen ? (
                  <motion.svg
                    key="hamburger"
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="close"
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <motion.div
                className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/10 backdrop-blur-sm border-t border-white/20 rounded-b-2xl shadow-xl"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={clsx(
                        'text-white hover:text-blue-200 block px-3 py-2 text-base font-medium transition-colors duration-200',
                        'focus:outline-none focus:text-blue-200'
                      )}
                      onClick={() => setIsMenuOpen(false)}
                      {...(item.isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </nav>
  );
};

export default Navbar; 