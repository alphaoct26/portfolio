import React, { useEffect, useRef, useState } from 'react';
import { Terminal, Database, Server, Cpu, Layout, ShieldCheck } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const TYPING_TEXT = "Building systems where data integrity is guaranteed and AI operates with deterministic precision.";

export const PhilosophySection: React.FC = () => {
  const { ref: sectionRef, isInView } = useInViewAnimation<HTMLElement>({ threshold: 0.1 });
  const [typedText, setTypedText] = useState('');
  const [started, setStarted] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true);
    }
  }, [isInView, started]);

  useEffect(() => {
    if (!started) return;
    if (idx.current >= TYPING_TEXT.length) return;
    const timer = setTimeout(() => {
      setTypedText(TYPING_TEXT.slice(0, idx.current + 1));
      idx.current++;
    }, 22);
    return () => clearTimeout(timer);
  }, [started, typedText]);

  const techStack = [
    { name: 'PostgreSQL', icon: Database, color: '#4169e1' },
    { name: 'Python', icon: Terminal, color: '#3fb950' },
    { name: 'Multi-LLM', icon: Cpu, color: '#a371f7' },
    { name: 'Docker/Cloud', icon: Server, color: '#58a6ff' },
    { name: 'React/Vite', icon: Layout, color: '#61dafb' },
    { name: 'Sentinel QC', icon: ShieldCheck, color: '#3fb950' },
  ];

  return (
    <section ref={sectionRef} className="section-flow w-full px-6 sm:px-10 lg:px-16 py-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Terminal card */}
        <div
          className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'} gh-code-block overflow-hidden`}
          style={{ animationDelay: '0.1s' }}
        >
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gh-overlay border-b border-gh-border">
            <div className="w-3 h-3 rounded-full bg-gh-danger opacity-70" />
            <div className="w-3 h-3 rounded-full bg-gh-warning opacity-70" />
            <div className="w-3 h-3 rounded-full bg-gh-success opacity-70" />
            <span className="ml-3 text-xs text-gh-fg-subtle font-mono">vaibhav@portfolio:~$ philosophy.ts</span>
          </div>

          <div className="p-6 space-y-4">
            {/* Prompt line */}
            <div className="font-mono text-sm">
              <span className="text-gh-success">vaibhav</span>
              <span className="text-gh-fg-muted">@</span>
              <span className="text-gh-accent">portfolio</span>
              <span className="text-gh-fg-muted">:</span>
              <span className="text-gh-done">~</span>
              <span className="text-gh-fg-muted">$ </span>
              <span className="text-gh-fg-default">node philosophy.js</span>
            </div>

            {/* Output: typing animation */}
            <div className="font-mono text-base md:text-lg text-gh-fg-default leading-relaxed">
              <span className="text-gh-fg-subtle">{'> '}</span>
              <span className="text-gh-fg-default">{typedText}</span>
              {typedText.length < TYPING_TEXT.length && (
                <span className="terminal-cursor" />
              )}
            </div>

            {/* Exit code */}
            {typedText.length === TYPING_TEXT.length && (
              <div className="font-mono text-sm text-gh-fg-subtle">
                <div>[Process exited with code <span className="text-gh-success">0</span>]</div>
              </div>
            )}
          </div>
        </div>

        {/* Tech stack grid */}
        <div
          className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'} mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3`}
          style={{ animationDelay: '0.2s' }}
        >
          {techStack.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <div
                key={i}
                className="gh-repo-card flex flex-col items-center gap-2 p-4 hover:border-gh-accent transition-colors group cursor-default"
              >
                <Icon className="w-5 h-5" style={{ color: tech.color }} />
                <span className="font-mono text-xs text-gh-fg-muted group-hover:text-gh-fg-default transition-colors">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* README.md callout */}
        <div
          className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'} mt-6 gh-repo-card p-5`}
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gh-border">
            <svg viewBox="0 0 16 16" className="w-4 h-4 fill-gh-fg-muted" aria-hidden="true">
              <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75zm1.5.25v12.5c0 .138.112.25.25.25H14.25a.25.25 0 00.25-.25V2a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25zM8 4a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4z" />
            </svg>
            <span className="font-mono text-sm text-gh-fg-default">README.md</span>
          </div>
          <div className="space-y-3 text-sm text-gh-fg-muted leading-6">
            <p>
              <strong className="text-gh-fg-default">B.Tech CSE (HCI & Game Tech)</strong> graduate from IIIT Nagpur '26. 
              Specialized in <span className="gh-label gh-label-blue mx-1">Data Engineering</span>, 
              <span className="gh-label gh-label-purple mx-1">Agentic AI</span>, and 
              <span className="gh-label gh-label-green mx-1">Full-Stack</span> systems.
            </p>
            <p>
              10-month production internship at <strong className="text-gh-fg-default">Preci Forge & Gears, Pune</strong> — built 6-module ERP backend integrating Sales, Manufacturing & QC with zero manual bottlenecks.
            </p>
            <p>
              4x National Hackathon Finalist including <strong className="text-gh-fg-default">SIH 2023 (Ministry of Textiles, Govt. of India)</strong>. Actively targeting Data Analyst and Full-Stack roles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
