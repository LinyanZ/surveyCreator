import http from "./http";

const login = (user) => {
  return http.post("users/login", user);
};

const logout = () => {
  return http.post("users/logout");
};

const register = (user) => {
  return http.post("users/register", user);
};

export { login, logout, register };
