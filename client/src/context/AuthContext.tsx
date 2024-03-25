import { createContext, useState, ReactNode } from "react";
import React from "react";

interface AuthContextType {
  logoutUser: () => void;
  getToken: () => void;
  setUserCredentials: (userId: string) => void;
  userId: string;
  isLoading: boolean;
  // admin: boolean;
}

const defaultValue: AuthContextType = {
  logoutUser: () => {},
  getToken: () => {},
  setUserCredentials: () => {},
  userId: "",
  isLoading: false,
  // admin: false,
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

type AuthContextProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const setUserCredentials = (userId: string) => {
    setUserId(userId);
  };

  const getToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    }
  };

  const logoutUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("found token - removing token");
      localStorage.removeItem("token");
      setUserCredentials("");
    } else {
      console.log("Must be logged in to log out");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        getToken,
        isLoading,
        logoutUser,
        setUserCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
