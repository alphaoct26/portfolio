import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Terminal,
  Cpu,
  Gamepad2,
  GitBranch,
} from 'lucide-react';

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
  { value: '80%+',    label: 'Auto-Patch Confidence' },
  { value: '70%',     label: 'Pipeline Runtime Cut' },
  { value: '4 Modes', label: 'Live-Ops Drift Validated' },
  { value: '4×',      label: 'National Finals' },
];

export interface ProjectItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  bullets: string[];
  metrics: { value: string; label: string };
  tech: string[];
  github: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'sentinel-qc',
    badge: 'UBISOFT TARGET · GAME QC & TEST AGENT',
    title: 'Sentinel: Self-Healing AI Test-Automation Agent for Live-Ops QC',
    subtitle: 'Autonomous Test Authoring, Headless Execution & Diagnostic Loop',
    desc: 'An AI-driven test-automation prototype tailored for live-service game QC workflows. Converts plain-English gameplay test specifications into headless Playwright suites, executes runs, and captures DOM & screenshots on failure to drive zero-downtime regression testing.',
    bullets: [
      'Self-Healing Diagnostic Loop: Accurately classifies failure modes (selector drift, assertion drift, genuine bug), automatically synthesizing patches only at 80%+ confidence and re-verifying every fix.',
      'Human Review Safeguard: On genuine backend faults (e.g. HTTP 500), declines patching and immediately logs structured incident reports, strictly protecting test-suite integrity.',
      'RAG & Audit Trail: Auto-produces before/after screenshots, unified patch diffs, and master audit logs; integrated RAG assistant over run logs and test specs, validated across 4 simulated live-ops drift modes.',
    ],
    metrics: { value: '80%+', label: 'Autonomous Patch Confidence' },
    tech: ['Python', 'Playwright', 'LLM-based diagnosis', 'RAG', 'CLI', 'Game QC'],
    github: 'https://github.com/alphaoct26/Sentinel-Self-Healing-AI-Test-Automation-Agent-for-Live-Ops-QC-Workflows',
  },
  {
    id: 'auto-analyst',
    badge: 'AI DATA WORKFLOWS · TEXT-TO-SQL',
    title: 'Auto-Analyst: AI-Powered ETL & Data Workflow Automation',
    subtitle: 'Medallion Architecture & Multi-LLM SQL Validation',
    desc: 'Production-grade data automation pipeline ingesting multi-source API data into PostgreSQL, eliminating manual analyst reporting with automated failover and safety verification layers.',
    bullets: [
      'Multi-LLM Text-to-SQL tool with automated failover across Amazon Bedrock & OpenAI APIs with AST syntax and schema safety validation layers.',
      'Validated and debugged SQL accuracy with end-to-end tests; cut pipeline execution runtime by 70%, saving 8+ analyst hours per week.',
      'Engineered structured Medallion data flow (Bronze -> Silver -> Gold) with automated drift anomaly alerts and Power BI integration.',
    ],
    metrics: { value: '70%', label: 'Pipeline Runtime Cut' },
    tech: ['Python', 'PostgreSQL', 'Amazon Bedrock', 'OpenAI APIs', 'Power BI', 'SQL'],
    github: 'https://github.com/alphaoct26/AI_workflow',
  },
  {
    id: 'preci-forge',
    badge: 'ENTERPRISE QC · BACKEND & CI/CD',
    title: 'Backend Developer Intern (Full Stack & QC Data Pipelines)',
    subtitle: 'Preci Forge & Gears, Pune · Multi-Module Production Systems',
    desc: 'Engineered REST APIs and JSON data pipelines across 6 production modules, integrating Sales, Manufacturing, and QC telemetry while collaborating directly with cross-functional engineering teams.',
    bullets: [
      'Built CI/CD pipelines with automated unit and integration test suites ensuring dependable production releases.',
      'Debugged and refactored PostgreSQL schemas to eliminate bottlenecks; modularized frontend with Micro-frontends and Redux Toolkit to strict A11y standards.',
      'Active agile cycles: sprint planning, stand-ups, retrospectives, and client demos using iterative development with stakeholder feedback.',
    ],
    metrics: { value: '6 Modules', label: 'QC & Prod Systems Connected' },
    tech: ['Node.js', 'Express.js', 'Next.js', 'PostgreSQL', 'CI/CD', 'Redux Toolkit'],
    github: 'https://github.com/alphaoct26',
  },
  {
    id: 'ats-tailor',
    badge: 'AGENTIC PIPELINES · COST OPTIMIZATION',
    title: 'ATS Tailor: Autonomous Multi-LLM Resume & Pipeline Engine',
    subtitle: 'Single-Pass Inference Architecture & Hallucination Guard',
    desc: 'High-throughput document analysis and career evaluation pipeline with multi-model parallel inference and strict structured validation.',
    bullets: [
      'Orchestrated multi-LLM optimization pipeline reducing token consumption and API operational costs by 50% via single-request parallel execution.',
      'Constructed AST validation and JSON schema enforcement to ensure zero hallucination in candidate semantic match scoring.',
      'Containerized with Docker for repeatable local development and zero-latency inference workflows.',
    ],
    metrics: { value: '50%', label: 'LLM API Cost Reduction' },
    tech: ['Python', 'FastAPI', 'Multi-LLM', 'Docker', 'TailwindCSS'],
    github: 'https://github.com/alphaoct26/Ats_Tailor-',
  },
  {
    id: 'dimensions-game-tech',
    badge: 'HCI & GAME TECH · NATIONAL FINALIST',
    title: 'Dimensions Game Tech Lab & Hackathon Prototypes',
    subtitle: 'IIIT Nagpur HCI Specialization, Game Jams & SIH Finalist',
    desc: 'Computer Science & Engineering graduate (B.Tech, IIIT Nagpur) with HCI & Game Technology specialization. Leading developer communities, Game Jams, and national hackathon squads.',
    bullets: [
      'Dimensions Club Organizer, IIITN: Organized Game Jams and hackathons at VLG Tech Fest for 30+ participants, fostering interactive game prototyping.',
      'Smart India Hackathon 2023 National Finalist: Led a 6-member engineering squad shipping a production-ready digital wool platform in 36 hours.',
      'Hackndore 2024 Top 10 of 200+ teams; Hack4Future 2nd of 50+ teams (assistive ML/NLP tool for ADHD/ASD students).',
    ],
    metrics: { value: '4× Finals', label: 'National Hackathons' },
    tech: ['C++', 'C#', 'Python', 'Game Jams', 'HCI', 'Unity Concepts'],
    github: 'https://github.com/alphaoct26',
  },
];

