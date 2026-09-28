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
    <>
      {/* ── Global Video Background — sits behind EVERYTHING ── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 1,
          }}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4"
            type="video/mp4"
          />
        </video>
        {/* Thin dark scrim — keep text readable without hiding video */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'rgba(13, 17, 23, 0.45)',
          }}
        />
      </div>

      {/* ── Page content — above video ── */}
      <div
        className="min-h-screen text-gh-fg-default selection:bg-gh-accent selection:text-white font-sans relative"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Engineering Philosophy & Terminal */}
        <PhilosophySection />

        {/* 3. Flagship Projects Showcase */}
        <ProjectsSection />

        {/* 4. Interactive SQL Sandbox */}
        <SqlSandboxSection />

        {/* 5. Contact Section */}
        <PartnerSection />

        {/* 6. Footer */}
        <Footer />

        {/* 7. Copyright Bar */}
        <CopyrightBar />

        {/* 8. Fixed Bottom Navigation */}
        <BottomNav />
      </div>
    </>
  );
};

export default App;
