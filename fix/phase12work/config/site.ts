export const siteConfig = {
  name: "ToolNest",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  description:
    "Free online tools for calculations, text, images, PDFs, productivity and everyday tasks.",
  tagline: "All Your Essential Tools. In One Place.",
};

export const categories = [
  { name: "Calculators", slug: "calculators", icon: "Calculator", description: "Fast answers for everyday calculations." },
  { name: "Text Tools", slug: "text-tools", icon: "Type", description: "Clean, transform and analyze text." },
  { name: "Image Tools", slug: "image-tools", icon: "Image", description: "Resize, compress and convert images." },
  { name: "PDF Tools", slug: "pdf-tools", icon: "FileText", description: "Simple PDF utilities in your browser." },
  { name: "Productivity", slug: "productivity", icon: "Zap", description: "Small utilities that save time." },
  { name: "Students", slug: "students", icon: "GraduationCap", description: "Helpful tools for study and assignments." },
];

export const placeholderTools = [
  { name: "Age Calculator", slug: "age-calculator", category: "Calculators", description: "Calculate age from a date of birth.", icon: "CalendarDays", popular: true },
  { name: "EMI Calculator", slug: "emi-calculator", category: "Calculators", description: "Estimate monthly loan payments.", icon: "IndianRupee", popular: true },
  { name: "GST Calculator", slug: "gst-calculator", category: "Calculators", description: "Add or remove GST from an amount.", icon: "ReceiptIndianRupee", popular: true },
  { name: "Percentage Calculator", slug: "percentage-calculator", category: "Calculators", description: "Solve common percentage problems.", icon: "Percent", popular: true },
  { name: "Word Counter", slug: "word-counter", category: "Text Tools", description: "Count words, characters and more.", icon: "FileText", popular: true },
  { name: "Case Converter", slug: "case-converter", category: "Text Tools", description: "Convert text between common cases.", icon: "CaseSensitive", popular: false },
  { name: "Image Resizer", slug: "image-resizer", category: "Image Tools", description: "Resize images quickly in your browser.", icon: "Scaling", popular: true },
  { name: "JPG to PDF", slug: "jpg-to-pdf", category: "PDF Tools", description: "Turn images into PDF files.", icon: "FileImage", popular: false },
];
