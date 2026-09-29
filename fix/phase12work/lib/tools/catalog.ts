import { calculators } from "@/lib/calculators/data";
import { mediaTools } from "@/lib/media/data";
import { textTools } from "@/lib/text-tools/data";

export type ToolCatalogItem = {
  slug: string;
  name: string;
  category: string;
  description: string;
};

const calculatorTools: ToolCatalogItem[] = calculators.map(({ slug, name, category, description }) => ({ slug, name, category, description }));
const mediaCatalog: ToolCatalogItem[] = mediaTools.map(({ slug, name, category, description }) => ({ slug, name, category, description }));
const textCatalog: ToolCatalogItem[] = textTools.map(({ slug, name, category, description }) => ({ slug, name, category, description }));

export const toolCatalog: ToolCatalogItem[] = [...calculatorTools, ...textCatalog, ...mediaCatalog];

export const getTool = (slug: string) => toolCatalog.find((tool) => tool.slug === slug);
