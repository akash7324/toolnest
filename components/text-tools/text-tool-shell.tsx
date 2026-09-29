"use client";

import { useMemo, useState } from "react";
import { Copy, RotateCcw } from "lucide-react";
import type { TextToolDefinition } from "@/lib/text-tools/data";

const titleCase = (value: string) => value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
const sentenceCase = (value: string) => value.toLowerCase().replace(/(^|[.!?]\s+)\w/g, (char) => char.toUpperCase());
const slugify = (value: string) => value.trim().toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s-]/g, "").replace(/[_\s-]+/g, "-").replace(/^-+|-+$/g, "");

export function TextToolShell({ tool }: { tool: TextToolDefinition }) {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [caseMode, setCaseMode] = useState("upper");
  const [sortMode, setSortMode] = useState("az");
  const [reverseMode, setReverseMode] = useState("characters");

  const output = useMemo(() => {
    switch (tool.slug) {
      case "word-counter":
      case "character-counter":
        return text;
      case "case-converter":
        if (caseMode === "lower") return text.toLowerCase();
        if (caseMode === "title") return titleCase(text);
        if (caseMode === "sentence") return sentenceCase(text);
        return text.toUpperCase();
      case "remove-duplicate-lines": {
        const seen = new Set<string>();
        return text.split(/\r?\n/).filter((line) => {
          if (seen.has(line)) return false;
          seen.add(line);
          return true;
        }).join("\n");
      }
      case "text-sorter": {
        const lines = text.split(/\r?\n/).filter(Boolean);
        return lines.sort((a, b) => sortMode === "za" ? b.localeCompare(a, undefined, { numeric: true }) : a.localeCompare(b, undefined, { numeric: true })).join("\n");
      }
      case "slug-generator":
        return slugify(text);
      case "text-reverser":
        return reverseMode === "lines" ? text.split(/\r?\n/).reverse().join("\n") : Array.from(text).reverse().join("");
      default:
        return text;
    }
  }, [text, tool.slug, caseMode, sortMode, reverseMode]);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.trim() ? (text.match(/[.!?]+(?=\s|$)/g) || []).length : 0;
  const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).length : 0;

  async function copyOutput() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  function reset() {
    setText("");
    setCopied(false);
  }

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm sm:p-8">
      {(tool.slug === "case-converter" || tool.slug === "text-sorter" || tool.slug === "text-reverser") && (
        <div className="mb-5 flex flex-wrap gap-2">
          {tool.slug === "case-converter" && ["upper", "lower", "title", "sentence"].map((mode) => <button key={mode} type="button" onClick={() => setCaseMode(mode)} className={`rounded-xl px-4 py-2 text-sm font-semibold ${caseMode === mode ? "bg-indigo-600 text-white" : "border border-[var(--border)]"}`}>{mode}</button>)}
          {tool.slug === "text-sorter" && ["az", "za"].map((mode) => <button key={mode} type="button" onClick={() => setSortMode(mode)} className={`rounded-xl px-4 py-2 text-sm font-semibold ${sortMode === mode ? "bg-indigo-600 text-white" : "border border-[var(--border)]"}`}>{mode === "az" ? "A → Z" : "Z → A"}</button>)}
          {tool.slug === "text-reverser" && ["characters", "lines"].map((mode) => <button key={mode} type="button" onClick={() => setReverseMode(mode)} className={`rounded-xl px-4 py-2 text-sm font-semibold ${reverseMode === mode ? "bg-indigo-600 text-white" : "border border-[var(--border)]"}`}>{mode === "characters" ? "Characters" : "Lines"}</button>)}
        </div>
      )}
      <label className="block text-sm font-semibold" htmlFor="toolnest-text-input">Your text</label>
      <textarea id="toolnest-text-input" value={text} onChange={(event) => setText(event.target.value)} placeholder="Type or paste your text here..." className="mt-2 min-h-64 w-full resize-y rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-4 leading-7 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" />
      {tool.slug === "word-counter" || tool.slug === "character-counter" ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[['Words', words], ['Characters', characters], ['No spaces', charactersNoSpaces], ['Sentences', sentences], ['Paragraphs', paragraphs]].slice(0, tool.slug === "word-counter" ? 5 : 2).map(([label, value]) => <div key={String(label)} className="rounded-2xl border border-[var(--border)] p-4"><p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{label}</p><p className="mt-1 text-2xl font-black">{value}</p></div>)}
        </div>
      ) : (
        <div className="mt-5">
          <label className="block text-sm font-semibold" htmlFor="toolnest-text-output">Result</label>
          <textarea id="toolnest-text-output" readOnly value={output} className="mt-2 min-h-48 w-full resize-y rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-4 leading-7" />
        </div>
      )}
      <div className="mt-5 flex flex-wrap gap-3">
        {tool.slug !== "word-counter" && tool.slug !== "character-counter" && <button type="button" onClick={copyOutput} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white"><Copy size={16} /> {copied ? "Copied" : "Copy result"}</button>}
        <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-semibold"><RotateCcw size={16} /> Reset</button>
      </div>
    </div>
  );
}
