import React from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { GitFork, Star, ExternalLink, Github, Eye, Circle } from 'lucide-react';

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  SQL: '#e38c00',
  PostgreSQL: '#336791',
  TypeScript: '#3178c6',
  React: '#61dafb',
  'React.js': '#61dafb',
  'Node.js': '#339933',
  Docker: '#2496ed',
  FastAPI: '#009688',
  Flask: '#000000',
};

const ProjectCard: React.FC<{ project: Project; index: number; imageLocal: string }> = ({ project, index, imageLocal }) => {
  const { ref, isInView } = useInViewAnimation<HTMLDivElement>({ threshold: 0.1 });

  const primaryLang = project.tech[0];

  return (
    <article
      ref={ref}
      id={`project-${project.id}`}
      className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${0.05 + (index % 4) * 0.07}s` }}
    >
      {/* GitHub-style "repository header" */}
      <div className="flex flex-wrap items-center gap-2 mb-4 font-mono text-sm">
        <svg viewBox="0 0 16 16" className="w-4 h-4 fill-gh-fg-muted flex-shrink-0" aria-hidden="true">
          <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
        </svg>
        <span className="text-gh-accent font-semibold">vaibhav-waghmare</span>
        <span className="text-gh-fg-subtle">/</span>
        <span className="text-gh-accent font-semibold">{project.id}</span>
        <span className="gh-label gh-label-blue ml-1">Public</span>
      </div>

      {/* Main card */}
      <div className="gh-repo-card overflow-hidden hover:border-gh-accent transition-colors duration-200 group">
        {/* Screenshot */}
        <div className="relative overflow-hidden border-b border-gh-border">
          <img
            src={imageLocal}
            alt={`${project.name} screenshot`}
            className="w-full h-[220px] sm:h-[320px] md:h-[420px] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            loading="lazy"
          />
          {/* top overlay bar */}
          <div className="absolute top-0 left-0 right-0 bg-gh-canvas/80 backdrop-blur-sm border-b border-gh-border px-3 py-1.5 flex items-center gap-2">
            <Circle className="w-2.5 h-2.5 fill-gh-danger text-gh-danger" />
            <Circle className="w-2.5 h-2.5 fill-gh-warning text-gh-warning" />
            <Circle className="w-2.5 h-2.5 fill-gh-success text-gh-success" />
            <span className="font-mono text-xs text-gh-fg-subtle ml-2 truncate">{project.category}</span>
            {/* Live badge */}
            <span className="ml-auto gh-label gh-label-green text-[11px]">● live</span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="text-gh-accent font-semibold text-lg leading-tight hover:underline cursor-pointer">
                {project.name}
              </h3>
              <p className="text-gh-fg-muted text-sm mt-1 leading-5">
                {project.description}
              </p>
            </div>
          </div>

          {/* Metric badge */}
          <div className="gh-label gh-label-orange mb-4 text-[11px]">
            ⚡ {project.metric}
          </div>

          {/* Highlights as file tree */}
          <div className="gh-code-block p-4 mb-4 text-xs space-y-1">
            <div className="text-gh-fg-subtle mb-2">// key highlights</div>
            {project.highlights.map((h, i) => (
              <div key={i} className="flex gap-2 text-gh-fg-muted">
                <span className="text-gh-success flex-shrink-0">{i === project.highlights.length - 1 ? '└─' : '├─'}</span>
                <span>{h}</span>
              </div>
            ))}
          </div>

          {/* Footer: language, stars, forks, links */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gh-fg-muted pt-3 border-t border-gh-border-muted">
            {/* Primary language */}
            <div className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: LANG_COLORS[primaryLang] || '#58a6ff' }}
              />
              <span>{primaryLang}</span>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5" />
              <span>{12 + index * 7}</span>
            </div>

            {/* Forks */}
            <div className="flex items-center gap-1">
              <GitFork className="w-3.5 h-3.5" />
              <span>{3 + index * 2}</span>
            </div>

            {/* Watchers */}
            <div className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>{8 + index * 4}</span>
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1 ml-auto">
              {project.tech.slice(0, 4).map((t, i) => (
                <span key={i} className="gh-label gh-label-blue text-[10px]">{t}</span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="gh-btn gh-btn-default text-xs !px-3 !py-1.5"
              >
                <Github className="w-3.5 h-3.5" /> View Source
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gh-btn gh-btn-outline text-xs !px-3 !py-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

const PROJECT_IMAGES = [
  '/sentinel_qc.jpg',
  '/auto_analyst.jpg',
  '/invoice_intelligence.jpg',
  '/ats_tailor.jpg',
];

export const ProjectsSection: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;

  return (
    <section id="work" className="w-full px-4 sm:px-6 py-10">
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gh-border">
          <svg viewBox="0 0 16 16" className="w-5 h-5 fill-gh-fg-muted" aria-hidden="true">
            <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8z" />
          </svg>
          <h2 className="text-gh-fg-default text-base font-semibold">
            Repositories
            <span className="ml-2 gh-label gh-label-blue">{projects.length}</span>
          </h2>
          <div className="ml-auto flex gap-2 text-xs text-gh-fg-muted font-mono">
            <span>Sort by: <span className="text-gh-fg-default">Recently updated ▾</span></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              imageLocal={PROJECT_IMAGES[index] ?? PROJECT_IMAGES[0]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
