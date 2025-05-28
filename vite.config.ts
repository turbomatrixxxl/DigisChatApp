import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    exclude: ["vue3-spinner"],
  },
  ssr: {
    noExternal: ["vue3-spinner"],
  },
});