const RND_LAYERS = [
  {
    tier: 'TIER 01',
    role: 'Execution & Verification',
    name: 'Game QC & Test Automation Engine',
    detail: 'Python Scripting · Playwright · Headless Test Suites · DOM & Screenshot Capture · E2E Testing',
    desc: 'Converts gameplay specifications into automated headless test suites. Runs headlessly across live-ops builds, capturing DOM snapshots, console traces, and visual artifacts on regression.',
    badge: 'TESTING LIFECYCLE',
  },
  {
    tier: 'TIER 02',
    role: 'Autonomous Remediation',
    name: 'Gen-AI Diagnostic & Self-Healing Core',
    detail: 'LLM APIs (Bedrock, OpenAI, Claude, Gemini) · RAG Systems · Prompt Engineering',
    desc: 'Classifies failure roots: selector drift vs. assertion drift vs. genuine bugs. Synthesizes verified code patches at 80%+ confidence. Declines to patch backend 500 faults via Human Review Safeguard.',
    badge: 'AI INTEGRATION',
  },
  {
    tier: 'TIER 03',
    role: 'High-Performance Engineering',
    name: 'Game Technology, Systems & Languages',
    detail: 'C++ Programming · C# Programming · Python · HCI & Game Tech (IIITN) · PostgreSQL',
    desc: 'B.Tech CSE with HCI & Game Technology specialization from IIIT Nagpur. Experience in Game Jam organization, memory-conscious game scripting, and data pipelines connecting live QC telemetry.',
    badge: 'GAME TECH & HCI',
  },
  {
    tier: 'TIER 04',
    role: 'Production Tooling & SDLC',
    name: 'CI/CD Build Automation & Telemetry',
    detail: 'Jenkins · TeamCity · GitHub Actions · Git · Docker · Audit Logs & Diffs',
    desc: 'Integrates automated test suites into Jenkins & TeamCity CI/CD pipelines. Emits before/after screenshots, unified patch diffs, and master audit logs for cross-functional game QC teams.',
    badge: 'CI/CD & DEVOPS',
  },
];

