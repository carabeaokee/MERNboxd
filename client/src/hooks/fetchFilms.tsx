// import { useState, useEffect } from "react";

// function useFetchFilms(filmUrl) {
//   const [films, setFilms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const filmUrl = "http://localhost:5004/api/films/allfilms";

//   useEffect(() => {
//     const fetchFilms = async () => {
//       try {
//         const response = await fetch(filmUrl);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setFilms(data);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchFilms();
//   }, [filmUrl]);

//   return { films, loading, error };
// }

// export default useFetchFilms;
