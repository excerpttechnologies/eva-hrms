'use client';
import { useRouter } from 'next/navigation';
import {
  RiBuildingLine, RiTeamLine, RiMoneyDollarCircleLine, RiBarChartLine,
  RiArrowRightLine, RiCheckLine, RiStarFill, RiShieldCheckLine,
  RiGlobalLine, RiRocketLine, RiCustomerService2Line,
} from 'react-icons/ri';

const features = [
  { icon: RiTeamLine, title: 'Employee Management', desc: 'Centralize all employee data, profiles, and records in one powerful platform.', color: '#3b82f6' },
  { icon: RiMoneyDollarCircleLine, title: 'Payroll Processing', desc: 'Automate payroll with tax calculations, payslips, and compliance reporting.', color: '#10b981' },
  { icon: RiBarChartLine, title: 'Performance & OKRs', desc: 'Set goals, track performance, and conduct appraisals with ease.', color: '#8b5cf6' },
  { icon: RiCustomerService2Line, title: 'Recruitment ATS', desc: 'Manage the entire hiring pipeline from applications to onboarding.', color: '#f59e0b' },
  { icon: RiShieldCheckLine, title: 'Compliance Ready', desc: 'Stay compliant with local labor laws, tax regulations, and reporting standards.', color: '#ef4444' },
  { icon: RiGlobalLine, title: 'Multi-Region Support', desc: 'Manage global teams across 50+ countries with localized payroll and HR rules.', color: '#06b6d4' },
];

const plans = [
  { name: 'Starter', price: 29, users: '1–25', features: ['Employee profiles', 'Attendance tracking', 'Basic payroll', 'Leave management', 'Email support'], popular: false },
  { name: 'Professional', price: 79, users: '26–100', features: ['Everything in Starter', 'Performance & OKRs', 'Recruitment ATS', 'Advanced reports', 'CRM module', 'Priority support'], popular: true },
  { name: 'Enterprise', price: 199, users: 'Unlimited', features: ['Everything in Pro', 'Custom workflows', 'SSO & SAML', 'Dedicated manager', 'SLA guarantee', 'API access', 'White-label option'], popular: false },
];

const testimonials = [
  { name: 'Jessica Park', title: 'VP of People, TechCorp', quote: 'NexusHR transformed how we manage 500+ employees across 12 countries. The ROI was immediate.', rating: 5 },
  { name: 'Michael Torres', title: 'COO, Growth Ventures', quote: 'The payroll automation alone saved us 40 hours per month. Plus the UI is genuinely beautiful.', rating: 5 },
  { name: 'Amara Osei', title: 'HR Director, GlobalOps', quote: 'Best HRMS we\'ve ever used. The reports and analytics give us insights we never had before.', rating: 5 },
];

