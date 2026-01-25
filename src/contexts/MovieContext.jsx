import { createContext, useState, useContext, useEffect, useCallback } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [ratings, setRatings] = useState({});
  const [notes, setNotes] = useState({});
  const [theme, setTheme] = useState("dark");

  // Load from localStorage
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    const storedWatchlist = localStorage.getItem("watchlist");
    const storedRatings = localStorage.getItem("ratings");
    const storedNotes = localStorage.getItem("notes");
    const storedTheme = localStorage.getItem("theme");

    if (storedFavs) setFavorites(JSON.parse(storedFavs));
    if (storedWatchlist) setWatchlist(JSON.parse(storedWatchlist));
    if (storedRatings) setRatings(JSON.parse(storedRatings));
    if (storedNotes) setNotes(JSON.parse(storedNotes));
    if (storedTheme) setTheme(storedTheme);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("ratings", JSON.stringify(ratings));
  }, [ratings]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Favorites
  const addToFavorites = useCallback((movie) => {
    setFavorites((prev) => [...prev, movie]);
  }, []);

  const removeFromFavorites = useCallback((movieId) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));
  }, []);

  const isFavorite = useCallback(
    (movieId) => favorites.some((m) => m.id === movieId),
    [favorites]
  );

  // Watchlist
  const addToWatchlist = useCallback((movie) => {
    setWatchlist((prev) => [...prev, movie]);
  }, []);

  const removeFromWatchlist = useCallback((movieId) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
  }, []);

  const isInWatchlist = useCallback(
    (movieId) => watchlist.some((m) => m.id === movieId),
    [watchlist]
  );

  const clearWatchlist = useCallback(() => setWatchlist([]), []);

  // Ratings
  const rateMovie = useCallback((movieId, rating) => {
    setRatings((prev) => ({ ...prev, [movieId]: rating }));
  }, []);

  const getMovieRating = useCallback(
    (movieId) => ratings[movieId] || 0,
    [ratings]
  );

  // Notes
  const saveNote = useCallback((movieId, text) => {
    setNotes((prev) => ({ ...prev, [movieId]: text }));
  }, []);

  const getNote = useCallback(
    (movieId) => notes[movieId] || "",
    [notes]
  );

  // Theme
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    clearWatchlist,
    ratings,
    rateMovie,
    getMovieRating,
    notes,
    saveNote,
    getNote,
    theme,
    toggleTheme,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};