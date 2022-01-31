import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/routes";
import urql from "@urql/vue";
import client from "./graphql/client";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "@/styles/default.css";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import FullscreenLayout from "@/layouts/FullscreenLayout.vue";

loadFonts();

createApp(App)
  .use(router)
  .use(vuetify)
  .use(urql, client)
  .component("DefaultLayout", DefaultLayout)
  .component("FullscreenLayout", FullscreenLayout)
  .mount("#app");
