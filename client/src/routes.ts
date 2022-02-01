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
    component: Login,
    meta: { layout: "FullscreenLayout" }
  },
  {
    name: "Register",
    path: "/register",
    component: Register,
    meta: { layout: "FullscreenLayout" }
  },
  {
    name: "Home",
    path: "/",
    component: Home,
    meta: { layout: "DefaultLayout" }
  },
  {
    name: "Collection",
    path: "/collection/:id",
    component: Collection,
    meta: { layout: "DefaultLayout" }
  },
  {
    name: "Item",
    path: "/collection/:collectionId/:id",
    component: Item,
    meta: { layout: "DefaultLayout" }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _from) => {
  const forceLoggedRoutes = ["Home", "Collection", "Item"];
  const forceUnloggedRoutes = ["Login", "Register"];

  if (isLoggedIn() && forceUnloggedRoutes.includes(to.name?.toString() || "")) {
    return false;
  } else if (
    !isLoggedIn() &&
    forceLoggedRoutes.includes(to.name?.toString() || "")
  ) {
    return false;
  }
});

export default router;
