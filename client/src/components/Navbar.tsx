import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Outlinedcircles from "../assets/icons/outlinedcircles.svg";
import Accountavatar from "../assets/icons/accountavatar.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

// Navbar component that appears at the top of the page
export default function Navbar({ children }) {
  // State for storing the search text
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // Hook for navigating to a different page
  const navigate = useNavigate();

  // useEffect hook to fetch search results
  useEffect(() => {
    // Variable to ignore the fetch response if the component is unmounted
    let ignore = false;

    // If the search text is not empty, fetch the search results
    if (searchText.length > 0) {
      fetch(`/api/films/filter?text=${searchText}`)
        .then((response) => {
          // Check if the response is ok
          if (!response.ok) {
            // If the response is not ok, throw an error
            throw new Error("Network response was not ok");
          }
          // Parse the JSON response
          return response.json();
        })
        // Set the search results
        .then((data) => {
          // If the component is unmounted, do not set the search results
          if (!ignore) setSearchResults(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // If the search text is empty, clear the search results
      setSearchResults([]);
    }

    // Return a cleanup function
    return () => {
      // When the component is unmounted, set the ignore variable to true
      ignore = true;
    };
  }, [searchText]);

  // Function to handle the form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Navigate to the filter page with the search text as a query parameter
    // navigate(`/filter?text=${searchText}`);
  };

  // const cloneChildren = React.Children.forEach(children, (child) => {
  //   console.log("child", child);
  //   // return React.cloneElement(child, { searchText });
  //   clonedChildren = child.props.children.map((child) => {
  //     return React.cloneElement(child, { searchText });
  //   });
  // });

  // console.log("clonedChildren", clonedChildren);

  return (
    <>
      <AppBar
        position="fixed"
        style={{ backgroundColor: "transparent", width: "100%" }}
      >
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <img
              src={Outlinedcircles}
              alt="circles"
              style={{
                width: "1.5rem",
                height: "1.5rem",
                paddingRight: "0.5rem",
                marginTop: "0.4rem",
                filter: "invert(100%)",
              }}
            />
            <Typography variant="h6" component="div">
              <RouterLink
                to="/"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontSize: 24,
                }}
              >
                Filmboxd
              </RouterLink>
            </Typography>
          </Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/allfilms"
            style={{ fontSize: "16px", paddingRight: "1rem" }}
          >
            Films
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/allreviews"
            style={{ fontSize: "16px", paddingRight: "1rem" }}
          >
            Reviews
          </Button>
          <form onSubmit={handleSearchSubmit}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
              />
              <Button type="submit" style={{ color: "white" }}>
                Search
              </Button>
            </Search>
          </form>
          <IconButton color="inherit" component={RouterLink} to="/profile">
            <Avatar
              alt="Profile"
              src={Accountavatar}
              style={{
                filter: "invert(100%)",
                padding: "0.3rem",
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* {clonedChildren} */}
      {children}
    </>
  );
}
