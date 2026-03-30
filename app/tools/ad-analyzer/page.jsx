"use client";
import { useState } from "react";

export default function AdAnalyzer() {
  const [views, setViews] = useState("");
  const [visits, setVisits] = useState("");
  const [follows, setFollows] = useState("");
  const [spend, setSpend] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const v = Number(views);
    const vi = Number(visits);
    const f = Number(follows);
    const s = Number(spend);

    const visitRate = v > 0 ? vi / v : 0;
    const followRate = vi > 0 ? f / vi : 0;
    const costPerFollow = f > 0 ? s / f : 0;

    setResult({
      visitRate,
      followRate,
      costPerFollow
    });
  };

  return (
    <main style={{ background: "#f5f7f9", minHeight: "100vh", paddingTop: 100 }}>

      {/* HERO */}
      <section style={{ textAlign: "center", padding: "80px 20px" }}>
        <h1 style={{
          fontSize: 48,
          fontWeight: 800,
          color: "#2c2f31"
        }}>
          Free Ad Performance Audit
        </h1>

        <p style={{
          marginTop: 12,
          color: "#6b7280",
          fontSize: 16
        }}>
          Discover what’s killing your ads — and how to fix it.
        </p>
      </section>

      {/* INPUT */}
      <section style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

          <input placeholder="Views" value={views} onChange={(e)=>setViews(e.target.value)}
            style={inputStyle} />

          <input placeholder="Profile Visits" value={visits} onChange={(e)=>setVisits(e.target.value)}
            style={inputStyle} />

          <input placeholder="Follows" value={follows} onChange={(e)=>setFollows(e.target.value)}
            style={inputStyle} />

          <input placeholder="Ad Spend (₹)" value={spend} onChange={(e)=>setSpend(e.target.value)}
            style={inputStyle} />

          <button onClick={calculate} style={btnStyle}>
            Analyze My Ads
          </button>

        </div>

      </section>

      {/* RESULTS */}
      {result && (
        <section style={{ maxWidth: 800, margin: "60px auto", padding: 20 }}>

          <div style={cardStyle}>
            <h2 style={{ fontSize: 24, fontWeight: 700 }}>
              Your Results
            </h2>

            <p>Visit Rate: {(result.visitRate * 100).toFixed(2)}%</p>
            <p>Follow Rate: {(result.followRate * 100).toFixed(2)}%</p>
            <p>Cost per Follow: ₹{result.costPerFollow.toFixed(2)}</p>
          </div>

          {/* WHAT THIS MEANS */}
          <div style={{ ...cardStyle, marginTop: 20 }}>
            <h3 style={{ fontWeight: 600 }}>
              What This Means
            </h3>

            <p style={{ color: "#6b7280", lineHeight: 1.6 }}>
              Your campaigns are likely underperforming due to weak creatives,
              poor targeting, or lack of funnel alignment.
              Improving these areas can significantly reduce costs and increase conversions.
            </p>
          </div>

          {/* CTA */}
          <div style={{
            marginTop: 30,
            background: "#2563eb",
            color: "white",
            padding: 24,
            borderRadius: 16,
            textAlign: "center"
          }}>
            <h3 style={{ fontSize: 20 }}>
              Want a Full Audit for Your Brand?
            </h3>

            <p style={{ marginTop: 6 }}>
              Get a personalized strategy from our team.
            </p>

            <button style={{
              marginTop: 12,
              background: "white",
              color: "#2563eb",
              padding: "10px 20px",
              borderRadius: 10,
              border: "none",
              fontWeight: 600
            }}>
              Get My Full Audit
            </button>
          </div>

        </section>
      )}

    </main>
  );
}

/* STYLES */

const inputStyle = {
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  fontSize: 14
};

const btnStyle = {
  background: "#2563eb",
  color: "white",
  padding: "14px",
  borderRadius: 10,
  border: "none",
  fontWeight: 600,
  cursor: "pointer"
};

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  padding: 20
};