"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Navbar({ activePage = "Home" }) {
  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Work', href: '/work' },
    { name: 'Insights', href: '#' },
    { name: 'About', href: '/about/support' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-outline-variant/15 shadow-[0px_20px_40px_rgba(0,67,243,0.06)]">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-headline font-extrabold tracking-tighter text-on-surface"
        >
          Pure Reach Innovation.
        </motion.div>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className={`text-sm font-label font-bold transition-colors ${
                activePage === link.name 
                  ? 'text-primary border-b-2 border-primary pb-1' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button className="px-5 py-2 text-on-surface-variant font-label font-bold hover:bg-surface-container-low rounded-lg transition-all">
            Login
          </button>
          <motion.a 
            whileHover={{ scale: 0.95 }}
            href="#"
            className="px-6 py-2 bg-primary text-white font-label font-bold rounded-lg shadow-lg inline-block"
          >
            Get Started
          </motion.a>
        </div>
      </div>
    </nav>
  );
}