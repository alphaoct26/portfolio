// Vaibhav Waghmare Portfolio Application Logic (2026 Bento Grid & Interactive AI Edition)
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initPersonas();
  initMetrics();
  initSqlSandbox();
  initAiAssistant();
  initSkills('analytics');
  initExperience();
  initProjects('all');
  initHackathonsLeadership();
  initEducationRoadmap();
  initModals();
  initSearch();
  initSpotlight();
  initBackToTop();
  initScrollSpy();
});

// Navigation & Smooth Scroll
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
      navbar.style.background = 'rgba(7, 9, 14, 0.95)';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.background = 'rgba(7, 9, 14, 0.85)';
    }
  });

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

// Hero Persona Switcher
function initPersonas() {
  const personaContainer = document.getElementById('persona-tabs');
  const summaryEl = document.getElementById('hero-persona-summary');
  const titleEl = document.getElementById('hero-persona-title');
  const badgeEl = document.getElementById('hero-persona-badge');

  if (!personaContainer) return;

  personaContainer.innerHTML = PORTFOLIO_DATA.personas.map((p, index) => `
    <button class="persona-tab ${index === 0 ? 'active' : ''}" data-id="${p.id}">
      ${p.title}
    </button>
  `).join('');

  personaContainer.addEventListener('click', (e) => {
    const tab = e.target.closest('.persona-tab');
    if (!tab) return;

    document.querySelectorAll('.persona-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const persona = PORTFOLIO_DATA.personas.find(p => p.id === tab.dataset.id);
    if (persona) {
      titleEl.textContent = persona.title;
      summaryEl.textContent = persona.summary;
      badgeEl.textContent = persona.badge;
    }
  });
}

// Key Metrics Render
function initMetrics() {
  const metricsContainer = document.getElementById('metrics-grid');
  if (!metricsContainer) return;

  metricsContainer.innerHTML = PORTFOLIO_DATA.metrics.map(m => `
    <div class="metric-card glass-card">
      <div class="metric-value gradient-text">${m.value}</div>
      <div class="metric-label">${m.label}</div>
      <div class="metric-subtext">${m.subtext}</div>
    </div>
  `).join('');
}

// Live Interactive SQL Sandbox Engine
function initSqlSandbox() {
  const selector = document.getElementById('sql-query-selector');
  const editor = document.getElementById('sql-editor');
  const runBtn = document.getElementById('run-sql-btn');
  const copyBtn = document.getElementById('copy-sql-btn');
  const resultsContainer = document.getElementById('sql-results-container');
  const statsEl = document.getElementById('sql-stats-badge');

  if (!selector || !editor || !runBtn || !resultsContainer) return;

  // Populate Query Selector
  selector.innerHTML = PORTFOLIO_DATA.sqlSandbox.map(item => `
    <option value="${item.id}">${item.name}</option>
  `).join('');

  // Initial Load
  loadSqlQuery(PORTFOLIO_DATA.sqlSandbox[0].id);

  selector.addEventListener('change', (e) => {
    loadSqlQuery(e.target.value);
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const currentId = selector.value;
      const item = PORTFOLIO_DATA.sqlSandbox.find(s => s.id === currentId);
      if (item) {
        copyToClipboard(item.query);
      }
    });
  }

  runBtn.addEventListener('click', () => {
    const currentId = selector.value;
    const item = PORTFOLIO_DATA.sqlSandbox.find(s => s.id === currentId);
    if (!item) return;

    runBtn.innerHTML = `⏳ Running Query...`;
    runBtn.disabled = true;

    setTimeout(() => {
      renderSqlResults(item);
      runBtn.innerHTML = `▶ Execute SQL Query`;
      runBtn.disabled = false;
      showToast(`Query Executed Cleanly in ${item.stats.executionTime}`);
    }, 350);
  });
}

