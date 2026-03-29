"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="pt-24 bg-[#f5f7f9] text-[#2c2f31]">

      {/* HERO */}
      <section className="px-6 md:px-16 py-28 max-w-6xl relative">

  {/* LIGHT GRADIENT BACKGROUND */}
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-transparent -z-10"></div>

  <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
    Pure Reach{" "}
    <span className="text-blue-600">Innovation</span>
  </h1>

  <h2 className="text-3xl md:text-4xl font-semibold mt-6">
    Scaling E-commerce Brands
  </h2>

  <p className="text-blue-600 font-semibold uppercase tracking-wide mt-4">
    PURE REACH INNOVATION
  </p>

  <p className="mt-6 text-lg text-gray-600 max-w-2xl leading-relaxed">
    From catalog to conversions — we handle operations, growth, and
    performance so you can focus on scaling.
  </p>

  {/* BUTTONS */}
  <div className="flex gap-8 mt-10 text-lg font-semibold">
    <Link
      href="/services/ecommerce"
      className="text-gray-400 hover:text-black transition"
    >
      Explore E-commerce
    </Link>

    <Link
      href="/tools/ad-analyzer"
      className="text-black hover:underline"
    >
      Try Free Tool
    </Link>
  </div>

  {/* TRUST */}
  <div className="flex gap-8 mt-10 text-sm text-gray-600 flex-wrap">
    <span>✔ 200+ Brands</span>
    <span>✔ ₹10Cr+ Managed</span>
    <span>✔ Multi-Platform Experts</span>
  </div>

  {/* IMPROVED CARD */}
  <div className="mt-14 bg-white rounded-2xl shadow-md p-6 max-w-3xl border border-gray-100">
    <h3 className="font-semibold text-lg mb-4">
      Growth Snapshot
    </h3>

    <div className="space-y-4">

      <div>
        <p className="text-sm text-gray-500 mb-1">Revenue</p>
        <div className="h-2 bg-gray-200 rounded">
          <div className="h-2 bg-blue-600 w-[80%] rounded"></div>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-1">Conversions</p>
        <div className="h-2 bg-gray-200 rounded">
          <div className="h-2 bg-blue-600 w-[60%] rounded"></div>
        </div>
      </div>

    </div>
  </div>

</section>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
          Pure Reach{" "}
          <span className="text-blue-600">Innovation</span>
        </h1>

        <h2 className="text-3xl md:text-4xl font-semibold mt-6">
          Scaling E-commerce Brands
        </h2>

        <p className="text-blue-600 font-semibold uppercase tracking-wide mt-4">
          PURE REACH INNOVATION
        </p>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl leading-relaxed">
          From catalog to conversions — we handle operations, growth, and
          performance so you can focus on scaling.
        </p>

        {/* BUTTONS */}
        <div className="flex gap-8 mt-10 text-lg font-semibold">
          <Link
            href="/services/ecommerce"
            className="text-gray-400 hover:text-black transition"
          >
            Explore E-commerce
          </Link>

          <Link
            href="/tools/ad-analyzer"
            className="text-black hover:underline"
          >
            Try Free Tool
          </Link>
        </div>

        {/* TRUST */}
        <div className="flex gap-8 mt-10 text-sm text-gray-600 flex-wrap">
          <span>✔ 200+ Brands</span>
          <span>✔ ₹10Cr+ Managed</span>
          <span>✔ Multi-Platform Experts</span>
        </div>

        {/* CARD */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm p-6 max-w-3xl">
          <h3 className="font-semibold text-lg mb-4">
            Growth Snapshot
          </h3>

          <div className="space-y-4 text-gray-600">
            <p>Revenue</p>
            <p>Conversions</p>
          </div>
        </div>

      </section>

      {/* WHAT WE DO */}
      <section className="px-6 md:px-16 py-20 max-w-6xl">

        <h2 className="text-4xl font-bold mb-12">
          What We Do
        </h2>

        <div className="space-y-6">

          <Link href="/services/ecommerce" className="block bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold">
              E-commerce Growth
            </h3>
            <p className="text-gray-500 mt-2">
              Catalog, ads, scaling systems
            </p>
          </Link>

          <Link href="/services/ad-marketing" className="block bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold">
              Ad Marketing
            </h3>
            <p className="text-gray-500 mt-2">
              Performance campaigns & scaling
            </p>
          </Link>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold">
              SEO
            </h3>
            <p className="text-gray-500 mt-2">
              Rank & organic growth
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-32 text-center">

        <h2 className="text-5xl font-bold text-gray-400">
          Ready to Scale Your Brand?
        </h2>

        <Link
          href="/services/ecommerce"
          className="block mt-6 text-gray-500 hover:text-black font-semibold"
        >
          Get Started
        </Link>

      </section>

    </main>
  );
}