import React from 'react';
import { HeroSection } from './components/HeroSection';
import { PhilosophySection } from './components/PhilosophySection';
import { ProjectsSection } from './components/ProjectsSection';
import { SqlSandboxSection } from './components/SqlSandboxSection';
import { PartnerSection } from './components/PartnerSection';
import { Footer } from './components/Footer';
import { CopyrightBar } from './components/CopyrightBar';
import { BottomNav } from './components/BottomNav';


export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gh-canvas text-gh-fg-default selection:bg-gh-accent selection:text-white font-sans relative">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Engineering Philosophy & Terminal */}
      <PhilosophySection />

      {/* 4. Flagship Projects Showcase */}
      <ProjectsSection />

      {/* 5. Interactive SQL Sandbox */}
      <SqlSandboxSection />

      {/* 6. Contact Section */}
      <PartnerSection />

      {/* 7. Footer */}
      <Footer />

      {/* 8. Copyright Bar */}
      <CopyrightBar />

      {/* 9. Fixed Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default App;

