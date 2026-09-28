import React, { useState, useRef, useCallback } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { Phone, Copy, Check, Linkedin, Github, Mail } from 'lucide-react';

const PROJECT_IMAGES = [
  '/sentinel_qc.jpg',
  '/auto_analyst.jpg',
  '/invoice_intelligence.jpg',
  '/ats_tailor.jpg',
];

interface SpawnedThumbnail {
  id: number; x: number; y: number; rotation: number; image: string;
}

export const PartnerSection: React.FC = () => {
  const { ref: sectionRef, isInView } = useInViewAnimation<HTMLElement>({ threshold: 0.1 });
  const { personal } = PORTFOLIO_DATA;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [thumbnails, setThumbnails] = useState<SpawnedThumbnail[]>([]);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const lastSpawn = useRef<number>(0);
  const imgIdx = useRef<number>(0);
  const nextId = useRef<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const now = performance.now();
    if (now - lastSpawn.current < 90) return;
    lastSpawn.current = now;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rotation = Math.random() * 20 - 10;
    const newId = nextId.current++;
    setThumbnails((prev) => [
      ...prev.slice(-12),
      { id: newId, x: e.clientX - rect.left, y: e.clientY - rect.top, rotation, image: PROJECT_IMAGES[imgIdx.current++ % PROJECT_IMAGES.length] },
    ]);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-flow w-full py-32 flex flex-col items-center justify-center text-center select-none cursor-default relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(14,68,41,0.5) 0%, transparent 65%)' }}
    >
      {/* Mouse-trail capture overlay */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="absolute inset-0 z-0"
      />

      {/* Spawned thumbnails */}
      {thumbnails.map((item) => (
        <div
          key={item.id}
          onAnimationEnd={() => setThumbnails((p) => p.filter((t) => t.id !== item.id))}
          style={{
            position: 'absolute',
            left: `${item.x}px`,
            top: `${item.y}px`,
            transform: `translate(-50%,-50%) rotate(${item.rotation}deg)`,
            pointerEvents: 'none',
            animation: 'trailFadeOut 900ms ease-out forwards',
            zIndex: 10,
          }}
        >
          <img src={item.image} alt="" className="w-28 md:w-36 object-cover rounded-gh-md border-2 border-gh-border shadow-xl" />
        </div>
      ))}

      {/* Content */}
      <div
        className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'} relative z-20 flex flex-col items-center max-w-2xl px-6`}
        style={{ animationDelay: '0.1s' }}
      >
        <div className="gh-label gh-label-green text-sm mb-6 px-4 py-1.5">
          ● Available for Full-Time Roles — Immediate Joiner, Pune
        </div>

        <h2 className="text-3xl md:text-5xl font-semibold text-gh-fg-default mb-4 leading-tight">
          Ready to build the<br />
          <span className="text-gh-success">next production system</span>
        </h2>

        <p className="text-gh-fg-muted text-base md:text-lg max-w-lg mb-10 leading-relaxed">
          Bring rigorous data pipelines, automated ETL, and agentic AI quality systems to your engineering or analytics team.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
          <a
            href={`mailto:${personal.email}?subject=Interview%20/%20Opportunity%20Discussion`}
            className="gh-btn gh-btn-primary text-base !px-6 !py-2.5"
          >
            <Mail className="w-4 h-4" /> Connect with Vaibhav
          </a>
          <button
            onClick={handleCopyEmail}
            className="gh-btn gh-btn-default text-sm !px-5 !py-2.5 font-mono"
          >
            {copiedEmail ? <><Check className="w-4 h-4 text-gh-success" /> Copied!</> : <><Copy className="w-4 h-4" /> {personal.email}</>}
          </button>
        </div>

        <div className="flex items-center gap-6 text-sm text-gh-fg-muted">
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-gh-accent transition-colors">
            <Linkedin className="w-4 h-4 text-[#0a66c2]" /> LinkedIn
          </a>
          <a href={personal.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-gh-fg-default transition-colors">
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a href={`tel:${personal.phone}`} className="flex items-center gap-1.5 hover:text-gh-fg-default transition-colors">
            <Phone className="w-4 h-4" /> {personal.phone}
          </a>
        </div>
      </div>

      <style>{`
        @keyframes trailFadeOut {
          0%   { opacity: 0.9; transform: translate(-50%,-50%) scale(1); }
          100% { opacity: 0;   transform: translate(-50%,-50%) scale(0.65); }
        }
      `}</style>
    </section>
  );
};
