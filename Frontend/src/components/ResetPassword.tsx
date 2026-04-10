import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Login.css";
import { resetPassword } from "../services/api";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = searchParams.get("token");
    if (!t) {
      setError("Missing reset token. Please request a new reset link.");
    } else {
      setToken(t);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token!, password);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.msg || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {success ? (
          <div style={{ textAlign: "center" }}>
            <h1 className="auth-title">Password Reset!</h1>
            <p className="auth-sub" style={{ marginBottom: "2rem" }}>
              Your password has been updated. You can now log in with your new password.
            </p>
            <button className="auth-btn" onClick={() => navigate("/login")}>
              Go to Login
            </button>
          </div>
        ) : (
          <>
            <h1 className="auth-title">Set New Password</h1>
            <p className="auth-sub">Enter a new password for your account.</p>

            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label className="auth-label">New Password</label>
                <input
                  className="auth-input"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={!token}
                />
              </div>

              <div className="auth-field">
                <label className="auth-label">Confirm Password</label>
                <input
                  className="auth-input"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  disabled={!token}
                />
              </div>

              {error && <p className="auth-error">{error}</p>}

              <button className="auth-btn" type="submit" disabled={loading || !token}>
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                <button
                  type="button"
                  className="auth-link-small"
                  onClick={() => navigate("/login")}
                >
                  Back to login
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}