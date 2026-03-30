"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function PerformanceGrid() {
  const stats = [
    { label: 'Avg. Visibility Score', value: '94.2%', growth: '+140% YOY' },
    { label: 'Attributed Revenue', value: '$1.2M', growth: 'Scale Active' },
    { label: 'AI Accuracy', value: '99.9%', growth: 'Verified' }
  ];

  return (
    <section className="px-8 py-32 max-w-7xl mx-auto bg-surface">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-primary font-bold uppercase tracking-widest text-[10px] mb-4 block">Engine 02 // Performance</span>
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter mb-8 leading-tight">
            Professional Standards <br/> Beyond Comparison.
          </h2>
          <p className="text-on-surface-variant text-lg font-body leading-relaxed mb-10 max-w-lg">
            Structural separation achieved through tonal shifts. Every interaction is governed by strict protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/15 shadow-[0px_20px_40px_rgba(0,67,243,0.06)] flex justify-between items-end"
            >
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-2">{stat.label}</p>
                <p className="text-4xl font-headline font-black text-on-surface tracking-tighter">{stat.value}</p>
              </div>
              <span className="text-[10px] font-bold text-primary bg-primary/5 px-3 py-1 rounded-full">{stat.growth}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}