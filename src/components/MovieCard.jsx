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
              {favorite ? "❤️" : "🤍"}
            </button>
            <button
              className={`action-btn watchlist-btn ${inWatchlist ? "active" : ""}`}
              onClick={onWatchlistClick}
              title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
            >
              {inWatchlist ? "✅" : "🎯"}
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