function colorizeSql(sql) {
  const keywords = ['WITH', 'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'LIMIT', 'JOIN', 'LEFT JOIN', 'OVER', 'PARTITION BY', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'AS', 'NOT', 'NULL', 'IS', 'INTERVAL', 'DESC', 'ASC', 'IN'];
  const funcs = ['LAG', 'EXTRACT', 'COUNT', 'AVG', 'ROUND', 'EPOCH', 'NOW', 'CURRENT_DATE'];

  let escaped = sql
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  escaped = escaped.replace(/(--.*$)/gm, '<span class="sql-comment">$1</span>');
  escaped = escaped.replace(/('([^'\\]|\\.)*')/g, '<span class="sql-str">$1</span>');
  escaped = escaped.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="sql-num">$1</span>');

  keywords.forEach(kw => {
    const regex = new RegExp(`\\b(${kw})\\b`, 'gi');
    escaped = escaped.replace(regex, '<span class="sql-kw">$1</span>');
  });

  funcs.forEach(fn => {
    const regex = new RegExp(`\\b(${fn})\\b`, 'gi');
    escaped = escaped.replace(regex, '<span class="sql-fn">$1</span>');
  });

  return escaped;
}

function loadSqlQuery(id) {
  const item = PORTFOLIO_DATA.sqlSandbox.find(s => s.id === id);
  if (!item) return;

  const editor = document.getElementById('sql-editor');
  const statsEl = document.getElementById('sql-stats-badge');

  editor.innerHTML = colorizeSql(item.query);
  statsEl.textContent = `Ready to Execute • Target DB: PostgreSQL 16 (Datamart)`;
  renderSqlResults(item);
}

function renderSqlResults(item) {
  const container = document.getElementById('sql-results-container');
  const statsEl = document.getElementById('sql-stats-badge');

  statsEl.textContent = `✓ Execution: ${item.stats.executionTime} | Rows: ${item.stats.rowsReturned} | Memory: ${item.stats.memoryUsed} | Index: ${item.stats.indexUsed}`;

  let tableHtml = `<table class="sql-results-table"><thead><tr>`;
  item.headers.forEach(h => {
    tableHtml += `<th>${h}</th>`;
  });
  tableHtml += `</tr></thead><tbody>`;

  item.rows.forEach(row => {
    tableHtml += `<tr>`;
    row.forEach(cell => {
      tableHtml += `<td>${cell}</td>`;
    });
    tableHtml += `</tr>`;
  });
  tableHtml += `</tbody></table>`;

  container.innerHTML = tableHtml;
}

// AI Recruiter Assistant Drawer
function initAiAssistant() {
  const fab = document.getElementById('ai-assistant-fab');
  const drawer = document.getElementById('ai-assistant-drawer');
  const closeBtn = document.getElementById('close-ai-drawer');
  const pillsContainer = document.getElementById('ai-pills-container');
  const responseContainer = document.getElementById('ai-response-container');
  const chatForm = document.getElementById('ai-chat-form');
  const chatInput = document.getElementById('ai-chat-input');

  if (!fab || !drawer) return;

  fab.addEventListener('click', () => {
    drawer.classList.toggle('active');
    if (drawer.classList.contains('active') && chatInput) {
      setTimeout(() => chatInput.focus(), 150);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('active');
    });
  }

  function appendChat(question, answer) {
    const chatItem = document.createElement('div');
    chatItem.style.marginBottom = '12px';
    chatItem.innerHTML = `
      <div style="font-weight:700; font-size:0.85rem; color:var(--primary-cyan); margin-bottom:4px;">Q: ${question}</div>
      <div class="ai-response-card">🤖 ${answer}</div>
    `;
    responseContainer.appendChild(chatItem);
    responseContainer.scrollTop = responseContainer.scrollHeight;
  }

  // Render Suggested Question Pills
  pillsContainer.innerHTML = PORTFOLIO_DATA.aiAssistant.suggestedQuestions.map(q => `
    <button class="ai-pill-btn" data-q="${q}">${q}</button>
  `).join('');

  pillsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.ai-pill-btn');
    if (!btn) return;

    const question = btn.dataset.q;
    const answer = PORTFOLIO_DATA.aiAssistant.answers[question];

    if (answer) {
      appendChat(question, answer);
    }
  });

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = chatInput.value.trim();
      if (!q) return;

      chatInput.value = '';

      let matchedAnswer = null;
      const lowerQ = q.toLowerCase();

      for (const [key, ans] of Object.entries(PORTFOLIO_DATA.aiAssistant.answers)) {
        if (key.toLowerCase().includes(lowerQ) || lowerQ.includes(key.toLowerCase().slice(0, 15))) {
          matchedAnswer = ans;
          break;
        }
      }

      if (!matchedAnswer) {
        if (lowerQ.includes('sentinel') || lowerQ.includes('qc') || lowerQ.includes('ats')) {
          matchedAnswer = PORTFOLIO_DATA.aiAssistant.answers["What is Sentinel QC and how does it ensure ATS integrity?"];
        } else if (lowerQ.includes('intern') || lowerQ.includes('preci') || lowerQ.includes('experience')) {
          matchedAnswer = PORTFOLIO_DATA.aiAssistant.answers["What did Vaibhav achieve during his 10-month internship at Preci Forge?"];
        } else if (lowerQ.includes('join') || lowerQ.includes('pune') || lowerQ.includes('role') || lowerQ.includes('available') || lowerQ.includes('hire')) {
          matchedAnswer = PORTFOLIO_DATA.aiAssistant.answers["Is Vaibhav available for immediate joining in Pune?"];
        } else if (lowerQ.includes('hackathon') || lowerQ.includes('award') || lowerQ.includes('sih')) {
          matchedAnswer = PORTFOLIO_DATA.aiAssistant.answers["What hackathons and awards has Vaibhav won?"];
        } else if (lowerQ.includes('cfa') || lowerQ.includes('cat') || lowerQ.includes('mba') || lowerQ.includes('goal')) {
          matchedAnswer = PORTFOLIO_DATA.aiAssistant.answers["What are Vaibhav's long-term CFA and CAT/MBA goals?"];
        } else if (lowerQ.includes('sql') || lowerQ.includes('etl') || lowerQ.includes('pipeline')) {
          matchedAnswer = PORTFOLIO_DATA.aiAssistant.answers["How does Vaibhav's SQL Medallion Architecture ETL pipeline work?"];
        } else {
          matchedAnswer = `Vaibhav is an immediate joiner based in Pune with 10 months of backend engineering internship experience at Preci Forge & Gears, 4x national hackathon finalist finishes, and production projects in ETL pipelines, Sentinel QC automated testing, and multi-LLM workflows. Reach him directly at ${PORTFOLIO_DATA.personal.email} or ${PORTFOLIO_DATA.personal.phone}.`;
        }
      }

      appendChat(q, matchedAnswer);
    });
  }
}

