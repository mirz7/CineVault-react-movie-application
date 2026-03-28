import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, getMovieVideos, getSimilarMovies } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import useToast from "../hooks/useToast";
import ToastContainer from "../components/Toast";
import "../css/MovieDetail.css";
import "../css/Notes.css";

const HeartIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transition: "fill 0.2s ease, transform 0.2s ease" }}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const BookmarkIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transition: "fill 0.2s ease, transform 0.2s ease" }}
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

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
  const [isEditingNote, setIsEditingNote] = useState(false);

  const {
    isFavorite, addToFavorites, removeFromFavorites,
    isInWatchlist, addToWatchlist, removeFromWatchlist,
    getNote, saveNote, deleteNote,
  } = useMovieContext();
  const { toasts, addToast, removeToast } = useToast();

  const favorite = movie ? isFavorite(movie.id) : false;
  const inWatchlist = movie ? isInWatchlist(movie.id) : false;

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    const existingNote = getNote(id);
    if (existingNote) {
      setNoteText(existingNote);
      setIsEditingNote(false);
    } else {
      setIsEditingNote(true);
    }
    
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
    if (!noteText.trim()) {
      addToast("Note cannot be empty", "error");
      return;
    }
    saveNote(movie, noteText);
    setIsEditingNote(false);
    addToast("Notes saved!", "success");
  };

  const handleDeleteNote = () => {
    deleteNote(id);
    setNoteText("");
    setIsEditingNote(true);
    addToast("Note deleted", "info");
  };

  return (
    <div className="movie-detail page-fade-in">
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
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}
                onClick={() => {
                  if (favorite) { removeFromFavorites(movie.id); addToast("Removed from favorites", "info"); }
                  else { addToFavorites(movie); addToast("Added to favorites", "success"); }
                }}
              >
                <HeartIcon filled={favorite} /> {favorite ? "Favorited" : "Add to Favorites"}
              </button>
              <button
                className={`detail-btn ${inWatchlist ? "btn-active-watch" : "btn-outline"}`}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}
                onClick={() => {
                  if (inWatchlist) { removeFromWatchlist(movie.id); addToast("Removed from watchlist", "info"); }
                  else { addToWatchlist(movie); addToast("Added to watchlist", "success"); }
                }}
              >
                <BookmarkIcon filled={inWatchlist} /> {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
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
                <div className="notes-section page-fade-in">
                  {!isEditingNote && noteText ? (
                    <div className="note-display-card">
                      <div className="note-header">
                        <span className="note-label">📝 My Notes</span>
                        <div className="note-actions">
                          <button className="note-edit-btn" onClick={() => setIsEditingNote(true)}>Edit</button>
                          <button className="note-del-btn" onClick={handleDeleteNote}>Delete</button>
                        </div>
                      </div>
                      <p className="note-content">{noteText}</p>
                    </div>
                  ) : (
                    <div className="note-edit-area">
                      <p className="notes-desc">Add your personal review or watch notes:</p>
                      <textarea
                        className="notes-input"
                        placeholder="E.g. The twist ending was crazy! Watched with family..."
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                      />
                      <div className="note-edit-actions">
                        <button className="save-note-btn" onClick={handleSaveNote}>
                          Save Notes
                        </button>
                        {getNote(id) && (
                          <button className="cancel-note-btn" onClick={() => {
                            setNoteText(getNote(id));
                            setIsEditingNote(false);
                          }}>
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  )}
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
