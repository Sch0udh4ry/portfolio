"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="pt-24 bg-[#f5f7f9] text-[#2c2f31]">

      {/* HERO */}
      <section className="px-6 md:px-16 py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight"
          >
            We Scale{" "}
            <span className="text-blue-600">E-commerce Brands</span>
          </motion.h1>

          <p className="mt-6 text-lg text-gray-500 max-w-xl">
            From catalog to conversions — we handle operations, growth, and
            performance so you can focus on scaling.
          </p>

          <div className="flex gap-4 mt-8 flex-wrap">
            <Link
              href="/services/ecommerce"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:-translate-y-1 transition"
            >
              Explore E-commerce
            </Link>

            <Link
              href="/tools/ad-analyzer"
              className="px-8 py-4 bg-gray-200 rounded-xl font-semibold"
            >
              Try Free Tool
            </Link>
          </div>

          <div className="flex gap-6 mt-6 text-sm text-gray-500 flex-wrap">
            <span>✔ 200+ Brands</span>
            <span>✔ ₹10Cr+ Managed</span>
            <span>✔ Multi-Platform Experts</span>
          </div>
        </div>

        {/* RIGHT SIDE CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-2xl shadow"
        >
          <h3 className="font-bold mb-4">Growth Snapshot</h3>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-blue-600 w-[80%] rounded"></div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Conversions</p>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-blue-600 w-[60%] rounded"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="px-6 md:px-16 py-20 bg-gray-100">
        <h2 className="text-4xl font-bold mb-12">What We Do</h2>

        <div className="grid md:grid-cols-3 gap-6">

          <Link href="/services/ecommerce" className="p-6 bg-white rounded-xl shadow hover:shadow-lg">
            <h3 className="font-bold text-xl">E-commerce Growth</h3>
            <p className="text-gray-500 mt-2">
              Catalog, ads, scaling systems
            </p>
          </Link>

          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="font-bold text-xl">Social Media</h3>
            <p className="text-gray-500 mt-2">
              Content & brand building
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="font-bold text-xl">SEO</h3>
            <p className="text-gray-500 mt-2">
              Rank & organic growth
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-24 text-center bg-blue-600 text-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Scale Your Brand?
        </h2>

        <Link
          href="/services/ecommerce"
          className="px-8 py-4 bg-black rounded-xl font-bold inline-block"
        >
          Get Started
        </Link>
      </section>

    </main>
  );
}