import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
// import styles from "../css/login.module.css";
import "../css/login.css";

const SignIn = () => {
  // const { user, loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { setUserCredentials } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("logging in");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow" as RequestRedirect,
    };
    try {
      const response = await fetch(
        "http://localhost:5004/api/users/login",
        requestOptions
      );
      const result = await response.json();
      console.log("result :>> ", result);
      if (result.error) {
        setError(result.error);
        return;
      }
      const { token, _id } = result;
      console.log(result);
      if (token) {
        console.log("Token being set", token);
        localStorage.setItem("token", token);
      }
      if (_id) {
        setUserCredentials(_id);
        navigate(`/profile/${_id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <div
            style={{
              marginBottom: "1rem",
              backgroundColor: "grey",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          >
            {/* Lock icon can be added here */}
          </div>
          <h2 style={{ color: "white" }}>Login</h2>
          <div style={{ marginTop: "1rem", width: "100%" }}>
            <input
              className="login-input"
              required
              id="email"
              placeholder="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="login-input"
              required
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button className="login-button" onClick={handleLogin}>
              Login
            </button>
            <div className="flex-end">
              <a href="/register" style={{ color: "lightgray" }}>
                Don't have an account? Sign-up
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
