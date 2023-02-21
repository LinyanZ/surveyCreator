import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/api/",
  timeout: 1000,
  withCredentials: true,
});

export default instance;
