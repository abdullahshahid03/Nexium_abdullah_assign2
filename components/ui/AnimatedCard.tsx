"use client";

import { motion } from "framer-motion";

interface AnimatedCardProps {
  title: string;
  content: string;
  color?: "blue" | "green";
}

export default function AnimatedCard({
  title,
  content,
  color = "blue",
}: AnimatedCardProps) {
  const borderColor =
    color === "green" ? "border-green-500 bg-green-50" : "border-blue-500 bg-blue-50";
  const titleColor = color === "green" ? "text-green-800" : "text-blue-800";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`p-4 border-l-4 ${borderColor} rounded-md shadow`}
    >
      <h2 className={`font-semibold ${titleColor} mb-2`}>{title}</h2>
      <p className="text-gray-800">{content}</p>
    </motion.div>
  );
}
