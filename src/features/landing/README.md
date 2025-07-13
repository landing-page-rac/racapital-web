# Landing Page Feature

This feature contains the landing page components and functionality for RAC Capital Management.

## Structure

```
src/features/landing/
├── components/
│   ├── LandingPage.tsx      # Main landing page component
│   ├── Navbar.tsx           # Navigation component
│   └── HeroSection.tsx      # Hero section component
├── hooks/
│   └── useLandingPageData.ts # Custom hook for landing page data
├── types/
│   └── index.ts             # TypeScript type definitions
└── index.ts                 # Export barrel
```

## Components

### LandingPage
The main component that orchestrates the landing page layout, combining the navbar and hero section.

### Navbar
A responsive navigation component with:
- Mobile-first design
- Sticky positioning
- Hamburger menu for mobile
- RAC Capital Management branding

### HeroSection
A compelling hero section featuring:
- Gradient background with subtle pattern
- Bold headline and subheading
- Call-to-action buttons
- Trust indicators
- SVG wave bottom separator

## Hooks

### useLandingPageData
A custom hook that provides the landing page data structure including navigation items and hero section content.

## Design System

The components use the RAC Capital Management brand colors:
- Primary: #041E42 (Dark Blue)
- Secondary: #0C52E6 (Light Blue)
- Accent: #002d72 (Secondary Blue)
- Text: #FFFFFF (White)
- Neutral: #A9A9AA (Grey)

## Usage

```tsx
import { LandingPage } from '../features/landing';

export default function Home() {
  return <LandingPage />;
}
``` 