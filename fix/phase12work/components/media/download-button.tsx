"use client";

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function DownloadButton({ blob, filename }: { blob: Blob | null; filename: string }) {
  if (!blob) return null;
  return <button type="button" onClick={() => downloadBlob(blob, filename)} className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700">Download</button>;
}
