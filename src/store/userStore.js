import { defineStore } from "pinia";
import { logoutUser } from "@/api/user";
import router from "@/router";

export const userStore = defineStore("user", {
  state: () => ({
    currentUser: {},
  }),
  actions: {
    async logoutUser() {
      await logoutUser().then(() => {
        localStorage.removeItem("token");
        router.push("/login");
      });
    },
  },
});
