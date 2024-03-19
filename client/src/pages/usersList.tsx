import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

// define the type of the film object
type User = {
  _id: string;
  username: string;
  avatar: string;
};

// define the type of the films array
function UsersList() {
  const [allusers, setAllUsers] = useState<User[]>([]);

  // fetch the data from the server
  const getData = async () => {
    const response = await fetch("http://localhost:5004/api/users/allusers");
    const result = await response.json();
    console.log("result", result);
    // set the films state to the array of films from the server
    setAllUsers(result);
  };
  // call the getData function when the component is first rendered
  useEffect(() => {
    getData();
  }, []);

  // render the users array
  return (
    <>
      <div style={{ padding: "3rem" }}>
        <Grid container spacing={3}>
          {allusers.map((user) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={user._id}
              style={{ color: "whitesmoke" }}
            >
              <img
                src={user.avatar}
                alt={user.username}
                style={{ width: "200px", height: "auto" }}
              />

              <h2>{user.username} </h2>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default UsersList;
