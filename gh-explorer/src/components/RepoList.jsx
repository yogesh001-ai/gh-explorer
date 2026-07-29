import React from "react";
import { Loader2 } from "lucide-react";
import RepoRow from "./RepoRow.jsx";

export default function RepoList({
  repos,
  loading,
  error,
  bookmarks,
  onToggleBookmark,
  openNoteId,
  noteDraft,
  onOpenNote,
  onNoteChange,
  onNoteSave,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg divide-y divide-slate-800/80">
      {loading && repos.length === 0 && (
        <div className="p-10 text-center font-data text-sm text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2 text-emerald-400" />
          fetching repositories…
        </div>
      )}

      {!loading && !error && repos.length === 0 && (
        <div className="p-10 text-center">
          <p className="font-data text-sm text-slate-500">
            no repositories matched that query.
          </p>
        </div>
      )}

      {repos.map((repo, idx) => (
        <RepoRow
          key={repo.id}
          repo={repo}
          isBookmarked={!!bookmarks[repo.id]}
          onToggleBookmark={() => onToggleBookmark(repo)}
          onNoteClick={() => onOpenNote(repo.id, bookmarks[repo.id]?.note)}
          noteOpen={openNoteId === repo.id}
          noteDraft={noteDraft}
          onNoteChange={onNoteChange}
          onNoteSave={() => onNoteSave(repo.id, noteDraft)}
          showRail={idx !== 0}
        />
      ))}
    </div>
  );
}
