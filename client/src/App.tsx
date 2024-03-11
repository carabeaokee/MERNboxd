import "./App.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";
// import { useRoutes } from 'react-router-dom';
import { Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import FilmList from "./pages/FilmList";
import ReviewList from "./pages/ReviewList";
import DetailsPage from "./pages/DetailsPage";
import SignIn from "./sign up-out-in/Log-in";
import Registration from "./sign up-out-in/Registration";
import Profile from "./pages/UserProfile";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
// import PageRoutes from "./components/Routes";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/allfilms" element={<FilmList />} />
          <Route path="/allreviews" element={<ReviewList />} />
          <Route path="/:id" element={<DetailsPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
      <h1>Test</h1>
      {/* <SignIn /> */}
      {/* <Registration /> */}
      {/* <DetailsPage /> */}
      {/* <a href={`/films/${film._id}`}> */}
      {/* <h1>Test</h1> */}
      {/* <SignIn /> */}
      {/* <Registration /> */}
      {/* <DetailsPage /> */}
    </>
  );
}

export default App;
