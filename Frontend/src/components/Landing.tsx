import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Nav */}
      <nav className="landing-nav">
        <span className="landing-nav-logo">KnightRate</span>
        <div className="landing-nav-actions">
          <button className="nav-login-link" onClick={() => navigate("/login")}>Log in</button>
          <button className="nav-join-btn" onClick={() => navigate("/register")}>Get started</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-eyebrow">✦ UCF Professor Rating Platform</div>
          <h1 className="hero-title">
            Find the right<br />
            <span className="hero-title-accent">professors & courses</span><br />
            at UCF.
          </h1>
          <p className="hero-sub">
            Our composite scoring algorithm combines 10+ metrics from RateMyProfessor,
            SPI Surveys, and more — distilled into one clear number.
          </p>
          <div className="hero-actions">
            <button className="hero-cta" onClick={() => navigate("/register")}>
              Get started free
            </button>
            <button className="hero-secondary" onClick={() => navigate("/how-it-works")}>
              How it works
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <h2 className="how-title">Built on real data</h2>
        <p className="how-sub">
          We aggregate data from multiple sources to calculate a unique, trustworthy professor rating.
        </p>
        <div className="how-sources">
          <div className="how-source-chip">
            <span className="how-source-icon">⭐</span>
            <span>RateMyProfessor</span>
          </div>
          <div className="how-source-chip">
            <span className="how-source-icon">📋</span>
            <span>SPI Surveys</span>
          </div>
          <div className="how-source-chip">
            <span className="how-source-icon">🎓</span>
            <span>UCF Grade Data</span>
          </div>
          <div className="how-source-chip">
            <span className="how-source-icon">💼</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </section>
    </div>
  );
}
