"use client";

import Link from "next/link";

export default function EcommercePage() {
  return (
    <main className="pt-24 bg-[#f5f7f9] text-[#2c2f31]">

      {/* HERO */}
      <section className="px-6 md:px-16 py-24 max-w-6xl">

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
          E-commerce{" "}
          <span className="text-blue-600">Growth</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl leading-relaxed">
          We manage your catalog, inventory, and growth systems so your brand
          scales without operational chaos.
        </p>

        <div className="flex gap-8 mt-10 text-lg font-semibold">
          <Link
            href="/contact"
            className="text-black hover:underline"
          >
            Book Strategy Call
          </Link>

          <Link
            href="/tools/ad-analyzer"
            className="text-gray-400 hover:text-black transition"
          >
            Try Free Tool
          </Link>
        </div>

      </section>

      {/* PROBLEM */}
      <section className="px-6 md:px-16 py-20 max-w-6xl">

        <h2 className="text-4xl font-bold mb-10">
          What’s Broken in Most Stores
        </h2>

        <div className="space-y-4 text-gray-600 text-lg">
          <p>❌ Inventory mismatch → lost sales</p>
          <p>❌ Poor listings → low conversions</p>
          <p>❌ Platform errors → account risk</p>
          <p>❌ No structured scaling system</p>
        </div>

      </section>

      {/* SOLUTION */}
      <section className="px-6 md:px-16 py-20 max-w-6xl">

        <h2 className="text-4xl font-bold mb-12">
          What We Handle
        </h2>

        <div className="space-y-6">

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold">
              Catalog Optimization
            </h3>
            <p className="text-gray-500 mt-2">
              Clean listings, SEO, and marketplace sync
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold">
              Inventory Systems
            </h3>
            <p className="text-gray-500 mt-2">
              Prevent overselling and stock errors
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold">
              Growth Scaling
            </h3>
            <p className="text-gray-500 mt-2">
              Ads, funnels, and performance optimization
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-32 text-center">

        <h2 className="text-5xl font-bold text-gray-400">
          Ready to Scale Your Store?
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