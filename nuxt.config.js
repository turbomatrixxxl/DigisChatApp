export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: true, // 🟡 important pentru GitHub Pages
  target: "static", // 🟡 sau folosește generate
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  css: ["~/assets/styles/tailwind.css", "~/assets/styles/variables.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    baseURL: "/",
  },
  runtimeConfig: {
    public: {
      baseURL: "/",
    },
  },
  vite: {
    optimizeDeps: {
      include: ["emoji-picker-element"],
    },
  },
});
