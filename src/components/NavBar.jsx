import { Link, useLocation } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/Navbar.css";

function NavBar() {
  const { favorites, watchlist, theme, toggleTheme, notes } = useMovieContext();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const notesCount = Object.keys(notes || {}).length;
  const hasNotes = notesCount > 0;

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
            {notesCount > 0 && (
              <span className="nav-badge">{notesCount}</span>
            )}
          </Link>
        
      </div>

      <button 
        className={`theme-switch ${theme}`} 
        onClick={toggleTheme} 
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <span className="theme-icon sun">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        </span>
        <span className="theme-icon moon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </span>
        <div className="theme-thumb"></div>
      </button>
    </nav>
  );
}

export default NavBar;