// Skills Matrix
function initSkills(activeCategory = 'analytics') {
  const tabsContainer = document.getElementById('skills-tabs');
  const gridContainer = document.getElementById('skills-grid');
  if (!tabsContainer || !gridContainer) return;

  const categories = [
    { id: 'analytics', label: 'Data Analytics & SQL' },
    { id: 'engineering', label: 'Full-Stack & Backend' },
    { id: 'ai', label: 'AI & Agentic Workflows' },
    { id: 'product', label: 'Product, HCI & Business' }
  ];

  tabsContainer.innerHTML = categories.map(cat => `
    <button class="skills-tab-btn ${cat.id === activeCategory ? 'active' : ''}" data-cat="${cat.id}">
      ${cat.label}
    </button>
  `).join('');

  renderSkillsGrid(activeCategory);

  tabsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.skills-tab-btn');
    if (!btn) return;
    document.querySelectorAll('.skills-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderSkillsGrid(btn.dataset.cat);
  });
}

function renderSkillsGrid(category) {
  const gridContainer = document.getElementById('skills-grid');
  const skillsList = PORTFOLIO_DATA.skills[category] || [];

  gridContainer.innerHTML = skillsList.map(s => `
    <div class="skill-card glass-card">
      <div class="skill-icon-wrapper">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <div class="skill-info">
        <div class="skill-header">
          <span class="skill-name">${s.name}</span>
          <span class="badge badge-indigo">${s.level}</span>
        </div>
        <div class="skill-desc">${s.desc}</div>
      </div>
    </div>
  `).join('');
}

