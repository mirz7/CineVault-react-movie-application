import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import useToast from "../hooks/useToast";
import ToastContainer from "../components/Toast";
import { getTrendingMovies } from "../services/api";
import "../css/Home.css";

function Trending() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    setLoading(true);
    getTrendingMovies()
      .then((data) => {
        setMovies(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load trending movies. Please check your API key.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home" style={{ paddingTop: "2rem" }}>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div className="section-header">
        <h2 className="section-title">🔥 Trending Today</h2>
        {movies.length > 0 && (
          <span className="movies-count">{movies.length} movies</span>
        )}
      </div>

      {error && (
        <div className="error-message">
          <p>⚠️ {error}</p>
          <p style={{ fontSize: "0.85em", marginTop: "0.5rem" }}>
            Make sure you have added your TMDB API key in <strong>src/services/api.js</strong>!
          </p>
        </div>
      )}

      {loading ? (
        <div className="loading-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      ) : movies.length === 0 && !error ? (
        <div className="no-results">
          <span>🎬</span>
          <p>No trending movies found.</p>
        </div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onToast={addToast} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Trending;
