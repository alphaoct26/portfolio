// Vaibhav Waghmare — Master Portfolio Data Model (2026 Bento Grid & Interactive AI Edition)

const PORTFOLIO_DATA = {
  personal: {
    name: "Vaibhav Waghmare",
    tagline: "Data & Business Analyst | Full-Stack & Agentic AI Builder",
    subTagline: "B.Tech CSE (HCI & Game Tech) @ IIIT Nagpur '26 | 10-Month B2B Engineering Intern | 4x National Hackathon Finalist",
    location: "Pune, Maharashtra, India",
    phone: "+91-8788899477",
    email: "vaibhav005waghmare@gmail.com",
    linkedin: "https://linkedin.com/in/vaibhav-waghmare-a27803262",
    github: "https://github.com/vaibhav-waghmare",
    status: "Immediate Joiner for Fresher Roles in Pune",
    cfaStatus: "CFA Level 1 Candidate (In Progress)",
    catStatus: "Targeting CAT 2027 for MBA (Product Management)",
  },

  personas: [
    {
      id: "da-ba",
      title: "Data & Business Analyst",
      summary: "IIIT Nagpur CSE graduate with 2 production-grade AI/data engineering projects, a backend engineering internship, and finalist finishes in 4 national hackathons. Built multi-LLM pipelines reducing ETL runtime by 70% and manual data entry by 65%. Skilled in SQL, Python, Power BI, PostgreSQL, and business process modeling.",
      badge: "Primary Focus",
      resumeTitle: "Data_Analyst_Vaibhav_Waghmare.pdf"
    },
    {
      id: "fullstack",
      title: "Full-Stack & Backend Engineer",
      summary: "10-month backend development intern at Preci Forge & Gears. Built RESTful APIs across 6 modules connecting Sales, Mfg, and QC with PostgreSQL schemas, JWT authentication, RBAC, and automated SMTP workflows in undocumented legacy environments.",
      badge: "Internship Proven",
      resumeTitle: "Backend_Developer_Vaibhav_Waghmare.pdf"
    },
    {
      id: "ai-agentic",
      title: "AI & Agentic Systems Builder",
      summary: "Engineered multi-LLM failover gateways (Gemini, Claude, NVIDIA NIM), text-to-SQL chat agents with query plan safeguards, OCR/NLP invoice intelligence portals, and real-time ATS optimization web apps.",
      badge: "AI-Native",
      resumeTitle: "AI_Agentic_Developer_Vaibhav_Waghmare.pdf"
    },
    {
      id: "support-eng",
      title: "Technical Support & Reliability",
      summary: "Hands-on experience debugging production pipelines across Linux, SQL, and Python layers. Built automated failover, root-cause log analysis, and system health monitors.",
      badge: "System Reliability",
      resumeTitle: "Support_Engineer_Vaibhav_Waghmare.pdf"
    }
  ],

  metrics: [
    { label: "ETL Runtime Accelerated", value: "70%", subtext: "PostgreSQL Medallion Architecture saving 8+ hrs/wk", color: "indigo", bentoSpan: "col-span-1" },
    { label: "Manual Invoice Entry Cut", value: "65%", subtext: "OCR + NLP automated ingestion for 500+ PDFs/mo", color: "cyan", bentoSpan: "col-span-1" },
    { label: "API Cost & Latency Cut", value: "50%", subtext: "Unified single-request multi-LLM optimization", color: "emerald", bentoSpan: "col-span-1" },
    { label: "Engineering Internship", value: "10 Mos", subtext: "Preci Forge & Gears (Sales, Mfg, QC Integration)", color: "amber", bentoSpan: "col-span-1" },
    { label: "National Hackathons", value: "4 Finalist", subtext: "Including SIH 2023 Ministry of Textiles", color: "purple", bentoSpan: "col-span-1" }
  ],

  // Interactive Live SQL Terminal Queries & Results Simulation
  sqlSandbox: [
    {
      id: "medallion-etl",
      name: "1. Medallion Gold Layer: Customer Cohort Churn (SQL CTE & Window)",
      query: `WITH CustomerOrders AS (
  SELECT 
    customer_id, 
    order_date,
    LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date) AS prev_order
  FROM gold_customer_transactions
  WHERE status = 'COMPLETED'
),
OrderIntervals AS (
  SELECT 
    customer_id,
    EXTRACT(DAY FROM (order_date - prev_order)) AS days_between
  FROM CustomerOrders
  WHERE prev_order IS NOT NULL
)
SELECT 
  CASE 
    WHEN AVG(days_between) > 60 THEN 'High Churn Risk'
    WHEN AVG(days_between) BETWEEN 30 AND 60 THEN 'Moderate Retention'
    ELSE 'Active Loyal'
  END AS retention_cohort,
  COUNT(customer_id) AS customer_count,
  ROUND(AVG(days_between), 1) AS avg_repeat_days
FROM OrderIntervals
GROUP BY 1;`,
      headers: ["retention_cohort", "customer_count", "avg_repeat_days"],
      rows: [
        ["Active Loyal", 1420, "14.2"],
        ["Moderate Retention", 580, "42.8"],
        ["High Churn Risk", 195, "78.4"]
      ],
      stats: { executionTime: "11.4 ms", rowsReturned: 3, memoryUsed: "3.8 MB", indexUsed: "idx_gold_trans_date" }
    },
    {
      id: "ocr-anomaly",
      name: "2. OCR Invoice Anomaly Detector (Duplicate & Total Check)",
      query: `SELECT 
  vendor_name,
  invoice_number,
  total_amount,
  COUNT(*) OVER (PARTITION BY vendor_name, total_amount) AS duplicate_occurrences,
  CASE 
    WHEN COUNT(*) OVER (PARTITION BY vendor_name, total_amount) > 1 THEN 'FLAGGED: Duplicate Total'
    WHEN total_amount > 50000 AND status != 'VERIFIED' THEN 'FLAGGED: High Value Audit'
    ELSE 'CLEARED'
  END AS audit_status
FROM ocr_extracted_invoices
WHERE invoice_date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY audit_status DESC, invoice_date DESC
LIMIT 5;`,
      headers: ["vendor_name", "invoice_number", "total_amount", "audit_status"],
      rows: [
        ["Precision Steel Forging Co.", "INV-2026-8891", "$62,450.00", "FLAGGED: High Value Audit"],
        ["Apex Heat Treatment Ltd.", "INV-2026-4412", "$14,200.00", "FLAGGED: Duplicate Total"],
        ["Apex Heat Treatment Ltd.", "INV-2026-4419", "$14,200.00", "FLAGGED: Duplicate Total"],
        ["Metro Logistics Pune", "INV-2026-1002", "$8,350.00", "CLEARED"],
        ["Industrial Die Works", "INV-2026-0941", "$19,800.00", "CLEARED"]
      ],
      stats: { executionTime: "8.2 ms", rowsReturned: 5, memoryUsed: "2.4 MB", indexUsed: "idx_ocr_inv_vendor_date" }
    },
    {
      id: "preci-forge-sync",
      name: "3. Preci Forge ERP: Real-Time Department Production Sync",
      query: `SELECT 
  p.order_id,
  p.part_number,
  p.current_dept,
  p.stage_status,
  q.qc_pass_rate,
  ROUND(EXTRACT(EPOCH FROM (NOW() - p.updated_at)) / 3600, 1) AS hours_in_stage
FROM production_orders p
LEFT JOIN qc_inspection_logs q ON p.order_id = q.order_id
WHERE p.stage_status IN ('PENDING', 'IN_PRODUCTION')
ORDER BY hours_in_stage DESC;`,
      headers: ["order_id", "part_number", "current_dept", "stage_status", "qc_pass_rate", "hours_in_stage"],
      rows: [
        ["ORD-9942", "GEAR-SHF-01", "Manufacturing", "IN_PRODUCTION", "99.4%", "3.5 hrs"],
        ["ORD-9945", "FORGE-BLK-09", "Quality Control", "PENDING", "98.1%", "1.2 hrs"],
        ["ORD-9950", "FLANGE-VAL-04", "Sales Dispatch", "PENDING", "100.0%", "0.4 hrs"]
      ],
      stats: { executionTime: "6.9 ms", rowsReturned: 3, memoryUsed: "1.9 MB", indexUsed: "idx_prod_orders_stage" }
    },
    {
      id: "sentinel-qc",
      name: "4. Sentinel QC: ATS Match & Integrity Anomaly Scoring",
      query: `SELECT 
  candidate_id,
  target_role,
  ats_match_score,
  missing_skills_count,
  CASE 
    WHEN ats_match_score >= 85 AND missing_skills_count <= 2 THEN 'TOP TIER: High Interview Probability'
    WHEN ats_match_score BETWEEN 70 AND 84 THEN 'MODERATE: Minor Tailoring Needed'
    ELSE 'SUB-OPTIMAL: Significant Skill Gap'
  END AS qualification_tier,
  integrity_verification_status
FROM resume_qc_evaluations
WHERE evaluated_at >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY ats_match_score DESC
LIMIT 4;`,
      headers: ["candidate_id", "target_role", "ats_match_score", "missing_skills_count", "qualification_tier", "integrity_verification_status"],
      rows: [
        ["CAND-8821", "Data Analyst", "94.5%", 1, "TOP TIER: High Interview Probability", "PASSED_VERIFIED"],
        ["CAND-8819", "Full-Stack Dev", "88.2%", 2, "TOP TIER: High Interview Probability", "PASSED_VERIFIED"],
        ["CAND-8790", "AI Engineer", "76.0%", 4, "MODERATE: Minor Tailoring Needed", "FLAGGED_FORMATTING"],
        ["CAND-8755", "Product Analyst", "64.8%", 7, "SUB-OPTIMAL: Significant Skill Gap", "PASSED_VERIFIED"]
      ],
      stats: { executionTime: "5.4 ms", rowsReturned: 4, memoryUsed: "1.4 MB", indexUsed: "idx_resume_qc_score_date" }
    }
  ],

  // AI Recruiter Assistant Knowledge Base Q&A
  aiAssistant: {
    suggestedQuestions: [
      "What did Vaibhav achieve during his 10-month internship at Preci Forge?",
      "How does Vaibhav's SQL Medallion Architecture ETL pipeline work?",
      "What is Sentinel QC and how does it ensure ATS integrity?",
      "What hackathons and awards has Vaibhav won?",
      "Is Vaibhav available for immediate joining in Pune?",
      "What are Vaibhav's long-term CFA and CAT/MBA goals?"
    ],
    answers: {
      "What did Vaibhav achieve during his 10-month internship at Preci Forge?": 
        "During his 10-month internship (Jun 2025–Apr 2026) at Preci Forge & Gears in Pune, Vaibhav built RESTful APIs across 6 backend modules connecting Sales, Manufacturing, and Quality Control. He resolved query bottlenecks in an undocumented PostgreSQL codebase, secured APIs with JWT + RBAC, and automated 3-stage order status notifications (Pending → Production → Dispatched) via SMTP, eliminating manual cross-department follow-ups.",
      
      "How does Vaibhav's SQL Medallion Architecture ETL pipeline work?": 
        "Vaibhav designed a 3-layer PostgreSQL pipeline (Bronze → Silver → Gold) in his Auto-Analyst project. Bronze ingests raw data, Silver cleans & handles quarantine records with 20+ reusable SQL CTEs/window functions, and Gold powers Power BI dashboards. He also built a multi-LLM gateway (Gemini/Claude/NIM) with an automated SQL Guard validation layer to cut pipeline runtime by 70% and save 8+ hours/week.",
      
      "What is Sentinel QC and how does it ensure ATS integrity?":
        "Sentinel QC is an autonomous live-ops quality control & test automation suite built by Vaibhav. It verifies ATS resume match algorithms, enforces strict JSON schema validation, detects LLM hallucination in candidate evaluations, and features a live diagnostic dashboard deployed on Railway with 40+ automated test specs.",

      "What hackathons and awards has Vaibhav won?": 
        "Vaibhav is a 4x national hackathon finalist: (1) Smart India Hackathon 2023 National Finalist for Ministry of Textiles (Problem SIH1308, 6-member team lead), (2) Hackndore 2024 Top 10 out of 200+ teams (digital asset management analytics), (3) Hack4Future 2nd Place out of 50+ teams (ML/NLP ADHD cognitive tool).",

      "Is Vaibhav available for immediate joining in Pune?": 
        "Yes! Vaibhav is a 2026 B.Tech CSE (HCI & Game Tech) graduate from IIIT Nagpur and an immediate joiner actively targeting Data Analyst, Business Analyst, Full-Stack Developer, and APM roles in Pune, Maharashtra.",

      "What are Vaibhav's long-term CFA and CAT/MBA goals?": 
        "Vaibhav is currently pursuing CFA Level 1 (Finance fundamentals, Financial Statement Analysis, Quantitative Methods) and planning for CAT 2027 after gaining ~12 months of solid analytics work experience, targeting top B-schools for an MBA specializing in Product Management."
    }
  },

  skills: {
    analytics: [
      { name: "SQL (PostgreSQL / MySQL)", level: "Advanced", desc: "CTEs, Window Functions, Stored Procedures, Schema Optimization", icon: "database" },
      { name: "Python Data Stack", level: "Advanced", desc: "Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn", icon: "code" },
      { name: "Power BI & Tableau", level: "Intermediate", desc: "KPI Cards, Interactive Dashboards, Data Modeling, Automated Exports", icon: "bar-chart-2" },
      { name: "Excel & EDA", level: "Advanced", desc: "Pivot Tables, Data Cleaning, Statistical Analysis, Trend Discovery", icon: "table" },
      { name: "A/B Testing & KPI Tracking", level: "Intermediate", desc: "Experiment design, conversion analytics, churn & cohort analysis", icon: "activity" }
    ],

    engineering: [
      { name: "Node.js & Express.js", level: "Advanced", desc: "RESTful API Design, Middleware, Modular Architecture", icon: "server" },
      { name: "React.js & Next.js", level: "Advanced", desc: "SPA Development, State Management, Custom Hooks, Vite", icon: "layout" },
      { name: "Python Web (Flask / Django)", level: "Intermediate", desc: "Backend REST APIs, Service Integration, ORM queries", icon: "cpu" },
      { name: "Authentication & Security", level: "Advanced", desc: "JWT Authentication, Role-Based Access Control (RBAC)", icon: "shield" },
      { name: "Databases & Warehousing", level: "Advanced", desc: "PostgreSQL, MySQL, MongoDB, Medallion Architecture (Bronze/Silver/Gold)", icon: "hard-drive" },
      { name: "Git & Version Control", level: "Advanced", desc: "Branching strategies, code reviews, collaborative workflows", icon: "git-branch" }
    ],

    ai: [
      { name: "Multi-LLM Integration", level: "Advanced", desc: "Gemini, Claude, NVIDIA NIM, API Failover Gateway", icon: "brain" },
      { name: "OCR & NLP Pipelines", level: "Advanced", desc: "Document parsing (PDF.js, Tesseract/OCR), structured field extraction", icon: "file-text" },
      { name: "Text-to-SQL & Agentic Workflows", level: "Advanced", desc: "SQL Guard, Query Validation Layer, Natural Language to SQL Agents", icon: "terminal" },
      { name: "AI-Assisted Debugging", level: "Advanced", desc: "Log analysis, automated error detection, root-cause troubleshooting", icon: "bug" }
    ],

    product: [
      { name: "Wireframing & UX (Figma)", level: "Intermediate", desc: "HCI principles, user research, prototype design", icon: "figma" },
      { name: "Agile / Scrum Delivery", level: "Advanced", desc: "Sprint planning, stakeholder communication, requirement documentation", icon: "check-square" },
      { name: "Business Process Mapping", level: "Advanced", desc: "Workflow automation, root-cause analysis, functional specs", icon: "map" },
      { name: "Finance Fundamentals (CFA)", level: "In Progress", desc: "Financial Statement Analysis, Quantitative Methods, Corporate Finance", icon: "dollar-sign" }
    ]
  },

  experience: [
    {
      role: "Backend Developer Intern (Full Stack)",
      company: "Preci Forge & Gears",
      location: "Pune, India",
      period: "June 2025 – April 2026 (10 Months)",
      tech: ["Node.js", "Express.js", "Next.js", "Python/Django", "PostgreSQL", "MySQL", "JWT Auth", "RBAC", "SMTP"],
      summary: "Designed and implemented enterprise internal management server & dynamic data integration modules for a major forge manufacturing business.",
      bullets: [
        "Built RESTful APIs across 6 backend modules, connecting 3 departments (Sales, Manufacturing, QC) with real-time production-order visibility end-to-end.",
        "Optimized PostgreSQL schemas for orders, employees, and inventory data, resolving query-latency bottlenecks in an undocumented legacy codebase.",
        "Secured API access with JWT-based authentication and Role-Based Access Control (RBAC) across all 6 modules, restricting department data boundaries.",
        "Streamlined order-status notifications (Pending → In Production → Dispatched) via automated SMTP workflows and daily/weekly production reporting.",
        "Connected business goals (market exposure & operational transparency) with technical solutions (low-latency schema design, asset optimization).",
        "Applied enterprise web standards (Core Web Vitals, Technical SEO) and conducted root-cause analysis for site health and latency monitoring."
      ]
    },
    {
      role: "Freelance Business Analyst / Consultant",
      company: "Gurukrupa Forging",
      location: "MIDC Kupwad, Sangli",
      period: "2025",
      tech: ["Business Analysis", "Process Documentation", "Data Mapping", "Project Reporting"],
      summary: "Conducted business analysis and operational documentation for a steel forging business.",
      bullets: [
        "Generated a comprehensive professional project report outlining operational workflows and bottleneck analysis.",
        "Created process flow diagrams and data requirements for future digital enterprise automation."
      ]
    }
  ],

  projects: [
    {
      id: "sentinel-qc",
      title: "Sentinel QC — Automated Resume ATS & Integrity Verification Engine",
      subtitle: "Autonomous Quality Control, Schema Integrity Validation & Live Leaderboard Suite",
      category: "ai",
      tech: ["Python", "Pytest", "FastAPI", "PostgreSQL", "Docker", "Railway", "Multi-LLM", "Data Quality"],
      github: "https://github.com/alphaoct26/Sentinel-Self-Healing-AI-Test-Automation-Agent-for-Live-Ops-QC-Workflows",
      metrics: "99.8% Schema Integrity | 40+ Automated QC Test Suite",
      featured: true,
      summary: "Engineered an autonomous live-ops quality control framework ensuring ATS parsing integrity, LLM match evaluation accuracy, and schema validation across high-volume applicant pipelines.",
      architectureSVG: `
        <div class="arch-diagram-box">
          <div class="arch-node bronze">Resume & Job Ingestion</div>
          <div class="arch-arrow">➔</div>
          <div class="arch-node silver">Sentinel Automated QC & Integrity Gate</div>
          <div class="arch-arrow">➔</div>
          <div class="arch-node gold">Live Diagnostic Dashboard & Leaderboard</div>
        </div>
      `,
      highlights: [
        "Architected an end-to-end automated testing & quality assurance suite with 40+ unit/integration tests for ATS scoring pipelines.",
        "Implemented real-time schema validation and anomaly flagging preventing hallucinated match scores and corrupted candidate profiles.",
        "Created an interactive live diagnostic leaderboard and operational control panel deployed on Railway cloud infrastructure.",
        "Automated failover handling and self-healing test automation scripts for live operational workflows."
      ]
    },
    {
      id: "auto-analyst",
      title: "Auto-Analyst — Multi-LLM AI-Powered ETL & BI Pipeline",
      subtitle: "Automated Medallion Architecture Data Warehouse with Text-to-SQL Chat Agent",
      category: "analytics",
      tech: ["Python", "SQL", "PostgreSQL", "Power BI", "Gemini", "Claude", "NVIDIA NIM", "Pandas", "NumPy"],
      github: "https://github.com/vaibhav-waghmare",
      metrics: "70% Pipeline Acceleration | Saved 8+ Hrs/Week",
      featured: true,
      summary: "Designed a 3-layer Medallion Architecture (Bronze → Silver → Gold) in PostgreSQL automating ETL across 5+ data sources, coupled with an AI-native text-to-SQL chat agent.",
      architectureSVG: `
        <div class="arch-diagram-box">
          <div class="arch-node bronze">Bronze (Raw Data Stage)</div>
          <div class="arch-arrow">➔</div>
          <div class="arch-node silver">Silver (SQL Clean & Quarantine)</div>
          <div class="arch-arrow">➔</div>
          <div class="arch-node gold">Gold (Analytics & KPI Datamart)</div>
        </div>
      `,
      highlights: [
        "Built Bronze → Silver → Gold PostgreSQL data pipeline with automated quality checks and quarantine handling for bad records.",
        "Authored 20+ reusable SQL modules (CTEs, window functions, stored procedures) for churn, cohort, and sales analysis.",
        "Orchestrated a multi-LLM gateway with automatic failover (Gemini, Claude, NVIDIA NIM) powering a natural-language-to-SQL agent.",
        "Implemented SQL Guard + query-plan validation layer enforcing safe read-only query execution before database submission.",
        "Automated Power BI dashboards and PowerPoint report generation directly from pipeline outputs, delivering 6+ KPI cards."
      ]
    },
    {
      id: "invoice-intelligence",
      title: "Vendor Invoice Intelligence Portal (OCR / NLP)",
      subtitle: "Agentic PDF Processing & Anomaly Detection System for 500+ Monthly Transactions",
      category: "ai",
      tech: ["Python", "Flask", "OCR", "NLP", "PostgreSQL", "React.js", "Figma", "Agile"],
      github: "https://github.com/vaibhav-waghmare",
      metrics: "65% Manual Entry Reduction | 30% Fraud Detection Boost",
      featured: true,
      summary: "Engineered an AI-assisted OCR + NLP system to ingest vendor invoice PDFs, extract structured fields, and detect transactional anomalies.",
      architectureSVG: `
        <div class="arch-diagram-box">
          <div class="arch-node bronze">PDF Ingestion (500+ PDFs)</div>
          <div class="arch-arrow">➔</div>
          <div class="arch-node silver">OCR + NLP Field Extractor</div>
          <div class="arch-arrow">➔</div>
          <div class="arch-node gold">Anomaly Flagging Engine</div>
        </div>
      `,
      highlights: [
        "Automated extraction of 10+ structured fields from vendor PDF invoices using OCR and NLP algorithms.",
        "Built anomaly detection for duplicate invoice entries and mismatched line item totals across 500+ monthly vendor transactions.",
        "Deployed a responsive React.js dashboard portal with real-time tracking via Flask REST API and PostgreSQL backend.",
        "Managed delivery across Agile/Scrum sprints using Figma wireframes and stakeholder feedback reviews."
      ]
    },
    {
      id: "ats-tailor",
      title: "ATS Tailor — AI Resume Optimization Web App",
      subtitle: "Single-Request Multi-LLM Parsing & Real-Time Resume Compliance Engine",
      category: "web",
      tech: ["React.js", "Vite", "Multi-LLM (Gemini/Claude/NVIDIA NIM)", "PDF.js", "HTML Export"],
      github: "https://github.com/vaibhav-waghmare",
      metrics: "50% Latency & API Cost Cut | Real-Time Scoring",
      featured: true,
      summary: "Developed a live React/Vite SPA scoring resumes against job descriptions using LLM APIs with instant keyword gap analysis.",
      architectureSVG: `
        <div class="arch-diagram-box">
          <div class="arch-node bronze">Browser PDF.js Ingestion</div>
          <div class="arch-arrow">➔</div>
          <div class="arch-node silver">Single-Request Unified LLM Pipeline</div>
          <div class="arch-arrow">➔</div>
          <div class="arch-node gold">Print-Ready Resume Export</div>
        </div>
      `,
      highlights: [
        "Designed a unified single-request LLM pipeline merging keyword matching, ATS scoring, and resume tailoring — cutting API cost & latency by 50%.",
        "Implemented browser-side PDF parsing using PDF.js across varied resume layouts.",
        "Built a print-ready, single-page HTML resume export engine with instant CSS layout previews.",
        "Deployed SPA with automatic fallback to direct client-side API requests for static hosting."
      ]
    },
    {
      id: "internal-erp",
      title: "Centralized Internal Management Server & API Layer",
      subtitle: "Real-Time Multi-Department Enterprise Integration for Manufacturing",
      category: "web",
      tech: ["Node.js", "Express.js", "PostgreSQL", "Next.js", "JWT Auth", "RBAC", "SMTP"],
      github: "https://github.com/vaibhav-waghmare",
      metrics: "Real-Time 3-Dept Sync | Zero Manual Follow-ups",
      featured: false,
      summary: "Built the backend server infrastructure connecting Sales, Manufacturing, and Quality Control departments at Preci Forge & Gears.",
      highlights: [
        "Connected 3 core departments with real-time production-order tracking and automated 3-stage notification workflows (Pending → In Production → Dispatched).",
        "Created low-latency RESTful API versioning layer for inventory queries and order specs.",
        "Enforced strict Role-Based Access Control (RBAC) and JWT authentication to protect confidential enterprise data."
      ]
    },
    {
      id: "wool-digitalization",
      title: "Wool Market Digitalization Platform (SIH 2023)",
      subtitle: "National Finalist Solution for Ministry of Textiles, Govt. of India",
      category: "analytics",
      tech: ["React", "Node.js", "Express", "PostgreSQL", "REST APIs", "Supply Chain Analytics"],
      github: "https://github.com/vaibhav-waghmare",
      metrics: "National Finalist | 36-Hour Hackathon Ship",
      featured: true,
      summary: "Led a 6-member team to design and ship a production-ready wool supply-chain digitalization platform in 36 hours.",
      highlights: [
        "Selected as National Finalist for Problem Statement SIH1308 (Ministry of Textiles).",
        "Digitized 3+ supply-chain stages linking sheep farmers, wool collectors, and manufacturing textile hubs.",
        "Built transparent price tracking and inventory analytics for market stakeholders."
      ]
    },
    {
      id: "digital-asset-mgr",
      title: "Digital Asset Management & Analytics (Hackndore 2024)",
      subtitle: "Top 10 Finalist Solution at Indore Management Conclave",
      category: "analytics",
      tech: ["Python", "Metadata Indexing", "Custom Analytics", "REST APIs"],
      github: "https://github.com/vaibhav-waghmare",
      metrics: "Top 10 / 200+ Teams | 40% Faster Discovery",
      featured: false,
      summary: "Built a metadata indexing & digital asset management solution with custom analytics layer.",
      highlights: [
        "Achieved 40% faster asset discovery for high-volume enterprise media libraries.",
        "Built metadata tagging and usage analytics dashboard."
      ]
    },
    {
      id: "adhd-cognitive-tool",
      title: "ML & NLP Cognitive Assistance Tool (Hack4Future)",
      subtitle: "2nd Place Winner out of 50+ Teams",
      category: "ai",
      tech: ["Python", "Machine Learning", "NLP", "Scikit-learn"],
      github: "https://github.com/vaibhav-waghmare",
      metrics: "2nd Place / 50+ Teams | Educational Innovation Award",
      featured: false,
      summary: "Engineered an ML and NLP cognitive assistance tool designed for students with ADHD/ASD.",
      highlights: [
        "Recognized for educational innovation and accessible NLP user interface design."
      ]
    }
  ],

  hackathons: [
    {
      name: "Smart India Hackathon (SIH) 2023",
      rank: "National Finalist (Team Lead)",
      issuer: "Ministry of Textiles, Govt. of India",
      date: "Sep 2023",
      desc: "Led 6-member team; built wool market supply-chain digitalization platform in 36 hours for Problem Statement SIH1308."
    },
    {
      name: "Hackndore 2024",
      rank: "Top 10 out of 200+ Teams",
      issuer: "Indore Management Conclave",
      date: "Mar 2024",
      desc: "Engineered digital asset management solution with metadata indexing, achieving 40% faster asset discovery."
    },
    {
      name: "Hack4Future",
      rank: "2nd Place out of 50+ Teams",
      issuer: "SBU College",
      date: "Nov 2023",
      desc: "Engineered ML & NLP cognitive tool for students with ADHD/ASD; awarded for educational technology innovation."
    }
  ],

  leadership: [
    {
      title: "Core Team & Organizer",
      org: "Dimensions Club (Game Dev Club), IIIT Nagpur",
      period: "Aug 2022 – Jun 2026",
      points: [
        "Organized Game Jam & Game Development Hackathon at VLG Tech Fest; led IIITN track for 30+ participants across 10+ teams.",
        "Planned and executed hackathons, technical webinars, and recurring community game nights.",
        "Negotiated and coordinated with external college clubs to bring technical workshops to IIIT Nagpur.",
        "Contributed to long-term strategic roadmap and club leadership succession planning."
      ]
    }
  ],

  education: [
    {
      degree: "B.Tech in Computer Science Engineering (HCI & Game Technology)",
      institution: "Indian Institute of Information Technology Nagpur (IIITN)",
      period: "Aug 2022 – Jun 2026",
      cgpa: "6.0+ CGPA",
      coursework: ["Data Structures", "DBMS", "Machine Learning", "Statistics", "Human-Computer Interaction (HCI)", "Software Engineering"]
    },
    {
      degree: "Higher Secondary Certificate — Science (PCM)",
      institution: "Rasiklal M. Dhariwal Jr. College, Pune",
      period: "Jun 2020 – May 2022",
      cgpa: "First Class",
      coursework: ["Physics", "Chemistry", "Mathematics"]
    }
  ],

  certifications: [
    {
      title: "Data Analysis with Python",
      issuer: "freeCodeCamp",
      date: "Jan 2025",
      skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Data Cleaning"]
    },
    {
      title: "Data Analytics Virtual Experience",
      issuer: "Deloitte Australia (via Forage)",
      date: "Jun 2024",
      skills: ["Data Analytics", "Data Interpretation", "Dashboard Visualization", "Client Presentation"]
    }
  ],

  roadmap: [
    {
      goal: "CFA Level 1",
      timeline: "In Active Progress",
      desc: "Building deep foundation in Financial Statement Analysis, Quantitative Methods, and Corporate Finance to pair with Data Analytics."
    },
    {
      goal: "12-Month Analytics Experience",
      timeline: "2026 – 2027",
      desc: "Targeting Data Analyst / Business Analyst roles in Pune (Persistent, KPIT, Fractal, Deutsche Bank, BNY Mellon)."
    },
    {
      goal: "CAT 2027 & MBA",
      timeline: "Target 2027",
      desc: "Preparing for CAT 2027 to pursue MBA specializing in Product Management and Business Analytics."
    }
  ]
};

if (typeof module !== 'undefined') {
  module.exports = PORTFOLIO_DATA;
}
