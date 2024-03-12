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
  const [searchTerm, setSearchTerm] = useState("");

  const getData = async () => {
    const response = await fetch("http://localhost:5004/api/films/allfilms");
    const result = await response.json();
    console.log("result", result);
    setFilms(result.films);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFilms = films.filter((film) =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <input type="text" value={searchTerm} onChange={handleSearchChange} />
        {filteredFilms.map((film) => (
          <div key={film._id}>
            <a href={`/${film._id}`}>
              <img
                src={film.poster}
                alt={film.title}
                style={{ width: "200px", height: "auto" }}
              />
            </a>
            <h2>
              {film.title}{" "}
              <span style={{ fontSize: "0.8em" }}>({film.year})</span>
            </h2>
            <h3>Director: {film.director}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default FilmList;
