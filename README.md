# 🎬 CineVault

> Live demo: https://cinevault-78b9.onrender.com


CineVault is a premium React-based web application that allows users to discover trending movies, search the TMDB database, read detailed movie information, and curate their own personal Watchlist and Favorites.

## ✨ Features

- **🔥 Trending & Discovery** — See what's currently hot in the movie world with a dedicated trending page and auto-rotating Hero Banner.
- **🔍 Advanced Search & Filters** — Search for any movie or filter popular films by genre (Action, Sci-Fi, Comedy, and more).
- **📋 Watchlist & Favorites** — Save movies you love or plan to watch later. Filter and sort your lists by Title, Rating, Date Added, or Year.
- **📝 Personal Notes** — Add personal reviews and watch notes directly to any movie's detail page.
- **🌗 Dark & Light Mode** — Seamless glassmorphism UI with full theme toggling support.
- **📱 Fully Responsive** — Fluid, mobile-friendly design optimized for any screen size.

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 (Vite) |
| Routing | React Router v6 |
| Styling | Vanilla CSS (Custom Properties, Flexbox/Grid, Glassmorphism) |
| State Management | React Context API |
| Data Persistence | LocalStorage |
| API | TMDB (The Movie Database) REST API |

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mirz7/CineVault--react-movie-application.git
   cd CineVault--react-movie-application
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the API Key:**

   Get a free API key from [TMDB](https://developer.themoviedb.org/).

   Create a `.env` file in the project root:
   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   ```

   Then reference it in `src/services/api.js`:
   ```javascript
   const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
   ```

   > ⚠️ Make sure `.env` is listed in your `.gitignore` to avoid accidentally exposing your key.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## 👨‍💻 Author

Built by [Muhammed Mirza PN](https://github.com/mirz7).