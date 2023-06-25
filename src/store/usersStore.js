import { defineStore } from "pinia";
import { getFollowingUsers } from "@/api/followings";

export const usersStore = defineStore("users", {
  state: () => ({
    followingUsers: {},
  }),
  actions: {
    async fetchFollowings() {
      await getFollowingUsers().then((res) => {
        this.followingUsers = res.data;
      });
    },
  },
});
