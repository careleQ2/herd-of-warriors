import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: "netlify",
  },

  tanstackStart: {
    server: {
      entry: "server",
    },
  },

  vite: {
    build: {
      outDir: "dist",
    },
    server: {
      cors: true,
    },
  },
});