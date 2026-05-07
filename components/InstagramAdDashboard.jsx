import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const benchmarks = {
  ecommerce: { label: "E-commerce / Retail", ctr: 1.2, cpl: 180, cvr: 12, roas: 4 },
  fashion: { label: "Fashion / Apparel", ctr: 1.4, cpl: 160, cvr: 13, roas: 4.5 },
  saas: { label: "SaaS / Software", ctr: 0.9, cpl: 400, cvr: 8, roas: 3 },
  realestate: { label: "Real Estate", ctr: 0.8, cpl: 600, cvr: 5, roas: 5 },
  education: { label: "Education / Ed-Tech", ctr: 1.1, cpl: 220, cvr: 10, roas: 3.5 },
  health: { label: "Health / Wellness", ctr: 1.5, cpl: 150, cvr: 14, roas: 4.5 },
  finance: { label: "Finance / BFSI", ctr: 0.7, cpl: 500, cvr: 6, roas: 3 },
  food: { label: "Food & Beverage", ctr: 1.8, cpl: 120, cvr: 18, roas: 5 },
  other: { label: "Other", ctr: 1, cpl: 250, cvr: 10, roas: 3.5 },
};

const initialInputs = {
  clientName: "",
  campaignName: "",
  industry: "ecommerce",
  views: "50000",
  reach: "32000",
  profileVisits: "1400",
  directFollows: "260",
  followersBefore: "8200",
  followersAfter: "8520",
  likes: "980",
  shares: "84",
  comments: "43",
  saves: "126",
  playsThreeSec: "19000",
  adSpend: "50000",
  duration: "30",
  impressions: "500000",
  clicks: "12000",
  leads: "800",
  sales: "120",
  aov: "3500",
  margin: "40",
};

