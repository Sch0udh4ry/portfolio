"use client";
import { useState, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";

const defaultInputs = {
  views: "", reach: "", profileVisits: "", directFollows: "",
  followersBefore: "", followersAfter: "",
  likes: "", shares: "", comments: "", saves: "", playsThreeSec: "",
  adSpend: "", dailyBudget: ""
};

function formatINR(val) {
  if (!val && val !== 0) return "—";
  return "₹" + Number(val).toLocaleString("en-IN", { maximumFractionDigits: 2 });
}
function fmtNum(val) {
  if (!val && val !== 0) return "—";
  return Number(val).toLocaleString("en-IN");
}
function fmtPct(val) {
  if (!val && val !== 0) return "—";
  return (val * 100).toFixed(2) + "%";
}
function isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

/* ─── KPI Card ─── */
function KPICard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: "linear-gradient(135deg,#1a1f2e 0%,#141824 100%)",
      border: "1px solid rgba(249,115,22,0.15)", borderRadius: 16,
      padding: "24px 20px", display: "flex", flexDirection: "column", gap: 6,
      boxShadow: "0 4px 24px rgba(0,0,0,0.4)", position: "relative", overflow: "hidden"
    }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: "radial-gradient(circle,rgba(249,115,22,0.12) 0%,transparent 70%)", borderRadius: "0 16px 0 100%" }} />
      <span style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Mono',monospace" }}>{label}</span>
      <span style={{ fontSize: 26, fontWeight: 800, color: accent || "#f97316", fontFamily: "'Syne',sans-serif", lineHeight: 1.1 }}>{value}</span>
      {sub && <span style={{ fontSize: 12, color: "#64748b" }}>{sub}</span>}
    </div>
  );
}

/* ─── Input Group ─── */
function InputGroup({ label, icon, children }) {
  return (
    <div style={{ background: "linear-gradient(135deg,#1a1f2e 0%,#141824 100%)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", fontFamily: "'Syne',sans-serif" }}>{label}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      
      <label
        style={{
          fontSize: 12,
          color: "#64748b",
          letterSpacing: "0.05em",
          fontFamily: "'DM Mono',monospace"
        }}
      >
        {label}
      </label>

      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "0"}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: "#ffffff",
          color: "#2c2f31",
          border: focused
            ? "1px solid #2563eb"
            : "1px solid #e5e7eb",
          borderRadius: 10,
          padding: "12px 14px",
          fontSize: 15,
          fontFamily: "'DM Mono',monospace",
          outline: "none",
          transition: "all 0.2s",
          boxShadow: focused
            ? "0 0 0 3px rgba(37,99,235,0.1)"
            : "none",
          width: "100%",
          boxSizing: "border-box"
        }}
      />

    </div>
  );
}

function InsightChip({ type, text }) {
  const colors = {
    good: { bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)", text: "#4ade80", dot: "#22c55e" },
    warn: { bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.3)", text: "#fbbf24", dot: "#f59e0b" },
    tip:  { bg: "rgba(99,102,241,0.12)",  border: "rgba(99,102,241,0.3)",  text: "#a5b4fc", dot: "#6366f1" }
  };
  const c = colors[type] || colors.tip;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, background: c.bg, border: `1px solid ${c.border}`, borderRadius: 12, padding: "14px 16px" }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.dot, marginTop: 5, flexShrink: 0 }} />
      <span style={{ color: c.text, fontSize: 14, lineHeight: 1.6 }}>{text}</span>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) return (
    <div style={{ background: "#1a1f2e", border: "1px solid rgba(249,115,22,0.3)", borderRadius: 10, padding: "10px 16px" }}>
      <p style={{ color: "#94a3b8", fontSize: 12, marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || "#f97316", fontSize: 14, fontWeight: 700, margin: 0 }}>
          {typeof p.value === "number" ? p.value.toLocaleString("en-IN") : p.value}
        </p>
      ))}
    </div>
  );
  return null;
};

