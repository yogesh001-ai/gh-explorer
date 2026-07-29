import { SORT_OPTIONS } from "./format.js";

// Optional: set VITE_GITHUB_TOKEN in a local .env file to raise the rate
// limit from 10 to 30 requests/minute. Never commit a real token.
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

/**
 * Search GitHub repositories.
 * @param {{ query: string, language: string, sortBy: string, signal?: AbortSignal }} params
 * @returns {Promise<{ items: object[], total_count: number }>}
 */
export async function searchRepositories({ query, language, sortBy, signal }) {
  let q = query.trim() || "stars:>5000";
  if (language && language !== "all") q += ` language:${language}`;

  const sortOpt = SORT_OPTIONS.find((s) => s.value === sortBy);
  const params = new URLSearchParams({ q, per_page: "30", order: "desc" });
  if (sortOpt?.param) params.set("sort", sortOpt.param);

  const headers = { Accept: "application/vnd.github+json" };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

  let res;
  try {
    res = await fetch(
      `https://api.github.com/search/repositories?${params.toString()}`,
      { headers, signal }
    );
  } catch (err) {
    // A cancelled request (new keystroke came in) is not a real error —
    // let the caller ignore it rather than showing it to the user.
    if (err.name === "AbortError") throw err;
    // Anything else here is a network-level failure: no connection, DNS
    // failure, a blocked request (ad blocker, firewall, or a sandboxed
    // preview environment with no outbound network access), etc. — not
    // something the GitHub API itself returned.
    throw new Error(
      "Couldn't reach the GitHub API. Check your internet connection, and make sure nothing (an ad blocker, firewall, or offline preview) is blocking requests to api.github.com."
    );
  }

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error(
        "GitHub API rate limit reached. Wait a minute and try again."
      );
    }
    if (res.status === 422) {
      throw new Error("That search query isn't valid — try simplifying it.");
    }
    throw new Error(`GitHub API returned an error (status ${res.status}).`);
  }

  return res.json();
}
