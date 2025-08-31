import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovieBySearch } from "../../api/fetch";
import MovieList from "../../components/MovieList/MovieList";

import style from "./MoviesPage.module.css";
export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get("query") || "").trim();

  const [input, setInput] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (!query) {
      setResults([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    getMovieBySearch(query)
      .then((data) => !cancelled && setResults(data))
      .catch(() => !cancelled && setError("Помилка завантаження"))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = input.trim();
    q ? setSearchParams({ query: q }) : setSearchParams({});
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={style.input}
          id="movie-query"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a movie title…"
        />
        <button className={style.btn} type="submit">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && query && results.length === 0 && (
        <p>Nothing found for “{query}”.</p>
      )}
      {results.length > 0 && <MovieList films={results} />}
    </div>
  );
}