/* ─── Download Email Modal ─── */
function DownloadModal({ onClose, onConfirm }) {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const valid = isValidEmail(email);
  const showErr = touched && !valid;

  const handleDownload = async () => {
    setTouched(true);
    if (!valid) return;
    setLoading(true);
    await onConfirm(email);
    setLoading(false);
  };

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
<div
  style={{
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 20,
    padding: "40px 36px",
    maxWidth: 440,
    width: "100%",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    animation: "modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards"
  }}
>
        {/* Icon */}
        <div style={{ width: 60, height: 60, borderRadius: 18, margin: "0 auto 22px", background: "linear-gradient(135deg,rgba(249,115,22,0.2),rgba(234,88,12,0.12))", border: "1px solid rgba(249,115,22,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>📥</div>

        <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 24, textAlign: "center", marginBottom: 10, color: "#f1f5f9", letterSpacing: "-0.03em" }}>
          Download Your HD Report
        </h3>
        <p style={{ color: "#64748b", fontSize: 14, textAlign: "center", marginBottom: 30, lineHeight: 1.65 }}>
          Enter your email to download a high-resolution PNG report. We'll also send you exclusive Instagram ad performance tips.
        </p>

        <label htmlFor="email-download" style={{ fontSize: 11, color: "#94a3b8", letterSpacing: "0.08em", fontFamily: "'DM Mono',monospace", display: "block", marginBottom: 8, textTransform: "uppercase" }}>
          Email Address *
        </label>
        <input
          type="email" 
          name="email"                // Standard name for autofill
          id="email-download"         // Matching ID for the label
          autoComplete="email"        // Explicitly triggers browser email suggestions
          placeholder="you@example.com" 
          value={email} 
          autoFocus
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleDownload()}
          style={{
            width: "100%", boxSizing: "border-box",
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${showErr ? "rgba(239,68,68,0.6)" : "rgba(249,115,22,0.4)"}`,
            borderRadius: 12, padding: "14px 16px", color: "#f1f5f9",
            fontSize: 15, fontFamily: "'DM Sans',sans-serif", outline: "none",
            boxShadow: showErr ? "0 0 0 3px rgba(239,68,68,0.1)" : "0 0 0 3px rgba(249,115,22,0.08)",
            marginBottom: showErr ? 6 : 20
          }}
        />
        {showErr && <p style={{ color: "#f87171", fontSize: 12, marginBottom: 16 }}>Please enter a valid email address to continue.</p>}

        <button
          onClick={handleDownload} disabled={loading}
          style={{
            width: "100%",
            background: loading ? "rgba(249,115,22,0.35)" : "linear-gradient(135deg,#2563eb,  // blue (matches your site)
#1d4ed8)",
            border: "none", borderRadius: 12, padding: "16px",
            color: "#fff", fontWeight: 700, fontSize: 16,
            cursor: loading ? "wait" : "pointer",
            fontFamily: "'Syne',sans-serif", letterSpacing: "-0.01em",
            boxShadow: "0 8px 28px rgba(249,115,22,0.35)",
            transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10
          }}>
          {loading
            ? <><span style={{ display: "inline-block", animation: "spin 0.8s linear infinite" }}>⏳</span> Generating HD PNG…</>
            : <><span>⬇</span> Download HD Report</>
          }
        </button>

        <p style={{ marginTop: 16, fontSize: 12, color: "#334155", textAlign: "center" }}>
          🔒 No spam · Unsubscribe anytime · Pure Reach Innovation
        </p>
        <button onClick={onClose} style={{ display: "block", margin: "14px auto 0", background: "none", border: "none", color: "#475569", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ─── Off-screen Report Canvas for PNG export ─── */
function ReportCanvas({ report, forwardRef }){
  const fN = v => (v || v === 0) ? Number(v).toLocaleString("en-IN") : "—";
  const fP = v => (v || v === 0) ? (v * 100).toFixed(2) + "%" : "—";
  const fR = v => (v || v === 0) ? "₹" + Number(v).toLocaleString("en-IN", { maximumFractionDigits: 2 }) : "—";
  const ts = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  const kpis = [
    { l: "Total Views", v: fN(report.views), c: "#f97316" },
    { l: "Reach", v: fN(report.reach), c: "#38bdf8" },
    { l: "Followers Gained", v: fN(report.followersGained), c: "#4ade80" },
    { l: "Cost per Follower", v: fR(report.costPerFollower), c: report.costPerFollower > 0 && report.costPerFollower < 3 ? "#4ade80" : "#f97316" },
    { l: "Profile Visit Rate", v: fP(report.profileVisitRate), c: "#a78bfa" },
    { l: "Follow Conv. Rate", v: fP(report.followConversionRate), c: "#f472b6" },
    { l: "Engagement Rate", v: fP(report.engagementRate), c: "#34d399" },
    { l: "Cost per Visit", v: fR(report.costPerVisit), c: "#fbbf24" },
  ];
  const engData = [
    { name: "Likes", value: report.likes, fill: "#f97316" },
    { name: "Comments", value: report.comments, fill: "#fb923c" },
    { name: "Shares", value: report.shares, fill: "#fdba74" },
    { name: "Saves", value: report.saves, fill: "#4ade80" },
  ];
  const funnelSteps = [
    { label: "Views", val: report.views, pct: 100, color: "#38bdf8" },
    { label: "Profile Visits", val: report.profileVisits, pct: report.views > 0 ? (report.profileVisits / report.views) * 100 : 0, color: "#f97316" },
    { label: "Follows", val: report.directFollows, pct: report.views > 0 ? (report.directFollows / report.views) * 100 : 0, color: "#4ade80" },
  ];

 return (
  <div
    ref={forwardRef}
    style={{
      width: 1400,
      background: "#f5f7f9",
      color: "#2c2f31",
      fontFamily: "'DM Sans',sans-serif",
      padding: "52px 60px",
      boxSizing: "border-box",
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: -1,
      visibility: "hidden"
    }}
  >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 44 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#2563eb,  // blue (matches your site)
#1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>⚡</div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22 }}>
              <span style={{ color: "#f97316" }}>Pure Reach</span>
              <span style={{ color: "#f1f5f9" }}> Innovation</span>
            </span>
          </div>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 38, color: "#f1f5f9", letterSpacing: "-0.03em", margin: 0 }}>Instagram Ad Performance Report</h1>
          <p style={{ color: "#64748b", fontSize: 15, marginTop: 8 }}>Campaign analysis powered by Pure Reach Innovation benchmarks</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: 12, padding: "12px 20px" }}>
            <div style={{ fontSize: 11, color: "#64748b", fontFamily: "'DM Mono',monospace", letterSpacing: "0.08em", marginBottom: 4 }}>GENERATED ON</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#f97316", fontFamily: "'Syne',sans-serif" }}>{ts}</div>
          </div>
        </div>
      </div>

      <div style={{ background: "linear-gradient(90deg,transparent,rgba(249,115,22,0.5),transparent)", height: 1, marginBottom: 40 }} />

      {/* KPI Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 36 }}>
        {kpis.map(({ l, v, c }) => (
          <div key={l} style={{ background: "linear-gradient(135deg,#1a1f2e,#141824)", border: "1px solid rgba(249,115,22,0.15)", borderRadius: 14, padding: "22px 18px" }}>
            <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Mono',monospace", marginBottom: 8 }}>{l}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: c, fontFamily: "'Syne',sans-serif", lineHeight: 1 }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
        <div style={{ background: "linear-gradient(135deg,#1a1f2e,#141824)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 28 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", fontFamily: "'Syne',sans-serif", marginBottom: 20 }}>Engagement Breakdown</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={engData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {engData.map((d, i) => <Cell key={i} fill={d.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: "linear-gradient(135deg,#1a1f2e,#141824)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 28 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", fontFamily: "'Syne',sans-serif", marginBottom: 20 }}>Conversion Funnel</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, paddingTop: 8 }}>
            {funnelSteps.map(({ label, val, pct, color }) => (
              <div key={label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                  <span style={{ fontSize: 14, color: "#94a3b8" }}>{label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color, fontFamily: "'DM Mono',monospace" }}>{fN(val)}</span>
                </div>
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 6, height: 12 }}>
                  <div style={{ width: `${Math.min(100, pct)}%`, height: "100%", background: `linear-gradient(90deg,${color},${color}88)`, borderRadius: 6 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div style={{ background: "linear-gradient(135deg,#1a1f2e,#141824)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 18, padding: 32, marginBottom: 32 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#f1f5f9", fontFamily: "'Syne',sans-serif", marginBottom: 18 }}>🧠 Campaign Analysis</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {(report.insights.length > 0 ? report.insights : [{ type: "tip", text: "Enter more campaign data to unlock personalized insights." }]).map((ins, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, background: ins.type === "good" ? "rgba(34,197,94,0.1)" : ins.type === "warn" ? "rgba(251,191,36,0.1)" : "rgba(99,102,241,0.1)", border: `1px solid ${ins.type === "good" ? "rgba(34,197,94,0.3)" : ins.type === "warn" ? "rgba(251,191,36,0.3)" : "rgba(99,102,241,0.3)"}`, borderRadius: 10, padding: "12px 16px" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", marginTop: 5, flexShrink: 0, background: ins.type === "good" ? "#22c55e" : ins.type === "warn" ? "#f59e0b" : "#6366f1" }} />
              <span style={{ color: ins.type === "good" ? "#4ade80" : ins.type === "warn" ? "#fbbf24" : "#a5b4fc", fontSize: 14, lineHeight: 1.5 }}>{ins.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary + Footer */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 36 }}>
        {[["CPM", fR(report.cpm)], ["Total Engagement", fN(report.engagementTotal)], ["Cost per Visit", fR(report.costPerVisit)], ["Total Ad Spend", fR(report.adSpend)]].map(([l, v]) => (
          <div key={l} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 18, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#475569", letterSpacing: "0.08em", fontFamily: "'DM Mono',monospace", marginBottom: 6 }}>{l}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9", fontFamily: "'Syne',sans-serif" }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg,#2563eb,  // blue (matches your site)
#1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>⚡</div>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15 }}>
            <span style={{ color: "#f97316" }}>Pure Reach</span>
            <span style={{ color: "#f1f5f9" }}> Innovation</span>
          </span>
        </div>
        <span style={{ fontSize: 12, color: "#334155", fontFamily: "'DM Mono',monospace" }}>Instagram Ad Performance Calculator · {ts}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════ */
export default function App() {
  const [inputs, setInputs] = useState(defaultInputs);
  const [report, setReport] = useState(null);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", business: "" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState("idle");
  const dashRef = useRef(null);
  const inputRef = useRef(null);
  const reportCanvasRef = useRef(null);

  const setField = k => v => setInputs(p => ({ ...p, [k]: v }));
  const n = k => parseFloat(inputs[k]) || 0;

  const generate = () => {
    const views = n("views"), reach = n("reach"), profileVisits = n("profileVisits"),
      directFollows = n("directFollows"), followersBefore = n("followersBefore"),
      followersAfter = n("followersAfter"), likes = n("likes"), shares = n("shares"),
      comments = n("comments"), saves = n("saves"), playsThreeSec = n("playsThreeSec"),
      adSpend = n("adSpend"), dailyBudget = n("dailyBudget");

    const followersGained = Math.max(0, followersAfter - followersBefore);
    const profileVisitRate = views > 0 ? profileVisits / views : 0;
    const followConversionRate = profileVisits > 0 ? directFollows / profileVisits : 0;
    const engagementRate = views > 0 ? (likes + shares + comments + saves) / views : 0;
    const costPerVisit = profileVisits > 0 ? adSpend / profileVisits : 0;
    const costPerFollower = followersGained > 0 ? adSpend / followersGained : 0;
    const cpm = reach > 0 ? (adSpend / reach) * 1000 : 0;
    const engagementTotal = likes + shares + comments + saves;

    const insights = [];
    if (profileVisitRate > 0.006) insights.push({ type: "good", text: `Your Profile Visit Rate is ${fmtPct(profileVisitRate)} — above the 0.6% benchmark. Your creative is compelling enough to drive curiosity.` });
    else if (profileVisitRate > 0) insights.push({ type: "warn", text: `Profile Visit Rate is ${fmtPct(profileVisitRate)} — below 0.6%. Try stronger CTAs and curiosity-driven hooks in your creative.` });
    if (followConversionRate > 0.15) insights.push({ type: "good", text: `Exceptional follow conversion of ${fmtPct(followConversionRate)}! Your profile is doing heavy lifting — bio, grid, and highlights are converting visitors brilliantly.` });
    else if (followConversionRate > 0) insights.push({ type: "tip", text: `Follow conversion is ${fmtPct(followConversionRate)}. Optimise your bio with a clear value proposition and pin your best-performing content.` });
    if (costPerFollower > 0 && costPerFollower < 3) insights.push({ type: "good", text: `Cost per Follower is ${formatINR(costPerFollower)} — highly efficient! You're acquiring quality followers well below the ₹3 industry threshold.` });
    else if (costPerFollower >= 3) insights.push({ type: "warn", text: `Cost per Follower is ${formatINR(costPerFollower)}, above ₹3. Refine your audience targeting or A/B test new ad creatives to bring this down.` });
    if (engagementRate > 0.03) insights.push({ type: "good", text: `Strong engagement rate of ${fmtPct(engagementRate)} — well above the 3% benchmark. Your content resonates deeply with your audience.` });
    else if (engagementRate > 0) insights.push({ type: "tip", text: `Engagement rate is ${fmtPct(engagementRate)}. Add polls, questions, or stronger emotional hooks in your captions to boost interaction.` });
    if (saves > likes * 0.1) insights.push({ type: "good", text: `High save rate detected — saves signal highly valuable content and are a top algorithmic signal for boosted organic reach.` });

    setReport({ views, reach, profileVisits, directFollows, followersGained, followersBefore, followersAfter, likes, shares, comments, saves, playsThreeSec, adSpend, dailyBudget, profileVisitRate, followConversionRate, engagementRate, costPerVisit, costPerFollower, cpm, engagementTotal, insights });
    setDownloadStatus("idle");
    setTimeout(() => dashRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

 const doDownload = async (email) => {
  setDownloadStatus("generating");

  // Give React 500ms to ensure the ReportCanvas has the data
  setTimeout(async () => {
    try {
      if (!window.html2canvas) {
        await new Promise((res, rej) => {
          const s = document.createElement("script");
          s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
          s.onload = res; s.onerror = rej;
          document.head.appendChild(s);
        });
      }

      const el = reportCanvasRef.current;
      if (!el) {
        setDownloadStatus("idle");
        return;
      }

      const canvas = await window.html2canvas(el, { 
        scale: 2, 
        useCORS: true, 
        backgroundColor: "#0d1117", 
        width: 1400, 
        windowWidth: 1600,
        logging: false,
        onclone: (clonedDoc) => {
          // This ensures the element is visible ONLY to the screenshot tool
          const clonedReport = clonedDoc.querySelector('[style*="visibility: hidden"]');
          if (clonedReport) {
            clonedReport.style.visibility = "visible";
            clonedReport.style.position = "relative";
          }
        }
      });

      const link = document.createElement("a");
      link.download = `pure-reach-ad-report-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
      
      setDownloadStatus("success");
      setShowDownloadModal(false);
    } catch (err) {
      console.error("Download Error:", err);
      setDownloadStatus("idle");
    }
  }, 500);
};

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#0d1117", minHeight: "100vh", color: "#f1f5f9" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#0d1117;}
        input::-webkit-inner-spin-button,input::-webkit-outer-spin-button{-webkit-appearance:none;}
        input[type=number]{-moz-appearance:textfield;}
        ::-webkit-scrollbar{width:6px;}
        ::-webkit-scrollbar-track{background:#0d1117;}
        ::-webkit-scrollbar-thumb{background:rgba(249,115,22,0.3);border-radius:3px;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
        @keyframes modalIn{from{opacity:0;transform:scale(0.88);}to{opacity:1;transform:scale(1);}}
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes pulseRing{0%{box-shadow:0 0 0 0 rgba(249,115,22,0.5);}70%{box-shadow:0 0 0 12px rgba(249,115,22,0);}100%{box-shadow:0 0 0 0 rgba(249,115,22,0);}}
        .fade-up{animation:fadeUp 0.6s ease forwards;}
        .btn-main,.dl-btn{transition:all 0.2s ease;}
        .btn-main:hover,.dl-btn:hover{transform:translateY(-2px);filter:brightness(1.07);}
        .btn-main:hover{box-shadow:0 14px 44px rgba(249,115,22,0.45)!important;}
      `}</style>

      {/* Hidden report canvas */}
      {report && <ReportCanvas report={report} forwardRef={reportCanvasRef} />}

      {/* Modal */}
      {showDownloadModal && <DownloadModal onClose={() => setShowDownloadModal(false)} onConfirm={doDownload} />}

      

      {/* ── HERO ── */}
      <section style={{ textAlign: "center", padding: "100px 24px 80px", background: "radial-gradient(ellipse 80% 50% at 50% -20%,rgba(249,115,22,0.15) 0%,transparent 60%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "radial-gradient(circle,#f97316 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: 100, padding: "6px 16px", marginBottom: 28, fontSize: 13, color: "#fb923c", fontWeight: 500 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f97316", animation: "pulseRing 2s infinite", display: "inline-block" }} />
            Free Tool · No Signup Required
          </div>
        </div>
        <h1 className="fade-up" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(36px,6vw,72px)", lineHeight: 1.05, letterSpacing: "-0.04em", maxWidth: 800, margin: "0 auto 20px", animationDelay: "0.2s", opacity: 0, background: "linear-gradient(135deg,#f1f5f9 30%,#94a3b8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Analyze Your Instagram<br />
          <span style={{ background: "linear-gradient(135deg,#2563eb,#fb923c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Ads Like a Pro</span>
        </h1>
        <p className="fade-up" style={{ fontSize: 18, color: "#94a3b8", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7, animationDelay: "0.3s", opacity: 0 }}>
          Get instant insights, conversion rates, and a full performance breakdown. Download a beautiful HD report — completely free.
        </p>
        <button className="btn-main fade-up" onClick={() => inputRef.current?.scrollIntoView({ behavior: "smooth" })}
          style={{ background: "linear-gradient(135deg,#2563eb,  // blue (matches your site)
#1d4ed8)", border: "none", borderRadius: 14, padding: "18px 44px", color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: "0 8px 32px rgba(249,115,22,0.35)", fontFamily: "'Syne',sans-serif", letterSpacing: "-0.01em", animationDelay: "0.4s", opacity: 0 }}>
          Start Analysis — It's Free
        </button>
        <div className="fade-up" style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 64, animationDelay: "0.5s", opacity: 0, flexWrap: "wrap" }}>
          {[["500+", "Campaigns Analyzed"], ["₹2Cr+", "Ad Spend Managed"], ["4.9★", "Client Rating"]].map(([val, lbl]) => (
            <div key={lbl} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#f97316", fontFamily: "'Syne',sans-serif" }}>{val}</div>
              <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── INPUT ── */}
      <section ref={inputRef} style={{ maxWidth: 860, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 32, letterSpacing: "-0.03em", marginBottom: 10 }}>Enter Your Campaign Data</h2>
          <p style={{ color: "#64748b", fontSize: 15 }}>Fill in numbers from your Instagram Ads Manager. All fields are optional.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <InputGroup label="Campaign Data" icon="📊">
            <Field label="VIEWS" value={inputs.views} onChange={setField("views")} />
            <Field label="REACH" value={inputs.reach} onChange={setField("reach")} />
            <Field label="PROFILE VISITS" value={inputs.profileVisits} onChange={setField("profileVisits")} />
            <Field label="DIRECT FOLLOWS" value={inputs.directFollows} onChange={setField("directFollows")} />
          </InputGroup>
          <InputGroup label="Followers" icon="👥">
            <Field label="FOLLOWERS BEFORE" value={inputs.followersBefore} onChange={setField("followersBefore")} />
            <Field label="FOLLOWERS AFTER" value={inputs.followersAfter} onChange={setField("followersAfter")} />
          </InputGroup>
          <InputGroup label="Engagement" icon="❤️">
            <Field label="LIKES" value={inputs.likes} onChange={setField("likes")} />
            <Field label="SHARES" value={inputs.shares} onChange={setField("shares")} />
            <Field label="COMMENTS" value={inputs.comments} onChange={setField("comments")} />
            <Field label="SAVES" value={inputs.saves} onChange={setField("saves")} />
            <Field label="3-SEC PLAYS" value={inputs.playsThreeSec} onChange={setField("playsThreeSec")} />
          </InputGroup>
          <InputGroup label="Cost" icon="💰">
            <Field label="AD SPEND (₹)" value={inputs.adSpend} onChange={setField("adSpend")} placeholder="0" />
            <Field label="DAILY BUDGET (₹)" value={inputs.dailyBudget} onChange={setField("dailyBudget")} placeholder="0" />
          </InputGroup>
        </div>
        <button className="btn-main" onClick={generate}
          style={{ width: "100%", marginTop: 32, background: "linear-gradient(135deg,#2563eb,  // blue (matches your site)
#1d4ed8)", border: "none", borderRadius: 14, padding: 20, color: "#fff", fontWeight: 700, fontSize: 18, cursor: "pointer", boxShadow: "0 8px 32px rgba(249,115,22,0.35)", fontFamily: "'Syne',sans-serif", letterSpacing: "-0.01em", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <span>⚡</span> Generate My Report
        </button>
      </section>

      {/* ── DASHBOARD ── */}
      {report && (
        <section ref={dashRef} style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 24px 80px" }}>
          <div style={{ background: "linear-gradient(90deg,transparent,rgba(249,115,22,0.4),transparent)", height: 1, marginBottom: 48 }} />

          {/* Dashboard header with Download button */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: downloadStatus === "success" ? "rgba(34,197,94,0.1)" : "rgba(34,197,94,0.1)", border: `1px solid ${downloadStatus === "success" ? "rgba(34,197,94,0.3)" : "rgba(34,197,94,0.25)"}`, borderRadius: 100, padding: "6px 16px", marginBottom: 10, fontSize: 13, color: "#4ade80" }}>
                {downloadStatus === "success" ? "✓ Report Downloaded!" : "✓ Report Generated"}
              </div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 32, letterSpacing: "-0.03em", color: "#f1f5f9" }}>Your Campaign Dashboard</h2>
            </div>

            {/* HD Download Trigger Button */}
            <button className="dl-btn" onClick={() => setShowDownloadModal(true)}
              style={{ display: "flex", alignItems: "center", gap: 12, background: "linear-gradient(135deg,#1a1f2e,#141824)", border: "1px solid rgba(249,115,22,0.4)", borderRadius: 16, padding: "14px 22px", cursor: "pointer", color: "#f1f5f9", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 4px 20px rgba(249,115,22,0.15)", transition: "all 0.2s" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#2563eb,  // blue (matches your site)
#1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: "0 2px 10px rgba(249,115,22,0.4)" }}>⬇</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "#f97316", fontSize: 14, fontWeight: 700, fontFamily: "'Syne',sans-serif" }}>Download HD Report</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>High-res PNG · Email required</div>
              </div>
            </button>
          </div>

          {/* KPI Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 32 }}>
            <KPICard label="Total Views" value={fmtNum(report.views)} sub="Impressions served" />
            <KPICard label="Reach" value={fmtNum(report.reach)} sub="Unique accounts" accent="#38bdf8" />
            <KPICard label="Followers Gained" value={fmtNum(report.followersGained)} sub="Net new followers" accent="#4ade80" />
            <KPICard label="Cost per Follower" value={formatINR(report.costPerFollower)} sub="Acquisition cost" accent={report.costPerFollower > 0 && report.costPerFollower < 3 ? "#4ade80" : "#f97316"} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 40 }}>
            <KPICard label="Profile Visit Rate" value={fmtPct(report.profileVisitRate)} sub="Views → Visits" accent="#a78bfa" />
            <KPICard label="Follow Conv. Rate" value={fmtPct(report.followConversionRate)} sub="Visits → Follows" accent="#f472b6" />
            <KPICard label="Engagement Rate" value={fmtPct(report.engagementRate)} sub="Of total views" accent="#34d399" />
            <KPICard label="Cost per Visit" value={formatINR(report.costPerVisit)} sub="Profile visit cost" accent="#fbbf24" />
          </div>

          {/* Charts */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <div style={{ background: "linear-gradient(135deg,#1a1f2e,#141824)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 20, color: "#f1f5f9" }}>Engagement Breakdown</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={[{ name: "Likes", value: report.likes }, { name: "Comments", value: report.comments }, { name: "Shares", value: report.shares }, { name: "Saves", value: report.saves }]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {["#f97316","#fb923c","#fdba74","#4ade80"].map((c, i) => <Cell key={i} fill={c} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ background: "linear-gradient(135deg,#1a1f2e,#141824)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 20, color: "#f1f5f9" }}>Views vs Reach</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={[{ name: "Views", value: report.views }, { name: "Reach", value: report.reach }, { name: "3-Sec Plays", value: report.playsThreeSec }]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {["#38bdf8","#818cf8","#c084fc"].map((c, i) => <Cell key={i} fill={c} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 40 }}>
            <div style={{ background: "linear-gradient(135deg,#1a1f2e,#141824)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 20, color: "#f1f5f9" }}>Follower Growth</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={[{ name: "Before", value: report.followersBefore }, { name: "After", value: report.followersAfter }]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}><Cell fill="#334155" /><Cell fill="#4ade80" /></Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ background: "linear-gradient(135deg,#1a1f2e,#141824)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 20, color: "#f1f5f9" }}>Conversion Funnel</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}>
                {[
                  { label: "Views", val: report.views, color: "#38bdf8", pct: 100 },
                  { label: "Profile Visits", val: report.profileVisits, color: "#f97316", pct: report.views > 0 ? (report.profileVisits / report.views) * 100 : 0 },
                  { label: "Follows", val: report.directFollows, color: "#4ade80", pct: report.views > 0 ? (report.directFollows / report.views) * 100 : 0 }
                ].map(({ label, val, color, pct }) => (
                  <div key={label}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 13, color: "#94a3b8" }}>{label}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color, fontFamily: "'DM Mono',monospace" }}>{fmtNum(val)}</span>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 6, height: 10, overflow: "hidden" }}>
                      <div style={{ width: `${Math.min(100, pct)}%`, height: "100%", background: `linear-gradient(90deg,${color},${color}88)`, borderRadius: 6, transition: "width 0.8s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Smart Insights */}
          <div style={{ background: "linear-gradient(135deg,#1a1f2e,#141824)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 20, padding: 32, marginBottom: 24, boxShadow: "0 4px 40px rgba(249,115,22,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,rgba(249,115,22,0.2),rgba(234,88,12,0.2))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🧠</div>
              <div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: "#f1f5f9" }}>Your Campaign Analysis</h3>
                <p style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>Powered by Pure Reach Innovation's performance benchmarks</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {report.insights.length > 0
                ? report.insights.map((ins, i) => <InsightChip key={i} type={ins.type} text={ins.text} />)
                : <InsightChip type="tip" text="Enter more campaign data to unlock personalized insights for your ads." />
              }
            </div>
            <div style={{ marginTop: 28, padding: "20px 24px", background: "rgba(255,255,255,0.03)", borderRadius: 12, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16 }}>
              {[["CPM", formatINR(report.cpm)], ["Engagement Total", fmtNum(report.engagementTotal)], ["Cost per Visit", formatINR(report.costPerVisit)], ["Total Ad Spend", formatINR(report.adSpend)]].map(([lbl, val]) => (
                <div key={lbl} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#64748b", letterSpacing: "0.08em", marginBottom: 4, fontFamily: "'DM Mono',monospace" }}>{lbl}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", fontFamily: "'Syne',sans-serif" }}>{val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Inline Download CTA banner */}
          <div style={{ background: "linear-gradient(135deg,rgba(249,115,22,0.08),rgba(234,88,12,0.04))", border: "1px solid rgba(249,115,22,0.25)", borderRadius: 20, padding: "26px 30px", marginBottom: 40, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, color: "#f1f5f9", marginBottom: 5 }}>📥 Save This Dashboard as an HD PNG</h3>
              <p style={{ color: "#64748b", fontSize: 14 }}>Download a beautiful, print-ready report to share with your team or client.</p>
            </div>
            <button className="btn-main dl-btn" onClick={() => setShowDownloadModal(true)}
              style={{ background: "linear-gradient(135deg,#2563eb,  // blue (matches your site)
#1d4ed8)", border: "none", borderRadius: 12, padding: "13px 26px", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "'Syne',sans-serif", boxShadow: "0 6px 24px rgba(249,115,22,0.35)", whiteSpace: "nowrap" }}>
              ⬇ Download HD Report
            </button>
          </div>

          {/* Lead Capture */}
          <div style={{ background: "linear-gradient(135deg,rgba(249,115,22,0.1) 0%,rgba(234,88,12,0.05) 100%)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: 24, padding: "48px 40px", textAlign: "center", boxShadow: "0 20px 60px rgba(249,115,22,0.1)" }}>
            {leadSubmitted ? (
              <div>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 28, marginBottom: 10 }}>You're on the list!</h3>
                <p style={{ color: "#94a3b8", fontSize: 16 }}>Our team will reach out within 24 hours to schedule your free strategy call.</p>
              </div>
            ) : (
              <>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: 20, fontSize: 13, color: "#fb923c" }}>🔥 Limited Spots Available</div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 34, letterSpacing: "-0.03em", marginBottom: 12 }}>Want Us to Scale Your Ads?</h3>
                <p style={{ color: "#94a3b8", fontSize: 16, maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.7 }}>
                  Book a free 30-minute strategy call with our team at Pure Reach Innovation. We'll audit your account and show you exactly how to reduce costs and grow faster.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, maxWidth: 600, margin: "0 auto 16px" }}>
                  {[{ ph: "Your Name *", val: leadForm.name, key: "name" }, { ph: "Email Address *", val: leadForm.email, key: "email" }, { ph: "Business Name (optional)", val: leadForm.business, key: "business" }].map(({ ph, val, key }) => (
                    <input key={key} type={key === "email" ? "email" : "text"} placeholder={ph} value={val}
                      onChange={e => setLeadForm(p => ({ ...p, [key]: e.target.value }))}
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "14px 16px", color: "#f1f5f9", fontSize: 14, outline: "none", fontFamily: "'DM Sans',sans-serif" }} />
                  ))}
                </div>
                <button className="btn-main" onClick={() => { if (leadForm.name && leadForm.email) setLeadSubmitted(true); }}
                  style={{ background: "linear-gradient(135deg,#2563eb,  // blue (matches your site)
#1d4ed8)", border: "none", borderRadius: 12, padding: "16px 40px", color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: "0 8px 32px rgba(249,115,22,0.4)", fontFamily: "'Syne',sans-serif" }}>
                  Get My Free Strategy Call →
                </button>
                <p style={{ marginTop: 14, fontSize: 13, color: "#475569" }}>No spam. No commitment. Just value.</p>
              </>
            )}
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section style={{ background: "linear-gradient(180deg,#0d1117 0%,#111827 100%)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#475569", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16, fontFamily: "'DM Mono',monospace" }}>Used by growing brands</p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 30, letterSpacing: "-0.03em", marginBottom: 48 }}>What Our Clients Say</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            {[
              { name: "Priya S.", role: "D2C Skincare Brand", text: "Pure Reach Innovation brought our cost per follower from ₹9 to ₹2.4 in 3 weeks. This calculator showed us exactly where we were bleeding money.", stars: 5 },
              { name: "Rahul M.", role: "EdTech Startup", text: "We didn't know our engagement rate was below benchmark until we used this tool. Now our ads perform 3x better.", stars: 5 },
              { name: "Ananya K.", role: "Fashion Boutique", text: "The insights are incredibly specific. It felt like having a senior performance analyst in the room. Highly recommend!", stars: 5 }
            ].map(({ name, role, text, stars }) => (
              <div key={name} style={{ background: "linear-gradient(135deg,#1a1f2e,#141824)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 24px", textAlign: "left" }}>
                <div style={{ color: "#f59e0b", fontSize: 14, marginBottom: 12 }}>{"★".repeat(stars)}</div>
                <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>"{text}"</p>
                <div style={{ fontWeight: 700, color: "#f1f5f9", fontSize: 14 }}>{name}</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#2563eb,  // blue (matches your site)
#1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 16 }}>
            <span style={{ color: "#f97316" }}>Pure Reach</span>
            <span style={{ color: "#f1f5f9" }}> Innovation</span>
          </span>
        </div>
        <p style={{ color: "#334155", fontSize: 13 }}>© 2025 Pure Reach Innovation · Instagram Ad Performance Calculator · Free Social Media Analytics Tool</p>
        <p style={{ color: "#1e293b", fontSize: 11, marginTop: 6 }}>instagram ad performance · ad cost calculator · social media analytics · instagram ads india</p>
      </footer>
    </div>
  );
}