export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  metric: string;
  tech: string[];
  github: string;
  demoUrl?: string;
  image: string;
  highlights: string[];
}

export interface SqlQuery {
  id: string;
  name: string;
  category: string;
  query: string;
  headers: string[];
  rows: (string | number)[][];
  stats: {
    executionTime: string;
    rowsReturned: number;
    memoryUsed: string;
    indexUsed: string;
  };
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Vaibhav Waghmare",
    monogram: "VW",
    tagline: "Data & Business Analyst • Full-Stack & Agentic AI Builder",
    headlinePart1: "Synthesizing raw data into ",
    headlineAccent1: "real impact",
    headlinePart2: ", the ",
    headlineAccent2: "rigorous way.",
    status: "Immediate Joiner in Pune, India",
    email: "vaibhav005waghmare@gmail.com",
    phone: "+91-8788899477",
    linkedin: "https://linkedin.com/in/vaibhav-waghmare-a27803262",
    github: "https://github.com/vaibhav-waghmare",
    bioParagraphs: [
      "B.Tech CSE (HCI & Game Tech) graduate from IIIT Nagpur '26 with 10 months of production engineering experience. I build high-throughput data pipelines and agentic AI systems engineered for zero hallucination and verifiable operational rigor.",
      "At Preci Forge & Gears, I unified Sales, Manufacturing, and QC across 6 core backend modules, eliminating manual cross-department bottlenecks and optimizing PostgreSQL schemas in undocumented production codebases.",
      "4x National Hackathon Finalist (including SIH 2023 for Ministry of Textiles). Actively interviewing for Data Analyst, Business Analyst, and Full-Stack Engineering roles.",
    ],
  },

  marqueeImages: [
    {
      title: "Sentinel QC Live Leaderboard",
      url: "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
      badge: "Sentinel QC",
    },
    {
      title: "Medallion Architecture ETL",
      url: "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
      badge: "Auto-Analyst ETL",
    },
    {
      title: "Invoice OCR Anomaly Detection",
      url: "https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif",
      badge: "Document AI",
    },
    {
      title: "ATS Tailor Resume Engine",
      url: "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
      badge: "ATS Tailor",
    },
    {
      title: "Preci Forge ERP Sync",
      url: "https://motionsites.ai/assets/hero-automation-machines-preview-DlTveRIN.gif",
      badge: "Enterprise ERP",
    },
    {
      title: "Supply Chain Analytics SIH 2023",
      url: "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
      badge: "Govt. of India SIH",
    },
    {
      title: "Multi-LLM Gateway Routing",
      url: "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
      badge: "Agentic AI Gateway",
    },
    {
      title: "Interactive SQL Sandbox Engine",
      url: "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
      badge: "PostgreSQL Sandbox",
    },
  ],

  projects: [
    {
      id: "sentinel-qc",
      name: "Sentinel QC",
      category: "Autonomous AI & Quality Control",
      description: "Autonomous Live-Ops Quality Control & Integrity Verification Suite with 40+ automated test specs preventing LLM hallucinations.",
      metric: "99.8% Schema Integrity • 40+ Automated QC Specs",
      tech: ["Python", "FastAPI", "PostgreSQL", "Docker", "Railway", "Multi-LLM"],
      github: "https://github.com/alphaoct26/Sentinel-Self-Healing-AI-Test-Automation-Agent-for-Live-Ops-QC-Workflows",
      image: "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
      highlights: [
        "Architected end-to-end automated testing & quality assurance suite with 40+ unit/integration specs for ATS scoring pipelines.",
        "Implemented real-time schema validation and anomaly flagging preventing hallucinated match scores.",
        "Created an interactive live diagnostic leaderboard and operational control panel deployed on Railway.",
      ],
    },
    {
      id: "auto-analyst",
      name: "Auto-Analyst ETL",
      category: "Data Engineering & Analytics",
      description: "Automated PostgreSQL Medallion Architecture (Bronze → Silver → Gold) data warehouse paired with a safe text-to-SQL agent.",
      metric: "70% Faster ETL Runtime • Saved 8+ Hours / Week",
      tech: ["Python", "PostgreSQL", "SQL CTEs", "Power BI", "Gemini", "Claude"],
      github: "https://github.com/vaibhav-waghmare",
      image: "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
      highlights: [
        "3-layer PostgreSQL Medallion pipeline automating extraction and transformation across 5+ data sources.",
        "Authored 20+ reusable SQL modules with CTEs and window functions for churn, cohort, and repeat frequency analysis.",
        "Built SQL Guard validation layer ensuring read-only AST safety before database submission.",
      ],
    },
    {
      id: "invoice-intelligence",
      name: "Vendor Invoice Intelligence",
      category: "Document AI & NLP",
      description: "Production OCR and NLP pipeline processing 500+ monthly vendor invoices with automated anomaly and duplicate detection.",
      metric: "65% Cut in Manual Entry • 30% Fraud Detection Boost",
      tech: ["Python", "Flask", "OCR/NLP", "PostgreSQL", "React.js"],
      github: "https://github.com/vaibhav-waghmare",
      image: "https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif",
      highlights: [
        "Automated extraction of 10+ structured fields from varied vendor PDF invoices using OCR and NLP algorithms.",
        "Built anomaly detection for duplicate invoice entries and mismatched line item totals across 500+ transactions.",
        "Deployed responsive React.js dashboard portal with real-time tracking via Flask REST API.",
      ],
    },
    {
      id: "ats-tailor",
      name: "ATS Tailor",
      category: "Agentic Systems & Web",
      description: "Single-request multi-LLM parsing and keyword compliance engine scoring resumes with instant print-ready HTML export.",
      metric: "50% Latency & API Cost Reduction • Real-Time Scoring",
      tech: ["React.js", "Vite", "Multi-LLM Gateway", "PDF.js", "Tailwind CSS"],
      github: "https://github.com/vaibhav-waghmare",
      image: "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
      highlights: [
        "Unified single-request LLM pipeline merging keyword matching, ATS scoring, and resume tailoring.",
        "Browser-side PDF parsing using PDF.js across varied multi-column candidate layouts.",
        "Print-ready HTML resume export engine with instant CSS layout previews.",
      ],
    },
  ],

  sqlSandbox: [
    {
      id: "medallion-etl",
      name: "Customer Cohort Churn (SQL CTE & Window)",
      category: "Auto-Analyst ETL",
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
      name: "OCR Invoice Anomaly Detector",
      category: "Invoice Intelligence",
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
      name: "Preci Forge ERP Department Sync",
      category: "Enterprise Backend",
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
      id: "sentinel-qc-eval",
      name: "Sentinel QC Candidate Integrity Scoring",
      category: "Sentinel QC",
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
      headers: ["candidate_id", "target_role", "ats_match_score", "missing_skills_count", "qualification_tier", "status"],
      rows: [
        ["CAND-8821", "Data Analyst", "94.5%", 1, "TOP TIER: High Probability", "PASSED_VERIFIED"],
        ["CAND-8819", "Full-Stack Dev", "88.2%", 2, "TOP TIER: High Probability", "PASSED_VERIFIED"],
        ["CAND-8790", "AI Engineer", "76.0%", 4, "MODERATE: Minor Tailoring", "FLAGGED_FORMAT"],
        ["CAND-8755", "Product Analyst", "64.8%", 7, "SUB-OPTIMAL: Skill Gap", "PASSED_VERIFIED"]
      ],
      stats: { executionTime: "5.4 ms", rowsReturned: 4, memoryUsed: "1.4 MB", indexUsed: "idx_resume_qc_score_date" }
    }
  ],

  testimonials: [
    {
      name: "Engineering Lead",
      role: "Manufacturing Operations & IT",
      company: "Preci Forge & Gears",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
      quote: "Vaibhav untangled our legacy database queries and built APIs that connected three departments seamlessly. His speed of execution and attention to schema integrity saved us hours of daily manual tracking.",
    },
    {
      name: "SIH Jury Panel",
      role: "Ministry of Textiles Hackathon",
      company: "Govt. of India",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      quote: "The wool supply chain solution delivered by Vaibhav's team demonstrated remarkable data architecture and end-to-end viability within a demanding 36-hour sprint.",
    },
    {
      name: "Academic Mentor",
      role: "HCI & Software Systems",
      company: "IIIT Nagpur",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      quote: "Vaibhav pairs deep engineering discipline with human-computer interaction principles. His work on multi-LLM gateways and ETL automation represents the top tier of undergraduate builders.",
    },
    {
      name: "Hackndore Organizing Committee",
      role: "National Hackathon Evaluator",
      company: "Indore Management Conclave",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
      quote: "Ranked Top 10 among 200+ teams. The metadata indexing and automated analytics layer Vaibhav built showed clear commercial maturity and technical elegance.",
    },
    {
      name: "Lead Collaborator",
      role: "Dimensions Club",
      company: "IIIT Nagpur",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150",
      quote: "Working alongside Vaibhav on technical events and development initiatives has been stellar. He consistently brings structured problem-solving and rigorous execution.",
    },
  ],

  stats: [
    { label: "ETL Runtime Reduced", value: "70%", detail: "PostgreSQL Medallion Gold datamart saving 8+ hrs/wk" },
    { label: "Manual Invoice Entry Cut", value: "65%", detail: "OCR + NLP automated ingestion for 500+ PDFs/mo" },
    { label: "API Cost & Latency Cut", value: "50%", detail: "Unified single-request multi-LLM pipeline" },
    { label: "Production Internship", value: "10 Mos", detail: "Preci Forge & Gears (Sales, Mfg, QC Integration)" },
    { label: "National Hackathons", value: "4x", detail: "Finalist in SIH 2023, Hackndore, and Hack4Future" },
  ]
};
