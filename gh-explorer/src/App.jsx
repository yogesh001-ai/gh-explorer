import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { AlertCircle } from "lucide-react";

import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Filters from "./components/Filters.jsx";
import ChartsPanel from "./components/ChartsPanel.jsx";
import RepoList from "./components/RepoList.jsx";
import BookmarksView from "./components/BookmarksView.jsx";

import { useBookmarks } from "./hooks/useBookmarks.js";
import { searchRepositories } from "./utils/github.js";
import { compactNumber } from "./utils/format.js";

export default function App() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("all");
  const [sortBy, setSortBy] = useState("stars");
  const [repos, setRepos] = useState([]);
  const [totalCount, setTotalCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState("explore"); // explore | bookmarks
  const [openNoteId, setOpenNoteId] = useState(null);
  const [noteDraft, setNoteDraft] = useState("");

  const { bookmarks, toggleBookmark, removeBookmark, saveNote } = useBookmarks();
  const debounceRef = useRef(null);
  const abortRef = useRef(null);

  const fetchRepos = useCallback(async () => {
    // Cancel whatever request is still in flight — its response would be
    // stale the moment a newer one is issued.
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const data = await searchRepositories({
        query,
        language,
        sortBy,
        signal: controller.signal,
      });
      setRepos(data.items || []);
      setTotalCount(data.total_count ?? null);
    } catch (e) {
      if (e.name === "AbortError") return; // superseded by a newer request
      setError(e.message || "Something went wrong fetching repositories.");
      setRepos([]);
    } finally {
      if (abortRef.current === controller) setLoading(false);
    }
  }, [query, language, sortBy]);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(fetchRepos, 500);
    return () => {
      clearTimeout(debounceRef.current);
    };
  }, [fetchRepos]);

  // Cancel any pending request if the component unmounts.
  useEffect(() => () => abortRef.current?.abort(), []);

  const bookmarkList = useMemo(
    () => Object.values(bookmarks).sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt)),
    [bookmarks]
  );

  const openNote = (id, current) => {
    setOpenNoteId(openNoteId === id ? null : id);
    setNoteDraft(current || "");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header view={view} onViewChange={setView} bookmarkCount={bookmarkList.length} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {view === "explore" ? (
          <>
            <SearchBar query={query} onQueryChange={setQuery} loading={loading} />

            <Filters
              language={language}
              onLanguageChange={setLanguage}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            <div className="font-data text-xs text-slate-500 flex items-center gap-2">
              {error ? (
                <span className="flex items-center gap-1.5 text-rose-400">
                  <AlertCircle className="h-3.5 w-3.5" /> {error}
                </span>
              ) : (
                <span>
                  {loading
                    ? "fetching…"
                    : `${repos.length} shown${
                        totalCount != null ? ` of ${compactNumber(totalCount)} matches` : ""
                      }`}
                </span>
              )}
            </div>

            <ChartsPanel repos={repos} />

            <RepoList
              repos={repos}
              loading={loading}
              error={error}
              bookmarks={bookmarks}
              onToggleBookmark={toggleBookmark}
              openNoteId={openNoteId}
              noteDraft={noteDraft}
              onOpenNote={openNote}
              onNoteChange={setNoteDraft}
              onNoteSave={saveNote}
            />
          </>
        ) : (
          <BookmarksView
            bookmarks={bookmarkList}
            onRemove={removeBookmark}
            openNoteId={openNoteId}
            noteDraft={noteDraft}
            onOpenNote={openNote}
            onNoteChange={setNoteDraft}
            onNoteSave={saveNote}
          />
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center">
        <p className="font-data text-[11px] text-slate-600">
          data via the public GitHub REST API — unauthenticated requests are rate-limited by GitHub
        </p>
      </footer>
    </div>
  );
}
