import React from "react";
import { TerminalSquare } from "lucide-react";

export default function Header({ view, onViewChange, bookmarkCount }) {
  return (
    <header className="border-b border-slate-800 bg-slate-950/95 sticky top-0 z-20 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <TerminalSquare className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <h1 className="font-display font-semibold text-lg leading-none tracking-tight">
              gh-explorer
            </h1>
            <p className="font-data text-[11px] text-slate-500 mt-1">
              open-source repository dashboard
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
          {["explore", "bookmarks"].map((v) => (
            <button
              key={v}
              onClick={() => onViewChange(v)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                view === v
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {v === "explore" ? "Explore" : `Bookmarks (${bookmarkCount})`}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
