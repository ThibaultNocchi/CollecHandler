import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized
} from "vue-router";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Home from "@/pages/Home.vue";
import Collection from "@/pages/Collection.vue";
import Item from "@/pages/Item.vue";
import AddItem from "@/pages/AddItem.vue";
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
  },
  {
    name: "AddItem",
    path: "/additem",
    component: AddItem,
    meta: { layout: "DefaultLayout" }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const isLoggedRoute = (route: RouteLocationNormalized) =>
  ["Home", "Collection", "Item"].includes(route.name?.toString() || "");

const isUnloggedRoute = (route: RouteLocationNormalized) =>
  ["Login", "Register"].includes(route.name?.toString() || "");

router.beforeEach((to, from) => {
  if (isLoggedRoute(to) && !isLoggedIn()) {
    if (!from.name) return { name: "Login" };
    else return false;
  } else if (isUnloggedRoute(to) && isLoggedIn()) {
    if (!from.name) return { name: "Home" };
    else return false;
  }
});

export default router;
