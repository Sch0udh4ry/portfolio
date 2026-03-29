"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="font-extrabold text-lg text-black">
          Pure Reach <span className="text-blue-600">Innovation</span>
        </Link>

        {/* LINKS */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">

          <Link href="/" className="hover:text-black transition">
            Home
          </Link>

          <Link href="/services/ecommerce" className="hover:text-black transition">
            E-commerce
          </Link>

          <Link href="/services/ad-marketing" className="hover:text-black transition">
            Ads
          </Link>

          <Link href="/tools/ad-analyzer" className="hover:text-black transition">
            Free Tool
          </Link>

        </div>

        {/* CTA */}
        <Link
          href="/services/ecommerce"
          className="text-sm font-semibold text-black hover:underline"
        >
          Get Started
        </Link>

      </div>
    </nav>
  );
}