"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-lg z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="font-extrabold text-lg">
          Pure Reach
        </Link>

        {/* LINKS */}
        <div className="hidden md:flex gap-8 text-sm font-medium">

          <Link href="/">Home</Link>

          <Link href="/services/ecommerce">
            E-commerce
          </Link>

          <Link href="/tools/ad-analyzer">
            Free Tool
          </Link>

          <Link href="/contact">
            Contact
          </Link>

        </div>

        {/* CTA */}
        <Link
          href="/services/ecommerce"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Get Started
        </Link>

      </div>
    </nav>
  );
}