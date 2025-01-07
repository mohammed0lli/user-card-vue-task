import "./assets/main.css";
import "font-awesome/css/font-awesome.min.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./stores";

const app = createApp(App);

app.use(router);
app.use(store);
app.mount("#app");
