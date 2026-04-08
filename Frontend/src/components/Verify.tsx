import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

export default function Verify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("No verification token found.");
      return;
    }

    api.get(`/auth/verify?token=${token}`)
      .then((res) => {
        setStatus("success");
        setMessage(res.data.msg || "Your email has been successfully verified.");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.response?.data?.msg || "Verification link is invalid or has expired.");
      });
  }, [searchParams]);

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <h1 className="auth-title">
          {status === "loading" && "Verifying..."}
          {status === "success" && "Success!"}
          {status === "error" && "Verification Failed"}
        </h1>
        
        <p className="auth-sub" style={{ marginBottom: "2rem" }}>
          {status === "loading" ? "Please wait while we confirm your account." : message}
        </p>

        {status !== "loading" && (
          <button className="auth-btn" onClick={() => navigate("/login")}>
            Go to Login
          </button>
        )}

        {status === "loading" && (
          /* Simple CSS spinner  */
          <div className="loading-placeholder" style={{ color: "rgba(255,255,255,0.5)" }}>
            Checking token...
          </div>
        )}
      </div>
    </div>
  );
}