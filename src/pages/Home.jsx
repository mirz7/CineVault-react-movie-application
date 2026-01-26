import { useState, useEffect, useCallback } from "react";
import MovieCard from "../components/MovieCard";
import HeroSection from "../components/HeroSection";
import GenreFilter from "../components/GenreFilter";
import ToastContainer from "../components/Toast";
import useToast from "../hooks/useToast";
import { searchMovies, getPopularMovies, getMoviesByGenre } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [activeSearch, setActiveSearch] = useState("");
  const { toasts, addToast, removeToast } = useToast();

  const fetchMovies = useCallback(async (search, genre, pageNum, append = false) => {
    try {
      let data;
      if (search) {
        data = await searchMovies(search, pageNum);
      } else if (genre) {
        data = await getMoviesByGenre(genre, pageNum);
      } else {
        data = await getPopularMovies(pageNum);
      }
      setMovies((prev) => append ? [...prev, ...data.results] : data.results);
      setTotalPages(data.totalPages);
      setError(null);
    } catch {
      setError("Failed to load movies. Please check your TMDB API key in src/services/api.js!");
    }
  }, []);

  // Initial load
  useEffect(() => {
    setLoading(true);
    fetchMovies("", null, 1).finally(() => setLoading(false));
  }, [fetchMovies]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    setPage(1);
    setSelectedGenre(null);
    setActiveSearch(searchQuery);
    await fetchMovies(searchQuery, null, 1);
    setLoading(false);
  };

  const handleGenreChange = async (genreId) => {
    setSelectedGenre(genreId);
    setActiveSearch("");
    setSearchQuery("");
    setPage(1);
    setLoading(true);
    await fetchMovies("", genreId, 1);
    setLoading(false);
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setLoadingMore(true);
    await fetchMovies(activeSearch, selectedGenre, nextPage, true);
    setLoadingMore(false);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setActiveSearch("");
    setSelectedGenre(null);
    setPage(1);
    setLoading(true);
    fetchMovies("", null, 1).finally(() => setLoading(false));
  };

  return (
    <div className="home page-fade-in">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <HeroSection />

      <div className="home-controls">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search movies..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {(searchQuery || activeSearch) && (
              <button type="button" className="clear-search-btn" onClick={handleClearSearch}>
                ×
              </button>
            )}
          </div>
          <button type="submit" className="search-button">Search</button>
        </form>

        <GenreFilter selectedGenre={selectedGenre} onGenreChange={handleGenreChange} />
      </div>

      <div className="section-header">
        <h2 className="section-title">
          {activeSearch
            ? `Results for "${activeSearch}"`
            : selectedGenre
            ? "Genre Movies"
            : "Popular Movies"}
        </h2>
        {movies.length > 0 && (
          <span className="movies-count">{movies.length} movies</span>
        )}
      </div>

      {error && <div className="error-message">⚠️ {error}</div>}

      {loading ? (
        <div className="loading-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div className="no-results">
          <span>🎬</span>
          <p>No movies found. Try a different search!</p>
        </div>
      ) : (
        <>
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onToast={addToast} />
            ))}
          </div>

          {page < totalPages && (
            <div className="load-more-wrapper">
              <button
                className="load-more-btn"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <span className="btn-spinner" />
                ) : (
                  "Load More Movies"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
