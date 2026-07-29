import React from "react";
import {
  Star,
  GitFork,
  Bookmark,
  Clock,
  ExternalLink,
  TerminalSquare,
  Eye,
  CircleDot,
} from "lucide-react";
import { langColor, timeAgo, compactNumber } from "../utils/format.js";

export default function RepoRow({
  repo,
  isBookmarked,
  onToggleBookmark,
  onNoteClick,
  noteOpen,
  noteDraft,
  onNoteChange,
  onNoteSave,
  showRail,
}) {
  return (
    <div className="repo-row px-4 sm:px-5 py-4">
      <div className="flex items-start gap-3">
        <div className={`mt-1.5 shrink-0 ${showRail ? "rail-dot" : ""}`}>
          <span
            className="block h-2.5 w-2.5 rounded-full border-2 border-slate-950"
            style={{ backgroundColor: langColor(repo.language) }}
          />
        </div>

        <img
          src={repo.owner?.avatar_url}
          alt={repo.owner?.login}
          className="h-9 w-9 rounded-md border border-slate-800 shrink-0"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="font-display font-semibold text-sm text-slate-100 hover:text-emerald-400 transition-colors truncate flex items-center gap-1"
            >
              {repo.full_name}
              <ExternalLink className="h-3 w-3 text-slate-600" />
            </a>
            {repo.language && (
              <span className="font-data text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                {repo.language}
              </span>
            )}
          </div>

          {repo.description && (
            <p className="text-sm text-slate-400 mt-1 line-clamp-2">
              {repo.description}
            </p>
          )}

          <div className="font-data flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-amber-400" />
              {compactNumber(repo.stargazers_count)}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-3.5 w-3.5 text-sky-400" />
              {compactNumber(repo.forks_count)}
            </span>
            <span className="flex items-center gap-1">
              <CircleDot className="h-3.5 w-3.5 text-rose-400" />
              {compactNumber(repo.open_issues_count)} issues
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5 text-violet-400" />
              {compactNumber(repo.watchers_count)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {timeAgo(repo.updated_at)}
            </span>
          </div>

          {noteOpen && (
            <div className="mt-3 bg-slate-950 border border-slate-800 rounded-md p-2.5">
              <textarea
                value={noteDraft}
                onChange={(e) => onNoteChange(e.target.value)}
                onBlur={onNoteSave}
                placeholder="jot a private note about this repo…"
                rows={3}
                className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-600 outline-none resize-none font-data"
              />
              <div className="flex justify-end">
                <button
                  onClick={onNoteSave}
                  className="text-[11px] font-data text-emerald-400 hover:text-emerald-300 mt-1"
                >
                  save note
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onNoteClick}
            title={isBookmarked ? "edit note" : "bookmark first to add a note"}
            disabled={!isBookmarked}
            className={`p-1.5 rounded-md border transition-colors ${
              isBookmarked
                ? "border-slate-800 text-slate-400 hover:text-amber-300 hover:border-amber-500/40"
                : "border-transparent text-slate-700 cursor-not-allowed"
            }`}
          >
            <TerminalSquare className="h-4 w-4" />
          </button>
          <button
            onClick={onToggleBookmark}
            title={isBookmarked ? "remove bookmark" : "bookmark repo"}
            className={`p-1.5 rounded-md border transition-colors ${
              isBookmarked
                ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
                : "border-slate-800 text-slate-500 hover:text-amber-300 hover:border-amber-500/40"
            }`}
          >
            <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
}
