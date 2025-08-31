import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { getPopularMovies } from "../../api/fetch";

export default function HomePage() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPopularMovies()
      .then((data) => {
        setFilms(data);
        setError(null);
      })
      .catch(() => setError("Не вдалося завантажити фільми "))
      .finally(() => setLoading(false));
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      {loading && <p>Loading...</p>}
      <h1>Trending today</h1>

      {films.length > 0 && <MovieList films={films} />}
    </div>
  );
}
