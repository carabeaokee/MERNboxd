import { createContext, useState } from "react";
import React from "react";

interface AuthContextType {
  user: User | null;
  loginUser: (email: string, password: string) => void;
  registerUser: (email: string, password: string, username: string) => void;
  logoutUser: () => void;
}

const defaultValue: AuthContextType = {
  user: null,
  loginUser: () => {
    throw Error("login function not implemented");
  },
  registerUser: () => {
    throw Error("signup function not implemented");
  },
  logoutUser: () => {
    throw Error("logout function not implemented");
  },
};
export const AuthContext = createContext(defaultValue);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Define the login function
  const loginUser = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      setUser(data.user); // Update the user state
    } catch (error) {
      console.error("Error during login: ", error);
      setUser(null); // Reset the user state
    }
  };

  // Define the signup function
  const registerUser = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error("Error during signup: ", error);
    }
  };

  const logoutUser = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setUser(null);
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
