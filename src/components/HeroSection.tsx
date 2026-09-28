import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { ArrowDown, Mail, MapPin, GitBranch, Star, BookOpen } from 'lucide-react';

// GitHub-style contribution grid (decorative)
const ContribGrid: React.FC = () => {
  // contribution levels for color lookup
  const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
  // Simulate a real-looking contribution graph
  const weeks = 26;
  const days = 7;
  const grid = Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: days }, (_, d) => {
      const seed = (w * 7 + d + 13) % 31;
      if (seed < 8) return 0;
      if (seed < 14) return 1;
      if (seed < 20) return 2;
      if (seed < 26) return 3;
      return 4;
    })
  );
  return (
    <div className="flex gap-[3px] opacity-60">
      {grid.map((week, w) => (
        <div key={w} className="flex flex-col gap-[3px]">
          {week.map((level, d) => (
            <div
              key={d}
              className="contrib-cell"
              style={{ background: colors[level] }}
              title={`${level * 3} contributions`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export const HeroSection: React.FC = () => {
  const { ref, isInView } = useInViewAnimation<HTMLElement>({ threshold: 0.1 });
  const { personal } = PORTFOLIO_DATA;

  return (
    <section ref={ref} className="w-full pt-12 md:pt-16 px-4 sm:px-6">
      {/* GitHub-style top header bar */}
      <div
        className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'} border-b border-gh-border mb-8`}
        style={{ animationDelay: '0s' }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center gap-3 pb-3">
          <div className="w-8 h-8 rounded-full bg-gh-surface border border-gh-border flex items-center justify-center font-mono text-sm font-bold text-gh-accent">
            VW
          </div>
          <span className="text-gh-fg-muted text-sm font-mono">/</span>
          <span className="text-gh-accent text-sm font-mono font-semibold">portfolio</span>
          <span className="ml-auto flex items-center gap-2">
            <div className="gh-label gh-label-green">
              <span className="mr-1">●</span> Immediate Joiner
            </div>
          </span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        {/* Left: Profile Info */}
        <div className="flex flex-col">
          {/* Name + tagline */}
          <div
            className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.1s' }}
          >
            <div className="flex items-center gap-4 mb-3">
              {/* Avatar placeholder */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-gh-success to-gh-accent border-2 border-gh-border flex items-center justify-center font-mono text-2xl font-bold text-gh-canvas select-none">
                VW
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-gh-fg-default leading-tight">
                  {personal.name}
                </h1>
                <p className="text-gh-fg-muted text-sm md:text-base font-mono mt-0.5">
                  vaibhav-waghmare
                </p>
              </div>
            </div>
          </div>

          {/* Bio description */}
          <div
            className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'} mb-5`}
            style={{ animationDelay: '0.15s' }}
          >
            <p className="text-gh-fg-default text-base leading-6 mb-2">
              Data & Business Analyst · Full-Stack & Agentic AI Builder
            </p>
            {personal.bioParagraphs.map((p, i) => (
              <p key={i} className="text-gh-fg-muted text-sm leading-5 mb-1.5">{p}</p>
            ))}
          </div>

          {/* GitHub-style meta info */}
          <div
            className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'} flex flex-col gap-2 text-sm text-gh-fg-muted mb-6`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 opacity-70 flex-shrink-0" />
              <span>Pune, Maharashtra, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 opacity-70 flex-shrink-0" />
              <a href={`mailto:${personal.email}`} className="text-gh-accent hover:underline">{personal.email}</a>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 opacity-70 flex-shrink-0" />
              <span>IIIT Nagpur B.Tech CSE (HCI & Game Tech) '26</span>
            </div>
          </div>

          {/* Stat badges */}
          <div
            className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'} flex flex-wrap gap-2 mb-6`}
            style={{ animationDelay: '0.25s' }}
          >
            <div className="flex items-center gap-1.5 text-gh-fg-muted text-sm border border-gh-border rounded-gh px-3 py-1 bg-gh-surface">
              <Star className="w-4 h-4 text-gh-warning" />
              <span>4x Hackathon Finalist</span>
            </div>
            <div className="flex items-center gap-1.5 text-gh-fg-muted text-sm border border-gh-border rounded-gh px-3 py-1 bg-gh-surface">
              <GitBranch className="w-4 h-4 text-gh-success" />
              <span>10-Month B2B Intern</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'} flex flex-wrap gap-2`}
            style={{ animationDelay: '0.3s' }}
          >
            <a href="#work" className="gh-btn gh-btn-primary">
              <ArrowDown className="w-4 h-4" /> View Projects
            </a>
            <a href={`mailto:${personal.email}?subject=Interview%20Inquiry`} className="gh-btn gh-btn-default">
              <Mail className="w-4 h-4" /> Get in Touch
            </a>
            <a href={personal.github} target="_blank" rel="noopener noreferrer" className="gh-btn gh-btn-default">
              <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Right: Contribution Graph + Stats */}
        <div
          className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'} space-y-4`}
          style={{ animationDelay: '0.35s' }}
        >
          {/* Contribution graph card */}
          <div className="gh-repo-card p-4">
            <div className="text-xs text-gh-fg-muted font-mono mb-3">contributions in the last 6 months</div>
            <div className="overflow-x-auto pb-1">
              <ContribGrid />
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs text-gh-fg-subtle">
              <span>Less</span>
              {['#161b22','#0e4429','#006d32','#26a641','#39d353'].map(c => (
                <div key={c} className="w-3 h-3 rounded-sm" style={{ background: c }} />
              ))}
              <span>More</span>
            </div>
          </div>

          {/* Quick stats grid */}
          {PORTFOLIO_DATA.stats.map((s, i) => (
            <div key={i} className="gh-repo-card px-4 py-3 flex items-center justify-between">
              <span className="text-gh-fg-muted text-sm">{s.label}</span>
              <span className="text-gh-success font-mono font-bold text-sm">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