export default function LandingPage() {
  const router = useRouter();
  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', color: 'white', fontFamily: 'var(--font-body)' }}>
      {/* Navbar */}
      <nav style={{ padding: '20px 80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, background: 'rgba(10,15,30,0.95)', backdropFilter: 'blur(12px)', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RiBuildingLine size={20} color="white" />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'white' }}>NexusHR</span>
        </div>
        <div style={{ display: 'flex', gap: 32, fontSize: 14, color: '#94a3b8' }}>
          {['Features', 'Modules', 'Pricing', 'Testimonials'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
            >{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => router.push('/auth/login')} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Sign In</button>
          <button onClick={() => router.push('/auth/register')} style={{ background: '#3b82f6', border: 'none', color: 'white', padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '100px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.15) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 20, padding: '6px 14px', fontSize: 12, color: '#93c5fd', fontWeight: 600, marginBottom: 24 }}>
            <RiRocketLine size={12} /> New: AI-powered performance insights now live
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24, maxWidth: 800, margin: '0 auto 24px' }}>
            The HRMS that{' '}
            <span style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>scales</span>{' '}
            with your company
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Manage employees, payroll, performance, and compliance — all in one beautiful, enterprise-grade platform.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => router.push('/auth/register')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#3b82f6', border: 'none', color: 'white', padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
              Start free trial <RiArrowRightLine size={16} />
            </button>
            <button onClick={() => router.push('/auth/login')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'white', padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
              View Demo
            </button>
          </div>
          <div style={{ marginTop: 24, fontSize: 12, color: '#475569' }}>
            No credit card required · 14-day free trial · Cancel anytime
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '40px 80px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, textAlign: 'center' }}>
          {[['10,000+', 'Companies'], ['2.5M+', 'Employees managed'], ['99.9%', 'Uptime SLA'], ['50+', 'Countries supported']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'white' }}>{val}</div>
              <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '80px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#3b82f6', textTransform: 'uppercase', marginBottom: 12 }}>FEATURES</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, marginBottom: 16 }}>Everything your HR team needs</h2>
          <p style={{ color: '#64748b', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>One platform. Every HR workflow. Built for the modern enterprise.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {features.map(f => (
            <div key={f.title} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 28 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: f.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <f.icon size={22} color={f.color} />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{f.title}</div>
              <div style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section id="modules" style={{ padding: '80px 80px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#3b82f6', textTransform: 'uppercase', marginBottom: 12 }}>MODULES</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800 }}>14 integrated modules</h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          {['Dashboard', 'Employees', 'Attendance', 'Leave', 'Payroll', 'Recruitment', 'Performance', 'Projects', 'CRM', 'Finance', 'Helpdesk', 'Assets', 'Documents', 'Reports'].map(m => (
            <div key={m} style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#93c5fd', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
              {m}
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '80px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#3b82f6', textTransform: 'uppercase', marginBottom: 12 }}>PRICING</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800 }}>Simple, transparent pricing</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 960, margin: '0 auto' }}>
          {plans.map(plan => (
            <div key={plan.name} style={{ background: plan.popular ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${plan.popular ? '#3b82f6' : 'rgba(255,255,255,0.07)'}`, borderRadius: 16, padding: 32, position: 'relative' }}>
              {plan.popular && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#3b82f6', color: 'white', fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: 20, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Most Popular</div>
              )}
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{plan.name}</div>
              <div style={{ color: '#64748b', fontSize: 12, marginBottom: 16 }}>Up to {plan.users} employees</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 24 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800 }}>${plan.price}</span>
                <span style={{ color: '#64748b', fontSize: 13 }}>/mo</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#94a3b8' }}>
                    <RiCheckLine size={14} color="#10b981" style={{ flexShrink: 0 }} /> {f}
                  </div>
                ))}
              </div>
              <button onClick={() => router.push('/auth/register')} style={{ width: '100%', padding: '12px', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer', background: plan.popular ? '#3b82f6' : 'rgba(255,255,255,0.08)', border: `1px solid ${plan.popular ? '#3b82f6' : 'rgba(255,255,255,0.1)'}`, color: 'white' }}>
                Get started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" style={{ padding: '80px 80px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#3b82f6', textTransform: 'uppercase', marginBottom: 12 }}>TESTIMONIALS</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800 }}>Trusted by HR leaders</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
          {testimonials.map(t => (
            <div key={t.name} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 28 }}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                {Array.from({ length: t.rating }).map((_, i) => <RiStarFill key={i} size={14} color="#f59e0b" />)}
              </div>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>"{t.quote}"</p>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{t.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, marginBottom: 16 }}>Ready to transform your HR?</h2>
        <p style={{ color: '#64748b', fontSize: 16, marginBottom: 32 }}>Join 10,000+ companies using NexusHR today.</p>
        <button onClick={() => router.push('/auth/register')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#3b82f6', border: 'none', color: 'white', padding: '16px 36px', borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
          Start your free trial <RiArrowRightLine size={18} />
        </button>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 80px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RiBuildingLine size={16} color="white" />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>NexusHR</span>
        </div>
        <div style={{ color: '#334155', fontSize: 12 }}>© 2024 NexusHR. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 20, fontSize: 13, color: '#475569' }}>
          <a href="#" style={{ color: '#475569', textDecoration: 'none' }}>Privacy</a>
          <a href="#" style={{ color: '#475569', textDecoration: 'none' }}>Terms</a>
          <a href="#" style={{ color: '#475569', textDecoration: 'none' }}>Contact</a>
        </div>
      </footer>
    </div>
  );
}
