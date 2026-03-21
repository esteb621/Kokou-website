"use client";

import "./edit.css";
import { useState, useCallback, useEffect } from "react";
import type { Article } from "@/lib/types";
import { useRouter } from "next/navigation";
import { PlusIcon, RefreshCcw, Settings, TrashIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── List View ────────────────────────────────────────────────────────────────

export default function ListPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/articles");
      const data = await res.json();
      if (res.ok) setArticles(data);
      else setError(data.error || "Failed to load articles");
    } catch {
      setError("Could not reach the server");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleDelete = async (slug: string) => {
    try {
      const res = await fetch(`/api/articles/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete article");
      setDeleteConfirm(null);
      toast.success("Article deleted!");
      await fetchArticles();
    } catch (err: unknown) {
      toast.error("Failed to delete article: " + err);
    }
  };

  const published = articles.filter((a) => a.posted);
  const drafts = articles.filter((a) => !a.posted);

  return (
    <div className="list-view">
      <div className="list-header">
        <div>
          <h1 className="list-title pl-8">Admin Panel</h1>
          <p className="list-subtitle">
            {published.length} published · {drafts.length} draft
            {drafts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="list-actions">
          <button
            onClick={fetchArticles}
            className="btn-secondary flex items-center gap-2"
            disabled={loading}
          >
            <RefreshCcw className={loading ? "animate-spin" : ""} size={14} />
            Refresh
          </button>
          <button
            onClick={() => router.push("/new")}
            className="btn-primary flex items-center gap-2"
          >
            <PlusIcon size={14} /> New post
          </button>
          <button
            onClick={() => router.push("/config")}
            className="btn-secondary flex items-center gap-2"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {error && <div className="alert-error">{error}</div>}

      {articles.length === 0 && !loading && (
        <div className="empty-state">
          <p>No articles yet. Create the first one!</p>
        </div>
      )}

      {loading && (
        <>
          <Skeleton className="w-full h-24 bg-gray-300 rounded-lg" />
          <Skeleton className="w-full h-24 bg-gray-300 rounded-lg" />
          <Skeleton className="w-full h-24 bg-gray-300 rounded-lg" />
        </>
      )}

      {articles.length > 0 && !loading && (
        <div className="articles-list">
          {articles.map((article) => (
            <div key={article.id} className="article-row">
              <div className="article-info">
                <div className="article-row-top">
                  <span
                    className={`badge ${article.posted ? "badge-published" : "badge-draft"}`}
                  >
                    {article.posted ? "Published" : "Draft"}
                  </span>
                  <span className="article-date">
                    {article.created_at ? formatDate(article.created_at) : "—"}
                  </span>
                </div>
                <h3 className="article-title">
                  {article.title || <em>Untitled</em>}
                </h3>
                <code className="article-slug">/blog/{article.slug}</code>
              </div>
              <div className="article-btns">
                <button
                  onClick={() => router.push(`/${article.slug}`)}
                  className="btn-edit"
                >
                  Edit
                </button>
                {deleteConfirm === article.slug ? (
                  <div className="delete-confirm">
                    <span>Delete?</span>
                    <button
                      onClick={() => handleDelete(article.slug || "")}
                      className="btn-confirm-delete"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="btn-cancel"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(article.slug || "")}
                    className="btn-delete"
                  >
                    <TrashIcon size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
