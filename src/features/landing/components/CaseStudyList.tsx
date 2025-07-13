import React from 'react';
import CaseStudyCard from './CaseStudyCard';
import CaseStudyButton from './CaseStudyButton';
import hero1 from '../assets/hero-1.png';
import hero2 from '../assets/hero-2.png';
import hero3 from '../assets/hero-3.png';

const caseStudies = [
  {
    image: hero1,
    label: 'CASE STUDY',
    title: 'GlobeBank leverages machine learning to cut fraud losses in real time.',
    description: 'How GlobeBank stopped threats before they struck',
    link: '#',
  },
  {
    image: hero2,
    label: 'CASE STUDY',
    title: 'AutoMotion scaled its EV production by deploying a digital twin of its assembly line.',
    description: 'See how AutoMotion accelerated output',
    link: '#',
  },
  {
    image: hero3,
    label: 'CASE STUDY',
    title: 'HealthSync uses advanced analytics to personalize patient care journeys.',
    description: 'Discover HealthSync’s data-driven approach',
    link: '#',
  },
];

const CaseStudyList: React.FC = () => (
  <section className="bg-[#1763F7] py-16 px-4">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      {caseStudies.map((cs, idx) => (
        <CaseStudyCard key={idx} {...cs} />
      ))}
    </div>
    <CaseStudyButton />
  </section>
);

export default CaseStudyList; 