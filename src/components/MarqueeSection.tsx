import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const MarqueeSection: React.FC = () => {
  const { marqueeImages } = PORTFOLIO_DATA;
  const doubled = [...marqueeImages, ...marqueeImages];

  return (
    <section className="w-full overflow-hidden my-8 border-y border-gh-border py-3 bg-gh-surface/40">
      <div className="font-mono text-xs text-gh-fg-subtle text-center mb-2 tracking-widest uppercase">
        // pinned repositories & live projects
      </div>
      <div className="animate-marquee flex items-center">
        {doubled.map((item, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 mx-3 relative group rounded-gh-lg overflow-hidden border border-gh-border hover:border-gh-accent transition-colors duration-200"
          >
            <img
              src={item.url}
              alt={item.title}
              className="h-[200px] md:h-[360px] w-auto object-cover"
              loading={idx < 4 ? 'eager' : 'lazy'}
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gh-canvas/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            {/* Badge */}
            <div className="absolute bottom-0 left-0 right-0 bg-gh-canvas/90 backdrop-blur-sm border-t border-gh-border px-3 py-1.5 font-mono text-xs text-gh-success">
              ● {item.badge}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
