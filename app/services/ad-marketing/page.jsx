"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AdMarketingPage() {
  return (
    <main className="pt-24 bg-[#f5f7f9] text-[#2c2f31]">

      {/* HERO */}
      <section className="px-6 md:px-16 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight"
          >
            Performance Marketing That{" "}
            <span className="text-blue-600">Actually Converts</span>
          </motion.h1>

          <p className="mt-6 text-lg text-gray-500 max-w-xl">
            We don’t just run ads — we build profitable funnels across Meta,
            Google, and marketplaces.
          </p>

          <div className="flex gap-4 mt-8 flex-wrap">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold">
              Book Strategy Call
            </button>

            <Link
              href="/tools/ad-analyzer"
              className="px-8 py-4 bg-gray-200 rounded-xl font-semibold"
            >
              Try Free Analyzer
            </Link>
          </div>
        </div>

        {/* VISUAL */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-bold mb-4">Ad Performance Snapshot</h3>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">ROAS</p>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-blue-600 w-[80%] rounded"></div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">CTR</p>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-blue-600 w-[60%] rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="px-6 md:px-16 py-20">
        <h2 className="text-3xl font-bold mb-8">
          Why Most Ads Fail
        </h2>

        <div className="grid md:grid-cols-2 gap-6 text-gray-600">
          <p>❌ Running ads without funnel strategy</p>
          <p>❌ Poor creatives → low CTR</p>
          <p>❌ No tracking → wrong decisions</p>
          <p>❌ Scaling too early → losses</p>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="px-6 md:px-16 py-20 bg-gray-100">
        <h2 className="text-4xl font-bold mb-12">What We Do</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Ad Creative Strategy",
            "Funnel Optimization",
            "Performance Scaling",
          ].map((item, i) => (
            <div key={i} className="p-6 bg-white rounded-xl shadow">
              <h3 className="font-bold">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 🔥 TOOL EMBED SECTION */}
      <section className="px-6 md:px-16 py-24">
        <h2 className="text-4xl font-bold mb-6 text-center">
          Analyze Your Ads Instantly
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Use our free tool to audit your ad performance in seconds.
        </p>

        <div className="bg-white rounded-2xl shadow p-6">

          {/* OPTION 1 — LINK (SAFE FOR NOW) */}
          <div className="text-center">
            <Link
              href="/tools/ad-analyzer"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold inline-block"
            >
              Open Ad Analyzer
            </Link>
          </div>

          {/* OPTION 2 (LATER UPGRADE) */}
          {/* We will embed the actual tool UI here later */}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-24 text-center bg-blue-600 text-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Scale Profitably?
        </h2>

        <button className="px-8 py-4 bg-black rounded-xl font-bold">
          Book Strategy Call
        </button>
      </section>

    </main>
  );
}