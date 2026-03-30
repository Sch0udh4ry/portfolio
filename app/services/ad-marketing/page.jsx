"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import { ArrowUpRight, Target, Zap } from 'lucide-react';

export default function AdMarketingPage() {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-8 md:p-12">
        {/* Header Section */}
        <header className="mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-primary"
          >
            Growth Operations
          </motion.span>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-6xl font-headline font-extrabold tracking-[-0.04em] text-on-surface mt-4"
          >
            Ad Marketing <br/> <span className="text-primary italic">Intelligence.</span>
          </motion.h1>
        </header>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { label: 'Avg. ROAS', value: '4.8x', icon: Target, color: 'text-blue-600' },
            { label: 'Attributed Revenue', value: '$1.2M', icon: Zap, color: 'text-amber-500' },
            { label: 'Conversion Lift', value: '+22%', icon: ArrowUpRight, color: 'text-green-500' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-[0px_20px_40px_rgba(0,67,243,0.04)] border border-black/[0.02]"
            >
              <stat.icon className={`${stat.color} mb-4`} size={28} />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
              <p className="text-4xl font-headline font-black text-on-surface tracking-tighter">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Tactical Performance Board */}
        <section className="bg-surface-container-low rounded-[2.5rem] p-8 md:p-12 border border-outline-variant/10">
          <h2 className="text-2xl font-headline font-extrabold mb-8">Live Campaign Momentum</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-2xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400">#0{item}</div>
                  <div>
                    <p className="font-bold text-on-surface">Scale Operation_{item * 102}</p>
                    <p className="text-xs text-slate-400 font-medium">Active • Meta Ads Manager</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-primary tracking-tighter">$4,203.00</p>
                  <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Scaling</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}