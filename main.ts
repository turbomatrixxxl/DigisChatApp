import { createApp } from "vue";
import App from "./app.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPaperclip,
  faSmile,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

library.add(faPaperclip, faSmile, faPaperPlane);

const app = createApp(App);

app.config.errorHandler = (err, instance, info) => {
  console.error("Vue Global Error:", err);
  console.error("Component Instance:", instance);
  console.error("Info:", info);
};

app.config.compilerOptions.isCustomElement = (tag) => tag === "emoji-picker";

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
