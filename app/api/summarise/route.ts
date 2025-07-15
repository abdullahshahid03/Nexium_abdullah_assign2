import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { connectMongo, Blog } from "@/lib/mongodb";
import { supabase } from "@/lib/supabase";



// Simulated summary (static logic)
function simulateSummary(text: string): string {
  if (text.toLowerCase().includes("technology")) 
    return "This blog provides insights into modern technology trends and innovations.";
  if (text.toLowerCase().includes("health")) 
    return "This blog discusses health tips and wellness strategies.";
  if (text.toLowerCase().includes("sports")) 
    return "This blog is highlighting recent sports events and athlete performances.";
  return "This blog covers a veriety of useful topics and discussions including technology, health, and education.";
}


function translateToUrdu(summary: string): string {
  const phrasesDict: Record<string, string> = {
    "This blog provides insights into modern technology trends and innovations.": 
      "یہ بلاگ جدید ٹیکنالوجی کے رجحانات اور اختراعات پر روشنی ڈالتا ہے۔",

    "This blog covers essential health tips and wellness strategies to maintain a healthy lifestyle.":
      "یہ بلاگ صحت مند طرزِ زندگی کے لیے اہم مشورے اور تندرستی کے طریقے بیان کرتا ہے۔",

    "This blog highlights the latest sports events, news, and athlete achievements around the world.":
      "یہ بلاگ دنیا بھر میں تازہ ترین کھیلوں کے مقابلے، خبریں اور کھلاڑیوں کی کامیابیوں پر روشنی ڈالتا ہے۔",

    "This blog explores various useful topics including technology, health, sports, and education.":
      "یہ بلاگ ٹیکنالوجی، صحت، کھیلوں اور تعلیم سمیت مختلف مفید موضوعات کو بیان کرتا ہے۔"
  };

  return phrasesDict[summary] || "یہ بلاگ مختلف موضوعات پر مشتمل ہے۔";
}

type BlogEntry = {
  url: string;
  text: string;
  summary: string;
};

 // Save to MongoDB and Supabase
 async function saveToDB({ url, text, summary }: BlogEntry) {
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
