import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, getMovieVideos, getSimilarMovies } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import useToast from "../hooks/useToast";
import ToastContainer from "../components/Toast";
import "../css/MovieDetail.css";
import "../css/Notes.css";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [noteText, setNoteText] = useState("");

  const {
    isFavorite, addToFavorites, removeFromFavorites,
    isInWatchlist, addToWatchlist, removeFromWatchlist,
    getNote, saveNote,
  } = useMovieContext();
  const { toasts, addToast, removeToast } = useToast();

  const favorite = movie ? isFavorite(movie.id) : false;
  const inWatchlist = movie ? isInWatchlist(movie.id) : false;

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    const existingNote = getNote(id);
    if (existingNote) setNoteText(existingNote);
    
    Promise.all([
      getMovieDetails(id),
      getMovieVideos(id),
      getSimilarMovies(id),
    ])
      .then(([details, vids, sim]) => {
        setMovie(details);
        setVideos(vids.filter((v) => v.type === "Trailer" && v.site === "YouTube"));
        setSimilar(sim);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load movie details.");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="detail-loading">
        <div className="spinner" />
        <p>Loading movie...</p>
      </div>
    );

  if (error)
    return (
      <div className="detail-error">
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );

  const trailer = videos[0];
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "N/A";

  const handleSaveNote = () => {
    saveNote(id, noteText);
    addToast("Notes saved!", "success");
  };

  return (
    <div className="movie-detail">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Backdrop */}
      <div
        className="detail-backdrop"
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            : "none",
        }}
      >
        <div className="detail-backdrop-overlay" />
      </div>

      {/* Main Content */}
      <div className="detail-content">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="detail-main">
          {/* Poster */}
          <div className="detail-poster">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="no-poster-lg">🎬</div>
            )}
          </div>

          {/* Info */}
          <div className="detail-info">
            <h1 className="detail-title">{movie.title}</h1>
            {movie.tagline && <p className="detail-tagline">"{movie.tagline}"</p>}

            <div className="detail-badges">
              {movie.genres?.map((g) => (
                <span key={g.id} className="genre-tag">{g.name}</span>
              ))}
            </div>

            <div className="detail-stats">
              <div className="stat">
                <span className="stat-label">Rating</span>
                <span className="stat-value">⭐ {movie.vote_average?.toFixed(1)}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Runtime</span>
                <span className="stat-value">🕐 {runtime}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Year</span>
                <span className="stat-value">📅 {movie.release_date?.split("-")[0]}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Votes</span>
                <span className="stat-value">🗳 {movie.vote_count?.toLocaleString()}</span>
              </div>
            </div>

            <div className="detail-actions">
              <button
                className={`detail-btn ${favorite ? "btn-active-fav" : "btn-outline"}`}
                onClick={() => {
                  if (favorite) { removeFromFavorites(movie.id); addToast("Removed from favorites", "info"); }
                  else { addToFavorites(movie); addToast("Added to favorites ❤️", "success"); }
                }}
              >
                {favorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
              </button>
              <button
                className={`detail-btn ${inWatchlist ? "btn-active-watch" : "btn-outline"}`}
                onClick={() => {
                  if (inWatchlist) { removeFromWatchlist(movie.id); addToast("Removed from watchlist", "info"); }
                  else { addToWatchlist(movie); addToast("Added to watchlist 🎯", "success"); }
                }}
              >
                {inWatchlist ? "✅ In Watchlist" : "🎯 Add to Watchlist"}
              </button>
            </div>

            {/* Tabs */}
            <div className="detail-tabs">
              {["about", "cast", "trailer", "notes"].map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="tab-content">
              {activeTab === "about" && (
                <div className="tab-about">
                  <p className="detail-overview">{movie.overview}</p>
                  {movie.budget > 0 && (
                    <p className="detail-extra">💰 Budget: ${movie.budget?.toLocaleString()}</p>
                  )}
                  {movie.revenue > 0 && (
                    <p className="detail-extra">💵 Revenue: ${movie.revenue?.toLocaleString()}</p>
                  )}
                </div>
              )}
              {activeTab === "cast" && (
                <div className="cast-grid">
                  {movie.credits?.cast?.slice(0, 12).map((actor) => (
                    <div key={actor.id} className="cast-card">
                      {actor.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                          alt={actor.name}
                        />
                      ) : (
                        <div className="cast-no-photo">👤</div>
                      )}
                      <p className="cast-name">{actor.name}</p>
                      <p className="cast-char">{actor.character}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "trailer" && (
                <div className="trailer-section">
                  {trailer ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${trailer.key}`}
                      title="Movie Trailer"
                      allowFullScreen
                      className="trailer-frame"
                    />
                  ) : (
                    <p className="no-trailer">No trailer available.</p>
                  )}
                </div>
              )}
              {activeTab === "notes" && (
                <div className="notes-section">
                  <p className="notes-desc">Add your personal review or watch notes:</p>
                  <textarea
                    className="notes-input"
                    placeholder="E.g. The twist ending was crazy! Watched with family..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                  />
                  <button className="save-note-btn" onClick={handleSaveNote}>
                    Save Notes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        {similar.length > 0 && (
          <div className="similar-section">
            <h2 className="similar-title">Similar Movies</h2>
            <div className="movies-grid">
              {similar.map((m) => (
                <MovieCard key={m.id} movie={m} onToast={addToast} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
