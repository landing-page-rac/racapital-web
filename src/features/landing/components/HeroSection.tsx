import { HeroSection as HeroSectionType } from '../types';
import Container from '../../../shared/components/ui/Container';
import Button from '../../../shared/components/ui/Button';

interface HeroSectionProps {
  heroSection: HeroSectionType;
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroSection }) => {
  return (
    <section className="relative bg-gradient-to-br from-[#041E42] via-[#002d72] to-[#0C52E6] text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-opacity-90">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}></div>
      </div>

      <Container maxWidth="7xl" className="relative">
        <div className="py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {heroSection.headline}
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              {heroSection.subheading}
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                href={heroSection.ctaButton.href}
                variant={heroSection.ctaButton.variant || 'secondary'}
                size="lg"
                className="bg-white text-[#041E42] hover:bg-gray-100 focus:ring-white border-0 shadow-lg"
              >
                {heroSection.ctaButton.text}
              </Button>

              {/* Secondary CTA */}
              <Button
                href="/about"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#041E42] focus:ring-white"
              >
                Learn More
              </Button>
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
          </div>
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