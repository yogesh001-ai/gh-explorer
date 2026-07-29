import React from "react";

export default function ChartCard({ title, children }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
      <h3 className="font-data text-[11px] uppercase tracking-wide text-slate-500 mb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}
