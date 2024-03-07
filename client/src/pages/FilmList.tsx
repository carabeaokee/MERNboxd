import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

type Film = {
  _id: string;
  title: string;
  year: string;
  director: string;
  poster: string;
  synopsis: string;
};

function FilmList() {
  const [films, setFilms] = useState<Film[]>([]);

  const getData = async () => {
    const response = await fetch("http://localhost:5004/api/films/allfilms");
    const result = await response.json();
    console.log("result", result);
    setFilms(result.films);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        {films.map((film) => (
          <div key={film._id}>
            <h2>{film.title}</h2>
            <p>{film.year}</p>
            <p>{film.director}</p>
            <a href={`/films/${film._id}`}>
              <img
                src={film.poster}
                alt={film.title}
                style={{ width: "200px", height: "auto" }}
              />
            </a>

            <p>{film.synopsis}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default FilmList;
