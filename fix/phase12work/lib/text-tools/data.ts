export type TextToolDefinition = {
  slug: string;
  name: string;
  category: "Text Tools";
  description: string;
};

export const textTools: TextToolDefinition[] = [
  { slug: "word-counter", name: "Word Counter", category: "Text Tools", description: "Count words, characters, sentences and paragraphs instantly." },
  { slug: "character-counter", name: "Character Counter", category: "Text Tools", description: "Count characters with and without spaces." },
  { slug: "case-converter", name: "Case Converter", category: "Text Tools", description: "Convert text to upper, lower, title or sentence case." },
  { slug: "remove-duplicate-lines", name: "Remove Duplicate Lines", category: "Text Tools", description: "Remove repeated lines while keeping the first occurrence." },
  { slug: "text-sorter", name: "Text Sorter", category: "Text Tools", description: "Sort lines alphabetically or numerically." },
  { slug: "slug-generator", name: "Slug Generator", category: "Text Tools", description: "Create clean URL-friendly slugs from any text." },
  { slug: "text-reverser", name: "Text Reverser", category: "Text Tools", description: "Reverse characters or the order of lines." },
];

export const getTextTool = (slug: string) => textTools.find((tool) => tool.slug === slug);
