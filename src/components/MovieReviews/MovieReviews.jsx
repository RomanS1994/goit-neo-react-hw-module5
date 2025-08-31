import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api/fetch";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    setLoading(true);
    getMovieReviews(movieId)
      .then((data) => {
        setReviews(data);
        console.log(data);
      })
      .catch(() => setError("Unable to load reviews "))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error}</p>;
  if (reviews.length === 0)
    return <p>We don't have any reviews for this movie.</p>;
  console.log(reviews);
  return (
    <ul>
      {reviews.map((el) => (
        <li key={el.id}>
          <h3>{el.author}</h3>
          <p>{el.content}</p>
        </li>
      ))}
    </ul>
  );
}
