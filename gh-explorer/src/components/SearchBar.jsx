import React from "react";
import { Search, Loader2 } from "lucide-react";

export default function SearchBar({ query, onQueryChange, loading }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800 bg-slate-900/60">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
        </div>
        <span className="font-data text-[11px] text-slate-500">
          search — github.com/search
        </span>
      </div>
      <div className="px-4 py-3.5 flex items-center gap-2">
        <span className="font-data text-emerald-400 select-none">$</span>
        <Search className="h-4 w-4 text-slate-500 shrink-0" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="search repositories — e.g. machine learning, cli tool, react-*"
          className="font-data bg-transparent outline-none flex-1 text-sm text-slate-100 placeholder:text-slate-600"
        />
        {loading && (
          <Loader2 className="h-4 w-4 text-emerald-400 animate-spin shrink-0" />
        )}
      </div>
    </div>
  );
}
