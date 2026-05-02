export const PILLARS = [
  { id: 1, name: "Market & Offer Clarity", color: "pillar-1", icon: "Target" },
  { id: 2, name: "Customer Acquisition", color: "pillar-2", icon: "Users" },
  { id: 3, name: "Sales & Conversion", color: "pillar-3", icon: "TrendingUp" },
  { id: 4, name: "Profit Optimization", color: "pillar-4", icon: "PieChart" },
  { id: 5, name: "Financial & Performance Control", color: "pillar-5", icon: "BarChart3" },
] as const;

export const ORGANIZATION = {
  name: "Meridian Growth Partners",
  program: "Strategic Growth Accelerator",
  industry: "B2B Professional Services",
  owner: "Alexandra Reiner",
  ownerRole: "Managing Director",
  email: "a.reiner@meridiangrowth.com",
  startDate: "2025-11-15",
  status: "Active",
  healthScore: 78,
  engagementSummary: "12-month strategic growth engagement focused on acquisition systems, profit optimization, and financial control implementation.",
  currentPhase: "Phase 2 — Implementation",
  pillarFocus: [1, 2, 3],
};

export const KPI_DATA = [
  { label: "Lead Volume", value: "342", change: "+12%", trend: "up", pillar: 2, period: "This Month" },
  { label: "Qualified Lead Rate", value: "34%", change: "+5%", trend: "up", pillar: 2, period: "This Month" },
  { label: "Response Speed", value: "2.4h", change: "-18%", trend: "up", pillar: 3, period: "Avg" },
  { label: "Close Rate", value: "22%", change: "+3%", trend: "up", pillar: 3, period: "This Month" },
  { label: "CAC", value: "€187", change: "-8%", trend: "up", pillar: 4, period: "This Month" },
  { label: "Avg Order Value", value: "€2,340", change: "+6%", trend: "up", pillar: 4, period: "This Month" },
  { label: "Contribution Margin", value: "41%", change: "+2%", trend: "up", pillar: 4, period: "This Quarter" },
  { label: "Retention Rate", value: "87%", change: "+4%", trend: "up", pillar: 4, period: "Rolling 12mo" },
  { label: "Monthly Cash Flow", value: "€48.2K", change: "+11%", trend: "up", pillar: 5, period: "This Month" },
  { label: "Forecast Accuracy", value: "82%", change: "-2%", trend: "down", pillar: 5, period: "This Quarter" },
];

export const REPORTS = [
  { id: "r1", title: "Business Bottleneck Summary", status: "Completed", date: "2025-12-10", pillar: 1, findings: "Market positioning unclear. Value proposition needs restructuring for mid-market segment.", recommendations: 4 },
  { id: "r2", title: "Acquisition Scorecard Summary", status: "Completed", date: "2026-01-15", pillar: 2, findings: "Lead quality improving but volume insufficient. Top-of-funnel needs expansion via content and paid channels.", recommendations: 6 },
  { id: "r3", title: "Profit Snapshot Review", status: "In Review", date: "2026-02-20", pillar: 4, findings: "Margins healthy but pricing model leaves revenue on the table. Tiered pricing recommended.", recommendations: 3 },
  { id: "r4", title: "KPI Control Audit", status: "Scheduled", date: "2026-03-15", pillar: 5, findings: "Pending — scheduled for mid-March.", recommendations: 0 },
];

export const ACTION_ITEMS = [
  { id: "a1", title: "Redesign value proposition for mid-market", owner: "SG Media", dueDate: "2026-03-20", status: "In Progress", priority: "High", pillar: 1, notes: "Workshop scheduled for March 12", blocker: null },
  { id: "a2", title: "Launch LinkedIn content engine", owner: "Meridian Team", dueDate: "2026-03-25", status: "In Progress", priority: "High", pillar: 2, notes: "Content calendar approved. First batch in production.", blocker: null },
  { id: "a3", title: "Implement lead scoring framework", owner: "SG Media", dueDate: "2026-04-01", status: "Pending", priority: "Medium", pillar: 2, notes: "Waiting on CRM access.", blocker: "CRM integration pending" },
  { id: "a4", title: "Optimize sales follow-up sequence", owner: "Meridian Team", dueDate: "2026-03-30", status: "In Progress", priority: "High", pillar: 3, notes: "Email templates drafted. A/B test plan ready.", blocker: null },
  { id: "a5", title: "Develop tiered pricing model", owner: "SG Media", dueDate: "2026-04-10", status: "Pending", priority: "Medium", pillar: 4, notes: "Competitor analysis complete. Modeling phase.", blocker: null },
  { id: "a6", title: "Set up monthly P&L dashboard", owner: "SG Media", dueDate: "2026-04-15", status: "Not Started", priority: "Low", pillar: 5, notes: "Template selected. Needs data integration.", blocker: null },
  { id: "a7", title: "Create customer referral program", owner: "Meridian Team", dueDate: "2026-04-20", status: "Not Started", priority: "Medium", pillar: 2, notes: "Incentive structure to be defined.", blocker: null },
  { id: "a8", title: "Build quarterly forecast model", owner: "SG Media", dueDate: "2026-04-30", status: "Not Started", priority: "Low", pillar: 5, notes: "", blocker: null },
];

