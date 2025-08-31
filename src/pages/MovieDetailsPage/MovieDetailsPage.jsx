import { useEffect, useState, useRef } from "react";
import style from "./MovieDetailsPage.module.css";
import {
  useParams,
  useLocation,
  Link,
  NavLink,
  Outlet,
} from "react-router-dom";
import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDU3OTQxN2FmODZiM2VhZmVkMDg4Mjg1MzNkMjBlYiIsIm5iZiI6MTc1NjIzNjAyMy44MTEsInN1YiI6IjY4YWUwOGY3OGRkZDU2ZGMwYmZhOGU3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I0lyeYQJhus-evILey0i3Oq7GHBctCWnOufwxLi_vF0";

const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/movies");

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/movie/${movieId}?language=en-US`, options)
      .then((res) => {
        console.log(res), setMovie(res.data);
      })
      .catch(() => setError("Failed to load data."))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  console.log(movie);
  return (
    <div>
      <Link className={style.btn} to={backLinkRef.current}>
        ⬅ Go Back
      </Link>
      <div className={style.film_box}>
        <img
          className={style.img}
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={style.description_wrapper}>
          <h1>
            {movie.title} ({parseFloat(movie.release_date)})
          </h1>
          <p>Rating: {movie.vote_average}</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul className={style.genresList}>
            {movie.genres.map((el) => (
              <li key={el.id}>{el.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <nav className={style.boxBtn}>
        <NavLink className={style.btn} to="cast">
          Cast
        </NavLink>
        <NavLink className={style.btn} to="reviews">
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
