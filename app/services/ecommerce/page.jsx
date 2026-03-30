"use client";
import React, { useState } from 'react';
import { ArrowRight, BarChart3, Database, Rocket, Settings, Menu, X } from 'lucide-react';

const KineticResponsive = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="relative flex items-center justify-between px-6 py-6 max-w-7xl mx-auto z-50">
        <div className="flex items-center gap-10">
          <span className="font-bold text-xl tracking-tight">Kinetic Agency</span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition">Services</a>
            <a href="#" className="hover:text-blue-600 transition">Work</a>
            <a href="#" className="hover:text-blue-600 transition">Insights</a>
            <a href="#" className="hover:text-blue-600 transition">About</a>
          </div>
        </div>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-medium">Login</button>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 flex flex-col gap-4 md:hidden border-t">
            <a href="#" className="font-medium py-2">Services</a>
            <a href="#" className="font-medium py-2">Work</a>
            <a href="#" className="font-medium py-2">Insights</a>
            <a href="#" className="font-medium py-2">About</a>
            <hr />
            <button className="bg-blue-600 text-white w-full py-3 rounded-lg font-bold">Get Started</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="px-6 pt-10 pb-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="text-center lg:text-left">
          <span className="bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block">
            AI-Powered Efficiency. Human-Directed Strategy.
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-6 leading-tight">
            Scale Your <span className="text-blue-600 font-serif italic">E-</span><br className="hidden md:block" />commerce Engine.
          </h1>
          <p className="mt-6 text-slate-500 text-base md:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
            A specialized management suite designed for high-growth brands. We leverage AI for rapid data processing while veteran managers oversee brand strategy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-10">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition">
              Explore Solutions
            </button>
            <button className="bg-slate-200 text-slate-700 px-8 py-4 rounded-lg font-semibold hover:bg-slate-300 transition">
              View Demo
            </button>
          </div>
        </div>

        {/* Dashboard Graphic - Responsive scaling */}
        <div className="relative bg-white rounded-2xl shadow-2xl p-4 md:p-8 border border-slate-100 max-w-xl mx-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white text-xs">K</div>
              <div className="text-left">
                <p className="text-[9px] text-slate-400 uppercase font-bold">Hybrid Intelligence</p>
                <p className="text-xs md:text-sm font-bold">Kinetic Dashboard</p>
              </div>
            </div>
            <span className="text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded-full font-bold">Systems Supervised</span>
          </div>
          <div className="flex items-end gap-2 h-20 md:h-32 mb-6">
            {[40, 65, 100, 75, 90].map((h, i) => (
              <div key={i} className="bg-blue-500 w-full rounded-sm opacity-80" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-[9px] text-slate-400 font-bold uppercase">AI Catalog Sync</p>
              <p className="text-lg font-bold">99.8%</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-[9px] text-slate-400 font-bold uppercase">Human Managed</p>
              <p className="text-lg font-bold italic">Verified</p>
            </div>
          </div>
        </div>
      </header>

      {/* Management Modules */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Management Modules</h2>
            <p className="text-slate-500 mt-2">Precision tools where AI efficiency meets expert oversight.</p>
          </div>
          <a href="#" className="text-blue-600 font-semibold flex items-center gap-2 text-sm">
            View All Services <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6">
              <Database size={20} />
            </div>
            <h3 className="text-xl font-bold mb-3">AI Catalog Processing</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">Our neural engines process thousands of SKUs and metadata points in seconds.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] bg-slate-100 px-2 py-1 rounded">AI Data Mapping</span>
              <span className="text-[10px] bg-slate-100 px-2 py-1 rounded">Automated Syncing</span>
            </div>
          </div>

          {/* Card 2 - Blue */}
          <div className="bg-blue-600 p-8 rounded-2xl text-white shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
                <Settings size={20} />
              </div>
              <h3 className="text-xl font-bold mb-3">Quantity Pulse</h3>
              <p className="text-blue-100 text-sm leading-relaxed">Automated inventory leveling powered by predictive analytics to prevent overselling.</p>
            </div>
            <button className="bg-white text-blue-600 w-full py-3 rounded-lg font-bold mt-8 hover:bg-blue-50 transition">Setup Alerts</button>
          </div>

          {/* Card 3 - Grey */}
          <div className="bg-slate-200 p-8 rounded-2xl border border-slate-300 md:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-6 shadow-sm">
              <Rocket size={20} />
            </div>
            <h3 className="text-xl font-bold mb-3">Expert Launches</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">Strategic deployment managed by human experts to ensure brand voice perfection.</p>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-slate-400 border-2 border-slate-200"></div>
                <div className="w-6 h-6 rounded-full bg-slate-500 border-2 border-slate-200"></div>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Human Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto bg-blue-600 rounded-[32px] md:rounded-[40px] p-8 md:p-20 text-center text-white relative overflow-hidden">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">
            Ready to operationalize your digital growth?
          </h2>
          <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-sm md:text-base relative z-10">
            Join 200+ global brands leveraging Kinetic Authority for high-performance retail management.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <button className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition">Book a Strategy Call</button>
            <button className="bg-blue-500 text-white px-8 py-4 rounded-xl font-bold border border-blue-400 hover:bg-blue-400 transition">View Pricing</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 max-w-7xl mx-auto border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center sm:text-left">
        <div className="flex flex-col items-center sm:items-start">
          <h4 className="font-bold text-lg mb-4">Kinetic Authority</h4>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">Redefining the digital retail ecosystem through AI efficiency.</p>
        </div>
        <div>
          <h5 className="font-bold text-[10px] mb-6 uppercase tracking-widest text-slate-400">Services</h5>
          <ul className="space-y-3 text-sm font-medium text-slate-600">
            <li><a href="#" className="hover:text-blue-600">Paid Ads</a></li>
            <li><a href="#" className="hover:text-blue-600">Web Dev</a></li>
            <li><a href="#" className="hover:text-blue-600">SEO</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-[10px] mb-6 uppercase tracking-widest text-slate-400">Company</h5>
          <ul className="space-y-3 text-sm font-medium text-slate-600">
            <li><a href="#" className="hover:text-blue-600">Support</a></li>
            <li><a href="#" className="hover:text-blue-600">Privacy</a></li>
            <li><a href="#" className="hover:text-blue-600">Terms</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-[10px] mb-6 uppercase tracking-widest text-slate-400">Newsletter</h5>
          <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden mt-4">
            <input type="email" placeholder="Email" className="px-4 py-2 w-full outline-none text-sm" />
            <button className="bg-blue-600 text-white p-3"><ArrowRight size={16} /></button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KineticResponsive;