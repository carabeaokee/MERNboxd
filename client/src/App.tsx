// import { useEffect, useState } from "react";
import { useEffect } from "react";
import "./App.css";
import SignIn from "./sign up-out-in/Log-in";
import Registration from "./sign up-out-in/Registration";

// interface User {
//   _id: number;
//   email: string;
//   password: string;
// }

function App() {
  //   const [user, setUser] = useState<User[] | null>(null);

  //   useEffect(() => {
  //     const fetchData = async () => {};
  //     fetchData();
  //   }, []);

  const getData = async () => {
    const response = await fetch("localhost:5004/api/users/allusers");
    const result = await response.json();
    console.log("result", result);
  };
  useEffect(() => {
    // var requestOptions = {
    //   method: "GET",
    //   redirect: "follow",
    // };

    // fetch("localhost:5005/api/users/allusers")
    //   .then((response) => response.json())
    //   .then((result) => console.log("result", result))
    //   .catch((error) => console.log("error", error));
    getData();
  }, []);

  return (
    <>
      {/* <h1>Test</h1> */}
      <SignIn />
      <Registration />
    </>
  );
}

export default App;
