import { createApp } from "vue";
import router from "./router";
import store from "./store";
import appAxios from "./utils/appAxios";

import "./assets/index.css";
import appNavbar from "./components/shared/appNavbar.vue";
import App from "./App.vue";

createApp(App)
  .use(store)
  .use(router)
  .component("appNavbar", appNavbar)
  .mount("#app");
