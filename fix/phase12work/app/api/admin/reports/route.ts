import { NextResponse } from "next/server";
import { requireAdminResponse } from "@/lib/admin/route";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import ToolUsage from "@/models/tool-usage";
import Favorite from "@/models/favorite";
import BlogPost from "@/models/blog-post";
import ContactMessage from "@/models/contact-message";
import Subscription from "@/models/subscription";
export async function GET() {
  const { response } = await requireAdminResponse(); if (response) return response; await connectToDatabase();
  const [users, activeUsers, opens, completions, favorites, posts, publishedPosts, messages, subscriptions, topTools] = await Promise.all([
    User.countDocuments(), User.countDocuments({ isActive: true }), ToolUsage.countDocuments({ event: "opened" }), ToolUsage.countDocuments({ event: "completed" }), Favorite.countDocuments(), BlogPost.countDocuments(), BlogPost.countDocuments({ published: true }), ContactMessage.countDocuments({ status: "new" }), Subscription.countDocuments({ plan: "pro", status: "active" }),
    ToolUsage.aggregate([{ $group: { _id: "$toolSlug", opens: { $sum: { $cond: [{ $eq: ["$event", "opened"] }, 1, 0] } }, completions: { $sum: { $cond: [{ $eq: ["$event", "completed"] }, 1, 0] } } } }, { $sort: { opens: -1 } }, { $limit: 10 }]),
  ]);
  return NextResponse.json({ totals: { users, activeUsers, opens, completions, favorites, posts, publishedPosts, newMessages: messages, proSubscriptions: subscriptions }, topTools });
}
