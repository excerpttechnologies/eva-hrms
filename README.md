# NexusHR — AI-Powered Enterprise HRMS SaaS

A production-ready, full-featured **AI-first** HRMS SaaS frontend built with Next.js 14, TypeScript, Tailwind CSS, Recharts, and Zustand.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — auto-redirects to the Landing Page.

**Demo login:** `/auth/login` → `alex@nexushr.com` / `password`  
**Direct dashboard:** `/dashboard/dashboard`

---

## 🤖 AI Features

| Feature | Location |
|---------|----------|
| **Floating AI Chat Widget** | Every page (bottom-right) — context-aware |
| **NexusAI Intelligence Center** | `/dashboard/ai-assistant` |
| **AI Recommendations Panel** | Dashboard + AI Center |
| **Attrition Risk Prediction** | AI Center charts |
| **Productivity Trend Analysis** | AI Center + Workforce Intel |
| **Burnout Detection** | Org Health dashboard |
| **AI Executive Summary** | Executive dashboard (generate button) |
| **AI Report Generator** | AI Center — type any report request |
| **Anomaly Detection** | Dashboard, Payroll, Attendance insights |
| **Career Path Suggestions** | Workforce Intelligence page |
| **Skill Gap Analysis** | Workforce Intelligence page |

---

## 📦 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 App Router | Framework |
| TypeScript | Full type safety |
| Tailwind CSS | Utility-first styling |
| Recharts | Charts & analytics |
| Zustand + persist | Global state |
| React Icons (ri) | Icon system |
| Mock AI Engine | `/lib/ai/mockAI.ts` — swappable with Groq/OpenAI |

---

## 🗺️ All 33 Routes

### Public
| Route | Description |
|-------|-------------|
| `/landing` | Marketing landing page |
| `/auth/login` | Login |
| `/auth/register` | Register |
| `/auth/forgot-password` | Password reset |

### AI Modules
| Route | Description |
|-------|-------------|
| `/dashboard/ai-assistant` | NexusAI Intelligence Center |
| `/dashboard/workforce` | Workforce Intelligence + Skill Gaps |
| `/dashboard/org-health` | Org Health + Burnout Detection |
| `/dashboard/activity-monitor` | Real-time employee activity feed |
| `/dashboard/executive` | C-Level Executive Dashboard |

### Core HR
| Route | Description |
|-------|-------------|
| `/dashboard/dashboard` | Main KPI dashboard |
| `/dashboard/employees` | Employee management |
| `/dashboard/attendance` | Attendance + calendar |
| `/dashboard/leave` | Leave requests & balances |
| `/dashboard/payroll` | Payroll + payslip preview |
| `/dashboard/recruitment` | ATS + Kanban pipeline |
| `/dashboard/performance` | OKRs + appraisals |

### Work
| Route | Description |
|-------|-------------|
| `/dashboard/projects` | Project tracker + task Kanban |
| `/dashboard/crm` | Leads & deal pipeline |
| `/dashboard/finance` | Expenses + invoices |
| `/dashboard/calendar` | Unified smart calendar |

### Support & Admin
| Route | Description |
|-------|-------------|
| `/dashboard/helpdesk` | Support tickets |
| `/dashboard/assets` | Asset management |
| `/dashboard/documents` | File manager |
| `/dashboard/reports` | Reports & analytics |
| `/dashboard/workflow` | No-code workflow builder |
| `/dashboard/compliance` | Audit logs + policy tracking |
| `/dashboard/multi-company` | Super Admin tenant management |
| `/dashboard/users` | Users, roles & permissions |
| `/dashboard/settings` | Company & app settings |
| `/dashboard/profile` | User profile + activity log |

---

## 🗂️ Project Structure

```
hrms/
├── app/
│   ├── landing/
│   ├── auth/{login,register,forgot-password}/
│   └── dashboard/
│       ├── layout.tsx          ← Sidebar + Topbar + AIAssistant
│       ├── dashboard/          ← Main KPI + AI Recommendations
│       ├── ai-assistant/       ← NexusAI Intelligence Center
│       ├── workforce/          ← Skill gaps + career paths
│       ├── org-health/         ← Burnout + health scores
│       ├── activity-monitor/   ← Live feed + presence
│       ├── executive/          ← C-Level view + AI summary
│       ├── workflow/           ← No-code automation builder
│       ├── compliance/         ← Audit + policies
│       ├── multi-company/      ← Super admin tenant UI
│       └── [13 other modules]
├── components/
│   ├── ai/
│   │   ├── AIAssistant.tsx         ← Floating chat widget (every page)
│   │   ├── AIRecommendations.tsx   ← Smart recommendations cards
│   │   └── AIInsightCard.tsx       ← Anomaly & insight pills
│   ├── advanced/
│   │   └── AdvancedTable.tsx       ← Column toggle, sort, bulk actions, export
│   ├── layout/
│   │   ├── Sidebar.tsx             ← Collapsible, AI badge labels
│   │   └── Topbar.tsx              ← Search, theme, notifications
│   └── ui/
│       ├── StatCard, Pagination, SearchFilter, Modal, Skeleton
├── lib/
│   ├── ai/
│   │   └── mockAI.ts               ← AI engine (swap for Groq/OpenAI)
│   ├── mock-data/index.ts
│   ├── store/useStore.ts
│   └── utils.ts
```

---

## 🔌 Connecting Real AI (Groq/OpenAI)

The mock AI engine in `lib/ai/mockAI.ts` mirrors the real API interface.  
To connect Groq:

```ts
// lib/ai/mockAI.ts — replace askAI() with:
import Groq from 'groq-sdk';
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function askAI(messages, currentPage) {
  const res = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: `You are NexusAI, an HR assistant. Context: ${PAGE_CONTEXTS[currentPage]}` },
      ...messages,
    ],
  });
  return { content: res.choices[0].message.content };
}
```

Add to `.env.local`:
```
GROQ_API_KEY=your_key_here
```

---

## ✅ Feature Checklist

### Global UI
- ✅ Collapsible sidebar (260px ↔ 68px) with AI section labels
- ✅ Dark / Light mode toggle (persisted)
- ✅ Sticky topbar with breadcrumbs, notifications, user menu
- ✅ Floating AI chat widget on every page
- ✅ Loading skeleton states on every page
- ✅ Mobile-responsive layout

### AI Features
- ✅ Context-aware AI chat (knows which page you're on)
- ✅ Simulated streaming responses
- ✅ Quick-prompt chips
- ✅ AI recommendations with priority badges
- ✅ AI anomaly/insight pills per module
- ✅ Attrition prediction chart
- ✅ Productivity trend analysis
- ✅ Burnout risk detection (Org Health)
- ✅ AI Executive Summary generator
- ✅ AI Report Generator (natural language input)
- ✅ Career path suggestions (Workforce Intel)
- ✅ Skill gap radar + bar charts

### Every Module Has
- ✅ KPI stats header
- ✅ Search + multi-filter toolbar
- ✅ Export PDF / Excel / Print buttons
- ✅ Paginated data tables
- ✅ Loading skeletons
- ✅ Empty states
- ✅ Add/Edit/View modals where applicable

### Advanced Components
- ✅ AdvancedTable — column toggle, bulk select, sort, export
- ✅ Workflow builder — drag & drop nodes, canvas, live/pause toggle
- ✅ Kanban boards (Recruitment, Projects, CRM)
- ✅ Calendar — month grid with event layers
- ✅ Real-time activity monitor with live feed simulation
