import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

export const echoInstance = new Echo({
  broadcaster: "pusher",
  host: "http://localhost/",
  authEndpoint: "http://localhost/broadcasting/auth",
  key: "4da1da4746eb8d09e76e",
  transport: ["websocket"],
  cluster: "eu",
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  },
  forceTLS: true,
});
