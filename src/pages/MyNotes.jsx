import { useMovieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";
import useToast from "../hooks/useToast";
import ToastContainer from "../components/Toast";
import "../css/MyNotes.css";

function MyNotes() {
  const { notes, deleteNote } = useMovieContext();
  const { toasts, addToast, removeToast } = useToast();

  const notesList = Object.entries(notes).map(([movieId, noteData]) => {
    // Note data can be an object { text, movie } or just a string fallback if migration failed
    const text = typeof noteData === "string" ? noteData : noteData.text;
    const movie = typeof noteData === "object" && noteData !== null ? noteData.movie : null;
    return { movieId, text, movie };
  });

  const handleDelete = (id) => {
    deleteNote(id);
    addToast("Note deleted successfully", "info");
  };

  return (
    <div className="notes-page page-fade-in">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <h2 className="page-title">My Notes</h2>
      <p className="page-subtitle">Your personal thoughts, reviews, and watch notes.</p>

      {notesList.length === 0 ? (
        <div className="empty-state">
          <h2>No Notes Yet📝</h2>
          <p>You haven't added any notes to movies yet.</p>
          <p>
            Visit <Link to="/">Home</Link> and click on a movie to share your thoughts!
          </p>
        </div>
      ) : (
        <div className="notes-list">
          {notesList.map(({ movieId, text, movie }) => (
            <div key={movieId} className="global-note-card">
              <div className="gnc-header">
                {movie ? (
                  <div className="gnc-movie-info">
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="gnc-poster"
                      />
                    ) : (
                      <div className="gnc-no-poster">🎬</div>
                    )}
                    <div className="gnc-title-group">
                      <Link to={`/movie/${movieId}`} className="gnc-movie-title">
                        {movie.title}
                      </Link>
                      <span className="gnc-movie-year">
                        {movie.release_date?.split("-")[0]}
                      </span>
                    </div>
                  </div>
                ) : (
                  <Link to={`/movie/${movieId}`} className="gnc-movie-title">
                    Movie ID: {movieId}
                  </Link>
                )}
                
                <button
                  className="gnc-delete-btn"
                  onClick={() => handleDelete(movieId)}
                  title="Delete Note"
                >
                  ✕
                </button>
              </div>
              <div className="gnc-body">
                <p className="gnc-text">{text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyNotes;
