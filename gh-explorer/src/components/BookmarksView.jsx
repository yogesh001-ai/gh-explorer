import React from "react";
import { Bookmark, ExternalLink, TerminalSquare, X } from "lucide-react";
import { langColor, timeAgo } from "../utils/format.js";

export default function BookmarksView({
  bookmarks,
  onRemove,
  openNoteId,
  noteDraft,
  onOpenNote,
  onNoteChange,
  onNoteSave,
}) {
  if (bookmarks.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-12 text-center">
        <Bookmark className="h-6 w-6 text-slate-700 mx-auto mb-3" />
        <p className="font-data text-sm text-slate-500">
          no bookmarks yet — star a repo in Explore to save it here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg divide-y divide-slate-800/80">
      {bookmarks.map((b) => (
        <div key={b.id} className="px-4 sm:px-5 py-4">
          <div className="flex items-start gap-3">
            <img
              src={b.owner_avatar}
              alt=""
              className="h-9 w-9 rounded-md border border-slate-800 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <a
                  href={b.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display font-semibold text-sm hover:text-emerald-400 flex items-center gap-1"
                >
                  {b.full_name}
                  <ExternalLink className="h-3 w-3 text-slate-600" />
                </a>
                {b.language && (
                  <span
                    className="font-data text-[10px] px-1.5 py-0.5 rounded bg-slate-800"
                    style={{ color: langColor(b.language) }}
                  >
                    {b.language}
                  </span>
                )}
                <span className="font-data text-[11px] text-slate-600">
                  saved {timeAgo(b.addedAt)}
                </span>
              </div>

              <button
                onClick={() => onOpenNote(b.id, b.note)}
                className="font-data text-xs text-slate-500 hover:text-emerald-400 mt-2 flex items-center gap-1"
              >
                <TerminalSquare className="h-3.5 w-3.5" />
                {b.note ? "edit note" : "add note"}
              </button>

              {b.note && openNoteId !== b.id && (
                <p className="text-sm text-slate-400 mt-2 bg-slate-950 border border-slate-800 rounded-md p-2.5">
                  {b.note}
                </p>
              )}

              {openNoteId === b.id && (
                <div className="mt-2 bg-slate-950 border border-slate-800 rounded-md p-2.5">
                  <textarea
                    value={noteDraft}
                    onChange={(e) => onNoteChange(e.target.value)}
                    onBlur={() => onNoteSave(b.id, noteDraft)}
                    rows={3}
                    placeholder="jot a private note about this repo…"
                    className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-600 outline-none resize-none font-data"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => onNoteSave(b.id, noteDraft)}
                      className="text-[11px] font-data text-emerald-400 hover:text-emerald-300 mt-1"
                    >
                      save note
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onRemove(b.id)}
              title="remove bookmark"
              className="p-1.5 rounded-md border border-slate-800 text-slate-500 hover:text-rose-400 hover:border-rose-500/40 shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
