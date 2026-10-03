import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';

/* ── Video URLs ───────────────────────────────────────────────────────────── */
const V = {
  hero:      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4',
  cinematic: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4',
  metrics:   'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4',
  tech:      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4',
  footer:    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4',
};

/* ── Portfolio data ───────────────────────────────────────────────────────── */
const EMAIL    = 'vaibhav005waghmare@gmail.com';
const PHONE    = '+91-8788899477';
const LINKEDIN = 'https://linkedin.com/in/vaibhav-waghmare-a27803262';
const GITHUB   = 'https://github.com/alphaoct26';

const METRICS = [
  { value: '70%',    label: 'ETL Runtime Cut' },
  { value: '99.8%',  label: 'QC Signal Integrity' },
  { value: '10 Mos', label: 'Production Internship' },
  { value: '4×',     label: 'National Finals' },
];

const PROJECTS = [
  { title: 'Sentinel QC',           desc: 'Autonomous quality control. 40+ test specs. Zero hallucination guarantee on all LLM pipeline outputs.' },
  { title: 'Auto-Analyst ETL',      desc: 'PostgreSQL medallion pipeline with text-to-SQL and AST safety validation layer.' },
  { title: 'Invoice Intelligence',  desc: 'OCR + NLP for 500+ monthly invoices. 65% manual entry eliminated. Anomaly detection built-in.' },
  { title: 'ATS Tailor',            desc: 'Multi-LLM resume engine. Single-request pipeline reduces API cost by 50%.' },
];

const LAYERS = [
  { num: 'Layer 01', name: 'Ingest',   detail: 'PostgreSQL · Python · ETL · OCR · Power BI' },
  { num: 'Layer 02', name: 'Process',  detail: 'Multi-LLM · FastAPI · Docker · Railway · SQL Guard' },
  { num: 'Layer 03', name: 'Deliver',  detail: 'React · TypeScript · REST API · Vite · PDF.js' },
];

/* ── Scramble character pool ─────────────────────────────────────────────── */
const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';
const rnd  = () => POOL[Math.floor(Math.random() * POOL.length)];

/* ── ScrambleIn ──────────────────────────────────────────────────────────── */
function ScrambleIn({
  text, delay, triggered, className,
}: { text: string; delay: number; triggered: boolean; className?: string }) {
  const [display, setDisplay] = useState('\u00A0');
  const cursor  = useRef(0);
  const timerID = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!triggered) { setDisplay('\u00A0'); return; }
    const t = setTimeout(() => {
      cursor.current = 0;
      timerID.current = setInterval(() => {
        cursor.current += 0.5;
        const c = cursor.current;
        let out = '';
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ')  out += ' ';
          else if (i < c)       out += text[i];
          else if (i < c + 3)   out += rnd();
          // beyond cursor+3 → empty (character appears to "arrive")
        }
        setDisplay(out || '\u00A0');
        if (c >= text.length) { clearInterval(timerID.current); setDisplay(text); }
      }, 25);
    }, delay);
    return () => { clearTimeout(t); clearInterval(timerID.current); };
  }, [triggered, text, delay]);

  return <span className={className}>{display}</span>;
}

/* ── ScrambleText ────────────────────────────────────────────────────────── */
function ScrambleText({
  text, isHovered, className,
}: { text: string; isHovered: boolean; className?: string }) {
  const [display, setDisplay] = useState(text);
  const cursor  = useRef(0);
  const timerID = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    clearInterval(timerID.current);
    if (!isHovered) { setDisplay(text); return; }
    cursor.current = 0;
    timerID.current = setInterval(() => {
      cursor.current += 0.25;   // 4 frames per char
      const c = cursor.current;
      let out = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') out += ' ';
        else if (i < c)      out += text[i];
        else                 out += rnd();
      }
      setDisplay(out);
      if (c >= text.length) { clearInterval(timerID.current); setDisplay(text); }
    }, 25);
    return () => clearInterval(timerID.current);
  }, [isHovered, text]);

  return <span className={className}>{display}</span>;
}

