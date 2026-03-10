"use client";

import "../edit.css";
import { SetStateAction, useState } from "react";
import type { Article } from "@/lib/supabase";
import { createClient } from "@/utils/supabase/client";
const supabase = createClient();
import { Input } from "@/components/ui/input";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Send, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import { EditorView } from "@/components/EditorView";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// ─── New Article Page ─────────────────────────────────────────────────────────

export default function NewArticlePage() {
  const router = useRouter();

  const [form, setForm] = useState<Article>({
    title: "",
    slug: "",
    content: "",
    cover: null,
    created_at: new Date().toISOString().slice(0, 10),
  });
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ── Helpers ───────────────────────────────────────────────────────────────

  const handleTitleChange = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: slugify(title),
    }));
  };

  const uploadToSupabase = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File size must be less than 5MB");
    }
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(fileName);

    return publicUrl;
  };

  // ── Save ──────────────────────────────────────────────────────────────────

  const handleSave = async (asDraft?: boolean) => {
    if (!form.title.trim() || !form.slug.trim()) {
      setError("Title and slug are required.");
      return;
    }
    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      ...form,
      posted: asDraft ? false : true,
      created_at: form.created_at
        ? form.created_at.slice(0, 10)
        : new Date().toISOString().slice(0, 10),
    };

    try {
      if (fileToUpload) {
        const publicUrl = await uploadToSupabase(fileToUpload);
        payload.cover = publicUrl;
      }

      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");

      setSuccess(asDraft ? "Saved as draft!" : "Article created!");
      setTimeout(() => router.push("/edit"), 1200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <EditorView
      form={form}
      title="Create a new article"
      setForm={setForm}
      onTitleChange={handleTitleChange}
      onSave={() => handleSave()}
      onSaveAsDraft={() => handleSave(true)}
      onBack={() => router.push("/edit")}
      saving={saving}
      error={error}
      success={success}
      fileToUpload={fileToUpload}
      setFileToUpload={setFileToUpload}
    />
  );
}
