import Registration from "../sign up-out-in/Registration";
import SignIn from "../sign up-out-in/Log-in";
import Profile from "../pages/UserProfile";
import Error from "../pages/Error";
import DetailsPage from "../pages/DetailsPage";
import ReviewList from "../pages/ReviewList";
import FilmList from "../pages/FilmList";
import LandingPage from "../pages/LandingPage";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import SearchResults from "./SearchResults";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/allfilms",
    element: <FilmList />,
  },
  {
    path: "/allreviews",
    element: <ReviewList />,
  },
  {
    path: "/:id",
    element: <DetailsPage />,
  },

  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  // {
  //   path: "/filter",
  //   element: <SearchResults />,
  // },
  {
    path: "*",
    element: <Error />,
  },

  {
    path: "/error",
    element: <Error />,
  },
]);

function PageRoutes() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default PageRoutes;
