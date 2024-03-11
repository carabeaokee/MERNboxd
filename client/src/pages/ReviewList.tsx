import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

type Review = {
  _id: string;
  author: {
    _id: string;
    username: string;
  };
  body: string;
  film: {
    _id: string;
    title: string;
  };
};

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
      <div>
        {reviews.map((review) => (
          <div
            key={review._id}
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: "10px",
            }}
          >
            <p>
              <strong>{review.author.username}</strong>
            </p>
            <p>
              <em>{review.body}</em>
            </p>
            <h2>{review.film.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default ReviewList;
