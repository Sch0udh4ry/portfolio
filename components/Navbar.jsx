"use client";

export default function Sidebar({ reports, onSelect }) {
  return (
    <div className="w-64 bg-[#0f172a] p-4 border-r border-white/10">
      <h2 className="text-lg font-bold mb-4">Saved Reports</h2>

      <div className="space-y-2">
        {reports.length === 0 && (
          <p className="text-gray-500 text-sm">No reports yet</p>
        )}

        {reports.map((r, i) => (
          <div
            key={i}
            onClick={() => onSelect(r)}
            className="p-2 bg-white/5 rounded cursor-pointer hover:bg-white/10"
          >
            Report {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}