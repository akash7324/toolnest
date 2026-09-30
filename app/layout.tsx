import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AdSenseScript } from "@/components/ads/adsense-script";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "ToolNest — Free Online Tools", template: "%s | ToolNest" },
  description: siteConfig.description,
  applicationName: "ToolNest",
  keywords: ["online tools", "free tools", "calculator", "text tools", "image tools", "PDF tools"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "ToolNest — All Your Essential Tools. In One Place.",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "ToolNest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolNest",
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AdSenseScript />

        <Providers>
          <Navbar />
          {children}
        </Providers>

        <Footer />
      </body>
    </html>
  );
}
