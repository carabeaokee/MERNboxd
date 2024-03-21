import { useEffect, useState } from "react";
import ReviewCards2 from "../components/ReviewCards2";
import { Review } from "../components/ReviewCards2";

function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const response = await fetch(
      "http://localhost:5004/api/reviews/allreviews"
    );
    const result = await response.json();
    console.log("result", result);
    setReviews(result.reviews);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ReviewCards2 reviews={reviews} />
    </>
  );
}

export default ReviewList;
