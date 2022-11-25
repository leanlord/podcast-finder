import Echo from "laravel-echo";

window.io = require("socket.io-client");

export const createInstance = () => {
  const echoInstance = new Echo({
    broadcaster: "socket.io",
    host: "http://localhost:3000/",
    auth: {
      params: {
        withCredentials: true,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
    transports: ["websocket"],
  });
};
