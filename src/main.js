/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import router from "./router";
import axios from "axios";
// Plugins
import { registerPlugins } from "@/plugins";

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

pinia.use(createPersistedState);

const app = createApp(App);

registerPlugins(app);

app.use(pinia);
app.use(router);
app.mount("#app");
