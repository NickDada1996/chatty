import { io } from "socket.io-client";
export const socket = io("https://chatty-9yjz.onrender.com", {
  withCredentials: true,
});