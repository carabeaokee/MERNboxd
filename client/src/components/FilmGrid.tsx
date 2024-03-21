// import { Grid } from "@mui/material";

// type Film = {
//   _id: string;
//   title: string;
//   year: string;
//   director: string;
//   poster: string;
//   synopsis: string;
// };

// type Props = {
//   films: Film[];
// };

// const FilmGrid = ({ films }: Props) => {
//   return (
//     <>
//       <div style={{ padding: "3rem" }}>
//         <Grid container spacing={3}>
//           {films.map((film) => (
//             <Grid
//               item
//               xs={12}
//               sm={6}
//               md={4}
//               lg={3}
//               key={film._id}
//               style={{ color: "whitesmoke" }}
//             >
//               <a href={`/${film._id}`}>
//                 <img
//                   src={film.poster}
//                   alt={film.title}
//                   style={{ width: "200px", height: "auto" }}
//                 />
//               </a>
//               <h2>
//                 {film.title}{" "}
//                 <span style={{ fontSize: "0.8em" }}>({film.year})</span>
//               </h2>
//               <h3>Director: {film.director}</h3>
//             </Grid>
//           ))}
//         </Grid>
//       </div>
//     </>
//   );
// };

// export default FilmGrid;
