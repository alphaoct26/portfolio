import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Mail } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { personal } = PORTFOLIO_DATA;

  return (
    <aside className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
      <div className="gh-floating-nav flex items-center gap-3 px-4 py-2">
        {/* Monogram */}
        <div className="w-7 h-7 rounded-full bg-gh-success flex items-center justify-center font-mono text-xs font-bold text-gh-canvas select-none">
          VW
        </div>

        {/* Quick links */}
        <div className="hidden sm:flex items-center gap-1 font-mono text-xs text-gh-fg-muted">
          <a href="#work" className="px-2 py-1 rounded-gh hover:bg-gh-overlay hover:text-gh-fg-default transition-colors">repos</a>
          <a href="#sandbox" className="px-2 py-1 rounded-gh hover:bg-gh-overlay hover:text-gh-fg-default transition-colors">sql</a>
          <a href="#contact" className="px-2 py-1 rounded-gh hover:bg-gh-overlay hover:text-gh-fg-default transition-colors">contact</a>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-4 bg-gh-border" />

        {/* CTA */}
        <a
          href={`mailto:${personal.email}?subject=Interview%20Inquiry`}
          className="gh-btn gh-btn-primary !px-4 !py-1.5 text-xs"
        >
          <Mail className="w-3.5 h-3.5" /> Hire Me
        </a>
      </div>
    </aside>
  );
};
