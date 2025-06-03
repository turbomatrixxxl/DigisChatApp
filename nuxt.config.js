export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  target: "static",
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  css: ["~/assets/styles/tailwind.css", "~/assets/styles/variables.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    baseURL: "/DigisChatApp/",
  },
  runtimeConfig: {
    public: {
      baseURL: "/DigisChatApp/",
    },
  },
  vite: {
    optimizeDeps: {
      include: ["emoji-picker-element"],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      fallback: "404.html",
    },
  },
});
