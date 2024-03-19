import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "../css/reviewlist.css";
import { Grid } from "@mui/material";
// import ReviewCards from "../components/ReviewCards";
// import ReviewCarousel from "../components/ReviewCarousel";

type Film = {
  _id: string;
  title: string;
  poster: string;
};

type Review = {
  _id: string;
  author: {
    _id: string;
    username: string;
    avatar: string;
  };
  body: string;
  film: Film;
};

// interface ReviewCardProps {
//   review: Review;
// }

function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([]);

  const getData = async () => {
    const response = await fetch(
      "http://localhost:5004/api/reviews/allreviews"
    );
    const result = await response.json();
    console.log("result", result);
    setReviews(result.reviews);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div style={{ padding: "3rem" }}>
        <Grid container spacing={3}>
          {reviews &&
            reviews.map((review) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={review._id}
                style={{ color: "whitesmoke" }}
              >
                <img
                  src={review.author.avatar}
                  alt={review.author.username}
                  style={{
                    width: "200px",
                    height: "auto",
                    borderRadius: "50%",
                  }}
                />
                <h2>{review.author.username} </h2>
                <img
                  src={review.film.poster}
                  alt={review.film.title}
                  style={{ width: "100px", height: "auto" }}
                />
                <h2>{review.film.title}</h2>
                <p>{review.body}</p>
              </Grid>
            ))}
        </Grid>
      </div>

      {/* {reviews && <ReviewCarousel reviews={reviews} />} */}
    </>
  );
}

export default ReviewList;
