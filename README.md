# 🎬 CineVault

![CineVault Banner](https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop)

CineVault is a premium React-based web application that allows users to discover trending movies, search the TMDB database, read detailed movie information, and curate their own personal Watchlists and Favorites.

## ✨ Features

- **🔥 Trending & Discovery**: See what's currently hot in the movie world with a dedicated trending page and auto-rotating Hero Banner.
- **🔍 Advanced Search & Filters**: Search for any movie or filter down popular films by genre (Action, Sci-Fi, Comedy, etc.).
- **📋 Watchlist & Favorites**: Save your favorite movies or movies you plan to watch later. Filter and sort your lists by Title, Rating, Date Added, or Year.
- **📝 Personal Notes**: Keep track of your thoughts! Add personal reviews and watch-notes directly to any movie's detail page.
- **🌗 Dark & Light Mode**: Seamless glassmorphism UI with full theme toggling support.
- **📱 Fully Responsive**: Fluid, mobile-friendly design optimized for any screen size.

## 🚀 Tech Stack

- **Frontend Framework**: React 18 (Vite)
- **Routing**: React Router v6
- **Styling**: Vanilla CSS (Custom properties, Flexbox/Grid, Glassmorphism)
- **State Management**: React Context API
- **Data Persistence**: LocalStorage
- **API**: TMDB (The Movie Database) REST API

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
   Open `src/services/api.js` and add your key:
   ```javascript
   const API_KEY = "YOUR_TMDB_API_KEY_HERE";
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 👨‍💻 Author
Built by [Muhammed Mirza PN](https://github.com/mirz7).
