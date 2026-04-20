// Mock AI engine — drop-in replacement for real Groq/OpenAI calls
// Structure mirrors real API so swapping is trivial

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  content: string;
  suggestions?: string[];
  data?: any;
}

// Simulated delay
const delay = (ms = 900) => new Promise(r => setTimeout(r, ms));

// Context-aware system prompts per page
const PAGE_CONTEXTS: Record<string, string> = {
  '/dashboard/dashboard':   'HR overview dashboard with KPIs, revenue, headcount.',
  '/dashboard/employees':   'Employee management — 72 employees, 8 departments.',
  '/dashboard/payroll':     'Payroll data — $485K/month, 5 on processing.',
  '/dashboard/attendance':  'Attendance tracking — 89% present today, 3 late.',
  '/dashboard/leave':       'Leave management — 6 pending requests.',
  '/dashboard/recruitment': '6 candidates in pipeline, 1 offer stage.',
  '/dashboard/performance': 'Q1 performance cycle — avg rating 4.1/5.',
  '/dashboard/crm':         'CRM pipeline — $532K total, 5 active leads.',
  '/dashboard/finance':     'Finance — $2,099 expenses pending approval.',
  '/dashboard/reports':     'Reports & analytics module.',
  '/dashboard/workforce':   'Workforce intelligence & skill gap analysis.',
  '/dashboard/org-health':  'Org health score 82/100, 2 burnout risk alerts.',
  '/dashboard/executive':   'Executive C-level dashboard with combined insights.',
};

