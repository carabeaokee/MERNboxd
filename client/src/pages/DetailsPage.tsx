import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../css/details.css";
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

export type FilmDetails = {
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
  const [reviewText, setReviewText] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  // const [author, setAuthor] = useState<Author | null>(null);

  const { id } = useParams<{ id: string }>();
  // const userId = entry?.reviews[0].author._id;

  const handleReviewClick = () => {
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
  };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const response = await fetch(
  //       `http://localhost:5004/api/users/profile/${userId}`
  //     );

  //     if (!response.ok) {
  //       console.log("error");
  //       return;
  //     }

  //     const user: Author = await response.json();
  //     console.log("user", user);
  //     setAuthor(user);
  //   };

  //   fetchUser();
  // }, [userId]);

  useEffect(() => {
    if (!showReviewModal) {
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
    }
  }, [id, showReviewModal]);

  if (!entry) {
    return <div>Loading...</div>;
  }

  const handleReview = async () => {
    const token = localStorage.getItem("token");
    // const username = localStorage.getItem("username");
    if (!token) {
      console.warn("no token");
      return;
    }
    let review = {
      // author: username,
      body: reviewText,
      filmId: entry._id,
    };

    console.log("review", review);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(review),

      redirect: "follow" as RequestRedirect,
    };
    try {
      const response = await fetch(
        "http://localhost:5004/api/reviews/addreview",
        requestOptions
      );
      const result = await response.json();
      if (result) {
        setReviewText("");
        handleCloseReviewModal();
        // ? uncomment when populate is working
        // setEntry(result.film)
      }
      console.log("result", result);
    } catch (error) {
      console.log(error);
    }
  };

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
          entry={entry}
          reviewText={reviewText}
          setReviewText={setReviewText}
          handleReview={handleReview}
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
