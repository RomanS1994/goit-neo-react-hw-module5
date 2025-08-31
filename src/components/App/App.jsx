import "./App.css";

import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import Navigation from "../Navigation/Navigation";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "../MovieCast/MovieCast";
import MovieReviews from "../MovieReviews/MovieReviews";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie" element={<MoviesPage />} />

        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
