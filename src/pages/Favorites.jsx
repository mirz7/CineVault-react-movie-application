import { useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import useToast from "../hooks/useToast";
import ToastContainer from "../components/Toast";
import "../css/Favorites.css";

const SORT_OPTIONS = [
  { value: "added", label: "Date Added" },
  { value: "title", label: "Title A-Z" },
  { value: "rating", label: "Rating" },
  { value: "year", label: "Year" },
];

function Favorites() {
  const { favorites, removeFromFavorites } = useMovieContext();
  const { toasts, addToast, removeToast } = useToast();
  const [sortBy, setSortBy] = useState("added");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAndSorted = [...favorites]
    .filter((m) =>
      m.title?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "rating") return (b.vote_average || 0) - (a.vote_average || 0);
      if (sortBy === "year")
        return (b.release_date || "").localeCompare(a.release_date || "");
      return 0;
    });

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <div className="empty-icon">❤️</div>
        <h2>No Favorites Yet</h2>
        <p>Start adding movies to your favorites and they will appear here!</p>
      </div>
    );
  }

  return (
    <div className="favorites-page page-fade-in">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className="favorites-header">
        <div>
          <h1>My Favorites</h1>
          <p className="favorites-count">
            {favorites.length} movie{favorites.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="favorites-controls">
        <input
          type="text"
          placeholder="Search favorites..."
          className="favorites-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="sort-controls">
          <span>Sort by:</span>
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`sort-btn ${sortBy === opt.value ? "active" : ""}`}
              onClick={() => setSortBy(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {filteredAndSorted.length === 0 ? (
        <p className="no-results-text">No movies match your search.</p>
      ) : (
        <div className="movies-grid">
          {filteredAndSorted.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onToast={addToast} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