// Experience Timeline
function initExperience() {
  const expContainer = document.getElementById('experience-timeline');
  if (!expContainer) return;

  expContainer.innerHTML = PORTFOLIO_DATA.experience.map(exp => `
    <div class="timeline-item">
      <div class="timeline-node"></div>
      <div class="timeline-card glass-card">
        <div class="timeline-meta">
          <div>
            <div class="company-name">${exp.company} — <span style="font-weight:400; font-size:1rem; color:var(--text-muted);">${exp.location}</span></div>
            <div class="role-title">${exp.role}</div>
          </div>
          <div class="period-badge">${exp.period}</div>
        </div>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 12px;">${exp.summary}</p>
        <div class="tech-chips">
          ${exp.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}
        </div>
        <ul class="timeline-bullets">
          ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

// Projects Showcase & Filtering
function initProjects(activeFilter = 'all') {
  const filtersContainer = document.getElementById('project-filters');
  const gridContainer = document.getElementById('projects-grid');
  if (!filtersContainer || !gridContainer) return;

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'analytics', label: 'Data & ETL Warehousing' },
    { id: 'ai', label: 'AI & OCR Intelligence' },
    { id: 'web', label: 'Full-Stack Web & APIs' }
  ];

  filtersContainer.innerHTML = filters.map(f => `
    <button class="filter-btn ${f.id === activeFilter ? 'active' : ''}" data-filter="${f.id}">
      ${f.label}
    </button>
  `).join('');

  renderProjectsGrid(activeFilter);

  filtersContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjectsGrid(btn.dataset.filter);
  });
}

function renderProjectsGrid(filter, searchQuery = '') {
  const gridContainer = document.getElementById('projects-grid');
  let filtered = PORTFOLIO_DATA.projects;

  if (filter !== 'all') {
    filtered = filtered.filter(p => p.category === filter);
  }

  if (searchQuery.trim() !== '') {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(query) ||
      p.summary.toLowerCase().includes(query) ||
      p.tech.some(t => t.toLowerCase().includes(query))
    );
  }

  if (filtered.length === 0) {
    gridContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-dim); padding: 40px;">No projects match your search criteria.</div>`;
    return;
  }

  gridContainer.innerHTML = filtered.map(p => `
    <div class="project-card glass-card">
      <div class="project-top">
        <div class="project-metrics-badge">${p.metrics}</div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-summary">${p.summary}</p>
        <div class="tech-chips">
          ${p.tech.slice(0, 5).map(t => `<span class="tech-chip">${t}</span>`).join('')}
          ${p.tech.length > 5 ? `<span class="tech-chip">+${p.tech.length - 5}</span>` : ''}
        </div>
      </div>
      <div class="project-footer" style="display:flex; justify-content:space-between; align-items:center; pt-4; border-top:1px solid rgba(255,255,255,0.06);">
        <button class="btn btn-outline btn-sm view-project-btn" data-id="${p.id}">
          Architecture & Specs ↗
        </button>
        <a href="${p.github}" target="_blank" class="social-icon-btn" title="View Source Code">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', () => openProjectModal(btn.dataset.id));
  });
}

// Live Search
function initSearch() {
  const searchInput = document.getElementById('project-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const activeFilterBtn = document.querySelector('.filter-btn.active');
    const filter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
    renderProjectsGrid(filter, e.target.value);
  });
}

// Hackathons & Leadership
function initHackathonsLeadership() {
  const hackathonsContainer = document.getElementById('hackathons-list');
  const leadershipContainer = document.getElementById('leadership-list');

  if (hackathonsContainer) {
    hackathonsContainer.innerHTML = PORTFOLIO_DATA.hackathons.map(h => `
      <div class="trophy-item">
        <div class="trophy-icon">🏆</div>
        <div>
          <div style="font-weight: 700; color: var(--text-main); font-size: 1.05rem;">${h.name}</div>
          <div style="color: var(--primary-amber); font-weight: 600; font-size: 0.9rem;">${h.rank}</div>
          <div style="color: var(--text-muted); font-size: 0.88rem; margin-top: 4px;">${h.desc}</div>
        </div>
      </div>
    `).join('');
  }

  if (leadershipContainer) {
    leadershipContainer.innerHTML = PORTFOLIO_DATA.leadership.map(l => `
      <div style="margin-bottom: 20px;">
        <div style="font-weight: 800; color: var(--text-main); font-size: 1.1rem;">${l.title}</div>
        <div style="color: var(--primary-cyan); font-weight: 600; font-size: 0.95rem; margin-bottom: 8px;">${l.org} (${l.period})</div>
        <ul class="timeline-bullets">
          ${l.points.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }
}

// Education & Career Roadmap
function initEducationRoadmap() {
  const eduContainer = document.getElementById('education-grid');
  const roadmapContainer = document.getElementById('roadmap-grid');

  if (eduContainer) {
    eduContainer.innerHTML = PORTFOLIO_DATA.education.map(e => `
      <div class="glass-card" style="padding: 24px;">
        <div class="badge badge-cyan" style="margin-bottom: 8px;">${e.period}</div>
        <h4 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 4px;">${e.degree}</h4>
        <div style="color: var(--text-muted); font-size: 0.92rem; margin-bottom: 12px;">${e.institution}</div>
        <div class="tech-chips">
          ${e.coursework.map(c => `<span class="tech-chip">${c}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  if (roadmapContainer) {
    roadmapContainer.innerHTML = PORTFOLIO_DATA.roadmap.map(r => `
      <div class="glass-card" style="padding: 24px; border-left: 3px solid var(--primary-indigo);">
        <div class="badge badge-indigo" style="margin-bottom: 8px;">${r.timeline}</div>
        <h4 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 4px;">${r.goal}</h4>
        <p style="color: var(--text-muted); font-size: 0.88rem;">${r.desc}</p>
      </div>
    `).join('');
  }
}

// Modals Handler
function initModals() {
  const projectModal = document.getElementById('project-modal');
  const masterProfileModal = document.getElementById('master-profile-modal');

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      projectModal.classList.remove('active');
      masterProfileModal.classList.remove('active');
    });
  });

  [projectModal, masterProfileModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });

  const viewMasterBtn = document.getElementById('view-master-profile-btn');
  if (viewMasterBtn) {
    viewMasterBtn.addEventListener('click', openMasterProfileModal);
  }
}

