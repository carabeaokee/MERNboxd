import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../css/details.css";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
import ReviewModal from "../components/ReviewModal";

type Author = {
  _id: string;
  username: string;
};

type ReviewFilm = {
  _id: string;
};

type Review = {
  _id: string;
  author: Author;
  body: string;
  film: ReviewFilm;
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
  // const [reviewBody, setReviewBody] = useState("");
  // const [username, setUsername] = useState("");
  // const { userId } = useContext(AuthContext);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { id } = useParams<{ id: string }>();

  const handleReviewClick = () => {
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
  };

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

  // const handleReview = async () => {
  //   const review: Review = {
  //     _id: "",
  //     author: userId
  //     body: reviewBody,
  //     film: filmId
  //   };

  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(review),
  //     redirect: "follow" as RequestRedirect,
  //   };
  //   try {
  //     const response = await fetch(
  //       "http://localhost:5004/api/reviews/addreview",
  //       requestOptions
  //     );
  //     const result = await response.json();
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const response = await fetch(
  //       `http://localhost:5004/api/users/profile/${userId}`
  //     );
  //     const user = await response.json();
  //     setUsername(user.username);
  //   };

  //   fetchUser();
  // }, [userId]);

  return (
    <>
      <Navbar />

      {/* <div>
        <input
          type="text"
          name="review"
          placeholder="review"
          value={reviewBody}
          onChange={(e) => setReviewBody(e.target.value)}
          className="custom-input"
        />
      </div>
      <button onClick={handleReview}>submit</button> */}
      <div className="details-container" style={{ padding: "4rem" }}>
        <div style={{ color: "whitesmoke" }}>
          <h1>{entry.title}</h1>
          <p>Year: {entry.year}</p>
          <p>Director: {entry.director}</p>
          <img
            src={entry.poster}
            alt={entry.title}
            style={{ width: "200px" }}
          />
          <p>{entry.synopsis}</p>
        </div>
        <div>
          <button style={{ color: "blue" }} onClick={handleReviewClick}>
            Log and Review Film
          </button>
        </div>
        <ReviewModal
          show={showReviewModal}
          handleClose={handleCloseReviewModal}
        />
        <h2 style={{ color: "white" }}>Reviews</h2>

        {entry &&
          entry.reviews &&
          entry.reviews.map((review) => (
            <div
              key={review._id}
              style={{
                border: "1px solid black",
                padding: "10px",
                margin: "10px",
                color: "whitesmoke",
              }}
            >
              <p>
                <strong>Author:</strong> {review.author.username}
              </p>
              <p>{review.body}</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default DetailsPage;
// function jwtDecode(token: string): { sub: string } {
//   throw new Error("Function not implemented.");
// }
