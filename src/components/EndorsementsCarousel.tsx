import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

export const EndorsementsCarousel: React.FC = () => {
  const { ref: sectionRef, isInView } = useInViewAnimation<HTMLElement>({ threshold: 0.1 });
  const { testimonials } = PORTFOLIO_DATA;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const extendedItems = [...testimonials, ...testimonials, ...testimonials];

  const handleNext = () => setCurrentIndex((p) => (p + 1) % extendedItems.length);
  const handlePrev = () => setCurrentIndex((p) => (p - 1 + extendedItems.length) % extendedItems.length);

  useEffect(() => {
    if (isHovered) return;
    const t = setInterval(handleNext, 3500);
    return () => clearInterval(t);
  }, [isHovered]);

  return (
    <section ref={sectionRef} className="w-full px-4 sm:px-6 py-10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div
          className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'} flex items-center justify-between mb-6 pb-4 border-b border-gh-border`}
          style={{ animationDelay: '0.05s' }}
        >
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 16 16" className="w-4 h-4 fill-gh-fg-muted" aria-hidden="true">
              <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /><path fillRule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" />
            </svg>
            <h2 className="text-gh-fg-default text-base font-semibold">
              Endorsements &amp; Reviews
            </h2>
            <span className="gh-label gh-label-green ml-1">5/5 ★</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="w-8 h-8 flex items-center justify-center rounded-gh border border-gh-border text-gh-fg-muted hover:bg-gh-surface hover:text-gh-fg-default transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 flex items-center justify-center rounded-gh border border-gh-border text-gh-fg-muted hover:bg-gh-surface hover:text-gh-fg-default transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex gap-4 transition-transform duration-700"
            style={{
              transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
              transform: `translateX(calc(-${currentIndex} * (min(380px, calc(100vw - 32px)) + 16px)))`,
            }}
          >
            {extendedItems.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[calc(100vw-32px)] sm:w-[380px] gh-repo-card p-5 flex flex-col gap-4"
              >
                {/* Issue-style header */}
                <div className="flex items-center gap-2 text-xs font-mono">
                  <svg viewBox="0 0 16 16" className="w-4 h-4 fill-gh-success" aria-hidden="true">
                    <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /><path fillRule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" />
                  </svg>
                  <span className="text-gh-success font-semibold">Open</span>
                  <span className="text-gh-fg-subtle">·</span>
                  <span className="text-gh-fg-muted">Reviewed by {item.name}</span>
                </div>

                {/* Quote as "issue body" */}
                <div className="gh-code-block p-4 text-sm text-gh-fg-muted leading-6 border-gh-border-muted">
                  <span className="text-gh-fg-subtle font-mono text-xs block mb-2"># feedback</span>
                  "{item.quote}"
                </div>

                {/* Author row */}
                <div className="flex items-center gap-3 pt-3 border-t border-gh-border-muted">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-8 h-8 rounded-full object-cover border border-gh-border"
                    loading="lazy"
                  />
                  <div>
                    <div className="text-gh-fg-default text-sm font-semibold leading-tight">{item.name}</div>
                    <div className="text-gh-fg-subtle text-xs font-mono mt-0.5">
                      {item.role} · {item.company}
                    </div>
                  </div>
                  <div className="ml-auto gh-label gh-label-purple text-[10px]">verified</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
