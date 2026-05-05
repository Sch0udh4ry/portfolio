import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const initialInputs = {
  objective: "lead_generation",
  views: "50000",
  reach: "32000",
  profileVisits: "1400",
  leads: "120",
  convertedLeads: "18",
  totalIncome: "180000",
  directFollows: "260",
  followersBefore: "8200",
  followersAfter: "8520",
  likes: "980",
  shares: "84",
  comments: "43",
  saves: "126",
  playsThreeSec: "19000",
  adSpend: "45000",
  dailyBudget: "3000",
};

const objectives = [
  {
    value: "lead_generation",
    label: "Lead Generation",
    detail: "Score leads, converted leads, income, and ROI.",
  },
  {
    value: "follower_growth",
    label: "Follower Growth",
    detail: "Score profile visits, follows, and follower cost.",
  },
  {
    value: "engagement",
    label: "Engagement",
    detail: "Score saves, shares, comments, and interaction quality.",
  },
  {
    value: "traffic",
    label: "Traffic",
    detail: "Score reach, visits, CPM, and cost per visit.",
  },
];

const toNumber = (value) => Number.parseFloat(value) || 0;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const formatNumber = (value) => Number(value || 0).toLocaleString("en-IN");
const formatMoney = (value) =>
  `INR ${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
const formatMoneyPrecise = (value) =>
  `INR ${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
const formatPercent = (value) => `${((value || 0) * 100).toFixed(2)}%`;
const formatMultiple = (value) => `${Number(value || 0).toFixed(2)}x`;

function calculate(inputs) {
  const views = toNumber(inputs.views);
  const reach = toNumber(inputs.reach);
  const profileVisits = toNumber(inputs.profileVisits);
  const leads = toNumber(inputs.leads);
  const convertedLeads = leads > 0 ? Math.min(toNumber(inputs.convertedLeads), leads) : toNumber(inputs.convertedLeads);
  const totalIncome = toNumber(inputs.totalIncome);
  const directFollows = toNumber(inputs.directFollows);
  const followersBefore = toNumber(inputs.followersBefore);
  const followersAfter = toNumber(inputs.followersAfter);
  const likes = toNumber(inputs.likes);
  const shares = toNumber(inputs.shares);
  const comments = toNumber(inputs.comments);
  const saves = toNumber(inputs.saves);
  const playsThreeSec = toNumber(inputs.playsThreeSec);
  const adSpend = toNumber(inputs.adSpend);
  const dailyBudget = toNumber(inputs.dailyBudget);

  const followersGained = Math.max(0, followersAfter - followersBefore);
  const engagementTotal = likes + shares + comments + saves;
  const profileVisitRate = views > 0 ? profileVisits / views : 0;
  const leadConversionRate = leads > 0 ? convertedLeads / leads : 0;
  const followConversionRate = profileVisits > 0 ? directFollows / profileVisits : 0;
  const engagementRate = views > 0 ? engagementTotal / views : 0;
  const playThroughRate = views > 0 ? playsThreeSec / views : 0;
  const costPerVisit = profileVisits > 0 ? adSpend / profileVisits : 0;
  const costPerLead = leads > 0 ? adSpend / leads : 0;
  const costPerConvertedLead = convertedLeads > 0 ? adSpend / convertedLeads : 0;
  const costPerFollower = followersGained > 0 ? adSpend / followersGained : 0;
  const cpm = reach > 0 ? (adSpend / reach) * 1000 : 0;
  const netReturn = totalIncome - adSpend;
  const roi = adSpend > 0 ? netReturn / adSpend : 0;
  const roas = adSpend > 0 ? totalIncome / adSpend : 0;
  const averageIncomePerConversion = convertedLeads > 0 ? totalIncome / convertedLeads : 0;
  const breakEvenConversions =
    averageIncomePerConversion > 0 ? Math.ceil(adSpend / averageIncomePerConversion) : 0;

  return {
    views,
    reach,
    profileVisits,
    leads,
    convertedLeads,
    totalIncome,
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
    engagementTotal,
    profileVisitRate,
    leadConversionRate,
    followConversionRate,
    engagementRate,
    playThroughRate,
    costPerVisit,
    costPerLead,
    costPerConvertedLead,
    costPerFollower,
    cpm,
    netReturn,
    roi,
    roas,
    averageIncomePerConversion,
    breakEvenConversions,
  };
}

function Field({ label, value, onChange, helper }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {helper ? <small>{helper}</small> : null}
    </label>
  );
}

