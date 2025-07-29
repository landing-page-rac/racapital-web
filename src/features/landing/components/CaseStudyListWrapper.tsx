'use client';

import CaseStudyList from './CaseStudyList';
import CaseStudyListMobile from './CaseStudyListMobile';
import { useResponsiveHero } from '../hooks/useResponsiveHero';

const CaseStudyListWrapper: React.FC = () => {
  const isMobile = useResponsiveHero();

  if (isMobile) {
    return <CaseStudyListMobile />;
  }

  return <CaseStudyList />;
};

export default CaseStudyListWrapper; 