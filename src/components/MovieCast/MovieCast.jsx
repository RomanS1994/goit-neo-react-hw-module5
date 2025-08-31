import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../api/fetch";
import style from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    setLoading(true);
    getMovieCast(movieId)
      .then((data) => setCast(data))
      .catch(() => setError("Не вдалося завантажити акторський склад "))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error}</p>;
  if (cast.length === 0) return <p>No cast information</p>;
  console.log(cast);
  return (
    <ul>
      {cast.map((person) => (
        <li key={person.cast_id}>
          <img
            className={style.img}
            src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
            alt={person.name}
          />
          <h3>{person.name}</h3>
          <p>Character: {person.character}</p>
        </li>
      ))}
    </ul>
  );
}
