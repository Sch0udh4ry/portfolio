"use client";
import { motion } from 'framer-motion';
import { Video, Zap, Search } from 'lucide-react';

export default function ServicesOverview() {
  return (
    <section className="bg-surface-container-low py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight mb-6">
              Omnichannel Mastery.
            </h2>
            <p className="text-on-surface-variant text-lg font-body leading-relaxed">
              Harnessing the power of short-form video and high-fidelity design to command attention in the scroll.
            </p>
          </div>
          <div className="h-1.5 w-32 bg-primary rounded-full hidden lg:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Social & Creative", icon: Video, desc: "AI-assisted editing with human creative obsession." },
            { title: "Paid Performance", icon: Zap, desc: "Scale revenue through precision hybrid execution." },
            { title: "SEO Authority", icon: Search, desc: "Strategic digital PR and narrative rank dominance." }
          ].map((service, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-2xl border border-black/[0.03] shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-8">
                <service.icon size={24} />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">{service.title}</h3>
              <p className="text-on-surface-variant text-sm font-body leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}