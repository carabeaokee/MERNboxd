import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
// import styles from "../css/login.module.css";
import "../css/login.css";
import Lock from "../assets/icons/lock.svg";

const SignIn = () => {
  // const { user, loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.classList.add("login-page");

    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

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
              marginBottom: "0.2rem",
              backgroundColor: "white",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          >
            <img src={Lock} alt="lock" style={{ marginTop: "3px" }} />
          </div>
          <h2 style={{ color: "white", fontFamily: "arial", fontSize: "28px" }}>
            Log In
          </h2>
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
            <div className="flex-end" style={{ margin: "20px" }}>
              <a
                href="/register"
                style={{
                  color: "white",
                  fontFamily: "helvetica",
                  fontSize: "18px",
                  marginTop: "10px",
                }}
              >
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
