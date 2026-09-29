"use client";

import { useRef } from "react";

export function FileDrop({ accept, multiple = false, onFiles }: { accept: string; multiple?: boolean; onFiles: (files: File[]) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--background)] p-8 text-center">
      <input ref={ref} className="hidden" type="file" accept={accept} multiple={multiple} onChange={(e) => onFiles(Array.from(e.target.files || []))} />
      <p className="font-semibold">Choose {multiple ? "files" : "a file"}</p>
      <p className="mt-2 text-sm text-[var(--muted)]">Processing happens in your browser. Files are not uploaded by ToolNest.</p>
      <button type="button" onClick={() => ref.current?.click()} className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700">Select file{multiple ? "s" : ""}</button>
    </div>
  );
}

export const MAX_IMAGE_SIZE = 20 * 1024 * 1024;
export const MAX_PDF_SIZE = 50 * 1024 * 1024;
export function validSize(file: File, max: number) { return file.size <= max; }
