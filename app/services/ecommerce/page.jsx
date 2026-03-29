"use client";

import { motion } from "framer-motion";

export default function EcommercePage() {
  const modules = [
    {
      title: "AI Catalog Processing",
      desc: "Fix listings, optimize SEO, and sync products across platforms automatically.",
    },
    {
      title: "Quantity Pulse",
      desc: "Prevent overselling with real-time inventory intelligence.",
      highlight: true,
    },
    {
      title: "Expert Launches",
      desc: "Human-led product launches to maximize conversions.",
    },
    {
      title: "Platform Integration",
      desc: "Seamless setup across Shopify, Amazon & marketplaces.",
    },
  ];

  const stats = [
    { value: "₹10Cr+", label: "Revenue Managed" },
    { value: "200+", label: "Brands" },
    { value: "99.8%", label: "Accuracy" },
    { value: "3x", label: "Growth" },
  ];

  return (
    <main className="bg-[#f5f7f9] text-[#2c2f31] pt-24">

      {/* HERO */}
      <section className="px-6 md:px-16 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight"
          >
            Scale Your{" "}
            <span className="text-blue-600">E-commerce Revenue</span>
          </motion.h1>

          <p className="mt-6 text-lg text-gray-500 max-w-xl">
            We handle catalog, inventory, and growth campaigns using AI +
            human expertise.
          </p>

          <div className="flex gap-4 mt-8 flex-wrap">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:-translate-y-1 transition">
              Book Strategy Call
            </button>
            <button className="px-8 py-4 bg-gray-200 rounded-xl font-semibold">
              View Demo
            </button>
          </div>

          <div className="flex gap-6 mt-6 text-sm text-gray-500 flex-wrap">
            <span>✔ 200+ Brands</span>
            <span>✔ 99.8% Accuracy</span>
            <span>✔ Multi-Platform</span>
          </div>
        </div>

        {/* DASHBOARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-2xl shadow"
        >
          <div className="grid grid-cols-5 gap-2 h-32 items-end">
            {[40, 70, 100, 60, 80].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.2 }}
                className="bg-blue-600 rounded"
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="px-6 md:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <h3 className="text-3xl font-bold">{s.value}</h3>
              <p className="text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section className="px-6 md:px-16 py-20">
        <h2 className="text-3xl font-bold mb-8">
          Managing E-commerce Is Not Just Uploading Products
        </h2>

        <div className="grid md:grid-cols-2 gap-6 text-gray-600">
          <p>❌ Inventory mismatch → lost sales</p>
          <p>❌ Poor listings → low conversions</p>
          <p>❌ Platform errors → account risk</p>
          <p>❌ Ads without strategy → wasted budget</p>
        </div>
      </section>

      {/* MODULES */}
      <section className="px-6 md:px-16 py-20 bg-gray-100">
        <h2 className="text-4xl font-bold mb-12">Our Solutions</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {modules.map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className={`p-6 rounded-2xl ${
                m.highlight
                  ? "bg-blue-600 text-white"
                  : "bg-white shadow"
              }`}
            >
              <h3 className="text-xl font-bold">{m.title}</h3>
              <p className="mt-2 opacity-80">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-24 text-center bg-blue-600 text-white">
        <h2 className="text-4xl font-bold mb-6">
          Let’s Fix Your E-commerce in 7 Days
        </h2>

        <p className="mb-8 opacity-90">
          Get a free audit and growth plan.
        </p>

        <button className="px-8 py-4 bg-black rounded-xl font-bold">
          Book Strategy Call
        </button>
      </section>

    </main>
  );
}