/* ── SquashHamburger ─────────────────────────────────────────────────────── */
function SquashHamburger({ isOpen }: { isOpen: boolean }) {
  const bars = [
    { top: 0,  rotate: isOpen ? 45  : 0,  y: isOpen ?  5 : 0, opacity: 1,            scaleX: 1 },
    { top: 5,  rotate: 0,                  y: 0,               opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 },
    { top: 10, rotate: isOpen ? -45 : 0,  y: isOpen ? -5 : 0, opacity: 1,            scaleX: 1 },
  ];
  return (
    <div style={{ position: 'relative', width: 18, height: 12, pointerEvents: 'none' }}>
      {bars.map((b, i) => (
        <motion.span
          key={i}
          style={{ position: 'absolute', left: 0, right: 0, top: b.top, height: 1.5, background: '#fff', borderRadius: 2 }}
          animate={{ rotate: b.rotate, y: b.y, opacity: b.opacity, scaleX: b.scaleX }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      ))}
    </div>
  );
}

/* ── Logo SVG ────────────────────────────────────────────────────────────── */
function Logo({ size = 18 }: { size?: number }) {
  const path = 'M 1.5,23 L 1.5,33 C 1.5,38.5 6,43 11.5,43 L 16.5,43 C 22,43 26.5,38.5 26.5,33 Q 28,28 33,26.5 C 38.5,26.5 43,22 43,16.5 L 43,11.5 C 43,6 38.5,1.5 33,1.5 L 23,1.5 Q 12,12 1.5,23 Z';
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" fill="currentColor" aria-hidden>
      {[0, 90, 180, 270].map(deg => (
        <path key={deg} d={path} transform={`rotate(${deg})`} />
      ))}
    </svg>
  );
}

