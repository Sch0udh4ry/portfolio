import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const brand = {
  bg: "#07080b",
  panel: "#151820",
  panel2: "#1d212b",
  line: "rgba(255, 244, 226, 0.12)",
  text: "#f4ebdd",
  soft: "#b0a594",
  faint: "#8f8576",
  gold: "#c9a169",
  gold2: "#e0bf8d",
  goldDeep: "#7d6039",
  blue: "#8bb6ff",
  green: "#95d5b2",
  purple: "#cdb4ff",
};

const defaultInputs = {
  views: "",
  reach: "",
  profileVisits: "",
  directFollows: "",
  followersBefore: "",
  followersAfter: "",
  likes: "",
  shares: "",
  comments: "",
  saves: "",
  playsThreeSec: "",
  adSpend: "",
  dailyBudget: "",
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const n = (value) => Number.parseFloat(value) || 0;
const formatINR = (value) =>
  value || value === 0 ? `₹${Number(value).toLocaleString("en-IN", { maximumFractionDigits: 2 })}` : "—";
const fmtNum = (value) => (value || value === 0 ? Number(value).toLocaleString("en-IN") : "—");
const fmtPct = (value) => (value || value === 0 ? `${(value * 100).toFixed(2)}%` : "—");

function KPI({ label, value, sub, accent = brand.gold2 }) {
  return (
    <div className="rounded-2xl border p-5 shadow-[0_20px_50px_rgba(0,0,0,0.28)]" style={{ background: `linear-gradient(180deg, ${brand.panel}, ${brand.panel2})`, borderColor: brand.line }}>
      <div className="text-[10px] uppercase tracking-[0.24em]" style={{ color: brand.soft }}>
        {label}
      </div>
      <div className="mt-2 text-3xl font-extrabold leading-none" style={{ color: accent }}>
        {value}
      </div>
      {sub ? <div className="mt-2 text-sm" style={{ color: brand.faint }}>{sub}</div> : null}
    </div>
  );
}

function Field({ label, value, onChange, placeholder = "0" }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: brand.soft }}>
        {label}
      </span>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border px-4 py-3 outline-none transition focus:shadow-[0_0_0_4px_rgba(201,161,105,0.14)]"
        style={{ background: "rgba(255,255,255,0.04)", borderColor: brand.line, color: brand.text }}
      />
    </label>
  );
}

function Section({ title, icon, children }) {
  return (
    <section className="rounded-3xl border p-6 md:p-8" style={{ background: `linear-gradient(180deg, ${brand.panel}, ${brand.panel2})`, borderColor: brand.line }}>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg, rgba(201,161,105,0.22), rgba(125,96,57,0.18))", color: brand.gold2 }}>
          {icon}
        </div>
        <h3 className="text-xl font-bold tracking-tight" style={{ color: brand.text }}>
          {title}
        </h3>
      </div>
      {children}
    </section>
  );
}

function InsightChip({ type, text }) {
  const c =
    type === "good"
      ? { bg: "rgba(149, 213, 178, 0.12)", border: "rgba(149, 213, 178, 0.28)", text: "#d8f3dc" }
      : type === "warn"
      ? { bg: "rgba(224, 191, 141, 0.12)", border: "rgba(224, 191, 141, 0.28)", text: "#f6e7c9" }
      : { bg: "rgba(139, 182, 255, 0.12)", border: "rgba(139, 182, 255, 0.28)", text: "#dbe8ff" };

  return (
    <div className="flex gap-3 rounded-2xl border px-4 py-3" style={{ background: c.bg, borderColor: c.border }}>
      <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: c.text }} />
      <p className="text-sm leading-6" style={{ color: c.text }}>
        {text}
      </p>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border px-4 py-3 shadow-2xl" style={{ background: "#11151b", borderColor: brand.line }}>
      <div className="text-xs" style={{ color: brand.soft }}>{label}</div>
      {payload.map((item, index) => (
        <div key={index} className="mt-1 text-sm font-semibold" style={{ color: item.color || brand.gold2 }}>
          {typeof item.value === "number" ? item.value.toLocaleString("en-IN") : item.value}
        </div>
      ))}
    </div>
  );
}

