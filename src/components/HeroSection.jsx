import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getNowPlaying } from "../services/api";
import "../css/HeroSection.css";

function HeroSection() {
  const [featured, setFeatured] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getNowPlaying()
      .then((movies) => {
        setFeatured(movies.filter((m) => m.backdrop_path));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (featured.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featured]);

  if (loading || featured.length === 0) return null;

  const movie = featured[currentIndex];

  return (
    <div className="hero-section">
      <div
        className="hero-backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-badge">🎬 Now Playing</span>
          <h1 className="hero-title">{movie.title}</h1>
          <p className="hero-overview">{movie.overview?.slice(0, 180)}...</p>
          <div className="hero-meta">
            <span className="hero-rating">⭐ {movie.vote_average?.toFixed(1)}</span>
            <span className="hero-year">{movie.release_date?.split("-")[0]}</span>
          </div>
          <div className="hero-actions">
            <button
              className="hero-btn hero-btn-primary"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              ▶ View Details
            </button>
          </div>
        </div>
        <div className="hero-dots">
          {featured.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
