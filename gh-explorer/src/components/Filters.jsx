import React from "react";
import { ChevronDown } from "lucide-react";
import { QUICK_LANGUAGES, SORT_OPTIONS, langColor } from "../utils/format.js";

export default function Filters({
  language,
  onLanguageChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 justify-between">
      <div className="flex flex-wrap gap-1.5">
        {QUICK_LANGUAGES.map((l) => (
          <button
            key={l}
            onClick={() => onLanguageChange(l)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 ${
              language === l
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                : "border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
            }`}
          >
            {l !== "all" && (
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: langColor(l) }}
              />
            )}
            {l === "all" ? "all languages" : l}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="font-data text-[11px] text-slate-500 uppercase tracking-wide">
          sort
        </span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none font-data bg-slate-900 border border-slate-800 rounded-md pl-3 pr-8 py-1.5 text-xs text-slate-200 outline-none focus:border-emerald-500/50 cursor-pointer"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <ChevronDown className="h-3 w-3 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
