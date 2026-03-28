const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "/tmdb-api";

const fetchJSON = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
};

export const getPopularMovies = async (page = 1) => {
  const data = await fetchJSON(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  return { results: data.results, totalPages: data.total_pages };
};

export const searchMovies = async (query, page = 1) => {
  const data = await fetchJSON(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  return { results: data.results, totalPages: data.total_pages };
};

export const getMovieDetails = async (movieId) => {
  return fetchJSON(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`);
};

export const getMovieVideos = async (movieId) => {
  const data = await fetchJSON(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
  return data.results;
};

export const getSimilarMovies = async (movieId) => {
  const data = await fetchJSON(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`);
  return data.results.slice(0, 6);
};

export const getGenres = async () => {
  const data = await fetchJSON(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return data.genres;
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  const data = await fetchJSON(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`
  );
  return { results: data.results, totalPages: data.total_pages };
};

export const getTrendingMovies = async () => {
  const data = await fetchJSON(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  return data.results;
};

export const getNowPlaying = async () => {
  const data = await fetchJSON(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
  return data.results.slice(0, 5);
};