export const REVIEWS = {
  weekly: {
    date: "2026-03-07",
    week: "Week 10",
    wins: ["LinkedIn campaign launched — 2,400 impressions in first 3 days", "Sales follow-up templates approved and in testing", "Value proposition workshop booked for March 12"],
    issues: ["CRM integration delayed by 1 week", "Content production capacity tight — may need freelancer"],
    metrics: { leadsGenerated: 84, meetingsBooked: 12, proposalsSent: 5, dealsClosed: 2 },
    decisions: ["Approved freelance content writer budget", "Moved lead scoring to Phase 2B"],
    sgNotes: "Strong momentum on acquisition front. Focus this week on maintaining content cadence and preparing for the value proposition workshop. CRM delay is manageable if resolved by end of March.",
    nextPriorities: ["Complete value proposition workshop", "Review first LinkedIn content performance data", "Finalize lead scoring requirements"],
    accountability: [
      { item: "Submit CRM access credentials", owner: "Meridian Team", due: "Mar 10" },
      { item: "Deliver content batch #2", owner: "SG Media", due: "Mar 14" },
    ],
  },
  monthly: {
    month: "February 2026",
    summary: "February marked the transition from diagnostic phase to active implementation. Key frameworks were delivered and initial campaigns launched.",
    progressAreas: ["Acquisition strategy defined and first campaigns live", "Sales process documented and initial optimizations in place", "Financial baseline established"],
    metricsReview: { revenue: "€186K", leads: 312, closeRate: "20%", cac: "€203", margin: "39%" },
    improved: ["Lead generation volume (+18% vs January)", "Sales response time reduced from 4.1h to 2.4h"],
    weak: ["Close rate still below 25% target", "Content production behind schedule"],
    decisions: ["Invest in paid acquisition starting March", "Hire freelance content support"],
    nextMonthPriorities: ["Launch paid LinkedIn ads", "Complete value proposition redesign", "Implement lead scoring"],
    recommendations: "Focus March on quality over volume. The acquisition machine is turning on but conversion needs attention. Recommend dedicating a weekly sprint to sales enablement.",
  },
  quarterly: {
    quarter: "Q1 2026",
    summary: "First quarter focused on diagnostic completion, strategic framework delivery, and beginning Phase 2 implementation. Foundation is solid; execution velocity needs to increase.",
    pillarProgress: [
      { pillar: 1, progress: 60, notes: "Positioning research complete. Value prop redesign in progress." },
      { pillar: 2, progress: 45, notes: "Acquisition channels identified. LinkedIn campaign live. Paid ads pending." },
      { pillar: 3, progress: 35, notes: "Sales process documented. Follow-up optimization underway." },
      { pillar: 4, progress: 25, notes: "Pricing analysis complete. Implementation pending." },
      { pillar: 5, progress: 20, notes: "Baseline metrics established. Dashboard build scheduled." },
    ],
    lessons: ["Implementation speed is the bottleneck, not strategy quality", "Internal team capacity is a constraint — external support needed", "Quick wins in sales process generated immediate revenue lift"],
    strategicDecisions: ["Extended engagement timeline by 2 months to allow proper implementation", "Added content production support to scope"],
    unresolvedBottlenecks: ["CRM system limitations", "Internal resource allocation for marketing tasks"],
    nextQuarterPriorities: ["Scale acquisition to 500+ leads/month", "Achieve 25% close rate", "Launch tiered pricing", "Build financial dashboard"],
    longTermRecommendations: "By end of Q2, Meridian should have a self-sustaining acquisition engine. Focus Q2 on conversion optimization and profit maximization. Q3 should shift to scaling and automation.",
  },
};