/* ── VideoFill ───────────────────────────────────────────────────────────── */
function VideoFill({ src, videoRef }: { src: string; videoRef?: React.RefObject<HTMLVideoElement> }) {
  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay={!videoRef}   // hero is NOT autoplay
      muted
      loop={!videoRef}
      playsInline
      preload="auto"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        objectFit: 'cover',
        pointerEvents: 'none',
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [entranceDone, setEntranceDone]     = useState(false);
  const [menuOpen,     setMenuOpen]         = useState(false);
  const [hoveredLink,  setHoveredLink]      = useState<string | null>(null);
  const [hireHovered,  setHireHovered]      = useState(false);
  const [logoHovered,  setLogoHovered]      = useState(false);

  /* hero video scrub ─────────────────────────────────────────────────── */
  const heroRef    = useRef<HTMLVideoElement>(null) as React.RefObject<HTMLVideoElement>;
  const isSeeking  = useRef(false);
  const pending    = useRef<number | null>(null);

  /* cinematic scroll spring ──────────────────────────────────────────── */
  const cinematicRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: cinematicRef,
    offset: ['start end', 'end start'],
  });
  const sp   = useSpring(scrollYProgress, { stiffness: 15, damping: 32, mass: 1.8 });
  const yVal = useTransform(sp, [0, 1], [60, -120]);
  const opac = useTransform(sp, [0.3, 0.5], [0, 1]);
  const xfm  = useMotionTemplate`rotateX(24deg) translateY(${yVal}px) translateZ(15px)`;

  /* entrance ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    const t = setTimeout(() => setEntranceDone(true), 800);
    return () => clearTimeout(t);
  }, []);

  /* hero scrub logic ─────────────────────────────────────────────────── */
  useEffect(() => {
    const video = heroRef.current;
    if (!video) return;

    const onSeeked = () => {
      isSeeking.current = false;
      if (pending.current !== null) {
        isSeeking.current  = true;
        video.currentTime  = pending.current;
        pending.current    = null;
      }
    };

    const onMove = (e: MouseEvent) => {
      const dur     = video.duration  || 10;
      const newTime = (video.currentTime || 0) + (e.movementX / window.innerWidth) * dur * 0.8;
      pending.current = Math.max(0, Math.min(dur, newTime));
      if (!isSeeking.current) {
        isSeeking.current  = true;
        video.currentTime  = pending.current!;
        pending.current    = null;
      }
    };

    video.addEventListener('seeked', onSeeked);
    document.addEventListener('mousemove', onMove);
    return () => {
      video.removeEventListener('seeked', onSeeked);
      document.removeEventListener('mousemove', onMove);
    };
  }, []);

  /* ── render ──────────────────────────────────────────────────────────── */
  return (
    <div style={{ fontFamily: '"Space Mono", monospace', background: '#000', color: '#fff' }}>

      {/* ════════════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════════════ */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-4 sm:px-6"
        animate={{ opacity: entranceDone ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* LEFT ─ logo pill + expanding menu ─────────────────────────── */}
        <div className="flex items-center gap-2">

          {/* Logo pill — hides on mobile when menu is open */}
          <motion.a
            href="#"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            className="flex items-center gap-2 h-12 px-5 rounded-[14px] backdrop-blur-md no-underline text-white"
            style={{ background: 'rgba(255,255,255,0.15)', textDecoration: 'none' }}
            animate={{ width: menuOpen ? 0 : 'auto', opacity: menuOpen ? 0 : 1, paddingLeft: menuOpen ? 0 : 20, paddingRight: menuOpen ? 0 : 20, overflow: 'hidden' }}
            whileHover={{ scale: 1.02, background: 'rgba(255,255,255,0.22)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          >
            <Logo size={18} />
            <span className="text-base font-medium tracking-tight whitespace-nowrap">
              <ScrambleText text="VW" isHovered={logoHovered} />
            </span>
          </motion.a>

          {/* Expanding menu pill ─────────────────────────────────────── */}
          <motion.div
            className="flex items-center h-12 rounded-[14px] overflow-hidden backdrop-blur-md"
            style={{ background: 'rgba(255,255,255,0.15)' }}
            animate={{ width: menuOpen ? 280 : 48 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          >
            <motion.button
              onClick={() => setMenuOpen(o => !o)}
              className="flex items-center justify-center flex-shrink-0 border-none cursor-pointer text-white"
              style={{ background: 'transparent' }}
              animate={{
                width:  menuOpen ? 36 : 48,
                height: menuOpen ? 36 : 48,
                borderRadius: menuOpen ? 11 : 14,
                marginLeft: menuOpen ? 6 : 0,
                background: menuOpen ? 'rgba(255,255,255,0.1)' : 'transparent',
              }}
              whileHover={menuOpen ? { background: 'rgba(255,255,255,0.2)' } : undefined}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            >
              <SquashHamburger isOpen={menuOpen} />
            </motion.button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="flex items-center gap-5 px-3"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.18 }}
                >
                  {['Work', 'Stack', 'Contact'].map(label => (
                    <button
                      key={label}
                      className="bg-transparent border-none cursor-pointer text-base text-white/85 hover:text-white whitespace-nowrap"
                      onMouseEnter={() => setHoveredLink(label)}
                      onMouseLeave={() => setHoveredLink(null)}
                      onClick={() => {
                        setMenuOpen(false);
                        const id = label.toLowerCase();
                        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <ScrambleText text={label} isHovered={hoveredLink === label} />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* RIGHT ─ Hire Me ────────────────────────────────────────────── */}
        <motion.a
          href={`mailto:${EMAIL}?subject=Interview%20Inquiry`}
          onMouseEnter={() => setHireHovered(true)}
          onMouseLeave={() => setHireHovered(false)}
          className="flex items-center gap-2 h-12 px-6 rounded-full text-black font-medium no-underline text-[15px]"
          style={{ background: '#fff', textDecoration: 'none' }}
          whileHover={{ scale: 1.03, background: '#e2e2e6' }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <ScrambleText text="Hire Me" isHovered={hireHovered} />
        </motion.a>
      </motion.nav>

      {/* ════════════════════════════════════════════════
          HERO — mouse-scrubbed video
      ════════════════════════════════════════════════ */}
      <section
        className="relative flex flex-col overflow-hidden"
        style={{ minHeight: '100vh' }}
      >
        {/* Hero video (NOT autoplay — scrubbed by mouse) */}
        <VideoFill src={V.hero} videoRef={heroRef} />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.05,
          }}
        />

        {/* Background watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: 'translateY(50px)' }}>
          <div
            style={{
              fontFamily: '"Anton SC", sans-serif',
              fontSize: 'clamp(120px, 30vw, 521px)',
              textTransform: 'uppercase',
              letterSpacing: '-4px',
              opacity: 0.10,
              background: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              userSelect: 'none',
              lineHeight: 1,
            }}
          >
            POTENTIAL
          </div>
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col flex-1 px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12"
          animate={{ opacity: entranceDone ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex-1" />

          {/* Bottom row */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            {/* Left ─ name + bio */}
            <div className="flex flex-col gap-4">
              <h1
                className="font-light text-white leading-[0.95] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(40px, 10vw, 100px)' }}
              >
                <ScrambleIn text="Vaibhav"   delay={200}  triggered={entranceDone} />
                <br />
                <ScrambleIn text="Waghmare"  delay={500}  triggered={entranceDone} />
              </h1>
              <motion.p
                initial={{ y: 25, opacity: 0 }}
                animate={entranceDone ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, ease: [0.215, 0.610, 0.355, 1.000], delay: 0.2 }}
                className="max-w-sm text-[13px] sm:text-[15px] text-white/60 leading-relaxed"
              >
                Built at the intersection of data engineering and agentic AI.
                Systems that map raw signals, pipeline latency, and operational state into a single adaptive intelligence layer.
              </motion.p>
            </div>

            {/* Right ─ role */}
            <h1
              className="font-light text-white leading-[0.95] tracking-[-0.03em] text-left md:text-right"
              style={{ fontSize: 'clamp(40px, 10vw, 100px)' }}
            >
              <ScrambleIn text="Data"      delay={700}  triggered={entranceDone} />
              <br />
              <ScrambleIn text="Engineer"  delay={1000} triggered={entranceDone} />
            </h1>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════
          CINEMATIC TEXT — scroll-parallax 3D
      ════════════════════════════════════════════════ */}
      <section
        ref={cinematicRef}
        className="relative overflow-hidden flex items-center justify-center"
        style={{ height: '100dvh' }}
      >
        <VideoFill src={V.cinematic} />

        {/* Top gradient fade */}
        <div
          className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
          style={{ height: 180, background: 'linear-gradient(to bottom, #010103, transparent)' }}
        />

        {/* 3D scrolling text */}
        <div className="relative z-20 max-w-5xl" style={{ perspective: 400 }}>
          <motion.p
            style={{ transform: xfm, opacity: opac, fontSize: 'clamp(22px, 4vw, 42px)' }}
            className="font-sans font-normal text-white leading-[1.35] tracking-[-0.02em] select-none text-center px-6 sm:px-12"
          >
            A data engineering system built on the architecture of PostgreSQL medallion layers.
            Vaibhav translates raw signals into structured intelligence.
            Every query becomes measurable, optimised, and visible.
            The pipeline continuously reconstructs operational state as a dynamic data map.
            Noise becomes actionable insight.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          METRICS
      ════════════════════════════════════════════════ */}
      <section
        id="metrics"
        className="relative overflow-hidden flex flex-col items-center justify-center"
        style={{ minHeight: '100vh' }}
      >
        <VideoFill src={V.metrics} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-8 py-24">
          <motion.p
            className="text-white/40 text-[11px] sm:text-[13px] tracking-[0.25em] uppercase mb-16 md:mb-24 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Performance Metrics
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                className="text-center"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div
                  className="text-white font-light leading-none tracking-[-0.04em] whitespace-nowrap"
                  style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}
                >
                  {m.value}
                </div>
                <div className="text-white/40 text-[11px] sm:text-[13px] mt-4 tracking-wide">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          TECHNOLOGY — projects grid
      ════════════════════════════════════════════════ */}
      <section
        id="work"
        className="relative overflow-hidden flex flex-col px-8 sm:px-12 md:px-16 pt-24 pb-16"
        style={{ minHeight: '100vh' }}
      >
        <VideoFill src={V.tech} />

        <div className="relative z-10 flex flex-col h-full">
          {/* Top */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <motion.h2
              className="text-white font-light leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(36px, 8vw, 72px)' }}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Agentic<br />Intelligence
            </motion.h2>
            <motion.p
              className="text-white/50 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Systems that learn your data baseline in hours.
              Every signal mapped, predicted, and optimised in real time.
            </motion.p>
          </div>

          <div className="flex-1" />

          {/* Projects grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="text-white text-[14px] sm:text-[16px] font-normal mb-2">{p.title}</div>
                <div className="text-white/40 text-[12px] sm:text-[14px] leading-relaxed">{p.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          ARCHITECTURE — pure black, no video
      ════════════════════════════════════════════════ */}
      <section
        id="stack"
        className="flex items-center justify-center text-center"
        style={{ minHeight: '100vh', background: '#000' }}
      >
        <div className="max-w-3xl w-full px-6 py-32">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">
              Architecture
            </p>
            <h2
              className="text-white font-light leading-[1.15] tracking-[-0.02em] mb-10"
              style={{ fontSize: 'clamp(28px, 6vw, 56px)' }}
            >
              Three layers. Zero friction.
            </h2>
            <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
              Ingest layer captures raw signals and structured data.
              Processing layer isolates intent and validates outputs.
              Delivery layer serves structured intelligence to any connected system.
            </p>
          </motion.div>

          <motion.div
            className="mt-20 flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            {LAYERS.map((layer, i) => (
              <motion.div
                key={layer.num}
                className="w-full flex items-center justify-between px-6 rounded-lg"
                style={{
                  maxWidth: 448,
                  height: 72,
                  border: '1px solid rgba(255,255,255,0.10)',
                }}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <div className="text-left">
                  <span className="block text-white/30 text-[12px] tracking-[0.15em] uppercase">{layer.num}</span>
                  <span className="text-white/35 text-[11px] tracking-[0.05em]">{layer.detail}</span>
                </div>
                <span className="text-white text-[16px] sm:text-[18px] font-light">{layer.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════ */}
      <footer id="contact" style={{ background: '#000', overflow: 'hidden' }}>
        <div className="flex flex-col md:flex-row" style={{ minHeight: 400 }}>

          {/* Left — video */}
          <div className="relative flex-1 h-[300px] md:h-auto">
            <VideoFill src={V.footer} />
          </div>

          {/* Right — contact */}
          <div className="flex-1 flex flex-col justify-between p-10 sm:p-16">
            <div>
              <div className="flex items-center gap-2 mb-8 text-white/70">
                <Logo size={18} />
                <span className="text-[15px] font-medium tracking-tight">Vaibhav Waghmare</span>
              </div>
              <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm">
                The next evolution of human-data interaction.
                Built for those who refuse to accept bottlenecks in the pipeline of intelligence.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <a href={`mailto:${EMAIL}`}       className="text-white/60 text-[13px] no-underline hover:text-white transition-colors">{EMAIL}</a>
                <a href={`tel:${PHONE}`}           className="text-white/60 text-[13px] no-underline hover:text-white transition-colors">{PHONE}</a>
                <div className="flex gap-5 mt-1">
                  <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-white/60 text-[13px] no-underline hover:text-white transition-colors">LinkedIn</a>
                  <a href={GITHUB}   target="_blank" rel="noopener noreferrer" className="text-white/60 text-[13px] no-underline hover:text-white transition-colors">GitHub</a>
                </div>
              </div>
            </div>

            <p className="text-white/25 text-[12px] mt-12">
              © 2026 Vaibhav Waghmare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
