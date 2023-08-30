/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { VDatePicker } from "vuetify/lib/labs/components.mjs";
import "../styles/settings.scss";
// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#1867C0",
          secondary: "#5CBBF6",
          gray: "#1B1F23",
          graylite: "#212121",
        },
      },
    },
  },
  components: {
    VDatePicker,
  },
});
