import { Link, useLocation } from "react-router-dom";

export default function MovieList({ films }) {
  const location = useLocation();
  return (
    <>
      <nav>
        {films.map((film) => (
          <li key={film.id}>
            <Link to={`/movies/${film.id}`} state={{ from: location }}>
              {film.title}
            </Link>
          </li>
        ))}
      </nav>
    </>
  );
}
