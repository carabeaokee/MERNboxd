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
import SearchResults from "./components/SearchResults";
import UsersList from "./pages/usersList";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/filter" element={<SearchResults />} />
              <Route path="/allusers" element={<UsersList />} />
              <Route path="/allfilms" element={<FilmList />} />
              <Route path="/allreviews" element={<ReviewList />} />
              <Route path="/id/:id" element={<DetailsPage />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/error" element={<Error />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Navbar>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
