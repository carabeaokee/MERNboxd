// import React from "react";
// import {
//   MDBCarousel,
//   MDBCarouselItem,
//   MDBCol,
//   MDBIcon,
//   MDBTypography,
//   MDBContainer,
//   MDBRow,
// } from "mdb-react-ui-kit";
// import "../css/carousel.css";
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
//     poster: string;
//   };
// };

// export default function ReviewCarousel({ reviews }: { reviews: Review[] }) {
//   return (
//     <MDBContainer className="py-5">
//       <MDBCarousel showControls dark>
//         {reviews.map((review) => (
//           <MDBCarouselItem key={review._id}>
//             <MDBContainer>
//               <MDBRow className="text-center">
//                 <MDBCol lg="4" className="mb-5 mb-md-0">
//                   <div className="d-flex justify-content-center mb-4">
//                     <img
//                       src={review.author.avatar}
//                       className="rounded-circle shadow-1-strong"
//                       width="150"
//                       height="150"
//                     />
//                   </div>
//                   <h5 className="mb-3">{review.author.username}</h5>
//                   <h6 className="text-primary mb-3">{review.film.title}</h6>
//                   <div className="d-flex justify-content-center mb-4">
//                     <img
//                       src={review.film.poster}
//                       className="rounded-circle shadow-1-strong"
//                       width="150"
//                       height="150"
//                     />
//                   </div>
//                   <p className="px-xl-3">
//                     <MDBIcon fas icon="quote-left" className="pe-2" />
//                     {review.body}
//                   </p>
//                   <MDBTypography
//                     listUnStyled
//                     className="d-flex justify-content-center mb-0"
//                   >
//                     <li>
//                       <MDBIcon
//                         fas
//                         icon="star"
//                         size="sm"
//                         className="text-warning"
//                       />
//                     </li>
//                     <li>
//                       <MDBIcon
//                         fas
//                         icon="star"
//                         size="sm"
//                         className="text-warning"
//                       />
//                     </li>
//                     <li>
//                       <MDBIcon
//                         fas
//                         icon="star"
//                         size="sm"
//                         className="text-warning"
//                       />
//                     </li>
//                     <li>
//                       <MDBIcon
//                         fas
//                         icon="star"
//                         size="sm"
//                         className="text-warning"
//                       />
//                     </li>
//                     <li>
//                       <MDBIcon
//                         fas
//                         icon="star"
//                         size="sm"
//                         className="text-warning"
//                       />
//                     </li>
//                   </MDBTypography>
//                 </MDBCol>
//               </MDBRow>
//             </MDBContainer>
//           </MDBCarouselItem>
//         ))}
//       </MDBCarousel>
//     </MDBContainer>
//   );
// }

// import React from "react";
// import {
//   MDBCarousel,
//   MDBCarouselItem,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBIcon,
// } from "mdb-react-ui-kit";
// import "../css/carousel.css";
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
//     poster: string;
//   };
// };

// export default function ReviewCarousel({ reviews }: { reviews: Review[] }) {
//   return (
//     <MDBContainer className="my-5">
//       <MDBCarousel showControls dark>
//       {reviews.map((review) => (
//           <MDBCarouselItem key={review.film._id}>
//           <img
//             src={review.film.poster}
//             alt="film poster"
//             className="rounded-circle shadow-1-strong mb-4"
//             style={{ width: "150px" }}
//           />
//           <MDBRow className="d-flex justify-content-center">
//             <MDBCol lg="8">
//               <h5 className="mb-3">{review.film.title}</h5>
//               <p className="text-muted">
//                 <MDBIcon fas icon="quote-left" className="pe-2" />
//                 {review.body}
//               </p>
//         <p>{review.author.username}</p>
//         <img
//             src={review.author.avatar}
//             alt="user avatar"
//             className="rounded-circle shadow-1-strong mb-4"
//             style={{ width: "150px" }}
//           />
//             </MDBCol>
//           </MDBRow>
//           <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
//             <li>
//               <MDBIcon fas icon="star" size="sm" />
//             </li>
//             <li>
//               <MDBIcon fas icon="star" size="sm" />
//             </li>
//             <li>
//               <MDBIcon fas icon="star" size="sm" />
//             </li>
//             <li>
//               <MDBIcon fas icon="star" size="sm" />
//             </li>
//             <li>
//               <MDBIcon far icon="star" size="sm" />
//             </li>
//           </ul>
//         </MDBCarouselItem>
//       </MDBCarousel>
//     </MDBContainer>
//   );
// }
