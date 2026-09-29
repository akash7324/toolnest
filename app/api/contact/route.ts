import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import ContactMessage from "@/models/contact-message";
import { rateLimit } from "@/lib/security/rate-limit";
const schema=z.object({name:z.string().trim().min(2).max(100),email:z.string().trim().email().max(160),subject:z.string().trim().min(3).max(180),message:z.string().trim().min(10).max(5000)});
export async function POST(request:Request){
const ip=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"; const limit=rateLimit(`contact:${ip}`,5,15*60*1000); if(!limit.allowed)return NextResponse.json({error:"Too many messages. Please try again later."},{status:429,headers:{"Retry-After":String(limit.retryAfter)}});const parsed=schema.safeParse(await request.json().catch(()=>null));if(!parsed.success)return NextResponse.json({error:"Please check the form fields."},{status:400});try{await connectToDatabase();await ContactMessage.create(parsed.data);return NextResponse.json({ok:true},{status:201})}catch{return NextResponse.json({error:"Unable to send your message right now."},{status:500})}}