const toNumber = (value) => Number.parseFloat(value) || 0;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const formatNumber = (value) => Number(value || 0).toLocaleString("en-IN");
const formatMoney = (value) => `Rs.${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
const formatMoneyPrecise = (value) =>
  `Rs.${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
const formatPercent = (value) => `${Number(value || 0).toFixed(1)}%`;

function calculate(inputs) {
  const adSpend = toNumber(inputs.adSpend);
  const duration = toNumber(inputs.duration) || 1;
  const views = toNumber(inputs.views);
  const reach = toNumber(inputs.reach);
  const profileVisits = toNumber(inputs.profileVisits);
  const directFollows = toNumber(inputs.directFollows);
  const followersBefore = toNumber(inputs.followersBefore);
  const followersAfter = toNumber(inputs.followersAfter);
  const likes = toNumber(inputs.likes);
  const shares = toNumber(inputs.shares);
  const comments = toNumber(inputs.comments);
  const saves = toNumber(inputs.saves);
  const playsThreeSec = toNumber(inputs.playsThreeSec);
  const impressions = toNumber(inputs.impressions);
  const clicks = toNumber(inputs.clicks);
  const leads = toNumber(inputs.leads);
  const sales = leads > 0 ? Math.min(toNumber(inputs.sales), leads) : toNumber(inputs.sales);
  const aov = toNumber(inputs.aov);
  const margin = clamp(toNumber(inputs.margin), 0, 100);
  const benchmark = benchmarks[inputs.industry] || benchmarks.other;

  const followersGained = Math.max(0, followersAfter - followersBefore);
  const engagementTotal = likes + shares + comments + saves;
  const profileVisitRate = views > 0 ? (profileVisits / views) * 100 : 0;
  const followConversionRate = profileVisits > 0 ? (directFollows / profileVisits) * 100 : 0;
  const engagementRate = views > 0 ? (engagementTotal / views) * 100 : 0;
  const playThroughRate = views > 0 ? (playsThreeSec / views) * 100 : 0;
  const costPerVisit = profileVisits > 0 ? adSpend / profileVisits : 0;
  const costPerFollower = followersGained > 0 ? adSpend / followersGained : 0;
  const cpm = reach > 0 ? (adSpend / reach) * 1000 : 0;
  const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
  const cpl = leads > 0 ? adSpend / leads : 0;
  const conversionRate = leads > 0 ? (sales / leads) * 100 : 0;
  const revenue = sales * aov;
  const grossProfit = revenue * (margin / 100);
  const netProfit = grossProfit - adSpend;
  const roi = adSpend > 0 ? (netProfit / adSpend) * 100 : 0;
  const roas = adSpend > 0 ? revenue / adSpend : 0;
  const profitPerRupee = adSpend > 0 ? netProfit / adSpend : 0;
  const dailySpend = duration > 0 ? adSpend / duration : adSpend;
  const costPerSale = sales > 0 ? adSpend / sales : 0;
  const breakEvenSales = aov > 0 && margin > 0 ? Math.ceil(adSpend / (aov * (margin / 100))) : 0;

  return {
    adSpend,
    duration,
    views,
    reach,
    profileVisits,
    directFollows,
    followersBefore,
    followersAfter,
    followersGained,
    likes,
    shares,
    comments,
    saves,
    playsThreeSec,
    engagementTotal,
    profileVisitRate,
    followConversionRate,
    engagementRate,
    playThroughRate,
    costPerVisit,
    costPerFollower,
    cpm,
    impressions,
    clicks,
    leads,
    sales,
    aov,
    margin,
    benchmark,
    ctr,
    cpl,
    conversionRate,
    revenue,
    grossProfit,
    netProfit,
    roi,
    roas,
    profitPerRupee,
    dailySpend,
    costPerSale,
    breakEvenSales,
  };
}

function TextField({ label, value, onChange, placeholder }) {
  return (
    <label className="field text-field">
      <span>{label}</span>
      <input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function NumberField({ label, value, onChange, prefix, max }) {
  return (
    <label className="field">
      <span>{label}</span>
      <div className={prefix ? "input-prefix" : ""}>
        {prefix ? <i>{prefix}</i> : null}
        <input
          type="number"
          min="0"
          max={max}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </label>
  );
}

function KpiCard({ label, value, detail, tone = "gold", badge }) {
  return (
    <article className={`kpi kpi-${tone}`}>
      <div className="kpi-row">
        <i />
        <span>{label}</span>
      </div>
      <strong>{value}</strong>
      <p>{detail}</p>
      {badge ? <b>{badge}</b> : null}
    </article>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="chart-tooltip">
      <span>{label || payload[0].name}</span>
      <strong>{typeof payload[0].value === "number" ? formatNumber(payload[0].value) : payload[0].value}</strong>
    </div>
  );
}

function RatingStars({ score }) {
  return (
    <div className="stars" aria-label={`${score.toFixed(1)} out of 5 campaign score`}>
      {[1, 2, 3, 4, 5].map((index) => (
        <span key={index} className={score >= index ? "full" : score >= index - 0.5 ? "half" : ""}>
          ★
        </span>
      ))}
    </div>
  );
}

function Insight({ tone, children }) {
  return <div className={`insight ${tone}`}>{children}</div>;
}

export default function InstagramAdDashboard() {
  const [inputs, setInputs] = useState(initialInputs);
  const [edited, setEdited] = useState(false);
  const [calculatorMode, setCalculatorMode] = useState("leads");

  const report = useMemo(() => calculate(inputs), [inputs]);
  const clientName = inputs.clientName.trim() || "Enter Client Name";
  const campaignName = inputs.campaignName.trim() || `${clientName} Instagram Campaign`;
  const isLeadMode = calculatorMode === "leads";

  const setField = (key) => (value) => {
    setEdited(true);
    setInputs((current) => ({ ...current, [key]: value }));
  };

  const roiTone = report.roi >= 50 ? "green" : report.roi >= 0 ? "gold" : "red";
  const growthTone = report.costPerFollower > 0 && report.costPerFollower <= report.benchmark.cpl / 4 ? "green" : report.costPerFollower <= report.benchmark.cpl / 2 ? "gold" : "red";
  const verdict =
    isLeadMode
      ? report.adSpend <= 0 || report.leads <= 0
        ? "Add spend and leads to generate the report."
        : report.roi >= 100
          ? "Highly profitable. Scale with control."
          : report.roi >= 50
            ? "Profitable. Good candidate for scaling."
            : report.roi >= 0
              ? "Positive, but needs efficiency work."
              : "Loss-making. Optimize before scaling."
      : report.adSpend <= 0 || report.views <= 0
        ? "Add spend and views to calculate growth efficiency."
        : report.costPerFollower > 0 && report.costPerFollower <= report.benchmark.cpl / 4
          ? "Follower growth is efficient."
          : report.profileVisitRate >= 2
            ? "Strong attention, improve follow conversion."
            : "Needs stronger creative or targeting.";

  const score = Math.min(
    5,
    isLeadMode
      ? (report.roi >= 100 ? 2 : report.roi >= 50 ? 1.5 : report.roi >= 0 ? 1 : 0) +
        (report.cpl && report.cpl <= report.benchmark.cpl ? 1 : report.cpl <= report.benchmark.cpl * 1.5 ? 0.5 : 0) +
        (report.conversionRate >= report.benchmark.cvr ? 1 : report.conversionRate >= report.benchmark.cvr * 0.7 ? 0.5 : 0) +
        (report.roas >= report.benchmark.roas ? 1 : report.roas >= report.benchmark.roas * 0.8 ? 0.5 : 0)
      : (report.profileVisitRate >= 3 ? 1.4 : report.profileVisitRate >= 1.5 ? 0.9 : 0.4) +
        (report.followConversionRate >= 20 ? 1.4 : report.followConversionRate >= 10 ? 0.9 : 0.4) +
        (report.engagementRate >= 4 ? 1.2 : report.engagementRate >= 2 ? 0.8 : 0.3) +
        (report.costPerFollower > 0 && report.costPerFollower <= report.benchmark.cpl / 4 ? 1 : report.costPerFollower <= report.benchmark.cpl / 2 ? 0.6 : 0.2)
  );

  const funnelData = [
    { name: "Impressions", value: report.impressions, fill: "#8bb6ff" },
    { name: "Clicks", value: report.clicks, fill: "#e0bf8d" },
    { name: "Leads", value: report.leads, fill: "#95d5b2" },
    { name: "Sales", value: report.sales, fill: "#cdb4ff" },
  ];

  const financeData = [
    { name: "Ad Spend", value: report.adSpend, fill: "#c9a169" },
    { name: "Revenue", value: report.revenue, fill: "#95d5b2" },
    { name: "Gross Profit", value: report.grossProfit, fill: "#8bb6ff" },
    { name: "Net Profit", value: report.netProfit, fill: report.netProfit >= 0 ? "#e0bf8d" : "#ff9a9a" },
  ];

  const budgetData = [
    { name: "Efficient spend", value: Math.min(report.adSpend, report.sales * report.benchmark.cpl), fill: "#c9a169" },
    { name: "Optimization gap", value: Math.max(0, report.adSpend - report.sales * report.benchmark.cpl), fill: "#ff9a9a" },
  ].filter((item) => item.value > 0);

  const benchmarkData = [
    { name: "CTR", current: report.ctr, benchmark: report.benchmark.ctr },
    { name: "CPL / 100", current: report.cpl / 100, benchmark: report.benchmark.cpl / 100 },
    { name: "CVR", current: report.conversionRate, benchmark: report.benchmark.cvr },
    { name: "ROAS", current: report.roas, benchmark: report.benchmark.roas },
  ];

  const growthData = [
    { name: "Views", value: report.views, fill: "#8bb6ff" },
    { name: "Visits", value: report.profileVisits, fill: "#e0bf8d" },
    { name: "Follows", value: report.directFollows, fill: "#95d5b2" },
    { name: "Gained", value: report.followersGained, fill: "#cdb4ff" },
  ];

  const engagementData = [
    { name: "Likes", value: report.likes, fill: "#c9a169" },
    { name: "Shares", value: report.shares, fill: "#95d5b2" },
    { name: "Comments", value: report.comments, fill: "#8bb6ff" },
    { name: "Saves", value: report.saves, fill: "#cdb4ff" },
  ];

  const gaugePercent = clamp((report.roi + 50) / 250, 0, 1);
  const needleAngle = -90 + 180 * gaugePercent;

  return (
    <div className="dashboard-shell">
      <header className="topbar">
        <Link href="/" className="brand">
          <img src="/assets/Logo.png" alt="Pure Reach" />
          <small>{isLeadMode ? "Lead / ROI Calculator" : "Followers / Views Calculator"}</small>
        </Link>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/ecommerce">E-commerce</Link>
          <Link href="/support">Support</Link>
          <Link href="/resources">Training</Link>
          <a href="#dashboard">Report</a>
          <a className="nav-cta" href="/faq#quote-form">Get a Quote</a>
        </nav>
      </header>

      <main>
        <section className="report-brand">
          <img src="/assets/Logo.png" alt="Pure Reach" className="report-logo" />
          <div className="mode-switch" aria-label="Choose calculator">
            <button type="button" className={isLeadMode ? "active" : ""} onClick={() => setCalculatorMode("leads")}>Lead / ROI</button>
            <button type="button" className={!isLeadMode ? "active" : ""} onClick={() => setCalculatorMode("growth")}>Followers / Views</button>
          </div>
        </section>

        <section className="hero">
          <div className="hero-copy">
            <span>{isLeadMode ? "Lead / ROI Calculator" : "Followers / Views Calculator"}</span>
            <h1>{isLeadMode ? "Lead cost, conversion value, and ROI in one client-ready dashboard." : "Follower cost, profile visits, views, and engagement in one growth dashboard."}</h1>
            <p>
              {isLeadMode
                ? "Use this for campaigns where leads, sales, revenue, and profit are the main goal."
                : "Use this for campaigns where audience growth, profile visits, follows, and engagement quality are the main goal."}
            </p>
          </div>
          <aside className="verdict-panel">
            <small>Current verdict</small>
            <strong>{verdict}</strong>
            <div className={`roi-pill ${isLeadMode ? roiTone : growthTone}`}>{isLeadMode ? `${formatPercent(report.roi)} ROI` : `${formatMoneyPrecise(report.costPerFollower)} / follower`}</div>
            <p>{edited ? "Using your current campaign inputs." : "Sample values are loaded so the report is live immediately."}</p>
          </aside>
        </section>

        <section id="inputs" className="input-panel">
          <div className="section-heading">
            <span>{isLeadMode ? "Lead Cost Calculator" : "Followers / Views Calculator"}</span>
            <h2>{isLeadMode ? "Lead Campaign Inputs" : "Growth Campaign Inputs"}</h2>
            <p>Enter the client name here, then fill only the numbers for the calculator you are using.</p>
          </div>
          <div className="field-grid">
            <TextField label="Client Name" value={inputs.clientName} onChange={setField("clientName")} placeholder="Enter Client Name" />
            <TextField label="Campaign Name" value={inputs.campaignName} onChange={setField("campaignName")} placeholder="Instagram Lead Campaign" />
            <label className="field">
              <span>Industry</span>
              <select value={inputs.industry} onChange={(event) => setField("industry")(event.target.value)}>
                {Object.entries(benchmarks).map(([value, benchmark]) => (
                  <option key={value} value={value}>
                    {benchmark.label}
                  </option>
                ))}
              </select>
            </label>
            <NumberField label="Campaign Duration (Days)" value={inputs.duration} onChange={setField("duration")} />
            <NumberField label="Total Ad Spend" value={inputs.adSpend} onChange={setField("adSpend")} prefix="Rs." />
            {isLeadMode ? (
              <>
                <NumberField label="Total Impressions" value={inputs.impressions} onChange={setField("impressions")} />
                <NumberField label="Total Clicks" value={inputs.clicks} onChange={setField("clicks")} />
                <NumberField label="Total Leads Generated" value={inputs.leads} onChange={setField("leads")} />
                <NumberField label="Leads Converted to Sales" value={inputs.sales} onChange={setField("sales")} />
                <NumberField label="Average Order Value" value={inputs.aov} onChange={setField("aov")} prefix="Rs." />
                <NumberField label="Profit Margin (%)" value={inputs.margin} onChange={setField("margin")} max="100" />
              </>
            ) : (
              <>
                <NumberField label="Views" value={inputs.views} onChange={setField("views")} />
                <NumberField label="Reach" value={inputs.reach} onChange={setField("reach")} />
                <NumberField label="Profile Visits" value={inputs.profileVisits} onChange={setField("profileVisits")} />
                <NumberField label="Direct Follows" value={inputs.directFollows} onChange={setField("directFollows")} />
                <NumberField label="Followers Before" value={inputs.followersBefore} onChange={setField("followersBefore")} />
                <NumberField label="Followers After" value={inputs.followersAfter} onChange={setField("followersAfter")} />
                <NumberField label="Likes" value={inputs.likes} onChange={setField("likes")} />
                <NumberField label="Shares" value={inputs.shares} onChange={setField("shares")} />
                <NumberField label="Comments" value={inputs.comments} onChange={setField("comments")} />
                <NumberField label="Saves" value={inputs.saves} onChange={setField("saves")} />
                <NumberField label="3-sec Plays" value={inputs.playsThreeSec} onChange={setField("playsThreeSec")} />
              </>
            )}
          </div>
        </section>

        <section id="dashboard" className="dashboard-head">
          <div>
            <span>{isLeadMode ? "Instagram Lead Campaign Report" : "Instagram Followers / Views Report"}</span>
            <h2>{campaignName}</h2>
            <p>
              {report.duration}-day campaign · {report.benchmark.label} · Client: {clientName}
            </p>
          </div>
          <div className="report-actions">
            <button type="button" className="secondary-action" onClick={() => setInputs(initialInputs)}>Reset Report</button>
            <button type="button" onClick={() => window.print()}>Print / Save PDF</button>
          </div>
        </section>

        <section className="kpi-grid">
          {isLeadMode ? (
            <>
              <KpiCard label="Total Leads" value={formatNumber(report.leads)} detail={`${formatNumber(Math.round(report.leads / report.duration))}/day`} badge={report.cpl <= report.benchmark.cpl ? "On target" : "High CPL"} />
              <KpiCard label="Cost per Lead" value={formatMoneyPrecise(report.cpl)} detail={`Benchmark: ${formatMoney(report.benchmark.cpl)}`} tone={report.cpl <= report.benchmark.cpl ? "green" : "gold"} />
              <KpiCard label="Total Sales" value={formatNumber(report.sales)} detail={`CVR: ${formatPercent(report.conversionRate)}`} tone={report.conversionRate >= report.benchmark.cvr ? "green" : "gold"} />
              <KpiCard label="Revenue" value={formatMoney(report.revenue)} detail={`ROAS: ${report.roas.toFixed(2)}x`} tone="green" />
              <KpiCard label="Net Profit" value={formatMoney(report.netProfit)} detail={`${formatMoney(report.dailySpend)}/day spend`} tone={report.netProfit >= 0 ? "green" : "red"} />
              <KpiCard label="ROI per Rs.1" value={`Rs.${report.profitPerRupee.toFixed(2)}`} detail={`Break-even sales: ${formatNumber(report.breakEvenSales)}`} tone={roiTone} />
            </>
          ) : (
            <>
              <KpiCard label="Followers Gained" value={formatNumber(report.followersGained)} detail={`Cost/follower: ${formatMoneyPrecise(report.costPerFollower)}`} tone="blue" />
              <KpiCard label="Direct Follows" value={formatNumber(report.directFollows)} detail={`${formatPercent(report.followConversionRate)} visit-to-follow`} tone="green" />
              <KpiCard label="Profile Visit Cost" value={formatMoneyPrecise(report.costPerVisit)} detail={`${formatPercent(report.profileVisitRate)} visit rate`} tone="purple" />
              <KpiCard label="CPM" value={formatMoneyPrecise(report.cpm)} detail={`${formatNumber(report.reach)} reach`} />
              <KpiCard label="Engagement Rate" value={formatPercent(report.engagementRate)} detail={`${formatNumber(report.engagementTotal)} interactions`} tone="blue" />
              <KpiCard label="3-sec Play Rate" value={formatPercent(report.playThroughRate)} detail={`${formatNumber(report.playsThreeSec)} plays`} tone="purple" />
            </>
          )}
        </section>

        {isLeadMode ? <section className="roi-card">
          <div className="section-title">Return on Investment</div>
          <div className="roi-content">
            <svg width="180" height="120" viewBox="0 0 180 120" role="img" aria-label="ROI gauge">
              <path d="M 25 100 A 65 65 0 0 1 155 100" fill="none" stroke="rgba(224,191,141,.13)" strokeWidth="12" strokeLinecap="round" />
              <path
                d="M 25 100 A 65 65 0 0 1 155 100"
                fill="none"
                stroke="#e0bf8d"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="204"
                strokeDashoffset={204 - 204 * gaugePercent}
              />
              <line x1="90" y1="100" x2="90" y2="42" stroke="#f4ebdd" strokeWidth="3" strokeLinecap="round" transform={`rotate(${needleAngle} 90 100)`} />
              <circle cx="90" cy="100" r="6" fill="#c9a169" />
              <text x="75" y="34" fill="#e0bf8d" fontSize="13" fontWeight="800">{formatPercent(report.roi)}</text>
            </svg>
            <div>
              <h2>Campaign ROI Overview</h2>
              <p>
                {report.roi >= 50
                  ? "The campaign is profitable and has enough signal for controlled scaling."
                  : report.roi >= 0
                    ? "The campaign is positive, but CPL or conversion rate needs refinement before aggressive scaling."
                    : "The campaign is not paying back yet. Review targeting, creative, offer, and follow-up before increasing spend."}
              </p>
              <div className="roi-stats">
                <span><small>Revenue</small><b>{formatMoney(report.revenue)}</b></span>
                <span><small>Gross Profit</small><b>{formatMoney(report.grossProfit)}</b></span>
                <span><small>Cost / Sale</small><b>{formatMoneyPrecise(report.costPerSale)}</b></span>
              </div>
            </div>
          </div>
        </section> : null}

        <section className="chart-grid">
          <div className="panel">
            <div className="chart-title">{isLeadMode ? "Revenue vs Spend" : "Views to Follows"}</div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={isLeadMode ? financeData : growthData} layout={isLeadMode ? "horizontal" : "vertical"}>
                <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
                {isLeadMode ? <XAxis dataKey="name" tick={{ fill: "#b0a594", fontSize: 11 }} axisLine={false} tickLine={false} /> : <XAxis type="number" hide />}
                {isLeadMode ? <YAxis tick={{ fill: "#8f8576", fontSize: 11 }} axisLine={false} tickLine={false} /> : <YAxis dataKey="name" type="category" tick={{ fill: "#b0a594", fontSize: 12 }} axisLine={false} tickLine={false} width={88} />}
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={isLeadMode ? [8, 8, 0, 0] : [0, 8, 8, 0]}>
                  {(isLeadMode ? financeData : growthData).map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="panel">
            <div className="chart-title">{isLeadMode ? "Conversion Funnel" : "Engagement Mix"}</div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={isLeadMode ? funnelData : engagementData} layout="vertical">
                <CartesianGrid stroke="rgba(255,255,255,.06)" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tick={{ fill: "#b0a594", fontSize: 12 }} axisLine={false} tickLine={false} width={92} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {(isLeadMode ? funnelData : engagementData).map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="panel">
            <div className="chart-title">{isLeadMode ? "Budget Efficiency" : "Growth Cost Split"}</div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={isLeadMode ? (budgetData.length ? budgetData : [{ name: "No spend", value: 1, fill: "#3a3830" }]) : [
                  { name: "Profile visits", value: report.profileVisits ? report.costPerVisit * report.profileVisits : 0, fill: "#8bb6ff" },
                  { name: "Followers", value: report.followersGained ? report.costPerFollower * report.followersGained : 0, fill: "#95d5b2" },
                ]} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={4}>
                  {(isLeadMode ? (budgetData.length ? budgetData : [{ name: "No spend", fill: "#3a3830" }]) : [
                    { name: "Profile visits", fill: "#8bb6ff" },
                    { name: "Followers", fill: "#95d5b2" },
                  ]).map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="panel">
            <div className="chart-title">{isLeadMode ? "KPI vs Benchmark" : "Growth Rates"}</div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={isLeadMode ? benchmarkData : [
                { name: "Visit Rate", current: report.profileVisitRate },
                { name: "Follow CVR", current: report.followConversionRate },
                { name: "Engagement", current: report.engagementRate },
                { name: "Play Rate", current: report.playThroughRate },
              ]}>
                <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#b0a594", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#8f8576", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="current" name="Current" fill="#c9a169" radius={[8, 8, 0, 0]} />
                {isLeadMode ? <Bar dataKey="benchmark" name="Benchmark" fill="rgba(224,191,141,.24)" radius={[8, 8, 0, 0]} /> : null}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section id="decision" className="summary-card">
          <div className="summary-head">
            <div>
              <span>{isLeadMode ? "Campaign Verdict" : "Growth Verdict"}</span>
              <h2>{verdict}</h2>
              <p>Analyzed by Pure Reach · {isLeadMode ? "Industry-benchmarked performance rating" : "Follower and view efficiency rating"}</p>
            </div>
            <div>
              <RatingStars score={score} />
              <small>{score.toFixed(1)}/5 campaign score</small>
            </div>
          </div>
          <div className="verdict-copy">
            {isLeadMode ? (
              <>
                <strong>{campaignName}</strong> is producing <strong>{formatPercent(report.roi)} ROI</strong> for{" "}
                <strong>{clientName}</strong>. CPL is <strong>{formatMoneyPrecise(report.cpl)}</strong> against a{" "}
                <strong>{formatMoney(report.benchmark.cpl)}</strong> benchmark, and ROAS is{" "}
                <strong>{report.roas.toFixed(2)}x</strong>.
              </>
            ) : (
              <>
                <strong>{campaignName}</strong> generated <strong>{formatNumber(report.followersGained)} followers</strong> for{" "}
                <strong>{clientName}</strong> at <strong>{formatMoneyPrecise(report.costPerFollower)}</strong> per follower, with{" "}
                <strong>{formatPercent(report.profileVisitRate)}</strong> profile visit rate and <strong>{formatPercent(report.engagementRate)}</strong> engagement rate.
              </>
            )}
          </div>
          <div className="insight-grid">
            {isLeadMode ? (
              <>
                <Insight tone={report.cpl <= report.benchmark.cpl ? "good" : "warn"}>CPL is {report.cpl <= report.benchmark.cpl ? "within" : "above"} the industry benchmark.</Insight>
                <Insight tone={report.conversionRate >= report.benchmark.cvr ? "good" : "warn"}>Lead-to-sale conversion is {formatPercent(report.conversionRate)} vs {report.benchmark.cvr}% benchmark.</Insight>
                <Insight tone={report.roas >= report.benchmark.roas ? "good" : "warn"}>ROAS is {report.roas.toFixed(2)}x vs {report.benchmark.roas}x benchmark.</Insight>
                <Insight tone={report.netProfit >= 0 ? "good" : "bad"}>Net {report.netProfit >= 0 ? "profit" : "loss"} is {formatMoney(Math.abs(report.netProfit))}.</Insight>
              </>
            ) : (
              <>
                <Insight tone={report.costPerFollower <= report.benchmark.cpl / 4 ? "good" : "warn"}>Cost per follower is {formatMoneyPrecise(report.costPerFollower)}.</Insight>
                <Insight tone={report.profileVisitRate >= 2 ? "good" : "warn"}>Profile visit rate is {formatPercent(report.profileVisitRate)} from views.</Insight>
                <Insight tone={report.followConversionRate >= 10 ? "good" : "warn"}>Visit-to-follow conversion is {formatPercent(report.followConversionRate)}.</Insight>
                <Insight tone={report.engagementRate >= 2 ? "good" : "warn"}>Engagement rate is {formatPercent(report.engagementRate)} from {formatNumber(report.engagementTotal)} interactions.</Insight>
              </>
            )}
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

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: var(--bg); color: var(--text); font-family: Manrope, system-ui, sans-serif; }
        a { color: inherit; text-decoration: none; }
        button, input, select { font: inherit; }

        .dashboard-shell {
          min-height: 100vh;
          background:
            radial-gradient(circle at 12% 0%, rgba(201, 161, 105, 0.13), transparent 28%),
            radial-gradient(circle at 90% 4%, rgba(139, 182, 255, 0.1), transparent 26%),
            linear-gradient(180deg, #07080b 0%, #0d1014 56%, #07080b 100%);
        }

        .topbar {
          position: sticky;
          top: 0;
          z-index: 20;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          padding: 18px clamp(20px, 4vw, 48px);
          border-bottom: 1px solid var(--line);
          background: rgba(7, 8, 11, 0.86);
          backdrop-filter: blur(22px);
        }

        .brand, .report-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand img {
          display: block;
          width: auto;
          height: 54px;
          object-fit: contain;
        }

        .report-logo {
          display: block;
          width: auto;
          height: 64px;
          object-fit: contain;
        }

        h1, h2 {
          font-family: "Plus Jakarta Sans", Manrope, sans-serif;
          letter-spacing: 0;
        }

        .brand small {
          display: block;
          margin-top: 1px;
          color: var(--soft);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .topbar nav {
          display: flex;
          align-items: center;
          gap: 22px;
          color: var(--soft);
          font-size: 14px;
          font-weight: 800;
        }

        .nav-cta, .dashboard-head button {
          border: 0;
          border-radius: 12px;
          padding: 10px 14px;
          background: linear-gradient(135deg, var(--gold-2), var(--gold));
          color: #111;
          font-weight: 900;
          cursor: pointer;
        }

        main {
          width: min(1440px, 100%);
          margin: 0 auto;
          padding: 24px clamp(18px, 4vw, 48px) 72px;
        }

        .report-brand, .input-panel, .dashboard-head, .panel, .kpi, .roi-card, .summary-card, .verdict-panel {
          border: 1px solid var(--line);
          background: linear-gradient(180deg, rgba(21, 24, 32, .96), rgba(29, 33, 43, .96));
          box-shadow: 0 28px 70px rgba(0, 0, 0, .28);
        }

        .report-brand {
          justify-content: space-between;
          border-radius: 18px;
          padding: 18px 22px;
        }

        .prepared {
          margin-left: auto;
          text-align: right;
        }

        .prepared small, .verdict-panel small, .hero-copy > span, .section-heading > span, .dashboard-head span, .section-title, .chart-title, .summary-head span {
          color: var(--gold-2);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .2em;
          text-transform: uppercase;
        }

        .prepared b {
          display: block;
          margin-top: 4px;
          color: var(--gold-2);
          font-size: 22px;
        }

        .mode-switch {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-left: auto;
        }

        .mode-switch button {
          cursor: pointer;
          border: 1px solid var(--line);
          border-radius: 999px;
          background: rgba(255, 255, 255, .04);
          color: var(--soft);
          padding: 11px 14px;
          font-weight: 900;
        }

        .mode-switch button.active {
          border-color: transparent;
          background: linear-gradient(135deg, var(--gold-2), var(--gold));
          color: #111;
        }

        .hero {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(340px, .75fr);
          gap: 28px;
          padding: clamp(46px, 7vw, 82px) 0 26px;
        }

        .hero-copy {
          min-height: 390px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero h1 {
          max-width: 960px;
          margin: 12px 0 0;
          font-size: clamp(44px, 6.8vw, 88px);
          line-height: .95;
        }

        .hero p, .section-heading p, .dashboard-head p, .summary-head p, .roi-card p {
          color: var(--soft);
          line-height: 1.7;
        }

        .hero p {
          max-width: 720px;
          margin: 22px 0 0;
          font-size: 18px;
        }

        .verdict-panel {
          display: flex;
          min-height: 390px;
          flex-direction: column;
          justify-content: flex-end;
          border-radius: 26px;
          padding: clamp(24px, 4vw, 36px);
        }

        .verdict-panel strong {
          display: block;
          margin-top: 16px;
          font-family: "Plus Jakarta Sans", Manrope, sans-serif;
          font-size: clamp(32px, 4vw, 52px);
          line-height: 1;
        }

        .roi-pill {
          width: fit-content;
          margin-top: 24px;
          border-radius: 999px;
          padding: 10px 14px;
          font-weight: 900;
        }

        .roi-pill.green, .kpi-green b, .insight.good { background: rgba(149, 213, 178, .13); color: var(--green); }
        .roi-pill.gold, .kpi-gold b, .insight.warn { background: rgba(224, 191, 141, .13); color: var(--gold-2); }
        .roi-pill.red, .kpi-red b, .insight.bad { background: rgba(255, 154, 154, .13); color: var(--red); }

        .input-panel, .dashboard-head, .roi-card, .summary-card, .panel {
          border-radius: 22px;
          padding: clamp(22px, 3vw, 30px);
          margin-top: 22px;
        }

        .section-heading { margin-bottom: 22px; }
        .section-heading h2, .dashboard-head h2, .roi-card h2, .summary-head h2 {
          margin: 7px 0 0;
          font-size: clamp(26px, 3.4vw, 40px);
          line-height: 1.06;
        }

        .field-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field span {
          color: var(--gold-2);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .field input, .field select {
          width: 100%;
          min-height: 48px;
          border: 1px solid var(--line);
          border-radius: 13px;
          background: rgba(255, 255, 255, .04);
          color: var(--text);
          outline: none;
          padding: 13px 14px;
        }

        .field select option { background: #151820; color: var(--text); }
        .field input:focus, .field select:focus {
          border-color: rgba(224, 191, 141, .5);
          box-shadow: 0 0 0 4px rgba(201, 161, 105, .12);
        }

        .input-prefix {
          position: relative;
        }

        .input-prefix i {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gold-2);
          font-style: normal;
          font-size: 13px;
          pointer-events: none;
        }

        .input-prefix input { padding-left: 40px; }

        .dashboard-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
        }

        .report-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 10px;
        }

        .dashboard-head .secondary-action {
          border: 1px solid var(--line);
          background: rgba(255, 255, 255, .04);
          color: var(--text);
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 14px;
          margin-top: 22px;
        }

        .kpi {
          min-height: 168px;
          border-radius: 18px;
          padding: 18px;
          overflow: hidden;
          position: relative;
        }

        .kpi::before {
          content: "";
          position: absolute;
          inset: 0 0 auto;
          height: 2px;
          background: var(--gold);
          opacity: .7;
        }

        .kpi-row {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--soft);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .kpi-row i {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--gold);
        }

        .kpi strong {
          display: block;
          margin-top: 14px;
          color: var(--gold-2);
          font-family: "Plus Jakarta Sans", Manrope, sans-serif;
          font-size: clamp(22px, 2.4vw, 32px);
          line-height: 1;
        }

        .kpi-green strong { color: var(--green); }
        .kpi-blue strong { color: var(--blue); }
        .kpi-purple strong { color: var(--purple); }
        .kpi-red strong { color: var(--red); }
        .kpi p {
          margin: 10px 0 0;
          color: var(--faint);
          font-size: 12px;
          line-height: 1.45;
        }

        .kpi b {
          display: inline-block;
          margin-top: 10px;
          border-radius: 999px;
          padding: 4px 9px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: .08em;
        }

        .roi-content {
          display: flex;
          align-items: center;
          gap: 32px;
          margin-top: 16px;
        }

        .roi-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin-top: 18px;
        }

        .roi-stats span {
          min-width: 140px;
        }

        .roi-stats small {
          display: block;
          color: var(--faint);
          text-transform: uppercase;
          letter-spacing: .12em;
          font-size: 10px;
        }

        .roi-stats b {
          display: block;
          margin-top: 4px;
          color: var(--gold-2);
          font-size: 18px;
        }

        .chart-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .chart-title { margin-bottom: 16px; }

        .chart-tooltip {
          border: 1px solid var(--line);
          border-radius: 12px;
          background: #11151b;
          padding: 12px 14px;
          box-shadow: 0 18px 44px rgba(0, 0, 0, .4);
        }

        .chart-tooltip span { color: var(--soft); font-size: 12px; }
        .chart-tooltip strong { display: block; margin-top: 4px; color: var(--gold-2); }

        .summary-card {
          overflow: hidden;
          position: relative;
        }

        .summary-head {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 20px;
        }

        .stars {
          color: rgba(255, 255, 255, .14);
          font-size: 24px;
          white-space: nowrap;
        }

        .stars .full, .stars .half { color: var(--gold-2); }
        .stars .half { opacity: .62; }

        .verdict-copy {
          border: 1px solid rgba(224, 191, 141, .16);
          border-radius: 16px;
          background: rgba(224, 191, 141, .06);
          padding: 20px;
          color: var(--soft);
          line-height: 1.8;
        }

        .verdict-copy strong { color: var(--gold-2); }

        .insight-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin-top: 16px;
        }

        .insight {
          border: 1px solid currentColor;
          border-radius: 14px;
          padding: 14px;
          font-size: 13px;
          line-height: 1.55;
        }

        @media (max-width: 1180px) {
          .hero, .chart-grid { grid-template-columns: 1fr; }
          .field-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .kpi-grid, .insight-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 740px) {
          .topbar nav { display: none; }
          .report-brand, .dashboard-head, .summary-head, .roi-content { display: block; }
          .mode-switch { margin: 16px 0 0; }
          .prepared { margin: 14px 0 0; text-align: left; }
          .hero-copy, .verdict-panel { min-height: auto; }
          .hero h1 { font-size: 42px; }
          .field-grid, .kpi-grid, .insight-grid { grid-template-columns: 1fr; }
        }

        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }

          * {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          body {
            background: #07080b !important;
          }

          .topbar,
          .hero,
          .input-panel,
          .report-actions {
            display: none !important;
          }

          main {
            width: 100%;
            padding: 0;
          }

          .dashboard-shell {
            min-height: auto;
            background: #07080b !important;
          }

          .report-brand,
          .dashboard-head,
          .roi-card,
          .summary-card,
          .panel,
          .kpi {
            break-inside: avoid;
            box-shadow: none;
          }

          .report-brand,
          .dashboard-head,
          .roi-card,
          .summary-card,
          .panel {
            margin-top: 10px;
            padding: 16px;
          }

          .dashboard-head {
            display: block;
          }

          .kpi-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 10px;
            margin-top: 10px;
          }

          .kpi {
            min-height: 128px;
            padding: 14px;
          }

          .kpi strong {
            font-size: 22px;
          }

          .chart-grid,
          .insight-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .recharts-responsive-container {
            height: 210px !important;
          }

          .summary-card {
            page-break-before: auto;
          }
        }
      `}</style>
    </div>
  );
}
