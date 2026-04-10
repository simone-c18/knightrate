import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Search.css";

type SearchType = "professor" | "course";
type FilterType = "name" | "course";

export default function Search() {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<SearchType>("professor");
  const [filter, setFilter] = useState<FilterType>("name");
  const [query, setQuery] = useState("");

  const isProfessor = searchType === "professor";

  const handleTypeChange = (type: SearchType) => {
    setSearchType(type);
    setFilter("name");
    setQuery("");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search-results?type=${searchType}&filter=${filter}&q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="search-page">
      <Navbar />

      <div className="search-body">
        <h1 className="search-heading">
          {isProfessor ? "Find a professor" : "Find a course"}
        </h1>
        <p className="search-subheading">
          {isProfessor
            ? "Search by name and see scores, archetypes, and tags"
            : "Search by course name or code"}
        </p>

        {/* Toggle */}
        <div className="search-type-toggle">
          <button
            className={`type-btn ${isProfessor ? "active" : ""}`}
            onClick={() => handleTypeChange("professor")}
          >
            Professors
          </button>
          <button
            className={`type-btn ${!isProfessor ? "active" : ""}`}
            onClick={() => handleTypeChange("course")}
          >
            Courses
          </button>
        </div>

        {/* Radio filters */}
        <div className="search-filters">
          <label className="radio-label">
            <input
              type="radio"
              name="filter"
              checked={filter === "name"}
              onChange={() => setFilter("name")}
            />
            By name
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="filter"
              checked={filter === "course"}
              onChange={() => setFilter("course")}
            />
            By course
          </label>
        </div>

        {/* Search input */}
        <form onSubmit={handleSearch}>
          <div className="search-input-wrap">
            <span className="search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              className="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isProfessor ? "Search professors..." : "Search courses..."}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