function KpiCard({ label, value, detail, tone = "gold" }) {
  return (
    <article className={`kpi kpi-${tone}`}>
      <p>{label}</p>
      <strong>{value}</strong>
      {detail ? <span>{detail}</span> : null}
    </article>
  );
}

function ObjectiveButton({ option, active, onClick }) {
  return (
    <button
      type="button"
      className={`objective-button${active ? " active" : ""}`}
      onClick={onClick}
    >
      <strong>{option.label}</strong>
      <span>{option.detail}</span>
    </button>
  );
}

function Meter({ label, value, amount, tone = "gold" }) {
  return (
    <div className="meter">
      <div>
        <span>{label}</span>
        <strong>{amount}</strong>
      </div>
      <div className="meter-track">
        <i className={`meter-fill ${tone}`} style={{ width: `${clamp(value, 0, 100)}%` }} />
      </div>
    </div>
  );
}

function Insight({ tone = "neutral", title, children }) {
  return (
    <div className={`insight ${tone}`}>
      <strong>{title}</strong>
      <p>{children}</p>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="chart-tooltip">
      <span>{label}</span>
      <strong>{formatNumber(payload[0].value)}</strong>
    </div>
  );
}

export default function InstagramAdDashboard() {
  const [inputs, setInputs] = useState(initialInputs);
  const [showExample, setShowExample] = useState(true);

  const report = useMemo(() => calculate(inputs), [inputs]);
  const activeObjective = objectives.find((objective) => objective.value === inputs.objective) || objectives[0];

  const setField = (key) => (value) => {
    setShowExample(false);
    setInputs((current) => ({ ...current, [key]: value }));
  };

  const setObjective = (objective) => {
    setShowExample(false);
    setInputs((current) => ({ ...current, objective }));
  };

  const roiTone = report.roi >= 0.5 ? "green" : report.roi >= 0 ? "gold" : "red";
  const verdict =
    report.adSpend <= 0
      ? "Add ad spend to calculate ROI."
      : report.totalIncome <= 0
        ? "Add total income to judge whether this ad paid back."
        : report.roi >= 0.5
          ? "Worth scaling with control."
          : report.roi >= 0
            ? "Profitable, but needs efficiency work."
            : "Not worth scaling yet.";

  const funnelData = [
    { name: "Views", value: report.views, fill: "#8bb6ff" },
    { name: "Visits", value: report.profileVisits, fill: "#e0bf8d" },
    { name: "Leads", value: report.leads, fill: "#95d5b2" },
    { name: "Converted", value: report.convertedLeads, fill: "#cdb4ff" },
  ];

  const engagementData = [
    { name: "Likes", value: report.likes, fill: "#c9a169" },
    { name: "Shares", value: report.shares, fill: "#95d5b2" },
    { name: "Comments", value: report.comments, fill: "#8bb6ff" },
    { name: "Saves", value: report.saves, fill: "#cdb4ff" },
  ];

  return (
    <div className="dashboard-shell">
      <header className="topbar">
        <Link href="/" className="brand">
          <span>PRI</span>
          <div>
            <strong>Pure Reach</strong>
            <small>Ad ROI Dashboard</small>
          </div>
        </Link>
        <nav>
          <a href="#inputs">Inputs</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#decision">Decision</a>
          <a className="nav-cta" href="faq.html#quote-form">Get a Quote</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <h1>Instagram ad dashboard for leads, conversions, and ROI.</h1>
            <p>
              This turns the old calculator into a live decision dashboard. The ad runner can see
              spend, leads, converted leads, total income, ROI, ROAS, and whether the campaign is
              worth scaling.
            </p>
            <div className="hero-actions">
              <a href="#inputs">Update numbers</a>
              <a href="#dashboard">View dashboard</a>
            </div>
          </div>
          <aside className="verdict-panel">
            <span>Current verdict</span>
            <strong>{verdict}</strong>
            <div className={`roi-pill ${roiTone}`}>{formatPercent(report.roi)} ROI</div>
            <p>
              {showExample
                ? "Sample campaign data is loaded so the dashboard is meaningful on first open."
                : "Dashboard is using your current campaign inputs."}
            </p>
          </aside>
        </section>

        <section id="inputs" className="input-layout">
          <div className="panel objective-panel">
            <div className="section-heading">
              <span>Campaign Objective</span>
              <h2>{activeObjective.label}</h2>
              <p>{activeObjective.detail}</p>
            </div>
            <div className="objective-grid">
              {objectives.map((option) => (
                <ObjectiveButton
                  key={option.value}
                  option={option}
                  active={inputs.objective === option.value}
                  onClick={() => setObjective(option.value)}
                />
              ))}
            </div>
          </div>

          <div className="panel field-panel">
            <div className="section-heading">
              <span>Inputs</span>
              <h2>Campaign Numbers</h2>
              <p>Lead ROI uses ad spend, leads, converted leads, and total income.</p>
            </div>
            <div className="field-grid">
              <Field label="Views" value={inputs.views} onChange={setField("views")} />
              <Field label="Reach" value={inputs.reach} onChange={setField("reach")} />
              <Field label="Profile Visits" value={inputs.profileVisits} onChange={setField("profileVisits")} />
              <Field label="Leads" value={inputs.leads} onChange={setField("leads")} helper="Lead forms, calls, or inquiries." />
              <Field label="Converted Leads" value={inputs.convertedLeads} onChange={setField("convertedLeads")} helper="Leads that became paid customers." />
              <Field label="Total Income (INR)" value={inputs.totalIncome} onChange={setField("totalIncome")} helper="Revenue from converted leads." />
              <Field label="Direct Follows" value={inputs.directFollows} onChange={setField("directFollows")} />
              <Field label="Followers Before" value={inputs.followersBefore} onChange={setField("followersBefore")} />
              <Field label="Followers After" value={inputs.followersAfter} onChange={setField("followersAfter")} />
              <Field label="Likes" value={inputs.likes} onChange={setField("likes")} />
              <Field label="Shares" value={inputs.shares} onChange={setField("shares")} />
              <Field label="Comments" value={inputs.comments} onChange={setField("comments")} />
              <Field label="Saves" value={inputs.saves} onChange={setField("saves")} />
              <Field label="3-sec Plays" value={inputs.playsThreeSec} onChange={setField("playsThreeSec")} />
              <Field label="Ad Spend (INR)" value={inputs.adSpend} onChange={setField("adSpend")} />
              <Field label="Daily Budget (INR)" value={inputs.dailyBudget} onChange={setField("dailyBudget")} />
            </div>
          </div>
        </section>

        <section id="dashboard" className="dashboard-grid">
          <KpiCard label="Total Income" value={formatMoney(report.totalIncome)} detail="Revenue from conversions" tone="green" />
          <KpiCard label="Net Return" value={formatMoney(report.netReturn)} detail="Income minus ad spend" tone={roiTone} />
          <KpiCard label="ROI" value={formatPercent(report.roi)} detail="Profitability signal" tone={roiTone} />
          <KpiCard label="ROAS" value={formatMultiple(report.roas)} detail="Income divided by spend" tone="purple" />
          <KpiCard label="Cost per Lead" value={formatMoneyPrecise(report.costPerLead)} detail={`${formatNumber(report.leads)} leads`} />
          <KpiCard label="Cost per Converted Lead" value={formatMoneyPrecise(report.costPerConvertedLead)} detail={`${formatNumber(report.convertedLeads)} converted`} tone="green" />
          <KpiCard label="Lead Conversion" value={formatPercent(report.leadConversionRate)} detail="Leads to paid customers" tone="blue" />
          <KpiCard label="Break-even Conversions" value={formatNumber(report.breakEvenConversions)} detail="Needed to recover spend" tone="purple" />
        </section>

        <section className="analysis-layout">
          <div className="panel chart-panel">
            <div className="section-heading">
              <span>Lead Funnel</span>
              <h2>Views to Paid Customers</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funnelData}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#b0a594", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#8f8576", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {funnelData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="panel chart-panel">
            <div className="section-heading">
              <span>Engagement Quality</span>
              <h2>Interaction Mix</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementData}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#b0a594", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#8f8576", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {engagementData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section id="decision" className="decision-layout">
          <div className="panel decision-panel">
            <div className="section-heading">
              <span>Decision View</span>
              <h2>Was It Worth It?</h2>
              <p>The answer is based on total income, spend, and how many leads converted.</p>
            </div>
            <div className={`decision-verdict ${roiTone}`}>
              <strong>{verdict}</strong>
              <span>{formatMoney(report.netReturn)} net return</span>
            </div>
            <div className="meters">
              <Meter label="Lead conversion" amount={formatPercent(report.leadConversionRate)} value={report.leadConversionRate * 100} tone="green" />
              <Meter label="Profile visit rate" amount={formatPercent(report.profileVisitRate)} value={report.profileVisitRate * 1000} tone="gold" />
              <Meter label="Follow conversion" amount={formatPercent(report.followConversionRate)} value={report.followConversionRate * 100} tone="blue" />
              <Meter label="Engagement rate" amount={formatPercent(report.engagementRate)} value={report.engagementRate * 1000} tone="purple" />
            </div>
          </div>

          <div className="panel insight-panel">
            <div className="section-heading">
              <span>Operator Notes</span>
              <h2>What to Do Next</h2>
            </div>
            <Insight tone={report.roi >= 0 ? "good" : "bad"} title="ROI reading">
              {report.totalIncome > 0
                ? `The campaign produced ${formatMoney(report.totalIncome)} income from ${formatMoney(report.adSpend)} spend, with ${formatPercent(report.roi)} ROI.`
                : "Income is missing. Without total income, lead volume alone cannot prove that the ad was worth running."}
            </Insight>
            <Insight tone="neutral" title="Lead quality">
              {report.leads > 0
                ? `${formatNumber(report.convertedLeads)} of ${formatNumber(report.leads)} leads converted. Cost per converted lead is ${formatMoneyPrecise(report.costPerConvertedLead)}.`
                : "No leads have been entered yet. Add leads and converted leads to evaluate the funnel."}
            </Insight>
            <Insight tone="neutral" title="Scaling rule">
              Scale only when ROAS stays above 1.00x after including real income. If ROI is negative, improve targeting, offer, landing flow, or follow-up before increasing budget.
            </Insight>
          </div>
        </section>
      </main>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap");

        :root {
          --bg: #07080b;
          --panel: #151820;
          --panel-2: #1d212b;
          --line: rgba(255, 244, 226, 0.12);
          --text: #f4ebdd;
          --soft: #b0a594;
          --faint: #8f8576;
          --gold: #c9a169;
          --gold-2: #e0bf8d;
          --green: #95d5b2;
          --blue: #8bb6ff;
          --purple: #cdb4ff;
          --red: #ff9a9a;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--bg);
          color: var(--text);
          font-family: Manrope, system-ui, sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button,
        input {
          font: inherit;
        }

        .dashboard-shell {
          min-height: 100vh;
          background:
            radial-gradient(circle at 10% 0%, rgba(201, 161, 105, 0.14), transparent 32%),
            radial-gradient(circle at 92% 8%, rgba(139, 182, 255, 0.12), transparent 28%),
            linear-gradient(180deg, #07080b 0%, #0d1014 52%, #07080b 100%);
        }

        .topbar {
          position: sticky;
          top: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 18px clamp(20px, 4vw, 48px);
          border-bottom: 1px solid var(--line);
          background: rgba(7, 8, 11, 0.86);
          backdrop-filter: blur(22px);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand > span {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border-radius: 12px;
          background: linear-gradient(135deg, #7a5d39, #d1aa74);
          color: #101010;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.08em;
        }

        .brand strong,
        h1,
        h2 {
          font-family: "Plus Jakarta Sans", Manrope, sans-serif;
          letter-spacing: 0;
        }

        .brand small {
          display: block;
          margin-top: 1px;
          color: var(--soft);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .topbar nav {
          display: flex;
          align-items: center;
          gap: 22px;
          color: var(--soft);
          font-size: 14px;
          font-weight: 700;
        }

        .nav-cta {
          border-radius: 12px;
          padding: 10px 14px;
          background: linear-gradient(135deg, var(--gold-2), var(--gold));
          color: #111;
        }

        main {
          width: min(1440px, 100%);
          margin: 0 auto;
          padding: 0 clamp(18px, 4vw, 48px) 72px;
        }

        .hero {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(340px, 0.75fr);
          gap: 28px;
          align-items: stretch;
          padding: clamp(52px, 8vw, 92px) 0 32px;
        }

        .hero-copy {
          min-height: 420px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero h1 {
          max-width: 900px;
          margin: 0;
          font-size: clamp(48px, 7vw, 94px);
          line-height: 0.94;
        }

        .hero p {
          max-width: 740px;
          margin: 24px 0 0;
          color: var(--soft);
          font-size: 18px;
          line-height: 1.75;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 32px;
        }

        .hero-actions a {
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 15px 18px;
          font-weight: 900;
        }

        .hero-actions a:first-child {
          border-color: transparent;
          background: linear-gradient(135deg, var(--gold-2), var(--gold));
          color: #111;
        }

        .verdict-panel,
        .panel,
        .kpi {
          border: 1px solid var(--line);
          background: linear-gradient(180deg, rgba(21, 24, 32, 0.96), rgba(29, 33, 43, 0.96));
          box-shadow: 0 28px 70px rgba(0, 0, 0, 0.28);
        }

        .verdict-panel {
          display: flex;
          min-height: 420px;
          flex-direction: column;
          justify-content: flex-end;
          border-radius: 28px;
          padding: clamp(24px, 4vw, 36px);
        }

        .verdict-panel > span,
        .section-heading > span {
          color: var(--gold-2);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .verdict-panel strong {
          display: block;
          margin-top: 16px;
          font-family: "Plus Jakarta Sans", Manrope, sans-serif;
          font-size: clamp(34px, 4vw, 54px);
          line-height: 1;
        }

        .roi-pill {
          width: fit-content;
          margin-top: 26px;
          border-radius: 999px;
          padding: 10px 14px;
          font-weight: 900;
        }

        .roi-pill.green,
        .decision-verdict.green {
          background: rgba(149, 213, 178, 0.14);
          color: var(--green);
        }

        .roi-pill.gold,
        .decision-verdict.gold {
          background: rgba(224, 191, 141, 0.14);
          color: var(--gold-2);
        }

        .roi-pill.red,
        .decision-verdict.red {
          background: rgba(255, 154, 154, 0.14);
          color: var(--red);
        }

        .input-layout,
        .analysis-layout,
        .decision-layout {
          display: grid;
          grid-template-columns: minmax(320px, 0.8fr) minmax(0, 1.2fr);
          gap: 22px;
          margin-top: 22px;
        }

        .analysis-layout,
        .decision-layout {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .panel {
          border-radius: 24px;
          padding: clamp(22px, 3vw, 30px);
        }

        .section-heading {
          margin-bottom: 22px;
        }

        .section-heading h2 {
          margin: 7px 0 0;
          font-size: clamp(24px, 3vw, 34px);
          line-height: 1.08;
        }

        .section-heading p {
          margin: 9px 0 0;
          color: var(--soft);
          line-height: 1.6;
        }

        .objective-grid {
          display: grid;
          gap: 12px;
        }

        .objective-button {
          cursor: pointer;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.03);
          color: var(--text);
          text-align: left;
          transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
        }

        .objective-button:hover {
          transform: translateY(-2px);
        }

        .objective-button.active {
          border-color: rgba(224, 191, 141, 0.52);
          background: rgba(201, 161, 105, 0.14);
        }

        .objective-button strong {
          display: block;
        }

        .objective-button span {
          display: block;
          margin-top: 6px;
          color: var(--soft);
          font-size: 13px;
          line-height: 1.45;
        }

        .field-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field span {
          color: var(--soft);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .field input {
          width: 100%;
          border: 1px solid var(--line);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.04);
          color: var(--text);
          outline: none;
          padding: 14px 14px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .field input:focus {
          border-color: rgba(224, 191, 141, 0.48);
          box-shadow: 0 0 0 4px rgba(201, 161, 105, 0.13);
        }

        .field small {
          color: var(--faint);
          font-size: 12px;
          line-height: 1.35;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          margin-top: 22px;
        }

        .kpi {
          min-height: 158px;
          border-radius: 20px;
          padding: 20px;
        }

        .kpi p {
          margin: 0;
          color: var(--soft);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .kpi strong {
          display: block;
          margin-top: 14px;
          color: var(--gold-2);
          font-family: "Plus Jakarta Sans", Manrope, sans-serif;
          font-size: clamp(26px, 3vw, 38px);
          line-height: 1;
        }

        .kpi span {
          display: block;
          margin-top: 12px;
          color: var(--faint);
          font-size: 13px;
          line-height: 1.45;
        }

        .kpi-green strong {
          color: var(--green);
        }

        .kpi-blue strong {
          color: var(--blue);
        }

        .kpi-purple strong {
          color: var(--purple);
        }

        .kpi-red strong {
          color: var(--red);
        }

        .chart-panel {
          min-height: 420px;
        }

        .chart-tooltip {
          border: 1px solid var(--line);
          border-radius: 12px;
          background: #11151b;
          padding: 12px 14px;
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.4);
        }

        .chart-tooltip span {
          display: block;
          color: var(--soft);
          font-size: 12px;
        }

        .chart-tooltip strong {
          display: block;
          margin-top: 4px;
          color: var(--gold-2);
        }

        .decision-panel,
        .insight-panel {
          min-height: 520px;
        }

        .decision-verdict {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          border-radius: 20px;
          padding: 22px;
        }

        .decision-verdict strong {
          font-family: "Plus Jakarta Sans", Manrope, sans-serif;
          font-size: clamp(28px, 4vw, 46px);
          line-height: 1;
        }

        .decision-verdict span {
          white-space: nowrap;
          font-weight: 900;
        }

        .meters {
          display: grid;
          gap: 18px;
          margin-top: 28px;
        }

        .meter > div:first-child {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 9px;
          color: var(--soft);
          font-size: 14px;
        }

        .meter strong {
          color: var(--text);
        }

        .meter-track {
          overflow: hidden;
          height: 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
        }

        .meter-fill {
          display: block;
          height: 100%;
          border-radius: inherit;
        }

        .meter-fill.gold {
          background: var(--gold-2);
        }

        .meter-fill.green {
          background: var(--green);
        }

        .meter-fill.blue {
          background: var(--blue);
        }

        .meter-fill.purple {
          background: var(--purple);
        }

        .insight {
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 18px;
          background: rgba(255, 255, 255, 0.035);
        }

        .insight + .insight {
          margin-top: 14px;
        }

        .insight.good {
          border-color: rgba(149, 213, 178, 0.28);
          background: rgba(149, 213, 178, 0.09);
        }

        .insight.bad {
          border-color: rgba(255, 154, 154, 0.28);
          background: rgba(255, 154, 154, 0.09);
        }

        .insight strong {
          color: var(--text);
        }

        .insight p {
          margin: 7px 0 0;
          color: var(--soft);
          line-height: 1.62;
        }

        @media (max-width: 1100px) {
          .hero,
          .input-layout,
          .analysis-layout,
          .decision-layout {
            grid-template-columns: 1fr;
          }

          .dashboard-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 740px) {
          .topbar {
            align-items: flex-start;
          }

          .topbar nav {
            display: none;
          }

          .hero-copy,
          .verdict-panel {
            min-height: auto;
          }

          .hero h1 {
            font-size: 44px;
          }

          .field-grid,
          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .decision-verdict {
            display: block;
          }

          .decision-verdict span {
            display: block;
            margin-top: 14px;
            white-space: normal;
          }
        }
      `}</style>
    </div>
  );
}
