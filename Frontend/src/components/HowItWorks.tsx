import Navbar from "./Navbar";
import "./HowItWorks.css";
import unicornImg from "../assets/unicorn.png";
import mastermindImg from "../assets/brain.png";
import saboteurImg from "../assets/bomb.png"; 
import npcImg from "../assets/bot.png";

const archetypes = [
  {
    name: "The Unicorn",
    img: unicornImg,
    desc: "The rarest professor — high scores across the board, easy grader, and beloved by students. GPA savior, top tier teaching, zero stress.",
  },
  {
    name: "The Mastermind",
    img: mastermindImg,
    desc: "Highly knowledgeable and engaging, but expects a lot from students. Challenging but ultimately rewarding.",
  },
  {
    name: "The Sabetuer",
    img: saboteurImg,
    desc: "Poor teaching quality paired with harsh grading. Students often feel set up to fail. Proceed with caution.",
  },
  {
    name: "The NPC",
    img: npcImg,
    desc: "Average in every metric — not particularly good or bad. You get what you put in.",
  },
];

export default function HowItWorks() {
  return (
    <div className="hiw-page">
      <Navbar />
      <div className="hiw-body">
        <h1 className="hiw-heading">How It Works</h1>
        <p className="hiw-sub">Understanding how KnightRate scores and classifies your professors.</p>

        {/* Score types */}
        <div className="hiw-scores">
          {[
            { label: "Retake Score:", desc: "How likely students are to take this professor again based on RMP and survey data." },
            { label: "Quality Score:", desc: "Overall teaching quality derived from RateMyProfessor ratings and SPI survey responses." },
            { label: "Difficulty Score:", desc: "How demanding the professor's coursework is relative to the UCF average." },
          ].map(({ label, desc }) => (
            <div key={label} className="hiw-score-row">
              <span className="hiw-score-label">{label}</span>
              <span className="hiw-score-desc">{desc}</span>
            </div>
          ))}
        </div>

        <div className="hiw-divider" />

        {/* Archetypes */}
        {archetypes.map(a => (
          <div key={a.name} className="hiw-archetype">
            <h2 className="archetype-name">{a.name}</h2>
            <div className="archetype-row">
              <div className="hiw-icon">
                <img 
                  src={a.img} 
                  alt={a.name} 
                  style={{ width: "70px", height: "70px", objectFit: "contain" }} 
                />
              </div>
              <p className="archetype-desc">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
