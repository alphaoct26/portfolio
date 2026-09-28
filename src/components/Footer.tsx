import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { personal } = PORTFOLIO_DATA;
  return (
    <footer className="w-full border-t border-gh-border mt-4 py-8 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gh-fg-muted font-mono">
        <div className="flex items-center gap-4">
          <span className="text-gh-fg-default font-semibold">vaibhav-waghmare</span>
          <span className="text-gh-fg-subtle">/</span>
          <a href="#work" className="hover:text-gh-accent transition-colors">repos</a>
          <a href="#sandbox" className="hover:text-gh-accent transition-colors">sandbox</a>
          <a href="#contact" className="hover:text-gh-accent transition-colors">contact</a>
        </div>
        <div className="flex items-center gap-4">
          <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-gh-fg-default transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gh-fg-default transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href={`mailto:${personal.email}`} className="hover:text-gh-fg-default transition-colors">
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
