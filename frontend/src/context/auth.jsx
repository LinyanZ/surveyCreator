import React, { useContext, useState } from "react";
import http from "../api/http";

const authContext = React.createContext(null);

const AuthProvider = (props) => {
  const [user, setUser] = useState(() => {
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) return JSON.parse(storedUser);
    return null;
  });

  const logout = async () => {
    window.localStorage.removeItem("user");
    setUser(null);
    try {
      await http.post("users/logout");
    } catch (e) {
      console.log(e);
    }
  };

  const register = async (payload) => {
    try {
      const result = await http.post("users/register", payload);
      if (result.status === 200) {
        window.localStorage.setItem("user", JSON.stringify(result.data));
        setUser(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const login = async (payload) => {
    console.log("test");
    try {
      const result = await http.post("users/login", payload);
      console.log(result);
      if (result.status === 200) {
        window.localStorage.setItem("user", JSON.stringify(result.data));
        setUser(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <authContext.Provider
      value={{ user, login, logout, register }}
      {...props}
    />
  );
};

const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw Error('"useAuth" must be used in a AuthProvider.');
  return context;
};

export { AuthProvider, useAuth };
