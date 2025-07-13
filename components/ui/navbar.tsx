"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Title */}
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">
            Quik<span className="text-blue-600">Sum</span>
          </span>
        </Link>

        {/* Right Side Button */}
        <Button variant="outline" className="rounded-xl px-5">
          Get Started
        </Button>
      </div>
    </header>
  );
}
