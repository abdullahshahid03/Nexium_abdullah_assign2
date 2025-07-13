import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { connectMongo, Blog } from "@/lib/mongodb";
import { supabase } from "@/lib/supabase";

// Urdu dictionary (expand as needed)
const urduDict: Record<string, string> = {
  "this": "یہ",
  "blog": "بلاگ",
  "is": "ہے",
  "about": "کے بارے میں",
  "technology": "ٹیکنالوجی",
  "health": "صحت",
  "education": "تعلیم",
  "sports": "کھیل",
  "discusses": "ذکر کرتا ہے",
  "various": "مختلف",
  "topics": "موضوعات"
};

// Simulated summary (static logic)
function simulateSummary(text: string): string {
  if (text.toLowerCase().includes("technology")) return "This blog is about technology.";
  if (text.toLowerCase().includes("health")) return "This blog is about health.";
  if (text.toLowerCase().includes("sports")) return "This blog is about sports.";
  return "This blog discusses various topics.";
}

// Improved Urdu translator
function translateToUrdu(summary: string): string {
  return summary
    .replace(/[.,!?]/g, "") // Remove punctuation
    .split(" ")
    .map((word) => urduDict[word.toLowerCase()] || word)
    .join(" ");
}

 // Save to MongoDB and Supabase
 async function saveToDB({ url, text, summary }: any) {
   await connectMongo();
   await Blog.create({ url, text, summary });
   await supabase.from("summaries").insert([{ url, summary }]);
 }


// Main route handler
export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    const html = await fetch(url).then((res) => res.text());
    const $ = cheerio.load(html);
    const text = $("p").text();

    const summary = simulateSummary(text);
    const urdu = translateToUrdu(summary);

    await saveToDB({ url, text, summary });

    return NextResponse.json({ summary, urdu });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to summarise." }, { status: 500 });
  }
}
