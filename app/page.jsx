"use client";
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/layout/Hero';
import ServicesOverview from '@/components/layout/ServicesOverview';
import PerformanceGrid from '@/components/layout/PerformanceGrid';
import CTA from '@/components/layout/CTA';

export default function HomePage() {
  return (
    <div className="bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      <Navbar activePage="Home" />
      <main className="overflow-hidden">
        {/* Layer 0: Base Surface */}
        <Hero />
        
        {/* Layer 1: Surface Container Low (#eef1f3) */}
        <ServicesOverview />
        
        {/* Layer 0: Return to Base Surface */}
        <PerformanceGrid />
        
        {/* Layer: Signature Gradient */}
        <CTA />
      </main>
      
      <footer className="bg-white py-12 border-t border-outline-variant/15 text-center">
        <p className="text-on-surface-variant text-sm font-body">
          © 2026 Pure Reach Innovation. Kinetic Authority Digital.
        </p>
      </footer>
    </div>
  );
}