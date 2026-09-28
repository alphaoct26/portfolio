import React, { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

export const TestimonialSection: React.FC = () => {
  const { ref: sectionRef, isInView } = useInViewAnimation<HTMLElement>({ threshold: 0.1 });
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only calculate if near or in viewport
      if (rect.top < windowHeight + 100 && rect.bottom > -100) {
        // Calculate relative position: 0 when entering bottom, 1 when exiting top
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        // Max offset 200px: moves upward or shifts gracefully
        const calculatedOffset = Math.max(-100, Math.min(100, (progress - 0.5) * 200));
        setOffsetY(calculatedOffset);
      }
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 px-6 max-w-2xl mx-auto flex flex-col items-center text-center overflow-hidden"
    >
      {/* Quote Icon */}
      <div
        className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'} mb-6`}
        style={{ animationDelay: '0.1s' }}
      >
        <Quote className="w-6 h-6 text-slate-900 fill-slate-900 rotate-180" />
      </div>

      {/* Large Quote */}
      <h2
        className={`${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        } text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D212C] tracking-tight font-normal mb-6`}
        style={{ animationDelay: '0.2s' }}
      >
        ‘I left{' '}
        <span className="font-serif-accent font-normal italic">Apple</span> to
        build the studio I always wanted to work with’
      </h2>

      {/* Author */}
      <p
        className={`${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        } italic text-sm text-[#273C46] mb-8`}
        style={{ animationDelay: '0.3s' }}
      >
        Viktor Oddy
      </p>

      {/* Logos */}
      <div
        className={`${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        } flex items-center justify-center gap-8 mb-12`}
        style={{ animationDelay: '0.4s' }}
      >
        <div className="w-[80px] text-[24px] font-medium text-slate-900 tracking-tight text-center">
          Apple
        </div>
        <div className="w-[83px] text-[24px] font-medium text-slate-900 tracking-tight text-center">
          IDEO
        </div>
        <div className="w-[110px] text-[24px] font-medium text-slate-900 tracking-tight text-center">
          Polygon
        </div>
      </div>

      {/* Parallax Image */}
      <div
        ref={imageRef}
        className={`${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        } w-full max-w-xs transition-transform duration-100 ease-out`}
        style={{
          animationDelay: '0.5s',
          transform: `translateY(${offsetY}px)`,
        }}
      >
        <img
          src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260330_103804_7aa5494f-4d5b-432e-9dc7-20715275f143.png&w=1280&q=85"
          alt="Chris Halaska"
          className="w-full rounded-2xl shadow-lg object-cover"
          loading="lazy"
        />
      </div>
    </section>
  );
};
