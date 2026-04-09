import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Starred.css";
import { getStarredProfessors, unstarProfessor } from "../services/api";
import unicornImg from "../assets/unicorn.png";
import mastermindImg from "../assets/brain.png";
import saboteurImg from "../assets/bomb.png";
import npcImg from "../assets/bot.png";

interface Professor {
  _id: string;
  firstName: string;
  lastName: string;
  overallScore: number;
  archetype: string;
  retakeScore: number;
  qualityScore: number;
  difficultyScore: number;
  lastTimeTaught: string;
  isPolarizing: boolean;
  rmpTags: string[];
}

const ARCHETYPE_IMG: Record<string, string> = {
  "The Unicorn":    unicornImg,
  "The Mastermind": mastermindImg,
  "The NPC":        npcImg,
  "The Saboteur":   saboteurImg,
};

const ARCHETYPE_DESC: Record<string, string> = {
  "The Unicorn":    "GPA savior, top tier teaching, zero stress.",
  "The Mastermind": "Challenging but rewarding. High quality instruction.",
  "The NPC":        "Gets the job done. Nothing more, nothing less.",
  "The Saboteur":   "Proceed with caution. High risk, high stress.",
};

const TAG_COLORS: Record<string, string> = {
  "Fair Grader":  "#7c3aed",
  "Extra Credit": "#0ea5e9",
  "Tough Grader": "#dc2626",
  "Helpful":      "#16a34a",
};

const UCF_AVG = 34.2;

export default function Starred() {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchStarred = async () => {
      try {
        const data = await getStarredProfessors();
        setProfessors(data);
        if (data.length > 0) setExpandedId(data[0]._id);
      } catch (err: any) {
        setError("Failed to load starred professors. Are you logged in?");
      } finally {
        setLoading(false);
      }
    };
    fetchStarred();
  }, []);

  const handleUnstar = async (id: string) => {
    try {
      await unstarProfessor(id);
      setProfessors(prev => prev.filter(p => p._id !== id));
      if (expandedId === id) setExpandedId(null);
    } catch (err) {
      console.error("Unstar failed:", err);
    }
  };

  return (
    <div className="starred-page">
      <Navbar />
      <div className="starred-body">
        <h1 className="starred-heading">Starred Professors</h1>

        {loading && <p className="starred-status">Loading...</p>}
        {error   && <p className="starred-status error">{error}</p>}
        {!loading && !error && professors.length === 0 && (
          <p className="starred-status">No starred professors yet. Star a professor from the search page!</p>
        )}

        <div className="starred-list">
          {professors.map(prof => {
            const fullName = `${prof.firstName} ${prof.lastName}`;
            const isExpanded = expandedId === prof._id;

            return (
              <div key={prof._id}>
                {isExpanded ? (
                  <div className="prof-card expanded">
                    <div className="prof-card-top">

                      <div className="prof-archetype-col">
                        <span className="archetype-label">{prof.archetype}</span>
                        <div className="archetype-icon">
                          <img
                            src={ARCHETYPE_IMG[prof.archetype]}
                            alt={prof.archetype}
                            style={{ width: "60px", height: "60px", objectFit: "contain" }}
                          />
                        </div>
                        <p className="archetype-desc">{ARCHETYPE_DESC[prof.archetype]}</p>
                        <p className="prof-meta"><strong>Last Time Taught:</strong> {prof.lastTimeTaught}</p>
                        <p className="prof-meta"><strong>Polarizing →</strong> {prof.isPolarizing ? "Yes" : "No"}</p>
                      </div>

                      <div className="prof-scores-col">
                        <div className="prof-name-row">
                          <span className="prof-name">{fullName}</span>
                          <button
                            className="star-btn starred"
                            onClick={() => handleUnstar(prof._id)}
                            title="Unstar professor"
                          >★</button>
                        </div>

                        <div className="legend-row">
                          <span className="legend-dot ucf" />
                          <span className="legend-text">UCF Average</span>
                          <span className="legend-dot prof" />
                          <span className="legend-text">{fullName}</span>
                        </div>

                        {[
                          { label: "Retake Score:",     val: prof.retakeScore },
                          { label: "Quality Score:",    val: prof.qualityScore },
                          { label: "Difficulty Score:", val: prof.difficultyScore },
                          { label: "Overall Score:",    val: prof.overallScore },
                        ].map(({ label, val }) => (
                          <div key={label} className="score-row">
                            <span className="score-row-label">{label}</span>
                            <div className="score-track">
                              <div className="score-line" />
                              <div className="ucf-bar" style={{ left: `${UCF_AVG}%` }} />
                              <div className="prof-bar" style={{ left: `${val}%` }} />
                            </div>
                            <div className="score-vals">
                              <span className="score-val-ucf">{UCF_AVG}</span>
                              <span className="score-val-prof">{val}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="prof-tags">
                      {prof.rmpTags.map((tag, i) => (
                        <span key={i} className="tag" style={{ background: TAG_COLORS[tag] || "#555" }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="collapse-btn" onClick={() => setExpandedId(null)}>
                      ▲ Collapse
                    </button>
                  </div>
                ) : (
                  <div className="prof-card collapsed" onClick={() => setExpandedId(prof._id)}>
                    <div className="collapsed-left">
                      <div className="collapsed-avatar" />
                      <span className="collapsed-name">{fullName}</span>
                    </div>
                    <span className="collapsed-score">{prof.overallScore}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}