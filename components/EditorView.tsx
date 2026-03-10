import { Article } from "@/lib/supabase";
import { Send, SquarePen, Trash } from "lucide-react";
import { Input } from "./ui/input";
import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";

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

export function EditorView({
  title,
  form,
  setForm,
  onTitleChange,
  onSave,
  onSaveAsDraft,
  onBack,
  saving,
  error,
  success,
  fileToUpload,
  onDelete,
  setFileToUpload,
}: {
  title: string;
  form: Article;
  setForm: React.Dispatch<React.SetStateAction<Article>>;
  onTitleChange: (title: string) => void;
  onSave: () => void;
  onSaveAsDraft: () => void;
  onBack: () => void;
  saving: boolean;
  error: string;
  success: string;
  fileToUpload: File | null;
  setFileToUpload: (f: File | null) => void;
  onDelete?: () => void;
}) {
  return (
    <div className="editor-view">
      <div className="editor-header">
        <button onClick={onBack} className="btn-back">
          ← Back
        </button>
        <h2 className="editor-title">{title}</h2>
        <div className="editor-header-actions">
          {onDelete && (
            <button
              onClick={onDelete}
              className="btn-delete flex items-center gap-2"
              disabled={saving}
            >
              <Trash size={15} />
              {saving ? "Deleting…" : "Delete"}
            </button>
          )}

          {!form.posted && (
            <button
              onClick={onSaveAsDraft}
              className="btn-secondary flex items-center gap-2"
              disabled={saving}
            >
              <SquarePen size={15} />
              {saving ? "…" : "Save as Draft"}
            </button>
          )}

          <button
            onClick={onSave}
            className="btn-primary flex items-center gap-2"
            disabled={saving}
          >
            <Send size={15} />
            {saving ? "Saving…" : form.posted ? "Save" : "Publish"}
          </button>
        </div>
      </div>

      {error && <div className="alert-error">{error}</div>}
      {success && <div className="alert-success">{success}</div>}

      <div>
        {/* Colonne principale */}
        <div className="editor-main">
          <div className="field">
            <label className="field-label">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => {
                onTitleChange(e.target.value);
              }}
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
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFileToUpload(file);
                }}
              />
            </div>
            {(fileToUpload || form.cover) && (
              <div className="cover-preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    fileToUpload
                      ? URL.createObjectURL(fileToUpload)
                      : form.cover!
                  }
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
            <SimpleEditor
              value={form.content}
              onChange={(html) => setForm((f) => ({ ...f, content: html }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
