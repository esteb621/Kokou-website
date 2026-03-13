"use client";

import "../edit.css";
import { useState, useCallback, useEffect } from "react";
import type { Article } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
const supabase = createClient();
import { Input } from "@/components/ui/input";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { processArticleImages } from "@/lib/tiptap-utils";
import { Send, SquarePen, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { EditorView } from "@/components/EditorView";

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const articleSlug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState<Article>({
    title: "",
    slug: "",
    content: "",
    cover: null,
    posted: undefined,
    created_at: new Date().toISOString().slice(0, 10),
  });
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [originalContent, setOriginalContent] = useState("");

  // ── Data ──────────────────────────────────────────────────────────────────

  const fetchArticle = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/articles/${articleSlug}`);
      const data = await res.json();
      if (res.ok) {
        setForm({
          id: data.id,
          title: data.title,
          slug: data.slug,
          content: data.content,
          cover: data.cover,
          posted: data.posted,
          created_at: data.created_at
            ? data.created_at.slice(0, 10)
            : new Date().toISOString().slice(0, 10),
        });
        setOriginalContent(data.content);
      } else {
        setError(data.error || "Failed to load article");
      }
    } catch {
      setError("Could not reach the server");
    } finally {
      setLoading(false);
    }
  }, [articleSlug]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  // ── Helpers ───────────────────────────────────────────────────────────────

  const handleTitleChange = (title: string) => {
    setForm((f) => ({ ...f, title }));
  };

  const uploadToSupabase = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File size must be less than 5MB");
    }
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(filePath);

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

    try {
      // Process images inside article first, passing originalContent so removed images are cleanly deleted
      const processedContent = await processArticleImages(
        form.content,
        originalContent,
        articleSlug
      );

      const payload = {
        ...form,
        content: processedContent,
        posted: asDraft ? false : true,
      created_at: form.created_at
        ? form.created_at.slice(0, 10)
        : new Date().toISOString().slice(0, 10),
    };

      if (fileToUpload) {
        const publicUrl = await uploadToSupabase(fileToUpload);
        payload.cover = publicUrl;
      }

      const res = await fetch(`/api/articles/${articleSlug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");

      setSuccess(asDraft ? "Saved as draft!" : "Article updated!");
      setTimeout(() => router.push("/edit"), 1200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/articles/${articleSlug}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete article");
      router.push("/edit");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  if (loading) {
    return (
      <div className="edit-page">
        <div className="empty-state">
          <p>Loading article…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-page">
      <EditorView
        title="Edit article"
        form={form}
        setForm={setForm}
        onTitleChange={handleTitleChange}
        onSave={() => handleSave()}
        onSaveAsDraft={() => handleSave(true)}
        onBack={() => router.push("/edit")}
        onDelete={handleDelete}
        saving={saving}
        error={error}
        success={success}
        fileToUpload={fileToUpload}
        setFileToUpload={setFileToUpload}
      />
    </div>
  );
}

