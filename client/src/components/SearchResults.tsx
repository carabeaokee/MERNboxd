import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type SearchReview = {
  _id: string;
  author: {
    _id: string;
    username: string;
  };
  body: string;
  film: {
    _id: string;
    title: string;
  };
};

type SearchFilm = {
  _id: string;
  title: string;
  year: string;
  director: string;
  reviews: SearchReview[];
  poster: string;
  synopsis: string;
};

export default function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("title");

  const [films, setFilms] = useState<SearchFilm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = `/api/films/filter?title=${title}`;
    console.log("API URL:", url);
    setIsLoading(true);
    setError(null);
    axios
      .get(`/api/films/filter?title=${title}`)
      .then((response) => {
        console.log("API response:", response.data);
        setFilms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching films:", error);
        setError("Error fetching films");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [title]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (films.length === 0) {
    return <div>No films found</div>;
  }

  return (
    <div>
      <h2>Search Results</h2>
      {films.map((film) => (
        <div key={film._id}>
          {film.title}
          <Link to={`/films/${film._id}`}>
            <img src={film.poster} alt={film.title} />
          </Link>
          <p>{film.year}</p>
        </div>
      ))}
    </div>
  );
}
