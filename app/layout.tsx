import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

// Metadata for SEO and Vercel social previews
export const metadata: Metadata = {
  title: 'Pure Reach Innovation | Kinetic Authority',
  description: 'High-velocity digital growth through expert execution and AI-powered efficiency.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Manually linking fonts if not using next/font for immediate fix */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&family=Manrope:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased bg-[#f5f7f9] text-[#2c2f31]">
        {children}
      </body>
    </html>
  );
}