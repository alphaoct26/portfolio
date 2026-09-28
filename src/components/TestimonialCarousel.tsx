import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Marcus Anderson',
    role: 'CEO, Data.storage',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'With very little guidance team delivered designs that were consistently spot on, elevating our company’s visual language to new heights.',
  },
  {
    name: 'alexwu',
    role: 'Founder, Nexgate',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Viktor led the creation of our best fundraising deck to date! His clarity, eye for detail, and pacing made all the difference.',
  },
  {
    name: 'James Mitchell',
    role: 'VP Product, LaunchPad',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Working with Viktor transformed our product vision into an intuitive reality. The turnaround time was astonishing.',
  },
  {
    name: 'Rachel Foster',
    role: 'Co-founder, Nexus Labs',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'The design quality exceeded our expectations. Every single interaction was crafted with obsessive care and precision.',
  },
  {
    name: 'David Zhang',
    role: 'Head of Design, Paradigm Labs',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Incredible work from start to finish. Viktor operates at the highest level of craft, design intuition, and product maturity.',
  },
];

export const TestimonialCarousel: React.FC = () => {
  const { ref: sectionRef, isInView } = useInViewAnimation<HTMLElement>({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Tripled for infinite loop effect
  const extendedItems = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % extendedItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + extendedItems.length) % extendedItems.length);
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, extendedItems.length]);

  return (
    <section ref={sectionRef} className="w-full py-20 overflow-hidden">
      {/* Header Row */}
      <div className="max-w-[1200px] mx-auto px-6 mb-12">
        <div
          className={`${
            isInView ? 'animate-fade-in-up' : 'opacity-0'
          } md:max-w-4xl md:ml-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4`}
          style={{ animationDelay: '0.1s' }}
        >
          <h2 className="text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D212C] tracking-tight font-normal">
            What <span className="font-serif-accent font-normal italic">builders</span> say
          </h2>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-black text-black" />
              ))}
            </div>
            <span className="text-sm font-semibold text-[#0D212C] ml-1">Clutch 5/5</span>
          </div>
        </div>
      </div>

      {/* Carousel Track with controls */}
      <div
        className="relative w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="max-w-[1200px] mx-auto px-6 mb-6 flex justify-end gap-3">
          <button
            onClick={handlePrev}
            aria-label="Previous Testimonial"
            className="w-12 h-12 rounded-full border border-[#0D212C]/20 flex items-center justify-center text-[#0D212C] hover:bg-[#0D212C] hover:text-white transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Testimonial"
            className="w-12 h-12 rounded-full border border-[#0D212C]/20 flex items-center justify-center text-[#0D212C] hover:bg-[#0D212C] hover:text-white transition-colors duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-hidden px-6">
          <div
            ref={containerRef}
            className="flex gap-6 transition-transform duration-[800ms]"
            style={{
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              transform: `translateX(calc(-${currentIndex} * (min(427.5px, calc(100vw - 48px)) + 24px)))`,
            }}
          >
            {extendedItems.map((item, index) => {
              const isCurrent = index === currentIndex;
              return (
                <div
                  key={index}
                  className={`flex-shrink-0 w-[calc(100vw-48px)] sm:w-[427.5px] bg-white rounded-[32px] md:rounded-[40px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] px-6 md:pl-10 md:pr-24 py-8 flex flex-col justify-between transition-all duration-500 ${
                    !isCurrent ? 'opacity-95' : 'opacity-100 scale-100'
                  }`}
                >
                  <div>
                    {/* SVG Quote mark */}
                    <svg
                      className="w-8 h-8 text-[#0D212C]/20 mb-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>

                    <p className="text-base text-[#0D212C] leading-relaxed mb-8">
                      “{item.quote}”
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover shadow-sm"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-semibold text-sm text-[#0D212C]">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#273C46] flex items-center gap-1 mt-0.5">
                        <span>→</span> {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
