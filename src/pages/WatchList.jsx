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

function WatchList() {
  const { watchlist, clearWatchlist, removeFromWatchlist } = useMovieContext();
  const { toasts, addToast, removeToast } = useToast();
  const [sortBy, setSortBy] = useState("added");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAndSorted = [...watchlist]
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

  if (watchlist.length === 0) {
    return (
      <div className="watchlist-empty">
        <div className="empty-icon">🎯</div>
        <h2>Your Watchlist is Empty</h2>
        <p>Browse movies and add them to your watchlist to watch later!</p>
      </div>
    );
  }

  return (
    <div className="watchlist-page page-fade-in">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className="watchlist-header">
        <div>
          <h1>My Watchlist</h1>
          <p className="watchlist-count">{watchlist.length} movie{watchlist.length !== 1 ? "s" : ""}</p>
        </div>
        {/* <button
          className="clear-btn"
          onClick={() => {
            clearWatchlist();
            addToast("Watchlist cleared", "info");
          }}
        >
          🗑 Clear All
        </button> */}
      </div>

      <div className="watchlist-controls">
        <input
          type="text"
          placeholder="Search watchlist..."
          className="watchlist-search"
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
        <p className="no-results">No movies match your search.</p>
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

export default WatchList;
