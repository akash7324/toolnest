"use client";

import { useEffect, useState } from "react";
import { DownloadButton } from "./download-button";
import { CompletedTracker } from "@/components/dashboard/usage-tracker";
import { FileDrop, MAX_IMAGE_SIZE, validSize } from "./file-drop";

function useImage(file: File | null) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => { if (!file) { setUrl(null); return; } const u = URL.createObjectURL(file); setUrl(u); return () => URL.revokeObjectURL(u); }, [file]);
  return url;
}

async function loadImage(file: File) {
  const url = URL.createObjectURL(file);
  try { const img = new Image(); img.src = url; await img.decode(); return img; } finally { URL.revokeObjectURL(url); }
}

async function canvasBlob(file: File, width: number, height: number, type: string, quality?: number) {
  const img = await loadImage(file);
  const canvas = document.createElement("canvas"); canvas.width = Math.max(1, Math.round(width)); canvas.height = Math.max(1, Math.round(height));
  const ctx = canvas.getContext("2d"); if (!ctx) throw new Error("Canvas is not supported by this browser.");
  if (type === "image/jpeg") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return new Promise<Blob>((resolve, reject) => canvas.toBlob((b) => b ? resolve(b) : reject(new Error("Could not create image.")), type, quality));
}

function ImageToolLayout({ children, description }: { children: React.ReactNode; description: string }) { return <div className="space-y-5"><p className="text-sm text-[var(--muted)]">{description} Maximum input size: 20 MB.</p>{children}</div>; }

