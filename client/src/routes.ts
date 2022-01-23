import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Home from "@/pages/Home.vue";
import Collection from "@/pages/Collection.vue";
import Item from "@/pages/Item.vue";
import { isLoggedIn } from "./graphql/client";

const routes = [
  {
    name: "Login",
    path: "/login",
    component: Login
  },
  {
    name: "Register",
    path: "/register",
    component: Register
  },
  {
    name: "Home",
    path: "/",
    component: Home
  },
  {
    name: "Collection",
    path: "/collection/:id",
    component: Collection
  },
  {
    name: "Item",
    path: "/collection/:collectionId/:id",
    component: Item
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _from, next) => {
  const loggedRoutes = ["Home", "Collection", "Item"];
  const unloggedRoutes = ["Login", "Register"];

  if (isLoggedIn() && unloggedRoutes.includes(to.name?.toString() || "")) {
    next({ name: "Home" });
    return;
  } else if (
    !isLoggedIn() &&
    loggedRoutes.includes(to.name?.toString() || "")
  ) {
    next({ name: "Login" });
    return;
  }
  next();
});

export default router;