function openProjectModal(projectId) {
  const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const body = document.getElementById('project-modal-body');

  body.innerHTML = `
    <div class="badge badge-cyan" style="margin-bottom: 12px;">${project.metrics}</div>
    <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 8px;">${project.title}</h2>
    <p style="color: var(--text-muted); font-size: 1.05rem; margin-bottom: 20px;">${project.subtitle}</p>

    ${project.architectureSVG ? `
      <h4 style="color: var(--primary-cyan); font-size: 0.95rem; margin-bottom: 6px;">Visual Pipeline Architecture Flow</h4>
      ${project.architectureSVG}
    ` : ''}

    <h4 style="color: var(--primary-indigo); font-size: 1rem; margin-bottom: 12px; margin-top:20px;">Technical & Implementation Case Study</h4>
    <ul class="timeline-bullets" style="margin-bottom: 24px;">
      ${project.highlights.map(h => `<li>${h}</li>`).join('')}
    </ul>

    <h4 style="color: var(--primary-cyan); font-size: 1rem; margin-bottom: 12px;">Technology Stack</h4>
    <div class="tech-chips" style="margin-bottom: 28px;">
      ${project.tech.map(t => `<span class="tech-chip" style="font-size:0.85rem; padding:6px 12px;">${t}</span>`).join('')}
    </div>

    <div style="display: flex; gap: 16px;">
      <a href="${project.github}" target="_blank" class="btn btn-primary">
        Explore GitHub Code Repository ↗
      </a>
    </div>
  `;

  modal.classList.add('active');
}

function openMasterProfileModal() {
  const modal = document.getElementById('master-profile-modal');
  const body = document.getElementById('master-profile-modal-body');

  body.innerHTML = `
    <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 8px;">Master Career Profile — Vaibhav Waghmare</h2>
    <p style="color: var(--text-muted); margin-bottom: 24px;">Single Source of Truth for Career Story, Resumes, and Technical Background (Updated 2026)</p>

    <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 24px;">
      <h4 style="color: var(--primary-cyan); margin-bottom: 8px;">Contact & Social Info</h4>
      <p><strong>Location:</strong> ${PORTFOLIO_DATA.personal.location}</p>
      <p><strong>Phone:</strong> ${PORTFOLIO_DATA.personal.phone} <button onclick="copyToClipboard('${PORTFOLIO_DATA.personal.phone}')" class="btn btn-outline btn-sm" style="margin-left:8px; padding:2px 8px;">Copy</button></p>
      <p><strong>Email:</strong> ${PORTFOLIO_DATA.personal.email} <button onclick="copyToClipboard('${PORTFOLIO_DATA.personal.email}')" class="btn btn-outline btn-sm" style="margin-left:8px; padding:2px 8px;">Copy</button></p>
      <p><strong>LinkedIn:</strong> <a href="${PORTFOLIO_DATA.personal.linkedin}" target="_blank" style="color:var(--primary-cyan);">${PORTFOLIO_DATA.personal.linkedin}</a></p>
      <p><strong>GitHub:</strong> <a href="${PORTFOLIO_DATA.personal.github}" target="_blank" style="color:var(--primary-cyan);">${PORTFOLIO_DATA.personal.github}</a></p>
    </div>

    <h4 style="color: var(--primary-indigo); margin-bottom: 12px;">Tailored Persona Resumes & Role Summaries</h4>
    <div style="display: grid; gap: 16px;">
      ${PORTFOLIO_DATA.personas.map(p => `
        <div style="padding: 16px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <strong style="color:var(--text-main); font-size:1.05rem;">${p.title}</strong>
            <span class="badge badge-indigo">${p.badge}</span>
          </div>
          <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:12px;">${p.summary}</p>
          <button onclick="copyToClipboard('${p.resumeTitle}')" class="btn btn-outline btn-sm">
            📄 Copy Target Resume Title: ${p.resumeTitle}
          </button>
        </div>
      `).join('')}
    </div>
  `;

  modal.classList.add('active');
}

// Copy Helper & Toast
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied to clipboard: ${text}`);
  });
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}

// Spotlight Cursor Follower on Bento Cards
function initSpotlight() {
  const cards = document.querySelectorAll('.bento-card, .glass-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// Back to Top Button
function initBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Scrollspy for Navigation Links
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (current && link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