export function ImageResizer() {
  const [file, setFile] = useState<File | null>(null); const [width, setWidth] = useState(1200); const [height, setHeight] = useState(800); const [blob, setBlob] = useState<Blob | null>(null); const [error, setError] = useState("");
  const url = useImage(file);
  const select = async (files: File[]) => { const f=files[0]; if (!f) return; if (!f.type.startsWith("image/") || !validSize(f,MAX_IMAGE_SIZE)) { setError("Please select a supported image under 20 MB."); return; } setError(""); setFile(f); const img=await loadImage(f); setWidth(img.width); setHeight(img.height); setBlob(null); };
  return <ImageToolLayout description="Set a target width and height, then create a resized image locally."><CompletedTracker toolSlug="image-resizer" enabled={blob !== null}/><FileDrop accept="image/jpeg,image/png,image/webp" onFiles={select}/>{file && <><p className="text-sm">Selected: <b>{file.name}</b></p><div className="grid gap-4 sm:grid-cols-2"><label>Width (px)<input className="mt-2 w-full rounded-xl border p-3 bg-[var(--background)]" type="number" min="1" value={width} onChange={e=>setWidth(Number(e.target.value))}/></label><label>Height (px)<input className="mt-2 w-full rounded-xl border p-3 bg-[var(--background)]" type="number" min="1" value={height} onChange={e=>setHeight(Number(e.target.value))}/></label></div><button type="button" className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white" onClick={async()=>setBlob(await canvasBlob(file,width,height,file.type || "image/png"))}>Resize image</button><DownloadButton blob={blob} filename={`toolnest-resized-${file.name}`}/></>}{url && <img src={url} alt="Selected preview" className="max-h-72 rounded-xl border object-contain"/>}{error&&<p className="text-sm text-red-600">{error}</p>}</ImageToolLayout>;
}

export function ImageCompressor() {
  const [file,setFile]=useState<File|null>(null); const [quality,setQuality]=useState(0.7); const [blob,setBlob]=useState<Blob|null>(null); const [error,setError]=useState("");
  const select=(files:File[])=>{const f=files[0];if(!f)return;if(!f.type.startsWith("image/")||!validSize(f,MAX_IMAGE_SIZE)){setError("Please select a supported image under 20 MB.");return;}setError("");setFile(f);setBlob(null);};
  return <ImageToolLayout description="JPEG/WebP output can reduce file size. PNG files are converted to WebP for stronger compression."><CompletedTracker toolSlug="image-compressor" enabled={blob !== null}/><FileDrop accept="image/jpeg,image/png,image/webp" onFiles={select}/>{file&&<><p className="text-sm">Original: <b>{(file.size/1024).toFixed(1)} KB</b></p><label className="block text-sm font-semibold">Quality: {Math.round(quality*100)}%<input className="mt-3 w-full" type="range" min="0.2" max="0.95" step="0.05" value={quality} onChange={e=>setQuality(Number(e.target.value))}/></label><button type="button" className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white" onClick={async()=>{const img=await loadImage(file);setBlob(await canvasBlob(file,img.width,img.height,file.type==="image/jpeg"?"image/jpeg":"image/webp",quality));}}>Compress image</button><DownloadButton blob={blob} filename={`toolnest-compressed-${file.name.replace(/\.[^.]+$/,".")}${file.type==="image/jpeg"?"jpg":"webp"}`}/>{blob&&<p className="text-sm text-[var(--muted)]">Output: {(blob.size/1024).toFixed(1)} KB</p>}</>}{error&&<p className="text-sm text-red-600">{error}</p>}</ImageToolLayout>;
}

export function ImageConverter({ to }: { to: "png" | "jpg" }) { const [file,setFile]=useState<File|null>(null);const [blob,setBlob]=useState<Blob|null>(null); const type=to==="png"?"image/png":"image/jpeg";return <ImageToolLayout description={`Convert an image to ${to.toUpperCase()} without uploading it.`}><CompletedTracker toolSlug={to === "png" ? "jpg-to-png" : "png-to-jpg"} enabled={blob !== null}/><FileDrop accept={to==="png"?"image/jpeg":"image/png"} onFiles={files=>{const f=files[0];if(f&&validSize(f,MAX_IMAGE_SIZE)){setFile(f);setBlob(null);}}}/>{file&&<button type="button" className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white" onClick={async()=>{const img=await loadImage(file);setBlob(await canvasBlob(file,img.width,img.height,type,0.92));}}>Convert to {to.toUpperCase()}</button>}<DownloadButton blob={blob} filename={`toolnest-converted.${to}`}/></ImageToolLayout>; }

export function ImageCropper() { const [file,setFile]=useState<File|null>(null);const [blob,setBlob]=useState<Blob|null>(null);const [crop,setCrop]=useState({x:0,y:0,w:500,h:500});const [size,setSize]=useState({w:0,h:0});return <ImageToolLayout description="Enter crop coordinates and dimensions, then download the cropped image."><CompletedTracker toolSlug="image-cropper" enabled={blob !== null}/><FileDrop accept="image/jpeg,image/png,image/webp" onFiles={async fs=>{const f=fs[0];if(!f||!validSize(f,MAX_IMAGE_SIZE))return;const img=await loadImage(f);setFile(f);setSize({w:img.width,h:img.height});setCrop({x:0,y:0,w:Math.min(500,img.width),h:Math.min(500,img.height)});setBlob(null);}}/>{file&&<><p className="text-sm">Image: {size.w} × {size.h}px</p><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{(["x","y","w","h"] as const).map(k=><label key={k} className="text-sm font-semibold">{k.toUpperCase()}<input className="mt-1 w-full rounded-xl border p-3 bg-[var(--background)]" type="number" min="0" value={crop[k]} onChange={e=>setCrop(c=>({...c,[k]:Number(e.target.value)}))}/></label>)}</div><button type="button" className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white" onClick={async()=>{const img=await loadImage(file);const canvas=document.createElement("canvas");canvas.width=Math.min(crop.w,size.w-crop.x);canvas.height=Math.min(crop.h,size.h-crop.y);const ctx=canvas.getContext("2d");if(!ctx)return;ctx.drawImage(img,crop.x,crop.y,canvas.width,canvas.height,0,0,canvas.width,canvas.height);canvas.toBlob(b=>setBlob(b),"image/png");}}>Crop image</button><DownloadButton blob={blob} filename="toolnest-cropped.png"/></>}</ImageToolLayout>; }
