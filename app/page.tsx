"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [urdu, setUrdu] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/summarise", {
      method: "POST",
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    setSummary(data.summary);
    setUrdu(data.urdu);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex justify-center pt-10 p-6">
      <div className="max-w-xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700">📚 Blog Summariser</h1>

        <Card className="p-6 shadow-xl border border-blue-100 rounded-2xl bg-white">
          <CardContent className="space-y-4">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste blog URL here..."
              className="text-base"
            />
            <Button onClick={handleSubmit} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
              {loading ? (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              ) : (
                "Summarise Blog"
              )}
            </Button>
          </CardContent>
        </Card>

        {summary && (
          <Card className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-md">
            <h2 className="font-semibold text-blue-800">English Summary:</h2>
            <p className="text-sm text-gray-800">{summary}</p>
          </Card>
        )}

        {urdu && (
          <Card className="p-4 border-l-4 border-green-500 bg-green-50 rounded-md">
            <h2 className="font-semibold text-green-800">اردو خلاصہ:</h2>
            <p className="text-sm text-gray-800">{urdu}</p>
          </Card>
        )}
      </div>
    </main>
  );
}
