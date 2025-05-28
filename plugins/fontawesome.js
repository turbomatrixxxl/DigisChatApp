import "@fortawesome/fontawesome-svg-core/styles.css";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// Dezactivează auto-includerea CSS care dă erori SSR
config.autoAddCss = false;

library.add(faGithub, faLinkedin, faMagnifyingGlass);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
