import React from 'react';
import { Button } from './Button';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

export const PricingSection: React.FC = () => {
  const { ref: sectionRef, isInView } = useInViewAnimation<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="w-full py-12 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col md:items-end">
        <div className="w-full md:max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 md:justify-end">
          {/* Card 1: Dark (Monthly Partnership) */}
          <div
            className={`${
              isInView ? 'animate-fade-in-up' : 'opacity-0'
            } bg-[#051A24] text-[#F6FCFF] rounded-[40px] pl-10 pr-10 md:pr-24 pt-8 pb-10 shadow-card-dark flex flex-col justify-between`}
            style={{ animationDelay: '0.1s' }}
          >
            <div>
              <h3 className="text-[22px] font-medium text-[#F6FCFF] mb-3">
                Monthly Partnership
              </h3>
              <p className="text-sm md:text-base text-[#E0EBF0] leading-relaxed mb-8">
                A dedicated creative design team.
                <br />
                You work directly with Viktor.
              </p>
            </div>

            <div>
              <div className="mb-8">
                <div className="text-2xl font-semibold text-[#F6FCFF]">$5,000</div>
                <div className="text-sm text-[#E0EBF0]/80 mt-1">Monthly</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  href="https://halaskastudio.com/./book"
                  target="_blank"
                  className="bg-white !text-[#051A24] hover:bg-slate-100 shadow-sm"
                >
                  Start a chat
                </Button>
                <Button
                  variant="secondary"
                  href="https://halaskastudio.com/./book"
                  target="_blank"
                  className="!bg-transparent !text-[#F6FCFF] border border-white/20 hover:border-white/40 hover:!bg-white/10"
                >
                  How it works
                </Button>
              </div>
            </div>
          </div>

          {/* Card 2: Light (Custom Project) */}
          <div
            className={`${
              isInView ? 'animate-fade-in-up' : 'opacity-0'
            } bg-white text-[#0D212C] rounded-[40px] pl-10 pr-10 md:pr-24 pt-8 pb-10 shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex flex-col justify-between`}
            style={{ animationDelay: '0.2s' }}
          >
            <div>
              <h3 className="text-[22px] font-medium text-[#0D212C] mb-3">
                Custom Project
              </h3>
              <p className="text-sm md:text-base text-[#273C46] leading-relaxed mb-8">
                Fixed scope, fixed timeline.
                <br />
                Same team, same standards.
              </p>
            </div>

            <div>
              <div className="mb-8">
                <div className="text-2xl font-semibold text-[#0D212C]">$5,000</div>
                <div className="text-sm text-[#273C46] mt-1">Minimum</div>
              </div>

              <div>
                <Button
                  variant="tertiary"
                  href="https://halaskastudio.com/./book"
                  target="_blank"
                >
                  Start a chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
