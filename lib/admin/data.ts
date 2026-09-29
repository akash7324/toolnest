import { connectToDatabase } from "@/lib/mongodb";
import { toolCatalog } from "@/lib/tools/catalog";
import Category from "@/models/category";
import Tool from "@/models/tool";

export async function ensureCatalogSeeded() {
  await connectToDatabase();
  const categoryCount = await Category.countDocuments();
  if (categoryCount === 0) {
    const categories = Array.from(new Set(toolCatalog.map((tool) => tool.category))).map((name, index) => ({
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      description: `${name} tools for common everyday tasks.`,
      icon: "Folder",
      sortOrder: index,
    }));
    await Category.insertMany(categories, { ordered: false }).catch(() => undefined);
  }

  const toolCount = await Tool.countDocuments();
  if (toolCount === 0) {
    await Tool.insertMany(
      toolCatalog.map((tool, index) => ({ ...tool, icon: "Wrench", popular: index < 10, sortOrder: index, enabled: true })),
      { ordered: false },
    ).catch(() => undefined);
  }
}
