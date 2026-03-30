"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, TrendingUp, ShoppingCart, BarChart2, Shield } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: LayoutGrid, path: '/services' },
  { name: 'Ad Marketing', icon: TrendingUp, path: '/services/ad-marketing' },
  { name: 'E-commerce', icon: ShoppingCart, path: '/services/ecommerce' },
  { name: 'Ad Analyzer', icon: BarChart2, path: '/tools/ad-analyzer' },
  { name: 'Compliance', icon: Shield, path: '/about/support' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-screen w-72 bg-white/70 backdrop-blur-xl border-r border-outline-variant/15 z-40 hidden lg:flex flex-col p-8"
    >
      <div className="mb-12 px-2">
        <span className="text-xl font-black tracking-tighter text-on-surface">
          Pure Reach.
        </span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.name} href={item.path}>
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  isActive 
                    ? 'bg-primary text-white shadow-[0px_10px_20px_rgba(0,67,243,0.15)]' 
                    : 'text-slate-500 hover:bg-surface-container-low hover:text-primary'
                }`}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {item.name}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4 bg-primary/5 rounded-2xl border border-primary/10">
        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">System Status</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-on-surface">Pure Node Active</span>
        </div>
      </div>
    </motion.aside>
  );
}