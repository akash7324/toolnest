"use client";

import { useEffect, useState } from "react";

type Post = { _id: string; title: string; slug: string; excerpt: string; content: string; category: string; tags: string[]; featuredImage: string; seoTitle: string; seoDescription: string; published: boolean };
const empty = { title: "", slug: "", excerpt: "", content: "", category: "Guides", tags: "", featuredImage: "", seoTitle: "", seoDescription: "", published: false };

export function BlogManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() { setLoading(true); const response = await fetch("/api/blog", { cache: "no-store" }); const data = await response.json(); if (response.ok) setPosts(data); else setMessage(data.error || "Unable to load posts."); setLoading(false); }
  useEffect(() => { void load(); }, []);

  function update(key: keyof typeof empty, value: string | boolean) { setForm((current) => ({ ...current, [key]: value })); }
  function edit(post: Post) { setEditingId(post._id); setForm({ ...post, tags: post.tags.join(", ") }); setMessage(""); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function reset() { setEditingId(null); setForm(empty); }

  async function save(event: React.FormEvent) {
    event.preventDefault(); setMessage("Saving...");
    const payload = { ...form, tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean) };
    const response = await fetch(editingId ? `/api/blog/${editingId}` : "/api/blog", { method: editingId ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await response.json();
    if (!response.ok) { setMessage(data.error || "Unable to save post."); return; }
    setMessage(editingId ? "Post updated." : "Post created."); reset(); await load();
  }

  async function remove(id: string) { if (!window.confirm("Delete this post? This cannot be undone.")) return; const response = await fetch(`/api/blog/${id}`, { method: "DELETE" }); const data = await response.json(); setMessage(response.ok ? "Post deleted." : data.error || "Unable to delete post."); if (response.ok) await load(); }

  return <div>
    <form onSubmit={save} className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4"><div><h2 className="text-xl font-bold">{editingId ? "Edit article" : "Create article"}</h2><p className="mt-1 text-sm text-[var(--muted)]">Content is stored as plain text paragraphs for a safe, dependency-light CMS.</p></div>{editingId && <button type="button" onClick={reset} className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-semibold">Cancel</button>}</div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {([["title","Title"],["slug","Slug"],["category","Category"],["featuredImage","Featured image URL"],["seoTitle","SEO title"],["seoDescription","SEO description"]] as const).map(([key,label]) => <label key={key} className={key === "seoDescription" ? "sm:col-span-2" : ""}><span className="text-sm font-semibold">{label}</span><input value={form[key]} onChange={(e) => update(key,e.target.value)} className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2.5 outline-none focus:border-indigo-500" /></label>)}
        <label className="sm:col-span-2"><span className="text-sm font-semibold">Excerpt</span><textarea value={form.excerpt} onChange={(e) => update("excerpt",e.target.value)} rows={3} className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2.5 outline-none focus:border-indigo-500" /></label>
        <label className="sm:col-span-2"><span className="text-sm font-semibold">Content</span><textarea value={form.content} onChange={(e) => update("content",e.target.value)} rows={12} className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2.5 font-mono text-sm leading-6 outline-none focus:border-indigo-500" placeholder="Separate paragraphs with a blank line." /></label>
        <label className="sm:col-span-2"><span className="text-sm font-semibold">Tags</span><input value={form.tags} onChange={(e) => update("tags",e.target.value)} placeholder="calculator, productivity, guide" className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2.5 outline-none focus:border-indigo-500" /></label>
        <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={form.published} onChange={(e) => update("published",e.target.checked)} /> Publish article</label>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3"><button type="submit" className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700">{editingId ? "Update post" : "Create post"}</button>{message && <span className="text-sm text-[var(--muted)]">{message}</span>}</div>
    </form>

    <section className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">Articles</h2><span className="text-sm text-[var(--muted)]">{posts.length} total</span></div>{loading ? <p className="mt-5 text-sm text-[var(--muted)]">Loading...</p> : posts.length ? <div className="mt-5 space-y-3">{posts.map((post) => <div key={post._id} className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold">{post.title}</h3><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${post.published ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>{post.published ? "Published" : "Draft"}</span></div><p className="mt-1 text-sm text-[var(--muted)]">/{post.slug}</p></div><div className="flex gap-2"><button type="button" onClick={() => edit(post)} className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-semibold">Edit</button><button type="button" onClick={() => remove(post._id)} className="rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-600">Delete</button></div></div>)}</div> : <p className="mt-5 text-sm text-[var(--muted)]">No articles yet.</p>}</section>
  </div>;
}
