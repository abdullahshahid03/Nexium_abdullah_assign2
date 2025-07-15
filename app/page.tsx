"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ChevronDown, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [urdu, setUrdu] = useState("");
  const [loading, setLoading] = useState(false);
  const [showUrdu, setShowUrdu] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setSummary("");
    setUrdu("");
    setShowUrdu(false);

    const res = await fetch("/api/summarise", {
      method: "POST",
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    setSummary(data.summary);
    setUrdu(data.urdu);
    setLoading(false);
  };

  const handleReset = () => {
    setUrl("");
    setSummary("");
    setUrdu("");
    setShowUrdu(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex justify-center pt-10 p-6">
      <div className="max-w-xl w-full space-y-6">

        {/* Header */}
        <motion.h1
          className="text-3xl font-bold text-center text-blue-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          📚 QuikSum: Blog Summariser
        </motion.h1>

        {/* Input Card */}
        {!summary && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-6 shadow-xl border border-blue-200 rounded-2xl bg-white">
              <CardContent className="space-y-4">
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste blog URL here..."
                  className="text-base"
                />

                <motion.div whileTap={{ scale: 0.97 }}>
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin w-4 h-4 mr-2" />
                        Generating Summary...
                      </>
                    ) : (
                      "Summarise Blog"
                    )}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* English Summary */}
        {summary && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-md">
              <h2 className="font-semibold text-blue-800">English Summary:</h2>
              <p className="text-sm text-gray-800">{summary}</p>
            </Card>
          </motion.div>
        )}

        {/* Urdu Toggle Button */}
        {urdu && !loading && summary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={() => setShowUrdu(!showUrdu)}
              variant="outline"
              className="w-full flex justify-center items-center gap-2 bg-green-50 border-green-300 text-green-800 hover:bg-green-100"
            >
              {showUrdu ? "Hide Urdu Translation" : "Show Urdu Translation"}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showUrdu ? "rotate-180" : ""
                }`}
              />
            </Button>
          </motion.div>
        )}

        {/* Urdu Summary */}
        {showUrdu && urdu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-4 border-l-4 border-green-500 bg-green-50 rounded-md">
              <h2 className="font-semibold text-green-800">اردو خلاصہ:</h2>
              <p className="text-sm text-gray-800">{urdu}</p>
            </Card>
          </motion.div>
        )}

        {/* Reset Button */}
        {summary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={handleReset}
              variant="secondary"
              className="w-full mt-4 flex justify-center items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              <RotateCcw className="w-4 h-4" />
              Start New Summary
            </Button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
