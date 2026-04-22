'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────────
interface Feature {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface Plan {
  name: string;
  price: number;
  users: string;
  features: string[];
  featured: boolean;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
  initials: string;
  avatarColor: string;
}

// ── Data ───────────────────────────────────────────────────────────────────────
const FEATURES: Feature[] = [
  {
    title: 'Employee Management',
    desc: 'Centralize all employee data, profiles, and records in one powerful platform with smart search.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#FF5C1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="#FF5C1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#FF5C1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Payroll Processing',
    desc: 'Automate payroll with tax calculations, payslips, and compliance reporting effortlessly.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#FF5C1A" strokeWidth="1.8"/>
        <path d="M12 6v6l4 2" stroke="#FF5C1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Performance & OKRs',
    desc: 'Set goals, track performance metrics, and conduct appraisals with intelligent insights.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="#FF5C1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Recruitment ATS',
    desc: 'Manage the entire hiring pipeline from applications to onboarding seamlessly.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="#FF5C1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Compliance Ready',
    desc: 'Stay compliant with local labor laws, tax regulations, and reporting standards globally.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#FF5C1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Multi-Region Support',
    desc: 'Manage global teams across 50+ countries with localized payroll and HR rules.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#FF5C1A" strokeWidth="1.8"/>
        <line x1="2" y1="12" x2="22" y2="12" stroke="#FF5C1A" strokeWidth="1.8"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="#FF5C1A" strokeWidth="1.8"/>
      </svg>
    ),
  },
];

const MODULES = [
  'Dashboard','Employees','Attendance','Leave','Payroll',
  'Recruitment','Performance','Projects','CRM','Finance',
  'Helpdesk','Assets','Documents','Reports',
];

const PLANS: Plan[] = [
  {
    name: 'Starter', price: 29, users: '1–25',
    features: ['Employee profiles','Attendance tracking','Basic payroll','Leave management','Email support'],
    featured: false,
  },
  {
    name: 'Professional', price: 79, users: '26–100',
    features: ['Everything in Starter','Performance & OKRs','Recruitment ATS','Advanced reports','Priority support'],
    featured: true,
  },
  {
    name: 'Enterprise', price: 199, users: 'Unlimited',
    features: ['Everything in Pro','Custom workflows','SSO & SAML','Dedicated manager','API access'],
    featured: false,
  },
];

const TESTIMONIALS: Testimonial[] = [
  { name: 'Jessica Park', role: 'VP of People, TechCorp', initials: 'JP', avatarColor: '#FF5C1A', text: 'NexusHR transformed how we manage 500+ employees across 12 countries. The ROI was immediate and undeniable.' },
  { name: 'Michael Torres', role: 'COO, Growth Ventures', initials: 'MT', avatarColor: '#FF7A40', text: 'The payroll automation alone saved us 40 hours per month. The UI is genuinely beautiful — our team loves using it.' },
  { name: 'Amara Osei', role: 'HR Director, GlobalOps', initials: 'AO', avatarColor: '#E84500', text: 'Best HRMS we have ever used. The analytics give us insights we never had before. Truly a game changer for HR ops.' },
];

const STATS = [
  { num: '10K+', label: 'Companies worldwide' },
  { num: '2.5M+', label: 'Employees managed' },
  { num: '99.9%', label: 'Uptime SLA' },
  { num: '50+', label: 'Countries supported' },
];

// ── Sub-components ─────────────────────────────────────────────────────────────
const CheckSvg = ({ color = '#FF5C1A' }: { color?: string }) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M2 5l2.5 2.5 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRight = ({ color = 'white', size = 16 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Stars = () => (
  <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#FF5C1A">
        <path d="M7 1l1.8 3.6L13 5.4l-3 2.9.7 4.1L7 10.5l-3.7 1.9.7-4.1-3-2.9 4.2-.8z"/>
      </svg>
    ))}
  </div>
);

