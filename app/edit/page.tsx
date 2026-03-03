"use client";

import "./edit.css";
import { useState, useCallback, useRef } from "react";
import type { Article } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { ArticleEditor } from "@/components/tiptap-templates/simple/article-editor";

// ─── Types ────────────────────────────────────────────────────────────────────

const EMPTY_FORM: Article = {
  id: "",
  title: "",
  slug: "",
  content: "",
  cover: null,
  posted: false,
  created_at: new Date().toISOString().slice(0, 10),
};

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

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function EditPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [view, setView] = useState<"list" | "edit" | "new">("list");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [form, setForm] = useState<Article>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const passwordRef = useRef(password);
  passwordRef.current = password;

  // ── Auth ──────────────────────────────────────────────────────────────────

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    // Vérification via l'API
    const res = await fetch("/api/articles", {
      headers: { "x-edit-password": password },
    });
    setAuthLoading(false);
    if (res.ok) {
      setAuthed(true);
      const data = await res.json();
      setArticles(data);
    } else {
      setAuthError("Incorrect password.");
    }
  };

  // ── Data ──────────────────────────────────────────────────────────────────

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/articles", {
        headers: { "x-edit-password": passwordRef.current },
      });
      const data = await res.json();
      if (res.ok) setArticles(data);
      else setError(data.error || "Failed to load articles");
    } catch {
      setError("Could not reach the server");
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Form helpers ──────────────────────────────────────────────────────────

  const openNew = () => {
    setSelectedArticle(null);
    setForm(EMPTY_FORM);
    setView("new");
    setError("");
    setSuccess("");
  };

  const openEdit = (article: Article) => {
    setSelectedArticle(article);
    setForm({
      id: article.id,
      title: article.title,
      slug: article.slug,
      content: article.content,
      cover: article.cover,
      posted: article.posted,
      created_at: article.created_at
        ? article.created_at.slice(0, 10)
        : new Date().toISOString().slice(0, 10),
    });
    setView("edit");
    setError("");
    setSuccess("");
  };

  const backToList = () => {
    setView("list");
    setSelectedArticle(null);
    setError("");
    setSuccess("");
  };

  const handleTitreChange = (titre: string) => {
    setForm((f) => ({
      ...f,
      titre,
      slug: view === "new" ? slugify(titre) : f.slug,
    }));
  };

  // ── Save ──────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim()) {
      setError("Title and slug are required.");
      return;
    }
    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      ...form,
      created_at: form.created_at
        ? form.created_at.slice(0, 10)
        : new Date().toISOString().slice(0, 10),
    };

    try {
      let res: Response;
      if (view === "edit" && selectedArticle) {
        res = await fetch(`/api/articles/${selectedArticle.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-edit-password": password,
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/articles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-edit-password": password,
          },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");

      setSuccess(view === "edit" ? "Article updated!" : "Article created!");
      await fetchArticles();
      setTimeout(() => backToList(), 1200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
        headers: { "x-edit-password": password },
      });
      if (!res.ok) throw new Error("Failed to delete article");
      setDeleteConfirm(null);
      await fetchArticles();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  if (!authed) {
    return (
      <AuthScreen
        onLogin={handleLogin}
        password={password}
        setPassword={setPassword}
        error={authError}
        loading={authLoading}
      />
    );
  }

  return (
    <div className="edit-page">
      {view === "list" && (
        <ListView
          articles={articles}
          loading={loading}
          error={error}
          onNew={openNew}
          onEdit={openEdit}
          onDelete={(id) => setDeleteConfirm(id)}
          deleteConfirm={deleteConfirm}
          onDeleteConfirm={handleDelete}
          onDeleteCancel={() => setDeleteConfirm(null)}
          onRefresh={fetchArticles}
        />
      )}
      {(view === "edit" || view === "new") && (
        <EditorView
          isNew={view === "new"}
          form={form}
          setForm={setForm}
          onTitreChange={handleTitreChange}
          onSave={handleSave}
          onBack={backToList}
          saving={saving}
          error={error}
          success={success}
        />
      )}
    </div>
  );
}

// ─── Auth Screen ──────────────────────────────────────────────────────────────

function AuthScreen({
  onLogin,
  password,
  setPassword,
  error,
  loading,
}: {
  onLogin: (e: React.FormEvent) => void;
  password: string;
  setPassword: (v: string) => void;
  error: string;
  loading: boolean;
}) {
  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-icon">✏️</div>
        <h1 className="auth-title">Edit zone</h1>
        <p className="auth-subtitle">Enter the password to continue</p>
        <form onSubmit={onLogin} className="auth-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="auth-input"
            autoFocus
          />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Checking…" : "Access"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── List View ────────────────────────────────────────────────────────────────

function ListView({
  articles,
  loading,
  error,
  onNew,
  onEdit,
  onDelete,
  deleteConfirm,
  onDeleteConfirm,
  onDeleteCancel,
  onRefresh,
}: {
  articles: Article[];
  loading: boolean;
  error: string;
  onNew: () => void;
  onEdit: (a: Article) => void;
  onDelete: (id: string) => void;
  deleteConfirm: string | null;
  onDeleteConfirm: (id: string) => void;
  onDeleteCancel: () => void;
  onRefresh: () => void;
}) {
  const published = articles.filter((a) => a.posted);
  const drafts = articles.filter((a) => !a.posted);

  return (
    <div className="list-view">
      <div className="list-header">
        <div>
          <h1 className="list-title">Articles</h1>
          <p className="list-subtitle">
            {published.length} published · {drafts.length} draft
            {drafts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="list-actions">
          <button
            onClick={onRefresh}
            className="btn-secondary"
            disabled={loading}
          >
            {loading ? "…" : "⟳ Refresh"}
          </button>
          <button onClick={onNew} className="btn-primary">
            + New
          </button>
        </div>
      </div>

      {error && <div className="alert-error">{error}</div>}

      {articles.length === 0 && !loading && (
        <div className="empty-state">
          <p>No articles yet. Create the first one!</p>
        </div>
      )}

      {articles.length > 0 && (
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
                <button onClick={() => onEdit(article)} className="btn-edit">
                  Edit
                </button>
                {deleteConfirm === article.id ? (
                  <div className="delete-confirm">
                    <span>Delete?</span>
                    <button
                      onClick={() => onDeleteConfirm(article.id)}
                      className="btn-confirm-delete"
                    >
                      Yes
                    </button>
                    <button onClick={onDeleteCancel} className="btn-cancel">
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onDelete(article.id)}
                    className="btn-delete"
                  >
                    🗑
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

// ─── Editor View ──────────────────────────────────────────────────────────────

function EditorView({
  isNew,
  form,
  setForm,
  onTitreChange,
  onSave,
  onBack,
  saving,
  error,
  success,
}: {
  isNew: boolean;
  form: Article;
  setForm: React.Dispatch<React.SetStateAction<Article>>;
  onTitreChange: (titre: string) => void;
  onSave: () => void;
  onBack: () => void;
  saving: boolean;
  error: string;
  success: string;
}) {
  return (
    <div className="editor-view">
      <div className="editor-header">
        <button onClick={onBack} className="btn-back">
          ← Back
        </button>
        <h2 className="editor-title">
          {isNew ? "New article" : "Edit article"}
        </h2>
        <button onClick={onSave} className="btn-primary" disabled={saving}>
          {saving ? "Saving…" : "💾 Save"}
        </button>
      </div>

      {error && <div className="alert-error">{error}</div>}
      {success && <div className="alert-success">{success}</div>}

      <div className="editor-grid">
        {/* Colonne principale */}
        <div className="editor-main">
          <div className="field">
            <label className="field-label">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => onTitreChange(e.target.value)}
              className="field-input"
              placeholder="Article title"
            />
          </div>
          <div className="sidebar-card">
            <h3 className="sidebar-title">Cover</h3>
            <div className="field">
              <label className="field-label">Image file</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm((f) => ({ ...f, cover: e.target.value }))
                }
              />
            </div>
            {form.cover && (
              <div className="cover-preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={URL.createObjectURL(form.cover)}
                  alt="Cover preview"
                  className="cover-img"
                />
              </div>
            )}
          </div>

          <div className="field">
            <label className="field-label">Slug</label>
            <div className="slug-wrapper">
              <span className="slug-prefix">/blog/</span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) =>
                  setForm((f) => ({ ...f, slug: slugify(e.target.value) }))
                }
                className="field-input slug-input"
                placeholder="my-article"
              />
            </div>
          </div>

          <div className="field field-grow">
            <label className="field-label">Content</label>
            <ArticleEditor
              value={form.content}
              onChange={(html) => setForm((f) => ({ ...f, content: html }))}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="editor-sidebar">
          <div className="sidebar-card">
            <h3 className="sidebar-title">Publishing</h3>

            <div className="field">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={form.publie}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, publie: e.target.checked }))
                  }
                  className="toggle-checkbox"
                />
                <span
                  className={`toggle-text ${form.publie ? "toggle-on" : "toggle-off"}`}
                >
                  {form.publie ? "✅ Published" : "📝 Draft"}
                </span>
              </label>
            </div>

            <div className="field">
              <label className="field-label">Publish date</label>
              <input
                type="date"
                value={form.publie_le}
                onChange={(e) =>
                  setForm((f) => ({ ...f, publie_le: e.target.value }))
                }
                className="field-input"
              />
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
