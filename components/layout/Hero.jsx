"use client";
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="px-8 pt-32 pb-24 lg:pt-48 lg:pb-40 max-w-7xl mx-auto">
      <div className="max-w-4xl">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-block text-primary font-label font-bold uppercase tracking-[0.3em] text-[10px] mb-6"
        >
          Pure Reach Innovation // Engine Start
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[3.5rem] md:text-[5rem] font-headline font-extrabold leading-[0.95] tracking-[-0.04em] text-on-surface mb-10"
        >
          High-Velocity <br/>
          <span className="text-primary italic">Digital Growth</span> <br/>
          Through Execution.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-on-surface-variant font-body leading-relaxed max-w-2xl mb-12"
        >
          We build kinetic engines that drive authority. From viral social narratives to precision-targeted paid media and organic search dominance.
        </motion.p>
        
        <div className="flex flex-wrap gap-4">
          <button className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-[0px_20px_40px_rgba(0,67,243,0.15)] hover:scale-105 transition-transform">
            Start Project
          </button>
          <button className="px-8 py-4 bg-surface-container-high text-on-surface font-bold rounded-xl hover:bg-surface-container-highest transition-colors">
            View Case Studies
          </button>
        </div>
      </div>
    </section>
  );
}
