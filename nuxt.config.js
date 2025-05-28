// nuxt.config.js
// nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  css: ["~/assets/styles/tailwind.css", "~/assets/styles/variables.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    baseURL: "/DigisChatApp/", // static base URL for router
  },
  runtimeConfig: {
    public: {
      baseURL: "/DigisChatApp/", // same base URL accessible in the app as runtime config
    },
  },
  vite: {
    optimizeDeps: {
      include: ["emoji-picker-element"],
    },
  },
});
