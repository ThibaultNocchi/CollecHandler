import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/routes";
import urql from "@urql/vue";
import client from "./graphql/client";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "@/styles/default.css";

loadFonts();

createApp(App).use(router).use(vuetify).use(urql, client).mount("#app");
