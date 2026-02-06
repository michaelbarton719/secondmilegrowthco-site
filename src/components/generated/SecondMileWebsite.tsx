import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const Button = ({ children, className = '', ...props }: any) => (
  <button
    {...props}
    className={`px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all duration-300 inline-flex items-center gap-2 bg-[#C65A1E] text-white hover:bg-[#9F4617] ${className}`}
  >
    {children}
    <ArrowUpRight className="w-4 h-4" />
  </button>
);

export const SecondMileWebsite = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'audit'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#111418] text-[#F5F4F1] font-sans">

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-[#111418] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-black text-xl cursor-pointer" onClick={() => setActiveTab('home')}>
            SECOND MILE GROWTH CO.
          </div>

          <div className="hidden md:flex gap-6">
            <button onClick={() => setActiveTab('home')}>Home</button>
            <button onClick={() => setActiveTab('audit')}>Audit</button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <main className="pt-28 px-6">

        {/* HOME */}
        {activeTab === 'home' && (
          <section className="max-w-4xl mx-auto text-center space-y-10">
            <h1 className="text-5xl md:text-7xl font-black uppercase italic">
              Your business is leaking money.
            </h1>
            <p className="text-xl text-[#6B7280]">
              We find it. Fix it. Then scale what works.
            </p>
            <Button onClick={() => setActiveTab('audit')}>
              Get My Free Audit
            </Button>
          </section>
        )}

        {/* AUDIT FORM */}
        {activeTab === 'audit' && (
          <section className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-black uppercase italic mb-8 text-center">
              Free Profit & Growth Audit
            </h2>

            <form
              action="https://formspree.io/f/xvzbplbb"
              method="POST"
              className="bg-[#1a1e23] p-10 space-y-8 border border-white/10"
            >

              <input type="hidden" name="_subject" value="New Free Audit Request" />

              <div>
                <label className="block mb-2 uppercase text-xs text-[#6B7280]">Full Name</label>
                <input
                  name="fullName"
                  required
                  className="w-full p-4 bg-[#111418] border border-white/10"
                />
              </div>

              <div>
                <label className="block mb-2 uppercase text-xs text-[#6B7280]">Business Name</label>
                <input
                  name="businessName"
                  required
                  className="w-full p-4 bg-[#111418] border border-white/10"
                />
              </div>

              <div>
                <label className="block mb-2 uppercase text-xs text-[#6B7280]">Industry</label>
                <select
                  name="industry"
                  required
                  className="w-full p-4 bg-[#111418] border border-white/10"
                >
                  <option value="">Select</option>
                  <option>HVAC</option>
                  <option>Plumbing</option>
                  <option>Electrical</option>
                  <option>Med Spa</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 uppercase text-xs text-[#6B7280]">Revenue Range</label>
                <select
                  name="revenueRange"
                  required
                  className="w-full p-4 bg-[#111418] border border-white/10"
                >
                  <option value="">Select</option>
                  <option>$0–$500k</option>
                  <option>$500k–$1M</option>
                  <option>$1M–$5M</option>
                  <option>$5M+</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 uppercase text-xs text-[#6B7280]">
                  Biggest Bottleneck
                </label>
                <textarea
                  name="bottleneck"
                  required
                  rows={4}
                  className="w-full p-4 bg-[#111418] border border-white/10"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#C65A1E] font-bold uppercase tracking-widest hover:bg-[#9F4617]"
              >
                Send Audit Request
              </button>

            </form>
          </section>
        )}

      </main>
    </div>
  );
};

export default SecondMileWebsite;

