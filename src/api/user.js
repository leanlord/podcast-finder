import instance from "@/api/http";

export const authUser = (payload) => instance.post("login", payload);

export const logoutUser = () => instance.post("logout", {});
