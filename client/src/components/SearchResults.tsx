import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
  // Get the current URL location
  const location = useLocation();
  console.log("location", location);

  // Parse the query parameters
  const searchParams = new URLSearchParams(location.search);
  // get the value of the "text" parameter
  const text = searchParams.get("text");

  console.log("text", text);

  // State for storing the search results
  const [films, setFilms] = useState<SearchFilm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect hook to fetch search results
  useEffect(() => {
    const url = `/api/films/filter?text=${text}`;
    console.log("API URL:", url);
    // Set loading to true and clear any previous errors
    setIsLoading(true);
    setError(null);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", data);
        // If the data is an array, set the films state
        if (Array.isArray(data)) {
          setFilms(data);
          console.log("Films set:", data);
        } else {
          setError(data.message);
          console.log("Error set:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching films:", error);
        setError("Error fetching films");
      })
      // Set loading to false when the fetch is complete
      .finally(() => {
        setIsLoading(false);
      });
  }, [text]);

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