const SKILL_PILLARS = [
  {
    category: 'Automation & Testing',
    subtitle: 'Game QC & Regression Workflows',
    iconType: 'terminal',
    skills: [
      'Python scripting & debugging techniques',
      'Playwright test automation framework',
      'Unit, Integration & End-to-End (E2E) testing',
      'SDLC & testing lifecycle troubleshooting',
      'Headless browser execution & DOM analysis',
      'Simulated live-ops drift modes & regression runs',
    ],
  },
  {
    category: 'AI/ML & Gen-AI Integration',
    subtitle: 'RAG & Autonomous Test Agents',
    iconType: 'cpu',
    skills: [
      'Gen-AI and RAG fundamentals over code/logs',
      'LLM APIs: OpenAI, Amazon Bedrock, Gemini, Claude',
      'Autonomous self-healing diagnostic loops',
      'Human Review Safeguards & incident triage',
      'Multi-LLM Text-to-SQL with automated failover',
      'Prompt engineering & context optimization',
    ],
  },
  {
    category: 'Languages & Game Tech',
    subtitle: 'IIIT Nagpur HCI & Game Specialization',
    iconType: 'gamepad',
    skills: [
      'C++ programming (C plus plus) & OOP',
      'C# programming (C Sharp) & game mechanics',
      'Python (tooling, automation, backend APIs)',
      'JavaScript / TypeScript / Node.js / React',
      'PostgreSQL (Medallion) & schema refactoring',
      'Dimensions Game Jam Organizer (30+ devs)',
    ],
  },
  {
    category: 'Tools, CI/CD & Process',
    subtitle: 'Production Pipelines & Leadership',
    iconType: 'git',
    skills: [
      'CI/CD Tools: Jenkins & TeamCity pipelines',
      'Version Control Systems (Git) & GitHub Actions',
      'Technical repair docs (unified diffs, audit logs)',
      'Agile / sprints, stand-ups, cross-functional QC',
      'Smart India Hackathon 2023 National Finalist',
      'Hack4Future 2nd Place & Hackndore Top 10',
    ],
  },
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

function SkillIcon({ type }: { type: string }) {
  switch (type) {
    case 'terminal': return <Terminal className="w-5 h-5 text-emerald-400" />;
    case 'cpu':      return <Cpu className="w-5 h-5 text-purple-400" />;
    case 'gamepad':  return <Gamepad2 className="w-5 h-5 text-cyan-400" />;
    case 'git':      return <GitBranch className="w-5 h-5 text-amber-400" />;
    default:         return <Terminal className="w-5 h-5 text-white" />;
  }
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

  /* Carousel state */
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  const nextProject = useCallback(() => {
    setActiveProjectIdx((prev) => (prev + 1) % PROJECTS.length);
  }, []);

  const prevProject = useCallback(() => {
    setActiveProjectIdx((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  }, []);

  useEffect(() => {
    if (isCarouselHovered) return;
    const timer = setInterval(nextProject, 7000);
    return () => clearInterval(timer);
  }, [isCarouselHovered, nextProject]);

  const activeProject = PROJECTS[activeProjectIdx];

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
                className="max-w-md text-[13px] sm:text-[15px] text-white/60 leading-relaxed"
              >
                Junior R&amp;D Engineer (IIIT Nagpur · HCI &amp; Game Technology). Crafting Python automation tools, Gen-AI diagnostic agents, and self-healing test frameworks for game testing and live-ops QC workflows.
              </motion.p>
            </div>

            {/* Right ─ role */}
            <h1
              className="font-light text-white leading-[0.95] tracking-[-0.03em] text-left md:text-right"
              style={{ fontSize: 'clamp(36px, 8vw, 84px)' }}
            >
              <ScrambleIn text="Junior R&D" delay={700}  triggered={entranceDone} />
              <br />
              <ScrambleIn text="Engineer"   delay={1000} triggered={entranceDone} />
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
            style={{ transform: xfm, opacity: opac, fontSize: 'clamp(20px, 3.5vw, 38px)' }}
            className="font-sans font-normal text-white leading-[1.35] tracking-[-0.02em] select-none text-center px-6 sm:px-12"
          >
            Autonomous test automation engineered for live-service game workflows.
            Vaibhav builds self-healing test agents, Gen-AI diagnostic loops, and automated pipeline tooling.
            From plain-English specifications to headless Playwright suites with RAG-powered failure audits.
            Selector drift, assertion drift, and genuine faults are classified and healed with mathematical confidence.
            Uncompromising quality control for world-class gaming experiences.
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
          PROJECTS CAROUSEL — Game QC & AI Automation
      ════════════════════════════════════════════════ */}
      <section
        id="work"
        className="relative overflow-hidden flex flex-col justify-center px-4 sm:px-8 md:px-16 pt-24 pb-20"
        style={{ minHeight: '100vh' }}
        onMouseEnter={() => setIsCarouselHovered(true)}
        onMouseLeave={() => setIsCarouselHovered(false)}
      >
        <VideoFill src={V.tech} />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/75 pointer-events-none" />

        <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col gap-6">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-white/50 text-[11px] sm:text-[12px] tracking-[0.2em] uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>R&amp;D Projects · Interactive Carousel</span>
              </div>
              <h2
                className="text-white font-light leading-[1.0] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(28px, 6vw, 56px)' }}
              >
                Game QC &amp; AI Automation
              </h2>
              <p className="text-white/50 text-[13px] sm:text-[14px] mt-2 max-w-xl">
                Targeted for Ubisoft Junior R&amp;D Engineer. Click any project card to open its GitHub repository directly.
              </p>
            </div>

            {/* Navigation controls */}
            <div className="flex items-center gap-3">
              <span className="text-white/40 text-[12px] font-mono tracking-wider mr-2">
                [{String(activeProjectIdx + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}]
              </span>
              <button
                onClick={prevProject}
                aria-label="Previous Project"
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextProject}
                aria-label="Next Project"
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Featured Project Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              onClick={() => window.open(activeProject.github, '_blank', 'noopener,noreferrer')}
              className="group relative cursor-pointer rounded-2xl p-6 sm:p-8 md:p-10 border border-white/15 bg-black/80 backdrop-blur-xl hover:border-white/40 transition-all duration-300 shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.08)]"
            >
              {/* Card top row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono tracking-widest uppercase bg-white/10 text-cyan-300 border border-cyan-400/20">
                    {activeProject.badge}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400/90 pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>GITHUB VERIFIED</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors text-[13px] font-mono">
                  <span>View Repository</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-white text-[22px] sm:text-[28px] md:text-[32px] font-light tracking-tight leading-tight group-hover:text-cyan-200 transition-colors">
                {activeProject.title}
              </h3>
              <p className="text-white/40 text-[12px] sm:text-[14px] font-mono mt-1 mb-4">
                {activeProject.subtitle}
              </p>

              {/* Overview */}
              <p className="text-white/70 text-[14px] sm:text-[15px] leading-relaxed mb-6 max-w-4xl">
                {activeProject.desc}
              </p>

              {/* Resume bullet points */}
              <div className="space-y-3 mb-8">
                {activeProject.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-3 text-[13px] sm:text-[14px] text-white/80 leading-relaxed">
                    <span className="text-cyan-400 font-mono text-[12px] select-none mt-0.5">▶</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Card Footer: Metrics & Tech tags */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-[20px] sm:text-[24px] font-light text-white font-mono">
                    {activeProject.metrics.value}
                  </span>
                  <span className="text-white/40 text-[11px] sm:text-[12px] uppercase tracking-wider font-mono">
                    {activeProject.metrics.label}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-white/70 group-hover:border-white/20 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Project Switcher Thumbnails / Dots */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-2">
            {PROJECTS.map((p, idx) => {
              const isCurrent = idx === activeProjectIdx;
              return (
                <button
                  key={p.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveProjectIdx(idx);
                  }}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer backdrop-blur-md flex flex-col justify-between h-[85px] ${
                    isCurrent
                      ? 'border-cyan-400/80 bg-white/10 shadow-[0_0_20px_rgba(34,211,238,0.15)]'
                      : 'border-white/10 bg-black/40 hover:bg-white/5 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono text-white/40">
                      0{idx + 1}
                    </span>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-white/30 hover:text-white transition-colors"
                      title="Open in GitHub"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="text-[12px] font-normal text-white truncate w-full">
                    {p.id === 'sentinel-qc' ? 'Sentinel QC' : p.id === 'auto-analyst' ? 'Auto-Analyst' : p.id === 'preci-forge' ? 'Preci Forge' : p.id === 'ats-tailor' ? 'ATS Tailor' : 'Game Tech Lab'}
                  </div>
                  <div className="text-[10px] font-mono text-cyan-400/80 truncate w-full">
                    {p.metrics.value} {p.metrics.label.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          STACK & TECHNICAL ARCHITECTURE
          Targeted specifically for Ubisoft Junior R&D Engineer opening
      ════════════════════════════════════════════════ */}
      <section
        id="stack"
        className="flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-16 py-28"
        style={{ minHeight: '100vh', background: '#000' }}
      >
        <div className="max-w-5xl w-full mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-6 text-[12px] text-white/70">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Target Role · Ubisoft Junior R&amp;D Engineer</span>
            </div>

            <h2
              className="text-white font-light leading-[1.1] tracking-[-0.02em] mb-6"
              style={{ fontSize: 'clamp(28px, 5.5vw, 56px)' }}
            >
              AI Integration &amp; Game QC Stack
            </h2>

            <p className="text-white/50 text-[14px] sm:text-[16px] leading-relaxed max-w-2xl mx-auto">
              Bridging Python scripting, Gen-AI diagnostic agents, and automated test frameworks to elevate live-service game QC workflows and continuous integration.
            </p>
          </motion.div>

          {/* 4-Tier QC & AI Architecture Blueprint */}
          <div className="mt-14 flex flex-col gap-4 text-left">
            <div className="text-white/40 text-[11px] tracking-[0.2em] uppercase mb-1">
              // System Architecture Blueprint
            </div>
            {RND_LAYERS.map((layer, i) => (
              <motion.div
                key={layer.tier}
                className="w-full rounded-xl p-5 sm:p-6 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/25 transition-all duration-300"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider bg-white/10 text-white/80 border border-white/10">
                      {layer.tier}
                    </span>
                    <span className="text-white text-[17px] sm:text-[19px] font-light">
                      {layer.name}
                    </span>
                  </div>
                  <span className="text-cyan-400/80 text-[11px] font-mono tracking-wider uppercase">
                    {layer.badge}
                  </span>
                </div>

                <p className="text-white/60 text-[13px] sm:text-[14px] leading-relaxed mb-3">
                  {layer.desc}
                </p>

                <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-x-2 gap-y-1 text-white/40 text-[11px] sm:text-[12px] font-mono">
                  <span className="text-white/60">Core:</span>
                  <span>{layer.detail}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 4-Pillar Competencies Grid (Exact Resume Match for Ubisoft) */}
          <div className="mt-20 text-left">
            <div className="text-white/40 text-[11px] tracking-[0.2em] uppercase mb-6 text-center">
              // Ubisoft Technical Competencies Matrix
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SKILL_PILLARS.map((pillar, i) => (
                <motion.div
                  key={pillar.category}
                  className="rounded-xl p-6 border border-white/10 bg-black/60 backdrop-blur-md hover:border-white/25 transition-all"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <SkillIcon type={pillar.iconType} />
                    <h3 className="text-white text-[16px] sm:text-[18px] font-medium">
                      {pillar.category}
                    </h3>
                  </div>
                  <p className="text-white/40 text-[12px] mb-4 font-mono">
                    {pillar.subtitle}
                  </p>

                  <ul className="space-y-2">
                    {pillar.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5 text-[12px] sm:text-[13px] text-white/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
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
                Junior R&amp;D Engineer building the next generation of game testing, AI integration, and live-ops QC automation workflows.
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
              © 2026 Vaibhav Waghmare · IIIT Nagpur CSE (HCI &amp; Game Tech).
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
