// import React from "react";
// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCol,
//   MDBContainer,
//   MDBIcon,
//   MDBRow,
// } from "mdb-react-ui-kit";

// export type Review = {
//   _id: string;
//   author: {
//     _id: string;
//     username: string;
//     avatar: string;
//   };
//   body: string;
//   film: {
//     _id: string;
//     title: string;
//     year: string;
//     director: string;
//     synopsis: string;
//     poster: string;
//   };
// };

// export interface ReviewCardProps {
//   reviews: Review[];
// }

// export default function ReviewCards2({ reviews }: ReviewCardProps) {
//   return (
//     <MDBContainer className="py-5">
//       <MDBRow className="d-flex justify-content-center">
//         <MDBCol md="10" xl="8" className="text-center">
//           <h2 className="mb-4">{reviews[0].film.title}</h2>
//           <h3 className="mb-4">{reviews[0].film.year}</h3>
//           <p className="mb-4 pb-2 mb-md-5 pb-md-0">
//             {reviews[0].film.synopsis}
//           </p>
//         </MDBCol>
//       </MDBRow>
//       <MDBRow className="text-center d-flex align-items-stretch">
//         {reviews.map((review, index) => (
//           <MDBCol
//             key={index}
//             md="4"
//             className="mb-5 mb-md-0 d-flex align-items-stretch"
//           >
//             <MDBCard className="testimonial-card">
//               <div
//                 className="card-up"
//                 style={{ backgroundColor: "#9d789b" }}
//               ></div>
//               <div className="avatar mx-auto bg-white">
//                 <img
//                   src={review.author.avatar}
//                   className="rounded-circle img-fluid"
//                 />
//               </div>
//               <MDBCardBody>
//                 <h4 className="mb-4">{review.author.username}</h4>
//                 <hr />
//                 <p className="dark-grey-text mt-4">
//                   <MDBIcon fas icon="quote-left" className="pe-2" />
//                   {review.body}
//                 </p>
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>
//         ))}
//       </MDBRow>
//     </MDBContainer>
//   );
// }

// export default function ReviewCards2({ reviews }: ReviewCardProps) {
//   // Group reviews by film id
//   const reviewsByFilm = reviews.reduce((acc, review) => {
//     const key = review.film._id;
//     if (!acc[key]) {
//       acc[key] = [];
//     }
//     acc[key].push(review);
//     return acc;
//   }, {} as { [key: string]: Review[] });

//   // Convert the object to an array of review arrays
//   const groupedReviews = Object.values(reviewsByFilm);

//   return (
//     <MDBContainer className="py-5">
//       {groupedReviews.map((group, index) => (
//         <React.Fragment key={index}>
//           <MDBRow className="d-flex justify-content-center">
//             <MDBCol md="10" xl="8" className="text-center">
//               <h2 className="mb-4">{group[0].film.title}</h2>
//               <h3 className="mb-4">{group[0].film.year}</h3>
//               <div className="avatar mx-auto bg-white">
//                 <img
//                   src={group[0].film.poster}
//                   className="rounded-circle img-fluid"
//                   style={{ height: "200px", width: "auto" }}
//                 />
//               </div>
//               <p className="mb-4 pb-2 mb-md-5 pb-md-0">
//                 {group[0].film.synopsis}
//               </p>
//             </MDBCol>
//           </MDBRow>
//           <MDBRow className="text-center d-flex align-items-stretch">
//             {group.map((review, index) => (
//               <MDBCol
//                 key={index}
//                 md="4"
//                 className="mb-5 mb-md-0 d-flex align-items-stretch"
//               >
//                 <MDBCard className="testimonial-card">
//                   <div
//                     className="card-up"
//                     style={{ backgroundColor: "#9d789b" }}
//                   ></div>
//                   <div className="avatar mx-auto bg-white">
//                     <img
//                       src={review.author.avatar}
//                       className="rounded-circle img-fluid"
//                       style={{ height: "200px", width: "auto" }}
//                     />
//                   </div>
//                   <MDBCardBody>
//                     <h4 className="mb-4">{review.author.username}</h4>
//                     <hr />
//                     <p className="dark-grey-text mt-4">
//                       <MDBIcon fas icon="quote-left" className="pe-2" />
//                       {review.body}
//                     </p>
//                   </MDBCardBody>
//                 </MDBCard>
//               </MDBCol>
//             ))}
//           </MDBRow>
//         </React.Fragment>
//       ))}
//     </MDBContainer>
//   );
// }

import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";

export type Review = {
  _id: string;
  author: {
    _id: string;
    username: string;
    avatar: string;
  };
  body: string;
  film: {
    _id: string;
    title: string;
    year: string;
    director: string;
    synopsis: string;
    poster: string;
  };
};

export interface ReviewCardProps {
  reviews: Review[];
}

export default function ReviewCards2({ reviews }: ReviewCardProps) {
  // if (!Array.isArray(reviews)) {
  //     console.error('reviews is not an array');
  //     return null;
  //   }
  if (reviews.length === 0) {
    return <p>No reviews available.</p>;
  }
  return (
    <div>
      {reviews.map((review, index) => (
        <MDBContainer
          key={index}
          fluid
          className="p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded"
          style={{
            backgroundColor: "grey",
          }}
        >
          <MDBRow className="d-flex justify-content-center">
            <MDBCol md="10">
              <MDBCard>
                <MDBCardBody className="m-3">
                  <MDBRow>
                    <MDBCol
                      lg="4"
                      className="d-flex justify-content-center align-items-center mb-4 mb-lg-0"
                    >
                      <img
                        src={review.author.avatar}
                        className="rounded-circle img-fluid shadow-1"
                        alt="user avatar"
                        width="200"
                        height="200"
                      />
                    </MDBCol>
                    <MDBCol lg="8">
                      {" "}
                      <p className="text-muted fw-light mb-4">{review.body}</p>
                      <p className="fw-bold lead mb-2">
                        <strong>{review.author.username}</strong>
                      </p>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      ))}
    </div>
  );
}