const LogoMark = ({ size = 38 }: { size?: number }) => (
  <div style={{
    width: size, height: size, borderRadius: size * 0.26,
    background: '#FF5C1A', display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 14px rgba(255,92,26,0.35)', position: 'relative', overflow: 'hidden', flexShrink: 0,
  }}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(255,255,255,0.2) 0%,transparent 60%)' }} />
    <svg width={size * 0.53} height={size * 0.53} viewBox="0 0 20 20" fill="none" style={{ position: 'relative', zIndex: 1 }}>
      <rect x="3" y="3" width="6" height="6" rx="1.5" fill="white"/>
      <rect x="11" y="3" width="6" height="6" rx="1.5" fill="rgba(255,255,255,0.6)"/>
      <rect x="3" y="11" width="6" height="6" rx="1.5" fill="rgba(255,255,255,0.6)"/>
      <rect x="11" y="11" width="6" height="6" rx="1.5" fill="white"/>
    </svg>
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────────
export default function NexusHRLanding() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Inject Google Fonts
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&display=swap';
    document.head.appendChild(link);

    // Scroll reveal
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('nhr-visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.nhr-reveal').forEach((el) => observerRef.current?.observe(el));

    // Navbar shadow on scroll
    const handleScroll = () => {
      const nav = document.getElementById('nhr-navbar');
      if (nav) nav.style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(255,92,26,0.08)' : 'none';
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observerRef.current?.disconnect();
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      {/* ── Global Styles ── */}
      <style>{`
        :root {
          --orange: #FF5C1A;
          --orange-light: #FF7A40;
          --orange-pale: #FFF0EA;
          --orange-mid: #FFD6C4;
          --dark: #1A0A00;
          --text: #2D1200;
          --muted: #9A6B50;
          --off-white: #FFFAF7;
          --border: rgba(255,92,26,0.15);
        }
        .nhr-root { font-family: 'DM Sans', sans-serif; background: #fff; color: var(--text); overflow-x: hidden; }
        .nhr-root * { box-sizing: border-box; margin: 0; padding: 0; }

        /* Grain */
        .nhr-grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 999; opacity: 0.4;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
        }

        /* Animations */
        @keyframes nhr-fadeUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes nhr-fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes nhr-blobMove {
          0%,100% { border-radius:60% 40% 30% 70% / 60% 30% 70% 40%; }
          50%      { border-radius:30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes nhr-pulseRing { 0% { transform:scale(1); opacity:0.7; } 100% { transform:scale(2.2); opacity:0; } }
        @keyframes nhr-marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes nhr-spinSlow { from { transform:translate(-50%,-50%) rotate(0deg); } to { transform:translate(-50%,-50%) rotate(360deg); } }

        .nhr-a1 { animation: nhr-fadeIn 0.6s ease both; }
        .nhr-a2 { animation: nhr-fadeUp 0.7s 0.2s ease both; }
        .nhr-a3 { animation: nhr-fadeUp 0.7s 0.35s ease both; }
        .nhr-a4 { animation: nhr-fadeUp 0.7s 0.5s ease both; }
        .nhr-a5 { animation: nhr-fadeUp 0.7s 0.65s ease both; }
        .nhr-a6 { animation: nhr-fadeUp 0.7s 0.8s ease both; }
        .nhr-a7 { animation: nhr-fadeUp 0.9s 0.9s ease both; }
        .nhr-underline { animation: nhr-fadeIn 0.5s 1.2s both; }

        .nhr-blob1 {
          position:absolute; top:-80px; right:-120px; width:600px; height:600px; border-radius:50%;
          background: radial-gradient(circle,rgba(255,92,26,0.15) 0%,rgba(255,92,26,0.03) 60%,transparent 80%);
          animation: nhr-blobMove 8s ease-in-out infinite;
        }
        .nhr-blob2 {
          position:absolute; bottom:-100px; left:-80px; width:500px; height:500px; border-radius:50%;
          background: radial-gradient(circle,rgba(255,122,64,0.1) 0%,transparent 70%);
          animation: nhr-blobMove 10s ease-in-out infinite reverse;
        }
        .nhr-badge-dot::after {
          content:''; position:absolute; inset:-3px; border-radius:50%;
          border:1.5px solid var(--orange);
          animation: nhr-pulseRing 1.5s ease-out infinite;
        }
        .nhr-marquee { animation: nhr-marquee 20s linear infinite; }
        .nhr-orbit2 { animation: nhr-spinSlow 30s linear infinite; }

        /* Reveal */
        .nhr-reveal { opacity:0; transform:translateY(30px); transition:opacity 0.6s, transform 0.6s; }
        .nhr-visible { opacity:1 !important; transform:translateY(0) !important; }

        /* Nav link underline */
        .nhr-navlink { position:relative; }
        .nhr-navlink::after {
          content:''; position:absolute; bottom:-2px; left:0; right:0;
          height:1.5px; background:var(--orange); transform:scaleX(0);
          transition:transform 0.3s; transform-origin:left;
        }
        .nhr-navlink:hover::after { transform:scaleX(1); }

        /* Buttons */
        .nhr-btn-shimmer { position:relative; overflow:hidden; }
        .nhr-btn-shimmer::before {
          content:''; position:absolute; top:0; left:-100%; width:100%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent);
          transition:left 0.5s;
        }
        .nhr-btn-shimmer:hover::before { left:100%; }

        .nhr-btn-ripple { position:relative; overflow:hidden; }
        .nhr-btn-ripple::before {
          content:''; position:absolute; top:50%; left:50%;
          width:0; height:0; border-radius:50%;
          background:rgba(255,255,255,0.2);
          transform:translate(-50%,-50%);
          transition:width 0.6s, height 0.6s;
        }
        .nhr-btn-ripple:hover::before { width:300px; height:300px; }

        /* Feature card */
        .nhr-feat-card { transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1); position:relative; overflow:hidden; }
        .nhr-feat-card::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(255,92,26,0.04) 0%,transparent 60%);
          opacity:0; transition:opacity 0.3s;
        }
        .nhr-feat-card:hover { transform:translateY(-8px); box-shadow:0 20px 50px rgba(255,92,26,0.12); border-color:var(--orange-mid) !important; }
        .nhr-feat-card:hover::before { opacity:1; }
        .nhr-feat-card:hover .nhr-feat-icon { background:var(--orange) !important; }
        .nhr-feat-card:hover .nhr-feat-icon svg path,
        .nhr-feat-card:hover .nhr-feat-icon svg circle,
        .nhr-feat-card:hover .nhr-feat-icon svg polyline,
        .nhr-feat-card:hover .nhr-feat-icon svg line { stroke:white !important; }
        .nhr-feat-card:hover .nhr-feat-arrow { opacity:1 !important; transform:translateX(0) !important; }

        .nhr-feat-icon { transition:background 0.3s; }
        .nhr-feat-arrow { opacity:0; transform:translateX(-8px); transition:opacity 0.3s, transform 0.3s; }

        /* Module chip */
        .nhr-chip { position:relative; overflow:hidden; transition:all 0.3s; }
        .nhr-chip::before { content:''; position:absolute; inset:0; background:var(--orange); opacity:0; transition:opacity 0.3s; }
        .nhr-chip span { position:relative; z-index:1; }
        .nhr-chip:hover { border-color:var(--orange) !important; color:white !important; transform:scale(1.05) !important; }
        .nhr-chip:hover::before { opacity:1; }

        /* Price card */
        .nhr-price-card { transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1); }
        .nhr-price-card:not(.nhr-featured):hover { transform:translateY(-8px); box-shadow:0 24px 60px rgba(255,92,26,0.1); border-color:var(--orange) !important; }
        .nhr-price-card.nhr-featured:hover { transform:translateY(-8px) scale(1.02); box-shadow:0 32px 80px rgba(255,92,26,0.5); }

        /* Price CTA */
        .nhr-cta-outline { background:transparent; border:1.5px solid var(--orange); color:var(--orange); transition:all 0.25s; cursor:pointer; }
        .nhr-cta-outline:hover { background:var(--orange); color:white; }
        .nhr-cta-solid { background:white; border:none; color:var(--orange); box-shadow:0 4px 14px rgba(0,0,0,0.1); transition:all 0.25s; cursor:pointer; }
        .nhr-cta-solid:hover { background:var(--orange-pale); transform:translateY(-2px); }

        /* Testimonial */
        .nhr-t-card { transition:all 0.3s; }
        .nhr-t-card:hover { transform:translateY(-6px); box-shadow:0 16px 40px rgba(255,92,26,0.08); border-color:var(--orange-mid) !important; }

        /* Ghost btn */
        .nhr-ghost { background:transparent; border:1.5px solid var(--border); color:var(--text); transition:all 0.2s; cursor:pointer; }
        .nhr-ghost:hover { background:var(--orange-pale); border-color:var(--orange); color:var(--orange); }

        /* Primary btn */
        .nhr-primary { background:var(--orange); border:none; color:white; cursor:pointer; transition:all 0.25s; box-shadow:0 4px 14px rgba(255,92,26,0.3); }
        .nhr-primary:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(255,92,26,0.4); }

        /* Hero outline btn */
        .nhr-outline-hero { background:white; border:1.5px solid var(--orange-mid); color:var(--text); transition:all 0.3s; cursor:pointer; }
        .nhr-outline-hero:hover { background:var(--orange-pale); border-color:var(--orange); color:var(--orange); transform:translateY(-2px); }

        /* Hero primary */
        .nhr-btn-hero { background:var(--orange); border:none; color:white; cursor:pointer; transition:all 0.3s; box-shadow:0 8px 28px rgba(255,92,26,0.35); }
        .nhr-btn-hero:hover { transform:translateY(-3px); box-shadow:0 14px 40px rgba(255,92,26,0.45); }

        /* CTA btn */
        .nhr-cta-btn { background:var(--orange); border:none; color:white; cursor:pointer; transition:all 0.3s; box-shadow:0 8px 32px rgba(255,92,26,0.4); }
        .nhr-cta-btn:hover { transform:translateY(-3px); box-shadow:0 16px 48px rgba(255,92,26,0.55); }

        /* Footer links */
        .nhr-footer-link { color:rgba(255,255,255,0.4); text-decoration:none; font-size:13px; transition:color 0.2s; }
        .nhr-footer-link:hover { color:var(--orange); }

        /* Nav links */
        .nhr-navlink { font-size:14px; font-weight:500; color:var(--muted); text-decoration:none; transition:color 0.2s; }
        .nhr-navlink:hover { color:var(--dark); }

        /* Stat item */
        .nhr-stat-item { opacity:0; transform:translateY(20px); transition:opacity 0.6s, transform 0.6s; }
        .nhr-stat-item.nhr-visible { opacity:1; transform:translateY(0); }
      `}</style>

      <div className="nhr-root">
        <div className="nhr-grain" />

        {/* ── Navbar ── */}
        <nav
          id="nhr-navbar"
          className="nhr-a1"
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            padding: '18px 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border)', transition: 'all 0.3s',
          }}
        >
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: 'var(--dark)', textDecoration: 'none' }}>
            <LogoMark size={38} />
            NexusHR
          </a>

          <div style={{ display: 'flex', gap: 32 }}>
            {['Features','Modules','Pricing','Testimonials'].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nhr-navlink">{l}</a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
           
                              <Link href="/auth/login">

           
            <button className="nhr-ghost nhr-btn-shimmer" style={{ padding: '9px 22px', borderRadius: 8, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
              Sign In
            </button>
</Link>

          


          <Link href="/auth/login">
            <button className="nhr-primary nhr-btn-shimmer" style={{ padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
             
                   Get started

             
              
            </button>

            </Link>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '140px 60px 80px', position: 'relative', overflow: 'hidden',
          background: 'var(--off-white)',
        }}>
          <div className="nhr-blob1" />
          <div className="nhr-blob2" />
          {/* Grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,92,26,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,92,26,0.05) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
            WebkitMaskImage: 'radial-gradient(ellipse at center,black 30%,transparent 80%)',
            maskImage: 'radial-gradient(ellipse at center,black 30%,transparent 80%)',
          }} />

          {/* Badge */}
          <div className="nhr-a2" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--orange-pale)', border: '1px solid var(--orange-mid)',
            borderRadius: 100, padding: '7px 18px', fontSize: 13, fontWeight: 600, color: 'var(--orange)', marginBottom: 28,
          }}>
            <div className="nhr-badge-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--orange)', position: 'relative' }} />
            AI-powered performance insights now live
          </div>

          {/* Title */}
          <h1 className="nhr-a3" style={{
            fontFamily: "'Syne', sans-serif", fontSize: 'clamp(48px,6.5vw,80px)',
            fontWeight: 800, lineHeight: 1.07, textAlign: 'center', maxWidth: 900, color: 'var(--dark)',
          }}>
            The Modern HRMS that<br />
            <span style={{ position: 'relative', display: 'inline-block', color: 'var(--orange)' }}>
              Scales
              <svg className="nhr-underline" height="10" viewBox="0 0 120 10" fill="none" style={{ position: 'absolute', bottom: -6, left: 0, width: '100%' }}>
                <path d="M4 7 Q30 2 60 6 Q90 10 116 4" stroke="#FF5C1A" strokeWidth="3" strokeLinecap="round" fill="none"/>
              </svg>
            </span>{' '}with Your Company
          </h1>

          <p className="nhr-a4" style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 560, textAlign: 'center', lineHeight: 1.7, margin: '24px 0 44px' }}>
            Manage employees, payroll, performance, and compliance — all in one beautiful, enterprise-grade platform built for the future.
          </p>

          <div className="nhr-a5" style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            
            

             <Link href="/auth/register" style={{ textDecoration: 'none' }}>
            <button className="nhr-btn-hero nhr-btn-ripple" style={{ padding: '15px 34px', borderRadius: 10, fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans',sans-serif", display: 'flex', alignItems: 'center', gap: 10 }}>
             
             
                                           Start Free Trial

             
               <ArrowRight />
            </button>

 </Link>
            

             <Link href="/auth/login" style={{ textDecoration: 'none' }}>
            <button className="nhr-outline-hero" style={{ padding: '15px 30px', borderRadius: 10, fontSize: 16, fontWeight: 600, fontFamily: "'DM Sans',sans-serif", display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="white"><path d="M4 2.5l6 3.5-6 3.5z"/></svg>
              </div>
                                           Watch Demo 

            </button>
            </Link>
          </div>

          <div className="nhr-a6" style={{ display: 'flex', gap: 24, marginTop: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['No credit card required','14-day free trial','Cancel anytime'].map((p) => (
              <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'var(--muted)' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,92,26,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckSvg />
                </div>
                {p}
              </div>
            ))}
          </div>

          {/* Dashboard Mockup */}
          <div className="nhr-a7" style={{
            width: '100%', maxWidth: 960, marginTop: 72, borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(255,92,26,0.15),0 0 0 1px rgba(255,92,26,0.1)',
            background: 'white',
          }}>
            {/* Browser bar */}
            <div style={{ background: 'var(--off-white)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border)' }}>
              {['#ef4444','#f59e0b','#22c55e'].map((c) => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
              <div style={{ flex: 1, background: 'rgba(255,92,26,0.06)', borderRadius: 6, height: 22, marginLeft: 8, display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 11, color: 'var(--muted)' }}>
                nexushr.app/dashboard
              </div>
            </div>
            {/* Content */}
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: 360 }}>
              {/* Sidebar */}
              <div style={{ background: 'var(--dark)', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 16, color: 'white', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="4" height="4" rx="1" fill="white"/><rect x="8" y="2" width="4" height="4" rx="1" fill="rgba(255,255,255,0.6)"/><rect x="2" y="8" width="4" height="4" rx="1" fill="rgba(255,255,255,0.6)"/><rect x="8" y="8" width="4" height="4" rx="1" fill="white"/></svg>
                  </div>
                  NexusHR
                </div>
                {[{ label: 'Dashboard', active: true },{ label: 'Employees' },{ label: 'Payroll' },{ label: 'Recruitment' },{ label: 'Performance' },{ label: 'Reports' }].map(({ label, active }) => (
                  <div key={label} style={{ padding: '9px 12px', borderRadius: 8, fontSize: 12, fontWeight: active ? 600 : 500, color: active ? 'var(--orange)' : 'rgba(255,255,255,0.5)', background: active ? 'rgba(255,92,26,0.2)' : 'transparent', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
                    {label}
                  </div>
                ))}
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ padding: '9px 12px', borderRadius: 8, fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />Settings
                  </div>
                </div>
              </div>
              {/* Stats */}
              <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { label: 'Total Employees', val: '2,847', change: '+12% this month', up: true, bars: [30,50,40,70,90,65,80], activeIdx: [4,6] },
                  { label: 'Open Positions', val: '34', change: '3 filled today', up: false, bars: [80,60,90,40,70,55,45], activeIdx: [1,4] },
                ].map((s) => (
                  <div key={s.label} style={{ background: 'var(--off-white)', borderRadius: 12, padding: 18, border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{s.label}</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: 'var(--dark)' }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: s.up ? '#22c55e' : '#ef4444', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        {s.up ? <path d="M2 8L5 2l3 6" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> : <path d="M2 2L5 8l3-6" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>}
                      </svg>
                      {s.change}
                    </div>
                    <div style={{ height: 48, display: 'flex', alignItems: 'flex-end', gap: 3, marginTop: 10 }}>
                      {s.bars.map((h, i) => (
                        <div key={i} style={{ flex: 1, borderRadius: '3px 3px 0 0', height: `${h}%`, background: s.activeIdx.includes(i) ? 'var(--orange)' : 'var(--orange-mid)' }} />
                      ))}
                    </div>
                  </div>
                ))}
                {/* Payroll card */}
                <div style={{ gridColumn: '1 / -1', background: 'var(--orange)', borderRadius: 12, padding: 18, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.75, marginBottom: 6 }}>Total Payroll</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800 }}>$248,500</div>
                    <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>Next run: Dec 31, 2024</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: '8px 14px', fontSize: 12, fontWeight: 600 }}>Auto-processing</div>
                    <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>847 employees • On track</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Marquee ── */}
        <div style={{ padding: '32px 0', background: 'var(--orange)', overflow: 'hidden' }}>
          <div className="nhr-marquee" style={{ display: 'flex', gap: 60, whiteSpace: 'nowrap' }}>
            {[0, 1].map((n) => (
              <div key={n} style={{ display: 'flex', gap: 60, alignItems: 'center' }}>
                {['Employee Management','Payroll Automation','Performance OKRs','Recruitment ATS','Compliance Ready','Multi-Region Support','Leave Management','Analytics & Reports'].map((item) => (
                  <span key={item} style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }}>✦</span>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats ── */}
        <section style={{ padding: '80px 60px', background: 'white' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {STATS.map((s, i) => (
              <div key={s.label} className="nhr-stat-item nhr-reveal" style={{ textAlign: 'center', padding: '40px 20px', borderRight: i < 3 ? '1px solid var(--border)' : 'none', transitionDelay: `${i * 0.1}s` }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 52, fontWeight: 800, color: 'var(--orange)', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: 14, color: 'var(--muted)', marginTop: 10, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ── */}
        <section id="features" style={{ padding: '100px 60px', background: 'var(--off-white)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 400, height: 400, background: 'radial-gradient(circle,rgba(255,92,26,0.08) 0%,transparent 70%)' }} />
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div className="nhr-reveal">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 16 }}>
                <div style={{ width: 24, height: 2, background: 'var(--orange)' }} />Features
              </div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(32px,4vw,48px)', fontWeight: 800, color: 'var(--dark)', maxWidth: 560, lineHeight: 1.15, marginBottom: 16 }}>Everything Your HR Team Needs</h2>
              <p style={{ fontSize: 16, color: 'var(--muted)', maxWidth: 480, lineHeight: 1.7, marginBottom: 60 }}>One platform. Every HR workflow. Built for the modern enterprise that never stops growing.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
              {FEATURES.map((f, i) => (
                <div key={f.title} className="nhr-feat-card nhr-reveal" style={{ background: 'white', borderRadius: 16, padding: 32, border: '1px solid var(--border)', transitionDelay: `${i * 0.05}s` }}>
                  <div className="nhr-feat-icon" style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--orange-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    {f.icon}
                  </div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--dark)', marginBottom: 10 }}>{f.title}</div>
                  <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{f.desc}</div>
                  <div className="nhr-feat-arrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--orange)', marginTop: 16 }}>
                    Learn more <ArrowRight color="#FF5C1A" size={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Modules ── */}
        <section id="modules" style={{ padding: '100px 60px', background: 'var(--dark)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,92,26,0.08) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
          <div style={{ maxWidth: 1080, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="nhr-reveal">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 16 }}>
                <div style={{ width: 24, height: 2, background: 'var(--orange)' }} />Modules
              </div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(32px,4vw,48px)', fontWeight: 800, color: 'white', maxWidth: 560, lineHeight: 1.15, marginBottom: 16 }}>14 Integrated Modules</h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', maxWidth: 480, lineHeight: 1.7, marginBottom: 60 }}>A comprehensive suite of tools covering every HR need under one roof.</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {MODULES.map((m, i) => (
                <div key={m} className="nhr-chip nhr-reveal" style={{ padding: '12px 22px', borderRadius: 100, border: '1.5px solid rgba(255,92,26,0.25)', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', cursor: 'pointer', transitionDelay: `${i * 0.05}s` }}>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="pricing" style={{ padding: '100px 60px', background: 'var(--off-white)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div className="nhr-reveal" style={{ textAlign: 'center', marginBottom: 60 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 16 }}>
                <div style={{ width: 24, height: 2, background: 'var(--orange)' }} />Pricing<div style={{ width: 24, height: 2, background: 'var(--orange)' }} />
              </div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(32px,4vw,48px)', fontWeight: 800, color: 'var(--dark)', marginBottom: 16 }}>Simple, Transparent Pricing</h2>
              <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.7 }}>Start free. Scale as you grow. No hidden fees, ever.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
              {PLANS.map((plan, i) => (
                <div key={plan.name} className={`nhr-price-card nhr-reveal ${plan.featured ? 'nhr-featured' : ''}`} style={{ background: plan.featured ? 'var(--orange)' : 'white', borderRadius: 20, padding: 36, border: `1px solid ${plan.featured ? 'var(--orange)' : 'var(--border)'}`, boxShadow: plan.featured ? '0 20px 60px rgba(255,92,26,0.35)' : 'none', position: 'relative', overflow: 'hidden', transitionDelay: `${(i+1)*0.1}s` }}>
                  {plan.featured && (
                    <div style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.2)', borderRadius: 100, padding: '4px 12px', fontSize: 11, fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Most Popular</div>
                  )}
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 6, color: plan.featured ? 'white' : 'var(--dark)' }}>{plan.name}</div>
                  <div style={{ fontSize: 13, opacity: 0.65, marginBottom: 20, color: plan.featured ? 'white' : 'var(--text)' }}>Up to {plan.users} employees</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1, color: plan.featured ? 'white' : 'var(--dark)' }}>
                    <span style={{ fontSize: 20, fontWeight: 600, verticalAlign: 'top', marginTop: 10, display: 'inline-block' }}>$</span>{plan.price}
                  </div>
                  <div style={{ fontSize: 13, opacity: 0.6, marginBottom: 28, marginTop: 4, color: plan.featured ? 'white' : 'var(--text)' }}>per month</div>
                  <div style={{ height: 1, background: plan.featured ? 'rgba(255,255,255,0.2)' : 'rgba(255,92,26,0.1)', margin: '20px 0' }} />
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                    {plan.features.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: plan.featured ? 'white' : 'var(--text)' }}>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: plan.featured ? 'rgba(255,255,255,0.2)' : 'var(--orange-pale)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CheckSvg color={plan.featured ? 'white' : '#FF5C1A'} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

<Link href="/auth/login" style={{ textDecoration: 'none' }}>
                  <button className={plan.featured ? 'nhr-cta-solid' : 'nhr-cta-outline'} style={{ width: '100%', padding: 14, borderRadius: 10, fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans',sans-serif" }}>
                   Get started
                  </button>

</Link>

                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section id="testimonials" style={{ padding: '100px 60px', background: 'white' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div className="nhr-reveal" style={{ textAlign: 'center', marginBottom: 60 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 16 }}>
                <div style={{ width: 24, height: 2, background: 'var(--orange)' }} />Testimonials<div style={{ width: 24, height: 2, background: 'var(--orange)' }} />
              </div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(32px,4vw,48px)', fontWeight: 800, color: 'var(--dark)' }}>Trusted by HR Leaders</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={t.name} className="nhr-t-card nhr-reveal" style={{ background: 'var(--off-white)', borderRadius: 16, padding: 28, border: '1px solid var(--border)', transitionDelay: `${(i+1)*0.1}s` }}>
                  <Stars />
                  <div style={{ fontSize: 32, color: 'var(--orange)', fontFamily: 'Georgia,serif', lineHeight: 1, marginBottom: 12 }}>"</div>
                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20, fontStyle: 'italic' }}>{t.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: t.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: 'white', fontFamily: "'Syne',sans-serif", flexShrink: 0 }}>
                      {t.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)' }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}

         <Link href="/auth/register">
        <section style={{ padding: '100px 60px', background: 'var(--dark)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center,rgba(255,92,26,0.2) 0%,transparent 65%)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, border: '1px solid rgba(255,92,26,0.1)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div className="nhr-orbit2" style={{ position: 'absolute', top: '50%', left: '50%', width: 700, height: 700, border: '1px solid rgba(255,92,26,0.06)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div className="nhr-reveal" style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 800, color: 'white', marginBottom: 16 }}>Ready to transform your HR?</h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', marginBottom: 40 }}>Join 10,000+ companies using NexusHR today.</p>
            <button  className="nhr-cta-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 40px', borderRadius: 12, fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans',sans-serif" }}>
           
                              Start your free trial 

           
             <ArrowRight />
            </button>
          </div>
        </section>
        </Link>

        {/* ── Footer ── */}
        <footer style={{ background: 'var(--dark)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="5" height="5" rx="1.2" fill="white"/><rect x="11" y="2" width="5" height="5" rx="1.2" fill="rgba(255,255,255,0.6)"/><rect x="2" y="11" width="5" height="5" rx="1.2" fill="rgba(255,255,255,0.6)"/><rect x="11" y="11" width="5" height="5" rx="1.2" fill="white"/></svg>
            </div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: 'white' }}>NexusHR</span>
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>© 2024 NexusHR. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy','Terms','Contact'].map((l) => (
              <a key={l} href="#" className="nhr-footer-link">{l}</a>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}