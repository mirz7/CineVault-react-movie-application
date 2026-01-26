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
        <Link to="/" className="brand-logo-link">
          <svg className="brand-svg-logo" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 10L19 7.5V16.5L15 14M5 6H15C16.1046 6 17 6.89543 17 8V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V8C3 6.89543 3.89543 6 5 6Z" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="10" cy="12" r="2" fill="url(#paint0_linear)"/>
            <defs>
              <linearGradient id="paint0_linear" x1="3" y1="6" x2="19" y2="18" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6c63ff"/>
                <stop offset="1" stopColor="#a855f7"/>
              </linearGradient>
            </defs>
          </svg>
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
        <Link
          to="/notes"
          className={`nav-link ${isActive("/notes") ? "active" : ""}`}
        >
          My Notes
        </Link>
      </div>

      <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </nav>
  );
}

export default NavBar;