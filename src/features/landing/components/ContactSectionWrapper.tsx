'use client';

import ContactSection from '@/shared/components/ui/ContactSection';
import ContactSectionMobile from '@/shared/components/ui/ContactSectionMobile';
import { useResponsiveHero } from '../hooks/useResponsiveHero';

const ContactSectionWrapper: React.FC = () => {
  const isMobile = useResponsiveHero();

  if (isMobile) {
    return <ContactSectionMobile />;
  }

  return <ContactSection />;
};

export default ContactSectionWrapper; 