import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const email = localStorage.getItem("email") || "—";

  return (
    <div className="settings-page">
      <Navbar />
      <div className="settings-body">
        <h1 className="settings-heading">Settings</h1>

        <div className="settings-section">
          <div className="settings-section-title">Account</div>
          <div className="settings-field">
            <span className="settings-label">Email</span>
            <span className="settings-value">{email}</span>
          </div>
          <div className="settings-field">
            <span className="settings-label">Password</span>
            <span className="settings-value">••••••••</span>
          </div>
        </div>

        <button className="signout-btn" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
}
