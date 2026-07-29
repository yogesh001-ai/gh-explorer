import { useState, useEffect, useCallback, useRef } from "react";

const STORAGE_KEY = "gh-explorer-bookmarks-v1";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState({});
  const saveTimerRef = useRef(null);

  // Load once on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setBookmarks(JSON.parse(raw));
    } catch {
      // corrupt or unavailable storage — start empty
    }
  }, []);

  const persist = useCallback((next) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // storage full or unavailable — fail silently
    }
  }, []);

  const toggleBookmark = useCallback(
    (repo) => {
      setBookmarks((prev) => {
        const next = { ...prev };
        if (next[repo.id]) {
          delete next[repo.id];
        } else {
          next[repo.id] = {
            id: repo.id,
            name: repo.name,
            full_name: repo.full_name,
            html_url: repo.html_url,
            owner_avatar: repo.owner?.avatar_url,
            language: repo.language,
            stars: repo.stargazers_count,
            note: "",
            addedAt: new Date().toISOString(),
          };
        }
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const removeBookmark = useCallback(
    (id) => {
      setBookmarks((prev) => {
        const next = { ...prev };
        delete next[id];
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const saveNote = useCallback(
    (id, text) => {
      setBookmarks((prev) => {
        if (!prev[id]) return prev;
        const next = { ...prev, [id]: { ...prev[id], note: text } };
        clearTimeout(saveTimerRef.current);
        saveTimerRef.current = setTimeout(() => persist(next), 400);
        return next;
      });
    },
    [persist]
  );

  return { bookmarks, toggleBookmark, removeBookmark, saveNote };
}
