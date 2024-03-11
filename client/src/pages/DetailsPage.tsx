import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Review = {
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

type FilmDetails = {
  _id: string;
  title: string;
  year: string;
  director: string;
  reviews: Review[];
  poster: string;
  synopsis: string;
};

function DetailsPage() {
  const [entry, setEntry] = useState<FilmDetails | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getEntry = async () => {
      const response = await fetch(`http://localhost:5004/api/films/${id}`);

      if (!response.ok) {
        console.log("error");
        return;
      }

      const result: FilmDetails = await response.json();
      console.log("result", result);
      setEntry(result);
    };

    getEntry();
  }, [id]);

  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1>{entry.title}</h1>
        <p>Year: {entry.year}</p>
        <p>Director: {entry.director}</p>
        <img src={entry.poster} alt={entry.title} style={{ width: "200px" }} />
        <p>{entry.synopsis}</p>
      </div>

      <h2>Reviews</h2>

      {entry.reviews.map((review) => (
        <div
          key={review._id}
          style={{ border: "1px solid black", padding: "10px", margin: "10px" }}
        >
          <p>
            <strong>Author:</strong> {review.author.username}
          </p>
          <p>
            <strong>Review:</strong> {review.body}
          </p>
        </div>
      ))}
    </>
  );
}

export default DetailsPage;
