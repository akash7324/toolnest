import { connectToDatabase } from "@/lib/mongodb";
import Favorite from "@/models/favorite";
import ToolUsage from "@/models/tool-usage";
import { getTool } from "@/lib/tools/catalog";

export async function getFavoriteTools(userId: string) {
  await connectToDatabase();
  const favorites = await Favorite.find({ userId }).sort({ createdAt: -1 }).lean();
  return favorites.map((favorite) => getTool(favorite.toolSlug)).filter(Boolean);
}

export async function getRecentHistory(userId: string, limit = 20) {
  await connectToDatabase();
  const history = await ToolUsage.find({ userId, event: "opened" }).sort({ createdAt: -1 }).limit(limit).lean();
  return history.map((entry) => ({
    id: entry._id.toString(),
    toolSlug: entry.toolSlug,
    tool: getTool(entry.toolSlug),
    createdAt: entry.createdAt,
  })).filter((entry) => entry.tool);
}

export async function getUsageSummary(userId: string) {
  await connectToDatabase();
  const [opened, completed, uniqueTools] = await Promise.all([
    ToolUsage.countDocuments({ userId, event: "opened" }),
    ToolUsage.countDocuments({ userId, event: "completed" }),
    ToolUsage.distinct("toolSlug", { userId }),
  ]);
  return { opened, completed, uniqueTools: uniqueTools.length };
}
