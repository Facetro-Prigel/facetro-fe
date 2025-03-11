import { reactive } from "vue";
import { io } from "socket.io-client";
export const state = reactive({
  connected: true,
  rejectUnauthorized: false,
});
const BASE_URL = import.meta.env.VITE_BACKEND_API

// "undefined" means the URL will be computed from the `window.location` object
const URL = BASE_URL.slice(0, -1);
// const URL = "http://localhost:3000";

export const socket = io(URL);

socket.on("connect", (s) => {
  state.connected = true;
  console.info("connection")
});

socket.on("disconnect", () => {
  state.connected = false;
});
socket.on("connect_error", (err) => {
  console.info(err.req);      // the request object
  console.info(err.code);     // the error code, for example 1
  console.info(err.message);  // the error message, for example "Session ID unknown"
  console.info(err.context); 
});