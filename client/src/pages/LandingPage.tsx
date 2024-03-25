import React from "react";
import "../css/landing.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Outlinedcircles from "../assets/icons/outlinedcircles.svg";

function LandingPage() {
  useEffect(() => {
    document.body.classList.add("landing-page");

    return () => {
      document.body.classList.remove("landing-page");
    };
  }, []);

  return (
    <>
      <div className="landing-page-content">
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: "20px",
            color: "white",
            position: "absolute",
            top: "55%",
            left: "15%",
            right: "15%",
            bottom: "7%",
          }}
        >
          <br />
          <h1 style={{ fontFamily: "FatFace" }}>
            Track films you’ve watched.
            <br />
            Save those you want to see.
            <br />
            Tell your friends what’s good.
          </h1>
          <br />
          <Link to="/register">
            <button
              style={{
                backgroundColor: "green",
                color: "white",
              }}
            >
              <img
                src={Outlinedcircles}
                alt="circles"
                style={{
                  width: "1.5rem",
                  height: "1rem",
                  paddingRight: "0.5rem",
                  marginBottom: "-0.1rem",
                  filter: "invert(100%)",
                }}
              />
              GET STARTED - IT'S FREE
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
