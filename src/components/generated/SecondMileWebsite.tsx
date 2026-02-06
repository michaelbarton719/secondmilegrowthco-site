import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  TrendingUp,
  ShieldCheck,
  Settings,
  Target,
  Zap,
  Menu,
  X,
  BarChart3,
  Briefcase,
} from 'lucide-react';
import {
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

// --- Constants & Data ---

const COLORS = {
  black: '#111418',
  white: '#F5F4F1',
  gray: '#6B7280',
  orange: '#C65A1E',
  darkOrange: '#9F4617',
};

const GROWTH_DATA = [
  { name: 'Month 1', profit: 4000, leakage: 2400 },
  { name: 'Month 2', profit: 5500, leakage: 1800 },
  { name: 'Month 3', profit: 7800, leakage: 1200 },
  { name: 'Month 4', profit: 12000, leakage: 600 },
  { name: 'Month 5', profit: 18500, leakage: 300 },
  { name: 'Month 6', profit: 26000, leakage: 100 },
] as any[];

const INDUSTRIES = [
  { name: 'HVAC', description: 'Optimizing dispatch and high-ticket service sales.' },
  { name: 'Plumbing', description: 'Dominating local search and emergency response conversions.' },
  { name: 'Electrical', description: 'Building systems for residential service and commercial bids.' },
  { name: 'Roofing', description: 'Scaling canvassing data into high-margin storm & retail jobs.' },
  { name: 'Med Spas', description: 'Fixing no-show rates and maximizing patient lifetime value.' },
  { name: 'Gyms', description: 'Automating lead nurture to turn day-passes into yearly contracts.' },
] as any[];

const SERVICES = [
  {
    id: 'audit',
    title: 'Full Business Audit',
    points: ['Revenue streams', 'Lead sources', 'Conversion points', 'Pricing & margins', 'Cost inefficiencies'],
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    id: 'positioning',
    title: 'Brand & Market Positioning',
    points: ['Why customers choose you', 'Why they don’t', 'Premium pricing strategies'],
    icon: <Target className="w-6 h-6" />,
  },
  {
    id: 'efficiency',
    title: 'Cost Savings & Efficiency',
    points: ['Reducing wasted ad spend', 'Eliminating tool bloat', 'Follow-up automation'],
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    id: 'systems',
    title: 'Growth Systems Build-Out',
    points: ['High-converting landing pages', 'GBP Domination', 'CRM & Lead Automation'],
    icon: <Settings className="w-6 h-6" />,
  },
] as any[];

// --- Sub-components (Helpers) ---

const LogoSymbol = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 80L50 20L80 80H65L50 50L35 80H20Z" fill={COLORS.orange} />
    <path d="M40 85L50 65L60 85H40Z" fill="#333" />
  </svg>
);

const LogoLockup = () => (
  <div className="flex items-center gap-3">
    <LogoSymbol className="w-8 h-8 md:w-10 md:h-10" />
    <div className="flex flex-col leading-tight">
      <span className="text-white font-bold text-xl md:text-2xl tracking-tighter">SECOND MILE</span>
      <span className="text-[#C65A1E] font-medium text-xs md:text-sm tracking-[0.2em]">GROWTH CO.</span>
    </div>
  </div>
);

const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const baseStyles =
    'px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all duration-300 inline-flex items-center gap-2';
  const variants: any = {
    primary: `bg-[#C65A1E] text-white hover:bg-[#9F4617] shadow-[0_0_20px_rgba(198,90,30,0.3)]`,
    secondary: `bg-transparent border border-[#F5F4F1] text-[#F5F4F1] hover:bg-[#F5F4F1] hover:text-[#111418]`,
    outline: `border border-[#C65A1E] text-[#C65A1E] hover:bg-[#C65A1E] hover:text-white`,
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
      {variant !== 'outline' && <ArrowUpRight className="w-4 h-4" />}
    </button>
  );
};

