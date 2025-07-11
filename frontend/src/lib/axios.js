import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chatty-9yjz.onrender.com/api",
  withCredentials: true,
});
