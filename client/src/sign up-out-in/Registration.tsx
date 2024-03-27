import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/rego.css";
import Lock from "../assets/icons/lock.svg";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("rego-page");

    return () => {
      document.body.classList.remove("rego-page");
    };
  }, []);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("registering");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow" as RequestRedirect,
    };

    fetch("http://localhost:5004/api/users/register", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result._id) {
          navigate(`/profile/${result._id}`); // Redirect to profile page
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="rego-page">
        <div className="rego-container">
          <div
            style={{
              marginBottom: "0.2rem",
              backgroundColor: "white",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          >
            {" "}
            <img src={Lock} alt="lock" style={{ marginTop: "3px" }} />
          </div>

          <h2 style={{ color: "white", fontFamily: "arial", fontSize: "28px" }}>
            Sign Up
          </h2>
          <div style={{ marginTop: "1rem", width: "100%" }}>
            <input
              className="rego-input"
              required
              id="username"
              name="username"
              placeholder="Username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="rego-input"
              required
              id="email"
              placeholder="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="rego-input"
              required
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="rego-input"
              required
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="rego-button"
              onClick={handleRegister}
              style={{ fontSize: "19px" }}
            >
              Register
            </button>
            <div className="flex-end">
              <a
                href="/signin"
                style={{
                  color: "white",
                  fontFamily: "helvetica",
                  fontSize: "20px",
                  marginTop: "10px",
                }}
              >
                Already have an account? Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
