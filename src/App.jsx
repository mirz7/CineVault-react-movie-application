import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import WatchList from "./pages/WatchList";
import MovieDetail from "./pages/MovieDetail";
import Trending from "./pages/Trending";
import MyNotes from "./pages/MyNotes";
import { Routes, Route, useLocation } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import SplashLoader from "./components/SplashLoader";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate initial loading time to show the beautiful splash screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashLoader />;
  }

  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content page-transition" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/notes" element={<MyNotes />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