// @component: SecondMileWebsite
export const SecondMileWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // ✅ Form status (so you see success / error)
  const [auditStatus, setAuditStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // ✅ Form submit to Formspree
  const handleAuditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuditStatus('sending');

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const res = await fetch('https://formspree.io/f/xvzbplbb', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setAuditStatus('success');
        form.reset();
      } else {
        setAuditStatus('error');
      }
    } catch {
      setAuditStatus('error');
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  return (
    <div className="min-h-screen bg-[#111418] text-[#F5F4F1] font-sans selection:bg-[#C65A1E] selection:text-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#111418]/95 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => setActiveTab('home')}>
            <LogoLockup />
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['Services', 'Industries', 'About', 'Audit'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item.toLowerCase())}
                className={`text-xs uppercase tracking-widest font-semibold hover:text-[#C65A1E] transition-colors ${
                  activeTab === item.toLowerCase() ? 'text-[#C65A1E]' : 'text-[#F5F4F1]'
                }`}
              >
                {item}
              </button>
            ))}
            <Button variant="outline" className="px-5 py-2" onClick={() => setActiveTab('audit')}>
              Get Audit
            </Button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#111418] border-b border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-6">
                {['Services', 'Industries', 'About', 'Audit'].map((item) => (
                  <button
                    key={item}
                    className="text-left text-xl font-bold uppercase tracking-wider"
                    onClick={() => {
                      setActiveTab(item.toLowerCase());
                      setIsMenuOpen(false);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Areas */}
      <main className="pt-20">
        {/* HERO SECTION */}
        {activeTab === 'home' && (
          <>
            <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C65A1E]/5 rounded-full blur-[120px]" />
                <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] opacity-[0.03] mix-blend-overlay" />
              </div>

              <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C65A1E]/10 border border-[#C65A1E]/20 text-[#C65A1E] text-[10px] font-bold uppercase tracking-widest mb-6">
                    <Zap className="w-3 h-3" /> Profit Optimization Partner
                  </div>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8 uppercase italic">
                    Your business is <span className="text-[#C65A1E]">leaking money.</span> We fix it — then scale it.
                  </h1>
                  <p className="text-xl text-[#6B7280] max-w-xl mb-10 leading-relaxed">
                    Second Mile Growth Co. audits, optimizes, and builds growth systems for service businesses that want more profit, more calls, and less chaos.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-5">
                    <Button onClick={() => setActiveTab('audit')}>Get a Free Profit & Growth Audit</Button>
                    <Button variant="secondary" onClick={() => setActiveTab('services')}>
                      See How It Works
                    </Button>
                  </div>

                  <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6" style={{ translate: '0px -23px' }}>
                    {[
                      { icon: <Briefcase className="w-4 h-4" />, label: 'Profit-Focused' },
                      { icon: <Settings className="w-4 h-4" />, label: 'Systems-Driven' },
                      { icon: <Target className="w-4 h-4" />, label: 'Industry-Specific' },
                      { icon: <TrendingUp className="w-4 h-4" />, label: 'Performance-Based' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">
                        <span className="text-[#C65A1E]">{item.icon}</span>
                        {item.label}
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="hidden lg:block relative"
                >
                  <div className="bg-[#111418] border border-white/10 p-8 rounded-lg shadow-2xl relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-xl font-bold uppercase italic">Profit Projection</h3>
                        <p className="text-xs text-[#6B7280] uppercase tracking-wider">After Foundation Optimization</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-[#C65A1E]">+240%</span>
                        <p className="text-[10px] text-[#6B7280] uppercase">ROI Target</p>
                      </div>
                    </div>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={GROWTH_DATA}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#111418', border: '1px solid #333' }}
                            itemStyle={{ color: '#F5F4F1' }}
                          />
                          <Line
                            type="monotone"
                            dataKey="profit"
                            stroke="#C65A1E"
                            strokeWidth={4}
                            dot={{ fill: '#C65A1E', r: 4 }}
                            activeDot={{ r: 8 }}
                          />
                          <Line type="monotone" dataKey="leakage" stroke="#6B7280" strokeWidth={2} strokeDasharray="5 5" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-6 flex justify-between text-[10px] font-bold uppercase text-[#6B7280] tracking-widest">
                      <span>Leakage Reduction</span>
                      <span>Scale Phase</span>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#C65A1E]/50 z-0" />
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#C65A1E]/50 z-0" />
                </motion.div>
              </div>
            </section>

            {/* PROBLEM SECTION */}
            <section className="py-24 bg-[#F5F4F1] text-[#111418]">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <div>
                    <span className="text-[#C65A1E] font-black uppercase tracking-[0.3em] text-sm mb-4 block">The Diagnosis</span>
                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[0.95] uppercase italic">
                      Most service businesses don’t have a growth problem. <br />
                      <span className="text-[#C65A1E]">They have a systems problem.</span>
                    </h2>
                    <p className="text-xl text-[#6B7280] mb-12">
                      Throwing more money at ads or a prettier website won't fix a broken business model. If you don't know your numbers, you're just gambling.
                    </p>
                  </div>
                  <div className="space-y-6">
                    {[
                      'Missed calls that never get followed up',
                      'Ads spending money but not converting',
                      'Websites that look fine but don’t sell',
                      'Pricing and processes bleeding margin',
                      'No visibility into where profits are actually coming from',
                    ].map((item, i) => (
                      <motion.div whileHover={{ x: 10 }} key={i} className="flex items-start gap-4 p-5 bg-white border border-black/5 shadow-sm">
                        <XCircle className="w-6 h-6 text-[#C65A1E] shrink-0 mt-0.5" />
                        <span className="text-lg font-bold uppercase italic">{item}</span>
                      </motion.div>
                    ))}
                    <div className="pt-6 border-t border-black/10 mt-10">
                      <p className="text-xl font-bold italic">“We start where others don’t — inside your numbers, systems, and workflow.”</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* WHAT WE ACTUALLY DO SECTION */}
            <section className="py-32 bg-[#111418]">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                  <div className="max-w-2xl">
                    <span className="text-[#C65A1E] font-black uppercase tracking-[0.3em] text-sm mb-4 block">Precision Execution</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase italic leading-[0.9]">
                      We don’t guess. <br /> We audit <span className="text-[#C65A1E]">everything.</span>
                    </h2>
                  </div>
                  <Button variant="outline" onClick={() => setActiveTab('services')}>
                    Full Service Breakdown
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/10 border border-white/10">
                  {SERVICES.map((service, i) => (
                    <div key={i} className="bg-[#111418] p-10 group hover:bg-[#1a1e23] transition-colors duration-500">
                      <div className="mb-8 text-[#C65A1E] group-hover:scale-110 transition-transform duration-500 origin-left">{service.icon}</div>
                      <h3 className="text-2xl font-black uppercase italic mb-6 leading-tight">{service.title}</h3>
                      <ul className="space-y-4">
                        {service.points.map((point: string, j: number) => (
                          <li key={j} className="flex items-center gap-3 text-sm text-[#6B7280] font-medium uppercase tracking-wider">
                            <div className="w-1.5 h-1.5 bg-[#C65A1E] rounded-full" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="bg-[#111418] p-10 flex flex-col justify-between group hover:bg-[#C65A1E] transition-all duration-500">
                    <div>
                      <h3 className="text-2xl font-black uppercase italic mb-6 leading-tight group-hover:text-white">Continuous Fine-Tuning</h3>
                      <p className="text-sm text-[#6B7280] group-hover:text-white/80 font-medium uppercase tracking-wider leading-relaxed">
                        Monthly performance analysis. What to double down on. What to cut. What to improve next. We never stop optimizing.
                      </p>
                    </div>
                    <button
                      className="flex items-center gap-2 font-black uppercase tracking-widest mt-12 group-hover:text-white"
                      onClick={() => setActiveTab('audit')}
                    >
                      Let's Start <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* AI OPTIMIZATION SECTION */}
            <section className="py-24 bg-[#1a1e23] border-y border-white/5">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C65A1E]/10 border border-[#C65A1E]/20 text-[#C65A1E] text-[10px] font-bold uppercase tracking-widest mb-6">
                      <Zap className="w-3 h-3" /> AI-POWERED EFFICIENCY
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-8 leading-[0.9]">
                      We deploy <span className="text-[#C65A1E]">AI tools & strategies</span> to cut costs and maximize output.
                    </h2>
                    <p className="text-xl text-[#6B7280] leading-relaxed mb-10">
                      Less manual work. Lower overhead. More profit. Our AI implementations automate repetitive tasks so your team can focus on what actually generates revenue.
                    </p>
                    <Button variant="outline" onClick={() => setActiveTab('audit')}>
                      See How AI Fits Your Business
                    </Button>
                  </div>
                  <div className="space-y-6">
                    {[
                      { title: 'Smart Lead Qualification', desc: 'AI instantly scores and routes leads to the right team member' },
                      { title: 'Automated Follow-Up', desc: 'Never miss a callback with intelligent scheduling and reminders' },
                      { title: 'Data Analysis at Scale', desc: 'Surface insights from your CRM without manual spreadsheet work' },
                      { title: 'Content & Ad Optimization', desc: 'AI-driven testing to maximize ROI on every marketing dollar' },
                    ].map((item, i) => (
                      <div key={i} className="bg-[#111418] border border-white/5 p-6 hover:border-[#C65A1E]/30 transition-all group">
                        <h3 className="text-lg font-black uppercase italic mb-2 group-hover:text-[#C65A1E] transition-colors">{item.title}</h3>
                        <p className="text-sm text-[#6B7280] font-medium uppercase tracking-wide">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* HOW IT WORKS SECTION */}
            <section className="py-32 bg-[#111418] border-t border-white/5 relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                  <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-6">The Second Mile Process</h2>
                  <p className="text-[#6B7280] max-w-2xl mx-auto uppercase tracking-widest font-bold text-sm">
                    Linear Growth via Systematic Optimization
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 relative">
                  <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-white/10 -z-10" />
                  {[
                    { step: '01', title: 'Audit & Diagnosis', desc: 'We identify where money is leaking and where growth is capped.' },
                    { step: '02', title: 'Optimization & Cleanup', desc: 'We fix inefficiencies, tighten systems, and increase profit per lead.' },
                    { step: '03', title: 'Scale What Works', desc: 'Only after the foundation is fixed do we scale traffic and demand.' },
                  ].map((item, i) => (
                    <div key={i} className="bg-[#1a1e23] p-12 border border-white/5 relative group hover:border-[#C65A1E]/50 transition-all">
                      <span className="text-6xl font-black text-[#C65A1E]/10 absolute top-4 right-8 group-hover:text-[#C65A1E]/30 transition-colors">
                        {item.step}
                      </span>
                      <h3 className="text-2xl font-black uppercase italic mb-4 relative z-10">{item.title}</h3>
                      <p className="text-[#6B7280] font-medium leading-relaxed italic">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* WHO THIS IS FOR / NOT FOR SECTION */}
            <section className="py-0">
              <div className="flex flex-col lg:flex-row min-h-[600px]">
                <div className="flex-1 bg-[#1a1e23] p-16 lg:p-24 flex flex-col justify-center">
                  <h2 className="text-4xl font-black uppercase italic mb-12 text-[#C65A1E]">Ideal Clients</h2>
                  <div className="space-y-8">
                    {['Contractors doing $500k–$5M/year', 'Med spas with inconsistent bookings', 'Owners tired of guessing', 'Businesses ready to invest to grow'].map(
                      (item, i) => (
                        <div key={i} className="flex items-center gap-6">
                          <CheckCircle2 className="w-8 h-8 text-[#C65A1E]" />
                          <span className="text-xl font-bold uppercase tracking-tight">{item}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <div className="flex-1 bg-[#111418] p-16 lg:p-24 flex flex-col justify-center border-l border-white/5">
                  <h2 className="text-4xl font-black uppercase italic mb-12 text-[#6B7280]">Not A Fit</h2>
                  <div className="space-y-8">
                    {['Cheap lead chasers', 'Businesses unwilling to change', 'Anyone looking for “just ads”', 'Short-term thinkers'].map((item, i) => (
                      <div key={i} className="flex items-center gap-6 opacity-60">
                        <XCircle className="w-8 h-8 text-[#6B7280]" />
                        <span className="text-xl font-bold uppercase tracking-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* WHY SECOND MILE */}
            <section className="py-32 bg-[#F5F4F1] text-[#111418]">
              <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-16 leading-[0.9]">
                  Because <span className="text-[#C65A1E]">average systems</span> produce average businesses.
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left mb-20">
                  {[
                    'We look beyond marketing',
                    'We understand service businesses',
                    'We care about margins, not vanity metrics',
                    'We act like operators, not vendors',
                  ].map((point, i) => (
                    <div key={i} className="p-8 border-l-4 border-[#C65A1E] bg-white shadow-lg">
                      <p className="text-lg font-black uppercase italic">{point}</p>
                    </div>
                  ))}
                </div>
                <div className="max-w-4xl mx-auto">
                  <blockquote className="text-3xl md:text-5xl font-black uppercase italic text-[#C65A1E]">
                    “Most agencies sell activity. We sell outcomes.”
                  </blockquote>
                </div>
              </div>
            </section>

            {/* FINAL CTA SECTION */}
            <section className="py-32 bg-[#111418] relative overflow-hidden text-center">
              <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C65A1E]/10 rounded-full blur-[100px]" />
              </div>
              <div className="max-w-4xl mx-auto px-6 relative z-10">
                <h2 className="text-4xl md:text-7xl font-black uppercase italic mb-8 leading-[0.9]">
                  If you knew where the money was leaking, you’d fix it immediately.
                </h2>
                <p className="text-2xl font-bold text-[#6B7280] uppercase mb-12 tracking-wider">We’ll show you — for free.</p>
                <Button className="scale-125" onClick={() => setActiveTab('audit')}>
                  Book My Free Audit
                </Button>
              </div>
            </section>
          </>
        )}

        {/* SERVICES PAGE CONTENT */}
        {activeTab === 'services' && (
          <section className="py-24 max-w-7xl mx-auto px-6">
            <h1 className="text-6xl font-black uppercase italic mb-16 border-b border-white/10 pb-8">Our Services</h1>
            <div className="space-y-32">
              {SERVICES.map((service, i) => (
                <div key={i} className="grid lg:grid-cols-2 gap-20 items-center">
                  <div className={i % 2 !== 0 ? 'lg:order-2' : ''}>
                    <div className="text-[#C65A1E] mb-6">{service.icon}</div>
                    <h2 className="text-4xl font-black uppercase italic mb-8 leading-tight">{service.title}</h2>
                    <p className="text-xl text-[#6B7280] mb-8 italic">High-impact optimization focused on bottom-line profitability and operational freedom.</p>
                    <ul className="space-y-4">
                      {service.points.map((p: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-4 text-lg font-bold uppercase tracking-tight">
                          <CheckCircle2 className="w-5 h-5 text-[#C65A1E]" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`aspect-video bg-[#1a1e23] border border-white/10 relative ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <LogoSymbol className="w-48 h-48" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* INDUSTRIES PAGE CONTENT */}
        {activeTab === 'industries' && (
          <section className="py-24 max-w-7xl mx-auto px-6">
            <h1 className="text-6xl font-black uppercase italic mb-16 border-b border-white/10 pb-8">Industries We Serve</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {INDUSTRIES.map((ind: any, i: number) => (
                <div key={i} className="bg-[#1a1e23] p-12 border border-white/5 hover:border-[#C65A1E]/50 transition-all group">
                  <h3 className="text-3xl font-black uppercase italic mb-4 group-hover:text-[#C65A1E] transition-colors">{ind.name}</h3>
                  <p className="text-[#6B7280] font-bold uppercase text-sm tracking-widest leading-relaxed mb-8">{ind.description}</p>
                  <Button variant="outline" className="w-full justify-center">
                    View Strategy
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ABOUT PAGE CONTENT */}
        {activeTab === 'about' && (
          <section className="py-24 max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20">
              <div>
                <h1 className="text-6xl font-black uppercase italic mb-8 leading-[0.9]">
                  We build growth systems for businesses willing to go the <span className="text-[#C65A1E]">second mile.</span>
                </h1>
                <div className="h-2 w-32 bg-[#C65A1E] mb-12" />
                <p className="text-xl text-[#6B7280] mb-8 leading-relaxed">
                  Second Mile Growth Co. was founded on a simple principle: doing the bare minimum isn't enough to build a category-leading business. We dive deep
                  into the numbers where most agencies are afraid to look.
                </p>
                <div className="grid grid-cols-2 gap-8 mt-16">
                  {['Discipline', 'Clarity', 'Accountability', 'Performance'].map((val, i) => (
                    <div key={i}>
                      <span className="text-[#C65A1E] font-black uppercase tracking-widest text-xs mb-2 block">Value {i + 1}</span>
                      <p className="text-2xl font-black uppercase italic">{val}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#1a1e23] border border-white/5 p-12 relative">
                <div className="aspect-[4/5] bg-[#111418] border border-white/10 flex items-center justify-center italic text-[#6B7280] text-center p-12">
                  "Success in the service sector is won in the second mile—the extra effort, the refined system, the obsessive attention to margin."
                </div>
              </div>
            </div>
          </section>
        )}

        {/* AUDIT / CONTACT PAGE CONTENT */}
        {activeTab === 'audit' && (
          <section className="py-24 max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-black uppercase italic mb-6">Stop the Leakage.</h1>
              <p className="text-xl text-[#6B7280] uppercase tracking-widest font-bold">Claim your free Profit & Growth Audit below.</p>
            </div>

            {/* ✅ ONE clean working form */}
            <form className="bg-[#1a1e23] p-10 md:p-16 border border-white/10 space-y-8" onSubmit={handleAuditSubmit}>
              <input type="hidden" name="_subject" value="New Free Audit Request" />

              <div className="grid md:grid-cols-2 gap-8">
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Full Name</label>
    <input
      name="fullName"
      type="text"
      className="w-full bg-[#111418] border border-white/10 p-4 focus:border-[#C65A1E] outline-none transition-colors font-bold uppercase tracking-tight"
      placeholder="JOHN DOE"
      required
    />
  </div>

  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Business Name</label>
    <input
      name="businessName"
      type="text"
      className="w-full bg-[#111418] border border-white/10 p-4 focus:border-[#C65A1E] outline-none transition-colors font-bold uppercase tracking-tight"
      placeholder="ACME CONTRACTING"
      required
    />
  </div>
</div>

<div className="grid md:grid-cols-2 gap-8">
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Email</label>
    <input
      name="email"
      type="email"
      className="w-full bg-[#111418] border border-white/10 p-4 focus:border-[#C65A1E] outline-none transition-colors font-bold tracking-tight"
      placeholder="you@company.com"
      required
    />
  </div>

  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Phone Number</label>
    <input
      name="phone"
      type="tel"
      className="w-full bg-[#111418] border border-white/10 p-4 focus:border-[#C65A1E] outline-none transition-colors font-bold tracking-tight"
      placeholder="(555) 555-5555"
      required
    />
  </div>
</div>


              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Industry</label>
                  <select
                    name="industry"
                    className="w-full bg-[#111418] border border-white/10 p-4 focus:border-[#C65A1E] outline-none transition-colors font-bold uppercase tracking-tight text-[#F5F4F1]"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      SELECT INDUSTRY
                    </option>
                    <option value="HVAC">HVAC</option>
                    <option value="PLUMBING">PLUMBING</option>
                    <option value="ELECTRICAL">ELECTRICAL</option>
                    <option value="MED SPA">MED SPA</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Current Revenue Range</label>
                  <select
                    name="revenueRange"
                    className="w-full bg-[#111418] border border-white/10 p-4 focus:border-[#C65A1E] outline-none transition-colors font-bold uppercase tracking-tight text-[#F5F4F1]"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      SELECT RANGE
                    </option>
                    <option value="$0 - $500K">$0 - $500K</option>
                    <option value="$500K - $1M">$500K - $1M</option>
                    <option value="$1M - $5M">$1M - $5M</option>
                    <option value="$5M+">$5M+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">What is your biggest growth bottleneck?</label>
                <textarea
                  name="bottleneck"
                  rows={4}
                  className="w-full bg-[#111418] border border-white/10 p-4 focus:border-[#C65A1E] outline-none transition-colors font-bold uppercase tracking-tight"
                  placeholder="TELL US WHERE IT HURTS..."
                  required
                />
              </div>

              <Button type="submit" className="w-full justify-center py-6 text-lg" disabled={auditStatus === 'sending'}>
                {auditStatus === 'sending' ? 'Sending...' : 'Send Audit Request'}
              </Button>

              {auditStatus === 'success' && (
                <p className="text-center text-green-400 text-[10px] font-bold uppercase tracking-widest">
                  Sent — check your email (and spam/promotions).
                </p>
              )}
              {auditStatus === 'error' && (
                <p className="text-center text-red-400 text-[10px] font-bold uppercase tracking-widest">
                  Error sending — try again.
                </p>
              )}

              <p className="text-center text-[#6B7280] text-[10px] font-bold uppercase tracking-widest">Only 2 Audit Slots Left This Month</p>
            </form>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#111418] border-t border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-16 mb-20">
            <div className="lg:col-span-2">
              <LogoLockup />
              <p className="mt-8 text-[#6B7280] max-w-sm font-bold uppercase text-xs tracking-widest leading-loose">
                A full-stack brand, growth, and profit optimization partner for service-based businesses. We find the leakage, fix the systems, and scale the outcomes.
              </p>
            </div>
            <div>
              <h4 className="text-[#C65A1E] font-black uppercase tracking-widest text-xs mb-8">Navigation</h4>
              <ul className="space-y-4 font-bold uppercase text-xs tracking-[0.2em]">
                {['Services', 'Industries', 'About', 'Audit'].map((item) => (
                  <li
                    key={item}
                    className="cursor-pointer hover:text-[#C65A1E] transition-colors"
                    onClick={() => {
                      setActiveTab(item.toLowerCase());
                      scrollToTop();
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#C65A1E] font-black uppercase tracking-widest text-xs mb-8">Connect</h4>
              <ul className="space-y-4 font-bold uppercase text-xs tracking-[0.2em] text-[#6B7280]">
                <li className="flex items-center gap-3">info@secondmilegrowthco.com</li>
                <li className="flex items-center gap-3">Temecula, ca.</li>
                <li className="flex items-center gap-3">@secondmilegrowthco</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">© 2024 SECOND MILE GROWTH CO. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
              <span className="cursor-pointer hover:text-white transition-colors">PRIVACY POLICY</span>
              <span className="cursor-pointer hover:text-white transition-colors">TERMS OF SERVICE</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Persistent CTA Bar (Mobile only) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-4 bg-[#111418]/90 backdrop-blur-md border-t border-white/10 z-50">
        <Button className="w-full justify-center py-4" onClick={() => setActiveTab('audit')}>
          Book Free Audit
        </Button>
      </div>
    </div>
  );
};

export default SecondMileWebsite;
