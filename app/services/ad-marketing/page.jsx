"use client";

import Link from "next/link";

export default function AdMarketingPage() {
  return (
    <main className="pt-24 bg-[#f5f7f9] text-[#2c2f31]">

      {/* HERO */}
      <section className="px-6 md:px-16 py-24 max-w-6xl">

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
          Ad{" "}
          <span className="text-blue-600">Marketing</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl leading-relaxed">
          We build high-performance ad systems that scale profitably across
          Meta, Google, and marketplaces.
        </p>

        <div className="flex gap-8 mt-10 text-lg font-semibold">
          <Link href="/contact" className="text-black hover:underline">
            Book Strategy Call
          </Link>

          <Link
            href="/tools/ad-analyzer"
            className="text-gray-400 hover:text-black transition"
          >
            Try Free Analyzer
          </Link>
        </div>

      </section>

      {/* PROBLEM */}
      <section className="px-6 md:px-16 py-20 max-w-6xl">

        <h2 className="text-4xl font-bold mb-10">
          Why Most Ads Don’t Work
        </h2>

        <div className="space-y-4 text-gray-600 text-lg">
          <p>❌ No funnel strategy</p>
          <p>❌ Weak creatives</p>
          <p>❌ Wrong targeting</p>
          <p>❌ No data-driven scaling</p>
        </div>

      </section>

      {/* SOLUTION */}
      <section className="px-6 md:px-16 py-20 max-w-6xl">

        <h2 className="text-4xl font-bold mb-12">
          What We Do
        </h2>

        <div className="space-y-6">

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold">
              Creative Strategy
            </h3>
            <p className="text-gray-500 mt-2">
              High-converting ad creatives & messaging
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold">
              Funnel Optimization
            </h3>
            <p className="text-gray-500 mt-2">
              Landing pages and conversion systems
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold">
              Performance Scaling
            </h3>
            <p className="text-gray-500 mt-2">
              Data-backed scaling for profitability
            </p>
          </div>

        </div>

      </section>

      {/* TOOL SECTION (IMPORTANT) */}
      <section className="px-6 md:px-16 py-24 max-w-6xl">

        <h2 className="text-4xl font-bold mb-6">
          Analyze Your Ads Instantly
        </h2>

        <p className="text-gray-600 mb-10">
          Use our free tool to identify what’s working and what’s killing your performance.
        </p>

        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">

          <Link
            href="/tools/ad-analyzer"
            className="text-black font-semibold hover:underline text-lg"
          >
            Open Ad Analyzer →
          </Link>

        </div>

      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-32 text-center">

        <h2 className="text-5xl font-bold text-gray-400">
          Ready to Scale Profitably?
        </h2>

        <Link
          href="/contact"
          className="block mt-6 text-gray-500 hover:text-black font-semibold"
        >
          Book a Strategy Call
        </Link>

      </section>

    </main>
  );
}