export const MILESTONES = [
  { id: "m1", title: "Onboarding Complete", date: "2025-11-20", status: "Completed", phase: "Phase 1" },
  { id: "m2", title: "Business Diagnostic Delivered", date: "2025-12-10", status: "Completed", phase: "Phase 1" },
  { id: "m3", title: "Strategic Recommendations Presented", date: "2025-12-20", status: "Completed", phase: "Phase 1" },
  { id: "m4", title: "Implementation Kickoff", date: "2026-01-10", status: "Completed", phase: "Phase 2" },
  { id: "m5", title: "Acquisition Strategy Launch", date: "2026-02-01", status: "Completed", phase: "Phase 2" },
  { id: "m6", title: "Sales Process Optimization", date: "2026-02-15", status: "Completed", phase: "Phase 2" },
  { id: "m7", title: "Value Proposition Redesign", date: "2026-03-15", status: "In Progress", phase: "Phase 2" },
  { id: "m8", title: "Lead Scoring Implementation", date: "2026-04-01", status: "Upcoming", phase: "Phase 2" },
  { id: "m9", title: "Tiered Pricing Launch", date: "2026-04-15", status: "Upcoming", phase: "Phase 3" },
  { id: "m10", title: "Financial Dashboard Go-Live", date: "2026-05-01", status: "Upcoming", phase: "Phase 3" },
  { id: "m11", title: "Q2 Quarterly Review", date: "2026-06-30", status: "Upcoming", phase: "Phase 3" },
  { id: "m12", title: "Engagement Review & Renewal", date: "2026-11-15", status: "Upcoming", phase: "Phase 4" },
];

export const DOCUMENTS = [
  { id: "d1", title: "Growth Strategy Framework", category: "Frameworks", date: "2025-12-15", type: "PDF", pillar: 1 },
  { id: "d2", title: "Acquisition Channel Playbook", category: "SOPs", date: "2026-01-20", type: "PDF", pillar: 2 },
  { id: "d3", title: "Sales Follow-Up SOP", category: "SOPs", date: "2026-02-10", type: "Document", pillar: 3 },
  { id: "d4", title: "LinkedIn Content Calendar", category: "Templates", date: "2026-02-25", type: "Spreadsheet", pillar: 2 },
  { id: "d5", title: "Pricing Model Analysis", category: "Deliverables", date: "2026-02-20", type: "Spreadsheet", pillar: 4 },
  { id: "d6", title: "KPI Tracking Template", category: "Templates", date: "2026-01-10", type: "Spreadsheet", pillar: 5 },
  { id: "d7", title: "Monthly Strategy Notes — Feb", category: "Strategy Notes", date: "2026-03-01", type: "Document", pillar: 1 },
  { id: "d8", title: "Onboarding Meeting Summary", category: "Meeting Notes", date: "2025-11-20", type: "Document", pillar: 1 },
  { id: "d9", title: "Business Bottleneck Report", category: "Reports", date: "2025-12-10", type: "PDF", pillar: 1 },
  { id: "d10", title: "Acquisition Scorecard", category: "Reports", date: "2026-01-15", type: "PDF", pillar: 2 },
  { id: "d11", title: "Profit Snapshot Report", category: "Reports", date: "2026-02-20", type: "PDF", pillar: 4 },
  { id: "d12", title: "Brand Voice Guidelines", category: "Deliverables", date: "2026-01-25", type: "PDF", pillar: 1 },
];

export const RECOMMENDATIONS = [
  { id: "rec1", title: "Restructure value proposition around outcome-based messaging", pillar: 1, priority: "High", urgency: "Immediate", status: "In Progress", actionSteps: ["Complete positioning workshop", "Draft 3 messaging variants", "Test with 10 prospects"], nextDecision: "Approve final messaging by March 20" },
  { id: "rec2", title: "Scale LinkedIn content to 5x/week with mixed formats", pillar: 2, priority: "High", urgency: "This Month", status: "In Progress", actionSteps: ["Onboard freelance writer", "Create video content plan", "Set up scheduling tool"], nextDecision: "Review first month performance by April 5" },
  { id: "rec3", title: "Implement structured lead scoring to prioritize sales effort", pillar: 2, priority: "Medium", urgency: "Next 30 Days", status: "Pending", actionSteps: ["Define scoring criteria", "Configure in CRM", "Train sales team"], nextDecision: "Approve scoring model by March 25" },
  { id: "rec4", title: "Introduce tiered pricing with premium service package", pillar: 4, priority: "Medium", urgency: "Next 60 Days", status: "Pending", actionSteps: ["Finalize pricing tiers", "Create sales collateral", "Pilot with 5 clients"], nextDecision: "Approve pricing structure by April 10" },
  { id: "rec5", title: "Build real-time financial dashboard for monthly P&L visibility", pillar: 5, priority: "Low", urgency: "This Quarter", status: "Not Started", actionSteps: ["Select dashboard tool", "Map data sources", "Build initial views"], nextDecision: "Select tool by April 1" },
  { id: "rec6", title: "Create customer referral incentive program", pillar: 2, priority: "Medium", urgency: "Next 60 Days", status: "Not Started", actionSteps: ["Research competitor programs", "Design incentive structure", "Build referral landing page"], nextDecision: "Present proposal by April 15" },
];
