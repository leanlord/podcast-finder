import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthView from "@/views/AuthView";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "auth",
    component: AuthView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");
  // redirect to auth page if not authorized
  if (!token && to.name !== "auth") {
    router.push("/login").catch(() => {});
  }
  // redirect to home page if trying to reach auth page while authorized
  if (token && to.name === "auth") {
    router.push("/").catch(() => {});
  }
  next();
});

export default router;
