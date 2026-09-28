import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { Play, Terminal, Check, Clock, Database, Cpu, ChevronRight } from 'lucide-react';

export const SqlSandboxSection: React.FC = () => {
  const { ref: sectionRef, isInView } = useInViewAnimation<HTMLElement>({ threshold: 0.1 });
  const { sqlSandbox } = PORTFOLIO_DATA;
  const [selectedId, setSelectedId] = useState<string>(sqlSandbox[0].id);
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(true);

  const activeQuery = sqlSandbox.find((q) => q.id === selectedId) || sqlSandbox[0];

  const handleRunQuery = () => {
    setIsExecuting(true);
    setHasExecuted(false);
    setTimeout(() => {
      setIsExecuting(false);
      setHasExecuted(true);
    }, 600);
  };

  // Syntax highlight (minimal)
  const highlightSQL = (sql: string) => {
    const keywords = ['SELECT','FROM','WHERE','WITH','AS','CASE','WHEN','THEN','ELSE','END','LEFT','JOIN','ON','ORDER','BY','GROUP','DESC','ASC','LIMIT','AND','OR','NOT','IN','OVER','PARTITION','EXTRACT','ROUND','COUNT','AVG','SUM','MAX','MIN','INTERVAL','CURRENT_DATE'];
    let out = sql
      .replace(/--[^\n]*/g, m => `<span class="text-gh-fg-subtle italic">${m}</span>`)
      .replace(/('([^']*)')/g, `<span style="color:#a5d6ff">'$2'</span>`);
    keywords.forEach(kw => {
      out = out.replace(new RegExp(`\\b${kw}\\b`, 'g'), `<span style="color:#ff7b72;font-weight:500">${kw}</span>`);
    });
    out = out.replace(/\b(\d+(\.\d+)?)\b/g, `<span style="color:#79c0ff">$1</span>`);
    return out;
  };

  return (
    <section ref={sectionRef} id="sandbox" className="w-full px-4 sm:px-6 py-10 bg-gh-surface/30 border-y border-gh-border">
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <div
          className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'} flex items-center gap-3 mb-6 pb-4 border-b border-gh-border`}
          style={{ animationDelay: '0.05s' }}
        >
          <Terminal className="w-5 h-5 text-gh-fg-muted" />
          <h2 className="text-gh-fg-default text-base font-semibold">
            Interactive SQL Sandbox
          </h2>
          <div className="ml-auto text-xs text-gh-fg-subtle font-mono">
            postgresql://analytics:5432/gold_dw
          </div>
        </div>

        {/* Main sandbox */}
        <div
          className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'} gh-code-block overflow-hidden`}
          style={{ animationDelay: '0.1s' }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-3 px-4 py-2.5 bg-gh-overlay border-b border-gh-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs text-gh-fg-subtle font-mono">query_editor.sql — vaibhav-waghmare/auto-analyst</span>
            </div>
            <button
              onClick={handleRunQuery}
              disabled={isExecuting}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-gh bg-gh-success-btn hover:bg-gh-success text-white text-xs font-medium transition-colors disabled:opacity-50 cursor-pointer border border-[#2ea043]"
            >
              {isExecuting
                ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Play className="w-3 h-3 fill-current" />}
              {isExecuting ? 'Running...' : 'Run ▶'}
            </button>
          </div>

          {/* Tab selector */}
          <div className="flex flex-wrap border-b border-gh-border bg-gh-canvas/30">
            {sqlSandbox.map((q) => (
              <button
                key={q.id}
                onClick={() => { setSelectedId(q.id); setHasExecuted(true); }}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-mono transition-colors cursor-pointer border-r border-gh-border-muted ${
                  selectedId === q.id
                    ? 'bg-gh-surface text-gh-fg-default border-b-2 border-b-gh-accent -mb-px'
                    : 'text-gh-fg-muted hover:text-gh-fg-default hover:bg-gh-overlay'
                }`}
              >
                <ChevronRight className="w-3 h-3 opacity-50" />
                {q.name}
              </button>
            ))}
          </div>

          {/* Category breadcrumb */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-gh-border-muted bg-gh-canvas/20 text-xs font-mono text-gh-fg-subtle">
            <span className="text-gh-done">repo</span>
            <span>/</span>
            <span className="text-gh-accent">{activeQuery.category}</span>
            <span>/</span>
            <span className="text-gh-fg-default">{activeQuery.id}.sql</span>
          </div>

          {/* Query editor */}
          <div className="p-4 overflow-x-auto">
            <pre
              className="text-xs md:text-sm leading-relaxed text-gh-fg-default font-mono whitespace-pre"
              dangerouslySetInnerHTML={{ __html: highlightSQL(activeQuery.query) }}
            />
          </div>

          {/* Results panel */}
          {hasExecuted && (
            <div className="border-t border-gh-border bg-gh-canvas/50">
              {/* Stats bar */}
              <div className="flex flex-wrap items-center gap-4 px-4 py-2 border-b border-gh-border text-xs font-mono">
                <span className="flex items-center gap-1 text-gh-success">
                  <Check className="w-3.5 h-3.5" /> Query successful
                </span>
                <span className="flex items-center gap-1 text-gh-fg-muted">
                  <Clock className="w-3.5 h-3.5" /> {activeQuery.stats.executionTime}
                </span>
                <span className="flex items-center gap-1 text-gh-fg-muted">
                  <Database className="w-3.5 h-3.5" /> {activeQuery.stats.rowsReturned} rows
                </span>
                <span className="flex items-center gap-1 text-gh-fg-muted">
                  <Cpu className="w-3.5 h-3.5" /> {activeQuery.stats.memoryUsed}
                </span>
                <span className="text-gh-fg-subtle ml-auto">
                  idx: {activeQuery.stats.indexUsed}
                </span>
              </div>

              {/* Result table */}
              <div className="overflow-x-auto p-4">
                <table className="w-full text-xs font-mono border-collapse">
                  <thead>
                    <tr>
                      {activeQuery.headers.map((h, i) => (
                        <th
                          key={i}
                          className="text-left px-3 py-2 text-gh-fg-subtle border-b border-gh-border font-medium uppercase tracking-wider text-[10px]"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gh-border-muted">
                    {activeQuery.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-gh-surface/50 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-3 py-2.5 text-gh-fg-default">
                            {String(cell).startsWith('FLAGGED') ? (
                              <span className="gh-label gh-label-red">{cell}</span>
                            ) : String(cell).startsWith('TOP TIER') ? (
                              <span className="gh-label gh-label-green">{cell}</span>
                            ) : String(cell).startsWith('MODERATE') ? (
                              <span className="gh-label gh-label-orange">{cell}</span>
                            ) : String(cell).startsWith('PASSED') ? (
                              <span className="gh-label gh-label-green">{cell}</span>
                            ) : (
                              <span>{cell}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
