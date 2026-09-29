"use client";

import { getMediaTool } from "@/lib/media/data";
import { ImageCompressor, ImageConverter, ImageCropper, ImageResizer } from "./image-tools";
import { JpgToPdf, PdfCompressor, PdfMerge, PdfSplit } from "./pdf-tools";

export function MediaToolShell({ slug }: { slug: string }) {
  switch (slug) {
    case "image-resizer": return <ImageResizer />;
    case "image-compressor": return <ImageCompressor />;
    case "jpg-to-png": return <ImageConverter to="png" />;
    case "png-to-jpg": return <ImageConverter to="jpg" />;
    case "image-cropper": return <ImageCropper />;
    case "jpg-to-pdf": return <JpgToPdf />;
    case "pdf-merge": return <PdfMerge />;
    case "pdf-split": return <PdfSplit />;
    case "pdf-compressor": return <PdfCompressor />;
    default: return <p className="text-sm text-[var(--muted)]">This tool is not available.</p>;
  }
}

export function isMediaTool(slug: string) { return Boolean(getMediaTool(slug)); }
