import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User profile has mounted");
    const getUserProfile = async () => {};
    getUserProfile();
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <>
      <div>
        <h1> Welcome</h1>
      </div>
      <div className="flex flex-row justify-center">
        <button onClick={handleLogout}>logout</button>
      </div>
    </>
  );
};

export default Profile;
