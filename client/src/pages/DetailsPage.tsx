import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type FilmDetails = {
  id: string;
  title: string;
  year: string;
  director: string;
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
    <div>
      <h1>{entry.title}</h1>
      <p>Year: {entry.year}</p>
      <p>Director: {entry.director}</p>
      <img src={entry.poster} alt={entry.title} />
      <p>{entry.synopsis}</p>
    </div>
  );
}

export default DetailsPage;
