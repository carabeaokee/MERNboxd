import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import "../css/filmlist.css";

// define the type of the film object
type Film = {
  _id: string;
  title: string;
  year: string;
  director: string;
  poster: string;
  synopsis: string;
};

// define the type of the films array
function FilmList() {
  const [films, setFilms] = useState<Film[]>([]);
  // const [searchTerm, setSearchTerm] = useState("");

  // fetch the data from the server
  const getData = async () => {
    const response = await fetch("http://localhost:5004/api/films/allfilms");
    const result = await response.json();
    console.log("result", result);
    // set the films state to the array of films from the server
    setFilms(result.films);
  };
  // call the getData function when the component is first rendered
  useEffect(() => {
    getData();
  }, []);

  // const handleSearchChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  // // filter the films array based on the search term
  // const filteredFilms = films.filter((film) =>
  //   film.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // render the films array
  return (
    <>
      <div style={{ padding: "3rem" }}>
        <Grid container spacing={3}>
          {films.map((film) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={film._id}
              style={{ color: "whitesmoke" }}
            >
              <a href={`/id/${film._id}`}>
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
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default FilmList;
