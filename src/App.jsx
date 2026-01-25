import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import WatchList from "./pages/WatchList";
import MovieDetail from "./pages/MovieDetail";
import Trending from "./pages/Trending";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
