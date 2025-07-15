"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter();

  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">
            Quik<span className="text-blue-600">Sum</span>
          </span>
        </Link>

        <Button
          variant="outline"
          className="rounded-xl px-5"
          onClick={() => router.push("/")}
        >
          Get Started
        </Button>
      </div>
    </header>
  );
}
