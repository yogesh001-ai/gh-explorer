import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import ChartCard from "./ChartCard.jsx";
import { langColor, compactNumber } from "../utils/format.js";

const tooltipStyle = {
  contentStyle: {
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 8,
    fontSize: 12,
  },
  labelStyle: { color: "#e2e8f0" },
};

export default function ChartsPanel({ repos }) {
  const topByStars = useMemo(
    () =>
      [...repos]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 8)
        .map((r) => ({
          name: r.name.length > 14 ? r.name.slice(0, 13) + "…" : r.name,
          stars: r.stargazers_count,
          fill: langColor(r.language),
        })),
    [repos]
  );

  const languageBreakdown = useMemo(() => {
    const counts = {};
    repos.forEach((r) => {
      const l = r.language || "Unspecified";
      counts[l] = (counts[l] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7)
      .map(([name, value]) => ({ name, value, fill: langColor(name) }));
  }, [repos]);

  const issuesVsForks = useMemo(
    () =>
      [...repos]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 8)
        .map((r) => ({
          name: r.name.length > 12 ? r.name.slice(0, 11) + "…" : r.name,
          "open issues": r.open_issues_count,
          forks: r.forks_count,
        })),
    [repos]
  );

  if (repos.length === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <ChartCard title="top repos by stars">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={topByStars} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "#64748b", fontSize: 10 }}
              interval={0}
              angle={-30}
              textAnchor="end"
              height={50}
            />
            <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
            <Tooltip {...tooltipStyle} formatter={(v) => [compactNumber(v), "stars"]} />
            <Bar dataKey="stars" radius={[4, 4, 0, 0]}>
              {topByStars.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="language breakdown">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={languageBreakdown}
              dataKey="value"
              nameKey="name"
              innerRadius={45}
              outerRadius={72}
              paddingAngle={2}
            >
              {languageBreakdown.map((entry, i) => (
                <Cell key={i} fill={entry.fill} stroke="#0f172a" />
              ))}
            </Pie>
            <Tooltip {...tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} iconType="circle" iconSize={7} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="open issues vs forks">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={issuesVsForks} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "#64748b", fontSize: 10 }}
              interval={0}
              angle={-30}
              textAnchor="end"
              height={50}
            />
            <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
            <Tooltip {...tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
            <Bar dataKey="open issues" fill="#fb7185" radius={[3, 3, 0, 0]} />
            <Bar dataKey="forks" fill="#38bdf8" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
