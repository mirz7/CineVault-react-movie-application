import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieCard.css";

function StarRating({ movieId }) {
  const { rateMovie, getMovieRating } = useMovieContext();
  const currentRating = getMovieRating(movieId);

  return (
    <div className="star-rating" onClick={(e) => e.stopPropagation()}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`star ${star <= currentRating ? "filled" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            rateMovie(movieId, star === currentRating ? 0 : star);
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

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

function MovieCard({ movie, onToast }) {
  const {
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
  } = useMovieContext();
  const navigate = useNavigate();

  const favorite = isFavorite(movie.id);
  const inWatchlist = isInWatchlist(movie.id);

  function onFavoriteClick(e) {
    e.stopPropagation();
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id);
      onToast?.("Removed from favorites", "info");
    } else {
      addToFavorites(movie);
      onToast?.("Added to favorites ❤️", "success");
    }
  }

  function onWatchlistClick(e) {
    e.stopPropagation();
    e.preventDefault();
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
      onToast?.("Removed from watchlist", "info");
    } else {
      addToWatchlist(movie);
      onToast?.("Added to watchlist 🎯", "success");
    }
  }

  const rating = movie.vote_average?.toFixed(1);
  const ratingClass =
    rating >= 7 ? "high" : rating >= 5 ? "medium" : "low";

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
      <div className="movie-poster">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
          />
        ) : (
          <div className="no-poster">🎬<span>No Image</span></div>
        )}

        <div className="rating-badge">
          <span className={`rating-value ${ratingClass}`}>⭐ {rating}</span>
        </div>

        <div className="movie-overlay">
          <div className="overlay-actions">
            <button
              className={`action-btn favorite-btn ${favorite ? "active" : ""}`}
              onClick={onFavoriteClick}
              title={favorite ? "Remove from favorites" : "Add to favorites"}
            >
              <HeartIcon filled={favorite} />
            </button>
            <button
              className={`action-btn watchlist-btn ${inWatchlist ? "active" : ""}`}
              onClick={onWatchlistClick}
              title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
            >
              <BookmarkIcon filled={inWatchlist} />
            </button>
          </div>
          <p className="overlay-overview">
            {movie.overview?.slice(0, 100)}...
          </p>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-year">{movie.release_date?.split("-")[0]}</span>
        </div>
        <StarRating movieId={movie.id} />
      </div>
    </div>
  );
}

export default MovieCard;