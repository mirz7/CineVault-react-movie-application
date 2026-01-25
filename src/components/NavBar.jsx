import { Link, useLocation } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/Navbar.css";

function NavBar() {
  const { favorites, watchlist, theme, toggleTheme } = useMovieContext();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="brand-icon">🎬</span>
          <span className="brand-text">CineVault</span>
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
          Home
        </Link>
        <Link to="/trending" className={`nav-link ${isActive("/trending") ? "active" : ""}`}>
          Trending
        </Link>
        <Link
          to="/favorites"
          className={`nav-link ${isActive("/favorites") ? "active" : ""}`}
        >
          Favorites
          {favorites.length > 0 && (
            <span className="nav-badge">{favorites.length}</span>
          )}
        </Link>
        <Link
          to="/watchlist"
          className={`nav-link ${isActive("/watchlist") ? "active" : ""}`}
        >
          Watchlist
          {watchlist.length > 0 && (
            <span className="nav-badge">{watchlist.length}</span>
          )}
        </Link>
      </div>

      <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </nav>
  );
}

export default NavBar;