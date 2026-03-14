"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/blog")}
      className="flex items-center bg-accent font-semibold text-white hover:bg-[#632c3c] p-2 rounded-lg gap-2 text-sm transition-colors mb-4 mt-2"
    >
      <ArrowLeft size={16} />
      <span>Back to posts</span>
    </button>
  );
}