function DownloadModal({ onClose, onConfirm }) {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const valid = isValidEmail(email);
  const showError = touched && !valid;

  const submit = async () => {
    setTouched(true);
    if (!valid) return;
    setLoading(true);
    await onConfirm(email);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-md rounded-[28px] border p-8 shadow-[0_30px_80px_rgba(0,0,0,0.6)]" style={{ background: `linear-gradient(180deg, ${brand.panel}, ${brand.panel2})`, borderColor: brand.line }}>
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(201,161,105,0.2), rgba(125,96,57,0.16))" }}>
          📥
        </div>
        <h3 className="text-center text-2xl font-extrabold tracking-tight" style={{ color: brand.text }}>
          Download HD Report
        </h3>
        <p className="mt-3 text-center text-sm leading-6" style={{ color: brand.soft }}>
          Enter your email to generate the PNG export. We’ll keep it simple and send the file directly.
        </p>
        <div className="mt-6">
          <label className="mb-2 block text-[11px] uppercase tracking-[0.2em]" style={{ color: brand.soft }}>
            Email Address
          </label>
          <input
            type="email"
            value={email}
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            className="w-full rounded-xl border px-4 py-3 outline-none"
            style={{ background: "rgba(255,255,255,0.05)", borderColor: showError ? "rgba(224, 191, 141, 0.55)" : brand.line, color: brand.text }}
            placeholder="you@example.com"
          />
          {showError ? <p className="mt-2 text-sm" style={{ color: "#f3d8a8" }}>Please enter a valid email.</p> : null}
        </div>
        <button
          onClick={submit}
          disabled={loading}
          className="mt-6 w-full rounded-xl px-5 py-4 font-bold text-black transition hover:brightness-105 disabled:cursor-wait"
          style={{ background: `linear-gradient(135deg, ${brand.gold2}, ${brand.gold})` }}
        >
          {loading ? "Generating..." : "Download HD Report"}
        </button>
        <button onClick={onClose} className="mx-auto mt-4 block text-sm" style={{ color: brand.faint }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [inputs, setInputs] = useState(defaultInputs);
  const [report, setReport] = useState(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState("idle");
  const [lead, setLead] = useState({ name: "", email: "", business: "" });
  const [leadDone, setLeadDone] = useState(false);
  const inputRef = useRef(null);
  const dashRef = useRef(null);
  const canvasRef = useRef(null);

  const setField = (key) => (value) => setInputs((prev) => ({ ...prev, [key]: value }));

  const reportData = useMemo(() => {
    if (!report) return [];
    return [
      { name: "Likes", value: report.likes, fill: "#c9a169" },
      { name: "Comments", value: report.comments, fill: "#e0bf8d" },
      { name: "Shares", value: report.shares, fill: "#95d5b2" },
      { name: "Saves", value: report.saves, fill: "#8bb6ff" },
    ];
  }, [report]);

  const generate = () => {
    const views = n(inputs.views);
    const reach = n(inputs.reach);
    const profileVisits = n(inputs.profileVisits);
    const directFollows = n(inputs.directFollows);
    const followersBefore = n(inputs.followersBefore);
    const followersAfter = n(inputs.followersAfter);
    const likes = n(inputs.likes);
    const shares = n(inputs.shares);
    const comments = n(inputs.comments);
    const saves = n(inputs.saves);
    const playsThreeSec = n(inputs.playsThreeSec);
    const adSpend = n(inputs.adSpend);
    const dailyBudget = n(inputs.dailyBudget);

    const followersGained = Math.max(0, followersAfter - followersBefore);
    const profileVisitRate = views > 0 ? profileVisits / views : 0;
    const followConversionRate = profileVisits > 0 ? directFollows / profileVisits : 0;
    const engagementRate = views > 0 ? (likes + shares + comments + saves) / views : 0;
    const costPerVisit = profileVisits > 0 ? adSpend / profileVisits : 0;
    const costPerFollower = followersGained > 0 ? adSpend / followersGained : 0;
    const cpm = reach > 0 ? (adSpend / reach) * 1000 : 0;
    const engagementTotal = likes + shares + comments + saves;

    const insights = [];
    if (profileVisitRate > 0.006) insights.push({ type: "good", text: `Profile Visit Rate is ${fmtPct(profileVisitRate)} and is clearing the 0.6% benchmark.` });
    else if (profileVisitRate > 0) insights.push({ type: "warn", text: `Profile Visit Rate is ${fmtPct(profileVisitRate)}. Stronger hooks and clearer CTA language should help.` });
    if (followConversionRate > 0.15) insights.push({ type: "good", text: `Follow conversion is ${fmtPct(followConversionRate)}. The profile is doing excellent closing work.` });
    else if (followConversionRate > 0) insights.push({ type: "tip", text: `Follow conversion is ${fmtPct(followConversionRate)}. Tighten your bio and pin your best proof points.` });
    if (costPerFollower > 0 && costPerFollower < 3) insights.push({ type: "good", text: `Cost per follower is ${formatINR(costPerFollower)} and looks efficient.` });
    else if (costPerFollower >= 3) insights.push({ type: "warn", text: `Cost per follower is ${formatINR(costPerFollower)}. Test new creatives or audience segments.` });
    if (engagementRate > 0.03) insights.push({ type: "good", text: `Engagement rate of ${fmtPct(engagementRate)} is above the 3% benchmark.` });
    else if (engagementRate > 0) insights.push({ type: "tip", text: `Engagement rate is ${fmtPct(engagementRate)}. Add more direct interaction cues in the creative.` });
    if (saves > likes * 0.1) insights.push({ type: "good", text: `Save rate is healthy, which is a strong quality signal for organic lift.` });

    setReport({
      views,
      reach,
      profileVisits,
      directFollows,
      followersBefore,
      followersAfter,
      likes,
      shares,
      comments,
      saves,
      playsThreeSec,
      adSpend,
      dailyBudget,
      followersGained,
      profileVisitRate,
      followConversionRate,
      engagementRate,
      costPerVisit,
      costPerFollower,
      cpm,
      engagementTotal,
      insights,
    });

    setDownloadStatus("idle");
    window.setTimeout(() => dashRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const doDownload = async () => {
    if (!window.html2canvas) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    const el = canvasRef.current;
    if (!el) return;

    const canvas = await window.html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: brand.bg,
      width: 1400,
      windowWidth: 1600,
      logging: false,
    });

    const link = document.createElement("a");
    link.download = `sunil-ad-report-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png", 1);
    link.click();
    setDownloadStatus("success");
    setShowDownloadModal(false);
  };

  const chartData = reportData;

  return (
    <div className="min-h-screen" style={{ background: brand.bg, color: brand.text, fontFamily: "Manrope, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Manrope:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${brand.bg}; }
      `}</style>

      {showDownloadModal ? <DownloadModal onClose={() => setShowDownloadModal(false)} onConfirm={doDownload} /> : null}

      <header className="sticky top-0 z-50 border-b backdrop-blur-2xl" style={{ background: "rgba(7, 8, 11, 0.9)", borderColor: brand.line }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg, #7a5d39, #d1aa74)" }}>⚡</div>
            <div>
              <div className="text-lg font-extrabold tracking-tight" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                Pure Reach Innovation
              </div>
              <div className="text-[11px] uppercase tracking-[0.24em]" style={{ color: brand.soft }}>Instagram Ad Calculator</div>
            </div>
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            <a href="https://sunillchoudhary.in" className="text-sm font-medium transition hover:text-white" style={{ color: brand.soft }}>Main Site</a>
            <a href="#calculator" className="text-sm font-medium transition hover:text-white" style={{ color: brand.soft }}>Calculator</a>
            <a href="#dashboard" className="text-sm font-medium transition hover:text-white" style={{ color: brand.soft }}>Dashboard</a>
            <a href="#contact" className="rounded-xl px-4 py-2 text-sm font-bold text-black transition hover:brightness-105" style={{ background: `linear-gradient(135deg, ${brand.gold2}, ${brand.gold})` }}>Get a Quote</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-5 pb-20 pt-16 md:px-8 md:pt-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-5 inline-flex rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em]" style={{ background: "rgba(201,161,105,0.10)", borderColor: "rgba(201,161,105,0.24)", color: brand.gold2 }}>
                Built for sunillchoudhary.in
              </div>
              <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                Analyze Instagram Ads
                <span className="block" style={{ color: brand.gold2 }}>with clear ROI signals.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8" style={{ color: brand.soft }}>
                Drop in your campaign numbers and get a clean performance snapshot, funnel rates, and exportable report. The look now follows the site’s darker, gold-accented brand system.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button onClick={() => inputRef.current?.scrollIntoView({ behavior: "smooth" })} className="rounded-2xl px-6 py-4 font-bold text-black transition hover:brightness-105" style={{ background: `linear-gradient(135deg, ${brand.gold2}, ${brand.gold})` }}>
                  Start Analysis
                </button>
                <a href="https://sunillchoudhary.in" className="rounded-2xl border px-6 py-4 font-bold transition hover:bg-white/5" style={{ borderColor: brand.line, color: brand.text }}>
                  Back to Website
                </a>
              </div>
            </div>
            <div className="rounded-[32px] border p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)]" style={{ background: "linear-gradient(180deg, rgba(21,24,32,0.95), rgba(29,33,43,0.95))", borderColor: brand.line }}>
              <div className="rounded-[26px] border p-5" style={{ background: "rgba(255,255,255,0.03)", borderColor: brand.line }}>
                <div className="mb-3 text-xs uppercase tracking-[0.24em]" style={{ color: brand.soft }}>Visual Tone</div>
                <div className="text-2xl font-extrabold leading-tight" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  Dark, premium, and aligned with the rest of the site.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={inputRef} id="calculator" className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              Enter Campaign Data
            </h2>
            <p className="mt-2" style={{ color: brand.soft }}>
              All fields are optional. The calculator updates once you generate the report.
            </p>
          </div>
          <div className="grid gap-5">
            <Section title="Campaign Data" icon="📊">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Views" value={inputs.views} onChange={setField("views")} />
                <Field label="Reach" value={inputs.reach} onChange={setField("reach")} />
                <Field label="Profile Visits" value={inputs.profileVisits} onChange={setField("profileVisits")} />
                <Field label="Direct Follows" value={inputs.directFollows} onChange={setField("directFollows")} />
              </div>
            </Section>
            <Section title="Followers" icon="👥">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Followers Before" value={inputs.followersBefore} onChange={setField("followersBefore")} />
                <Field label="Followers After" value={inputs.followersAfter} onChange={setField("followersAfter")} />
              </div>
            </Section>
            <Section title="Engagement" icon="❤️">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Field label="Likes" value={inputs.likes} onChange={setField("likes")} />
                <Field label="Shares" value={inputs.shares} onChange={setField("shares")} />
                <Field label="Comments" value={inputs.comments} onChange={setField("comments")} />
                <Field label="Saves" value={inputs.saves} onChange={setField("saves")} />
                <Field label="3-sec Plays" value={inputs.playsThreeSec} onChange={setField("playsThreeSec")} />
              </div>
            </Section>
            <Section title="Cost" icon="💰">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Ad Spend (INR)" value={inputs.adSpend} onChange={setField("adSpend")} />
                <Field label="Daily Budget (INR)" value={inputs.dailyBudget} onChange={setField("dailyBudget")} />
              </div>
            </Section>
          </div>
          <button onClick={generate} className="mt-6 w-full rounded-2xl px-6 py-5 text-lg font-extrabold text-black transition hover:brightness-105" style={{ background: `linear-gradient(135deg, ${brand.gold2}, ${brand.gold})`, fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            Generate My Report
          </button>
        </section>

        {report ? (
          <section ref={dashRef} id="dashboard" className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
            <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="inline-flex rounded-full border px-4 py-1.5 text-sm font-bold" style={{ background: "rgba(149,213,178,0.10)", borderColor: "rgba(149,213,178,0.25)", color: "#d8f3dc" }}>
                  Report generated
                </div>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  Campaign Dashboard
                </h2>
              </div>
              <button onClick={() => setShowDownloadModal(true)} className="rounded-2xl border px-5 py-4 text-left transition hover:bg-white/5" style={{ background: "rgba(255,255,255,0.03)", borderColor: brand.line, color: brand.text }}>
                <div className="text-sm font-bold" style={{ color: brand.gold2 }}>Download HD Report</div>
                <div className="text-xs" style={{ color: brand.faint }}>PNG export with email gate</div>
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <KPI label="Total Views" value={fmtNum(report.views)} sub="Impressions served" />
              <KPI label="Reach" value={fmtNum(report.reach)} sub="Unique accounts" accent={brand.blue} />
              <KPI label="Followers Gained" value={fmtNum(report.followersGained)} sub="Net new followers" accent={brand.green} />
              <KPI label="Cost per Follower" value={formatINR(report.costPerFollower)} sub="Acquisition cost" accent={report.costPerFollower > 0 && report.costPerFollower < 3 ? brand.green : brand.gold2} />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <KPI label="Profile Visit Rate" value={fmtPct(report.profileVisitRate)} sub="Views to visits" accent={brand.purple} />
              <KPI label="Follow Conv. Rate" value={fmtPct(report.followConversionRate)} sub="Visits to follows" accent="#f0c9dc" />
              <KPI label="Engagement Rate" value={fmtPct(report.engagementRate)} sub="Of total views" accent="#9ae6b4" />
              <KPI label="Cost per Visit" value={formatINR(report.costPerVisit)} sub="Visit cost" accent="#f3d8a8" />
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <div className="rounded-3xl border p-6" style={{ background: `linear-gradient(180deg, ${brand.panel}, ${brand.panel2})`, borderColor: brand.line }}>
                <h3 className="mb-5 text-lg font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>Engagement Breakdown</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="name" tick={{ fill: brand.soft, fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: brand.soft, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                      {chartData.map((item, index) => <Cell key={index} fill={item.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="rounded-3xl border p-6" style={{ background: `linear-gradient(180deg, ${brand.panel}, ${brand.panel2})`, borderColor: brand.line }}>
                <h3 className="mb-5 text-lg font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>Conversion Funnel</h3>
                <div className="space-y-5">
                  {[
                    { label: "Views", val: report.views, pct: 100, color: brand.blue },
                    { label: "Profile Visits", val: report.profileVisits, pct: report.views > 0 ? (report.profileVisits / report.views) * 100 : 0, color: brand.gold2 },
                    { label: "Follows", val: report.directFollows, pct: report.views > 0 ? (report.directFollows / report.views) * 100 : 0, color: brand.green },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm" style={{ color: brand.soft }}>{item.label}</span>
                        <span className="text-sm font-bold" style={{ color: item.color }}>{fmtNum(item.val)}</span>
                      </div>
                      <div className="h-3 rounded-full bg-white/5">
                        <div className="h-3 rounded-full" style={{ width: `${Math.min(100, item.pct)}%`, background: `linear-gradient(90deg, ${item.color}, ${item.color}99)` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-3xl border p-6 md:p-8" style={{ background: `linear-gradient(180deg, ${brand.panel}, ${brand.panel2})`, borderColor: brand.line }}>
              <h3 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>Campaign Analysis</h3>
              <div className="mt-5 grid gap-3">
                {report.insights.length > 0 ? report.insights.map((item, index) => <InsightChip key={index} type={item.type} text={item.text} />) : <InsightChip type="tip" text="Enter more campaign data to unlock personalized insights." />}
              </div>
              <div className="mt-6 grid gap-4 rounded-2xl border p-5 md:grid-cols-4" style={{ background: "rgba(255,255,255,0.03)", borderColor: brand.line }}>
                {[
                  ["CPM", formatINR(report.cpm)],
                  ["Engagement Total", fmtNum(report.engagementTotal)],
                  ["Cost per Visit", formatINR(report.costPerVisit)],
                  ["Total Ad Spend", formatINR(report.adSpend)],
                ].map(([label, value]) => (
                  <div key={label} className="text-center">
                    <div className="text-[11px] uppercase tracking-[0.22em]" style={{ color: brand.faint }}>{label}</div>
                    <div className="mt-2 text-2xl font-extrabold" style={{ color: brand.text }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-3xl border p-6 md:p-8" style={{ background: "linear-gradient(135deg, rgba(201,161,105,0.09), rgba(125,96,57,0.05))", borderColor: "rgba(201,161,105,0.22)" }}>
              <h3 className="text-2xl font-extrabold tracking-tight" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>Want help scaling these ads?</h3>
              <p className="mt-3 max-w-2xl leading-7" style={{ color: brand.soft }}>
                Use the calculator results as a starting point, then book a strategy call if you want the account audited and optimized for lower costs.
              </p>
              {leadDone ? (
                <div className="mt-5 rounded-2xl border px-4 py-4" style={{ background: "rgba(149,213,178,0.10)", borderColor: "rgba(149,213,178,0.25)", color: "#d8f3dc" }}>
                  You’re on the list. We’ll reach out soon.
                </div>
              ) : (
                <div id="contact" className="mt-5 grid gap-3 md:grid-cols-3">
                  <input className="rounded-xl border px-4 py-3 outline-none" style={{ background: "rgba(255,255,255,0.05)", borderColor: brand.line, color: brand.text }} placeholder="Your name" value={lead.name} onChange={(e) => setLead((prev) => ({ ...prev, name: e.target.value }))} />
                  <input className="rounded-xl border px-4 py-3 outline-none" style={{ background: "rgba(255,255,255,0.05)", borderColor: brand.line, color: brand.text }} placeholder="Email address" value={lead.email} onChange={(e) => setLead((prev) => ({ ...prev, email: e.target.value }))} />
                  <input className="rounded-xl border px-4 py-3 outline-none" style={{ background: "rgba(255,255,255,0.05)", borderColor: brand.line, color: brand.text }} placeholder="Business name" value={lead.business} onChange={(e) => setLead((prev) => ({ ...prev, business: e.target.value }))} />
                  <button className="rounded-xl px-5 py-3 font-bold text-black md:col-span-3" style={{ background: `linear-gradient(135deg, ${brand.gold2}, ${brand.gold})` }} onClick={() => lead.name && lead.email && setLeadDone(true)}>
                    Get My Free Strategy Call
                  </button>
                </div>
              )}
            </div>
          </section>
        ) : null}
      </main>

      <footer className="border-t px-5 py-10 text-center md:px-8" style={{ borderColor: brand.line }}>
        <div className="text-sm" style={{ color: brand.soft }}>
          © 2026 Pure Reach Innovation · Instagram Ad Performance Calculator
        </div>
      </footer>

      {report ? (
        <div ref={canvasRef} className="pointer-events-none absolute left-[-9999px] top-0 w-[1400px] p-14" style={{ background: brand.bg, color: brand.text }}>
          <div className="mb-10 flex items-start justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `linear-gradient(135deg, ${brand.goldDeep}, ${brand.gold})` }}>⚡</div>
                <div className="text-2xl font-extrabold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>Pure Reach Innovation</div>
              </div>
              <div className="text-4xl font-extrabold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>Instagram Ad Performance Report</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
