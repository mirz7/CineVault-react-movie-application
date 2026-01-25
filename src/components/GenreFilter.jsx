import { useState, useEffect } from "react";
import { getGenres } from "../services/api";
import "../css/GenreFilter.css";

function GenreFilter({ selectedGenre, onGenreChange }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres().then(setGenres).catch(() => {});
  }, []);

  return (
    <div className="genre-filter">
      <div className="genre-pills">
        <button
          className={`genre-pill ${selectedGenre === null ? "active" : ""}`}
          onClick={() => onGenreChange(null)}
        >
          All
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`genre-pill ${selectedGenre === genre.id ? "active" : ""}`}
            onClick={() => onGenreChange(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GenreFilter;
