"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton({path}: {path: string}) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`${path}`)}
      className="btn-secondary flex items-center gap-2"
    >
      <ArrowLeft size={15} />
      <span>Back</span>
    </button>
  );
}
