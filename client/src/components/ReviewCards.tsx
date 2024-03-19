// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCol,
//   MDBContainer,
//   MDBIcon,
//   MDBRow,
// } from "mdb-react-ui-kit";
// import "../css/reviewlist.css";
// import "mdb-react-ui-kit/dist/css/mdb.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// type Review = {
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
//   };
// };
// interface ReviewCardProps {
//   review: Review;
// }

// export default function ReviewCards({ review }: ReviewCardProps) {
//   return (
//     <MDBContainer
//       fluid
//       className="py-5"
//       style={{
//         backgroundColor: "darkolivegreen",
//         color: "black",
//         marginTop: "8rem",
//       }}
//     >
//       <MDBRow className="d-flex justify-content-center">
//         <MDBCol md="10" xl="8" className="text-center">
//           <h3 className="fw-bold mb-4">Reviews for {review.film.title}</h3>
//           <p className="mb-4 pb-2 mb-md-5 pb-md-0">
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
//             error amet numquam iure provident voluptate esse quasi, veritatis
//             totam voluptas nostrum quisquam eum porro a pariatur veniam.
//           </p>
//         </MDBCol>
//       </MDBRow>
//       <MDBRow className="text-center">
//         <MDBCol md="4" className="mb-4 mb-md-0">
//           <MDBCard>
//             <MDBCardBody className="py-4 mt-2">
//               <div className="d-flex justify-content-center mb-4">
//                 <img
//                   src={review.author.avatar}
//                   className="rounded-circle shadow-1-strong"
//                   width="100"
//                   height="100"
//                 />
//               </div>
//               <h5 className="font-weight-bold">{review.author.username}</h5>

//               <p className="mb-2">
//                 <MDBIcon fas icon="quote-left" className="pe-2" />
//                 {review.body}
//               </p>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// }
