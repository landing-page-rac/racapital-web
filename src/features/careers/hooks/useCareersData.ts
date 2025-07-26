import { useMemo } from 'react';

export interface JobListing {
  id: string;
  order: string;
  title: string;
  level: string;
  description: string;
  applyUrl: string;
}

export interface CareersData {
  jobListings: JobListing[];
}

export const useCareersData = (): CareersData => {
  const careersData = useMemo(() => ({
    jobListings: [
      {
        id: '1',
        order: '01',
        title: 'Senior Investment Analyst',
        level: 'Senior Level',
        description: 'Lead investment research and analysis for our diverse portfolio of clients. Work directly with portfolio managers to identify opportunities and assess risks in emerging markets.',
        applyUrl: '#',
      },
      {
        id: '2',
        order: '02',
        title: 'Wealth Management Associate',
        level: 'Mid Level',
        description: 'Support wealth management strategies for high-net-worth individuals and families. Collaborate with senior advisors to develop comprehensive financial plans and investment solutions.',
        applyUrl: '#',
      },
      {
        id: '3',
        order: '03',
        title: 'Financial Planning Specialist',
        level: 'Entry Level',
        description: 'Join our growing team to help clients achieve their financial goals through strategic planning and innovative investment approaches. Perfect opportunity for recent graduates.',
        applyUrl: '#',
      },
      {
        id: '4',
        order: '04',
        title: 'Corporate Finance Manager',
        level: 'Senior Level',
        description: 'Lead corporate finance initiatives and M&A advisory services. Work with enterprise clients to structure complex transactions and drive strategic growth.',
        applyUrl: '#',
      },
    ],
  }), []);

  return careersData;
}; 