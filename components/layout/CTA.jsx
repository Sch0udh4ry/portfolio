"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="px-8 py-24">
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-primary to-primary-container rounded-[3rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tighter mb-8 leading-[0.95]">
            Ready to initiate your growth engine?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-10 py-5 bg-on-primary-fixed text-surface-container-lowest font-bold rounded-xl hover:scale-105 transition-all shadow-2xl">
              Start Project
            </button>
            <button className="px-10 py-5 bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold rounded-xl hover:bg-white/30 transition-all">
              View Our Work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}