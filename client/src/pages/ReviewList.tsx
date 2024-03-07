import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

type Review = {
  _id: string;
  author: string;
  body: string;
  film: string;
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
          <div key={review._id}>
            <h2>{review.author}</h2>
            <p>{review.body}</p>
            <p>{review.film}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ReviewList;
