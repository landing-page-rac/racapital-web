import Image from 'next/image';
import superGraphic from '../assets/super-graphic-white.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#041E42] text-white py-16 px-4 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={superGraphic}
          alt="Background Graphic"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Logo and Copyright */}
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="text-3xl font-bold">RAC</div>
              <div className="flex flex-col text-sm uppercase">
                <span>CAPITAL</span>
                <span>MANAGEMENT</span>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-sm opacity-80">
              Copyright © 2025 RAC Capital
            </div>
          </div>

          {/* Middle Column - Contact Info and Social Media */}
          <div className="space-y-2">
            {/* Social Media Icons */}
            <div className="flex space-x-2">
              <a href="#" className="w-16 h-16 rounded flex items-center justify-center hover:bg-white hover:text-[#041E42] transition-colors">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/ra-capital-management-llc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded flex items-center justify-center hover:bg-white hover:text-[#041E42] transition-colors"
              >
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <svg width="16" height="16" fill="currentColor" className="mt-1 flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <div className="text-sm space-y-1">
                  <div>Treasury Tower Office 1, Level 7.</div>
                  <div>Scbd Lot 28</div>
                  <div>Jl. Jenderal Sudirman Kav 52-53</div>
                  <div>Jakarta, Indonesia</div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span className="text-sm">info@racapital.co</span>
            </div>
          </div>

          {/* Right Column - Duplicate Address */}
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <svg width="16" height="16" fill="currentColor" className="mt-1 flex-shrink-0" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <div className="text-sm space-y-1">
                <div>Treasury Tower Office 1, Level 7.</div>
                <div>Scbd Lot 28</div>
                <div>Jl. Jenderal Sudirman Kav 52-53</div>
                <div>Jakarta, Indonesia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;