// Canned smart responses keyed by keyword patterns
const RESPONSE_BANK: { pattern: RegExp; response: (ctx: string) => AIResponse }[] = [
  {
    pattern: /attendance|absent|late/i,
    response: () => ({
      content: "📊 **Attendance Analysis:**\n\nI detected **3 employees** with consistent late arrivals this week (Marcus Johnson, Kevin O'Brien, Isaac Brown). The marketing team shows an 8% dip in attendance compared to last month.\n\n**Recommendation:** Consider a flexible start-time policy. Studies show it reduces lateness by up to 34%.",
      suggestions: ['View attendance report', 'Send nudge notifications', 'Adjust shift timings'],
    }),
  },
  {
    pattern: /payroll|salary|pay|anomal/i,
    response: () => ({
      content: "💰 **Payroll Insights:**\n\nTotal payroll this month is **$485,000** — up 3.2% from last month. I flagged a potential anomaly: **Emma Thompson** shows a salary discrepancy of $1,200 vs her contract rate.\n\n**Action required:** Review her payslip before finalizing.",
      suggestions: ['Review Emma\'s payslip', 'Run payroll audit', 'Export salary report'],
    }),
  },
  {
    pattern: /attrition|resign|quit|leave risk/i,
    response: () => ({
      content: "⚠️ **Attrition Risk Alert:**\n\nML model predicts **4 employees** are at high risk of leaving in the next 90 days:\n\n1. **Kevin O'Brien** — 78% risk (no promotion in 2 years)\n2. **Liam Foster** — 65% risk (below-market salary)\n3. **Isaac Brown** — 61% risk (low engagement scores)\n\n**Recommended actions:** Schedule 1:1s and review compensation.",
      suggestions: ['View full attrition report', 'Schedule retention interviews', 'Compare market salaries'],
    }),
  },
  {
    pattern: /top performer|best employee|performance/i,
    response: () => ({
      content: "🏆 **Top Performers — Q1 2024:**\n\n1. **Zoe Martinez** — 4.8/5 | 94% OKR completion\n2. **Mei Lin** — 4.7/5 | DevOps excellence award\n3. **Sarah Chen** — 4.6/5 | Delivered 3 major features\n\n**Recommendation:** Consider fast-track promotions for Zoe and Mei. They show leadership potential.",
      suggestions: ['View performance dashboard', 'Initiate promotion workflow', 'Send recognition awards'],
    }),
  },
  {
    pattern: /hire|hiring|recruit|candidate/i,
    response: () => ({
      content: "🎯 **Hiring Intelligence:**\n\nBased on workload analysis, I recommend hiring **2 Backend Engineers** and **1 DevOps Engineer** in Q2. Current team velocity has dropped 12% due to understaffing.\n\nTop candidate ready for offer: **Daniel Lee** (score: 88/100).",
      suggestions: ['View candidate pipeline', 'Generate JD for Backend Eng', 'Schedule interviews'],
    }),
  },
  {
    pattern: /report|generate|summary/i,
    response: () => ({
      content: "📄 **Report Generated:**\n\n**Monthly HR Summary — January 2024**\n\n- Headcount: 72 employees (+4 vs Dec)\n- Attendance rate: 91.3% (+2.1%)\n- Payroll processed: $485,000\n- Open positions: 8 (3 in final stages)\n- Employee satisfaction: 4.2/5\n- Attrition this month: 0\n\nReport is ready for download.",
      suggestions: ['Download PDF report', 'Share with executives', 'Schedule auto-report'],
    }),
  },
  {
    pattern: /create employee|add employee|onboard/i,
    response: () => ({
      content: "✅ **Employee Creation Assistant:**\n\nI'll help you onboard a new employee. I can auto-fill the form from a resume or LinkedIn URL.\n\nNavigating to the Add Employee form now...",
      suggestions: ['Auto-fill from resume', 'Manual entry', 'Import from CSV'],
      data: { action: 'navigate', path: '/dashboard/employees' },
    }),
  },
  {
    pattern: /burnout|stress|wellbeing|health/i,
    response: () => ({
      content: "🧬 **Wellbeing Alert:**\n\nI've detected potential burnout signals in **2 employees**:\n\n- **David Park** — 58 avg hours/week for 3 weeks, no leave taken in 90 days\n- **Mei Lin** — Late check-ins + increased ticket creation pattern\n\nThese patterns correlate with burnout risk. Recommend mandatory PTO and check-ins.",
      suggestions: ['View org health dashboard', 'Assign mandatory leave', 'Schedule wellness check'],
    }),
  },
  {
    pattern: /skill|gap|training|learning/i,
    response: () => ({
      content: "📚 **Skill Gap Analysis:**\n\nEngineering team is missing:\n- **Kubernetes** (9 out of 11 devs lack this)\n- **Rust** (0% coverage — emerging need)\n- **LLM integration** (2/11 — rapidly needed)\n\nRecommend partnering with Pluralsight or Coursera for Q2 upskilling budget.",
      suggestions: ['View workforce intelligence', 'Create training plan', 'Budget for courses'],
    }),
  },
  {
    pattern: /hello|hi|hey|help/i,
    response: (ctx) => ({
      content: `👋 **Hi! I'm NexusAI**, your intelligent HR assistant.\n\n${ctx ? `I see you're on the **${ctx}** — I can help with insights specific to this page.\n\n` : ''}Here's what I can do:\n\n- 📊 Analyze attendance, payroll & performance\n- 🚨 Detect anomalies & risks\n- 📝 Generate reports on demand\n- 👥 Recommend promotions & hires\n- ⚡ Automate HR workflows\n\nWhat would you like to explore?`,
      suggestions: ['Show attendance anomalies', 'Top performers this quarter', 'Predict attrition risks', 'Generate monthly report'],
    }),
  },
];

function findResponse(message: string, pageContext: string): AIResponse {
  for (const item of RESPONSE_BANK) {
    if (item.pattern.test(message)) {
      return item.response(pageContext);
    }
  }
  // Default intelligent fallback
  return {
    content: `🤔 I analyzed your query: *"${message}"*\n\nBased on current HR data, I recommend checking the **Reports & Analytics** section for deeper insights. I can also generate a custom analysis — just be more specific!\n\nTry: "Show attendance anomalies" or "Who are the top performers?"`,
    suggestions: ['Show top performers', 'Detect anomalies', 'Generate HR report', 'Attrition risks'],
  };
}

// Main AI chat function — mirrors Groq/OpenAI interface
export async function askAI(
  messages: AIMessage[],
  currentPage = '',
  streamCallback?: (chunk: string) => void
): Promise<AIResponse> {
  const lastMessage = messages[messages.length - 1]?.content || '';
  const pageCtx = PAGE_CONTEXTS[currentPage] || '';

  await delay(600 + Math.random() * 600);

  const response = findResponse(lastMessage, pageCtx);

  // Simulate streaming if callback provided
  if (streamCallback) {
    const words = response.content.split(' ');
    for (const word of words) {
      await delay(18);
      streamCallback(word + ' ');
    }
  }

  return response;
}

// AI recommendation engine
export async function getAIRecommendations(context: string): Promise<{
  type: 'promotion' | 'salary' | 'hiring' | 'leave' | 'risk';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action: string;
}[]> {
  await delay(400);
  return [
    { type: 'risk', title: 'Attrition Risk Detected', description: 'Kevin O\'Brien shows 78% attrition probability — no promotion in 24 months.', priority: 'high', action: 'Schedule 1:1' },
    { type: 'promotion', title: 'Promotion Recommended', description: 'Zoe Martinez has exceeded all Q1 OKRs. Eligible for Senior Sales Executive.', priority: 'high', action: 'Initiate Review' },
    { type: 'salary', title: 'Salary Below Market', description: 'Liam Foster\'s salary is 18% below market average for Content Strategist in Portland.', priority: 'medium', action: 'Review Compensation' },
    { type: 'hiring', title: 'Headcount Gap', description: 'Engineering velocity down 12%. Recommend hiring 2 backend engineers immediately.', priority: 'high', action: 'Open Position' },
    { type: 'leave', title: 'Burnout Risk', description: 'David Park has not taken leave in 90+ days and is averaging 58 hrs/week.', priority: 'medium', action: 'Assign PTO' },
  ];
}

// AI auto-fill for forms
export async function autoFillEmployee(resumeText: string): Promise<Partial<{
  name: string; email: string; phone: string; position: string; department: string; skills: string[]; experience: string;
}>> {
  await delay(1200);
  return {
    name: 'Jordan Mitchell',
    email: 'jordan.m@email.com',
    phone: '+1 555-9876',
    position: 'Senior Frontend Developer',
    department: 'Engineering',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    experience: '6 years',
  };
}

// AI insight generation
export async function generateInsight(module: string): Promise<{
  headline: string; body: string; metric: string; trend: 'up' | 'down' | 'stable'; severity: 'info' | 'warning' | 'critical';
}[]> {
  await delay(500);
  const insights: Record<string, any[]> = {
    attendance: [
      { headline: 'Absenteeism spike detected', body: 'Marketing dept absenteeism rose 8% this week vs last month baseline.', metric: '+8%', trend: 'up', severity: 'warning' },
      { headline: 'Excellent punctuality in Engineering', body: '100% of Engineering team checked in on time for 14 consecutive days.', metric: '100%', trend: 'up', severity: 'info' },
    ],
    payroll: [
      { headline: 'Payroll anomaly flagged', body: 'Emma Thompson payslip shows $1,200 discrepancy vs contract.', metric: '$1,200', trend: 'up', severity: 'critical' },
      { headline: 'Payroll cost trending up', body: 'Monthly payroll has increased 18.5% YTD — on track with headcount growth.', metric: '+18.5%', trend: 'up', severity: 'info' },
    ],
    performance: [
      { headline: 'OKR completion below target', body: 'Only 58% of Q1 OKRs are on track with 3 weeks remaining.', metric: '58%', trend: 'down', severity: 'warning' },
      { headline: 'High performer retention risk', body: 'Top 3 performers have below-market compensation — flight risk.', metric: '3', trend: 'stable', severity: 'critical' },
    ],
    default: [
      { headline: 'AI analysis complete', body: 'All systems nominal. No critical alerts at this time.', metric: '✓', trend: 'stable', severity: 'info' },
    ],
  };
  return insights[module] || insights.default;
}
