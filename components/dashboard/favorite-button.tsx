"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useEffect, useState } from "react";

export function FavoriteButton({ toolSlug, initialFavorite = false }: { toolSlug: string; initialFavorite?: boolean }) {
  const [favorite, setFavorite] = useState(initialFavorite);
  const [loading, setLoading] = useState(false);
  useEffect(() => { setFavorite(initialFavorite); }, [initialFavorite]);

  async function toggle() {
    setLoading(true);
    const response = await fetch("/api/user/favorites", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ toolSlug }) });
    if (response.ok) { const data = await response.json(); setFavorite(Boolean(data.favorited)); }
    setLoading(false);
  }

  return <button type="button" onClick={toggle} disabled={loading} aria-label={favorite ? "Remove from saved tools" : "Save this tool"} title={favorite ? "Remove from saved tools" : "Save tool"} className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-semibold hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-60">
    {favorite ? <BookmarkCheck size={17} /> : <Bookmark size={17} />} {favorite ? "Saved" : "Save tool"}
  </button>;
}
