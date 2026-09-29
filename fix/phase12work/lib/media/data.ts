export type MediaToolDefinition = {
  slug: string;
  name: string;
  category: "Image Tools" | "PDF Tools";
  description: string;
  accepted: string;
};

export const mediaTools: MediaToolDefinition[] = [
  { slug: "image-resizer", name: "Image Resizer", category: "Image Tools", description: "Resize JPG, PNG and WebP images directly in your browser.", accepted: "JPG, PNG, WebP" },
  { slug: "image-compressor", name: "Image Compressor", category: "Image Tools", description: "Compress common images locally without uploading them to a server.", accepted: "JPG, PNG, WebP" },
  { slug: "jpg-to-png", name: "JPG to PNG", category: "Image Tools", description: "Convert JPG images to PNG format in your browser.", accepted: "JPG, JPEG" },
  { slug: "png-to-jpg", name: "PNG to JPG", category: "Image Tools", description: "Convert PNG images to JPG format in your browser.", accepted: "PNG" },
  { slug: "image-cropper", name: "Image Cropper", category: "Image Tools", description: "Crop an image to a custom rectangle and download the result.", accepted: "JPG, PNG, WebP" },
  { slug: "jpg-to-pdf", name: "JPG to PDF", category: "PDF Tools", description: "Turn one or more JPG, PNG or WebP images into a PDF locally.", accepted: "JPG, PNG, WebP" },
  { slug: "pdf-merge", name: "PDF Merge", category: "PDF Tools", description: "Merge multiple PDF files into one PDF in your browser.", accepted: "PDF" },
  { slug: "pdf-split", name: "PDF Split", category: "PDF Tools", description: "Extract selected pages from a PDF into a new PDF.", accepted: "PDF" },
  { slug: "pdf-compressor", name: "PDF Compressor", category: "PDF Tools", description: "Optimize a PDF by rebuilding it with compact object streams locally.", accepted: "PDF" },
];

export const getMediaTool = (slug: string) => mediaTools.find((tool) => tool.slug === slug);
