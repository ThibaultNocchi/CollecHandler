import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/routes";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "@/styles/default.css";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import FullscreenLayout from "@/layouts/FullscreenLayout.vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import apolloClient from "./graphql/client";

loadFonts();

createApp(App)
  .use(router)
  .use(vuetify)
  .provide(DefaultApolloClient, apolloClient)
  .component("DefaultLayout", DefaultLayout)
  .component("FullscreenLayout", FullscreenLayout)
  .mount("#app");
