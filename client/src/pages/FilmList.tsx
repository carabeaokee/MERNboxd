import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import "../css/filmlist.css";
import FilmGrid from "../components/FilmGrid";

// define the type of the film object
type Film = {
  _id: string;
  title: string;
  year: string;
  director: string;
  poster: string;
  synopsis: string;
};

interface FilmListProps {
  searchText: string | null;
}

// define the type of the films array
function FilmList({ props }) {
  console.log("searchText", props);
  const [films, setFilms] = useState<Film[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  // filter the films array based on the search term
  const filteredFilms = films.filter((film) =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // render the films array
  return (
    <>
      <FilmGrid films={films} />
    </>
  );
}

export default FilmList;
