import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type SearchReview = {
  _id: string;
  author: {
    _id: string;
    username: string;
    avatar: string;
  };
  body: string;
  film: {
    _id: string;
    year: string;
    title: string;
    poster: string;
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

// Main component for displaying search results
export default function SearchResults() {
  // Get the search query from the URL
  const location = useLocation();
  // parse the query string
  const searchParams = new URLSearchParams(location.search);
  // get the value of the "title", "director", and "year" parameters
  const title = searchParams.get("title");
  const director = searchParams.get("director");
  const year = searchParams.get("year");

  // State for storing the search results
  const [films, setFilms] = useState<SearchFilm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect hook for fetching the films when the title changes
  useEffect(() => {
    const url = `/api/films/filter?title=${title}&director=${director}&year=${year}`;
    console.log("API URL:", url);
    setIsLoading(true);
    setError(null);

    axios
      .get(url)
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
  }, [title, director, year]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // If no films are found, display a message
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
