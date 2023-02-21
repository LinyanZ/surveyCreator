import React, { useContext, useEffect, useState } from "react";

const authContext = React.createContext(null);

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(window.localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const setUserIncludingLocalStorage = (user) => {
    if (user) window.localStorage.setItem("user", JSON.stringify(user));
    else window.localStorage.removeItem("user");
    setUser(user);
  };

  return (
    <authContext.Provider
      value={[user, setUserIncludingLocalStorage]}
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
