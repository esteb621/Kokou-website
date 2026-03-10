"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./login.css";

// ─── Auth Screen ──────────────────────────────────────────────────────────────

function AuthScreen({
  onLogin,
  email,
  setEmail,
  password,
  setPassword,
  error,
  loading,
}: {
  onLogin: (e: React.FormEvent) => void;
  email: string;
  setEmail: (v: string) => void;
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
        <p className="auth-subtitle">Welcome back Kokou!</p>
        <form onSubmit={onLogin} className="auth-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="auth-input"
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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/edit");
      } else {
        setAuthError(data.error || "Login fail");
      }
    } catch {
      setAuthError("Network error");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthScreen
      onLogin={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={authError}
      loading={authLoading}
    />
  );
}
