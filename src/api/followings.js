import instance from "@/api/http";

export const getFollowingUsers = () => instance.get("friends");
