import type { Metadata } from "next";
import { HomeContent } from "@/components/home-content";

export const metadata: Metadata = {
  title: "Free Online Tools for Everyday Tasks",
  description: "Use free online calculators, text tools, image tools, PDF utilities and productivity tools with ToolNest.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <HomeContent />;
}
