import { defineConfig } from "vite";

import solid from "vite-plugin-solid";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [solid(), dts()],
  build: {
    target: "esnext",
    minify: true,
    lib: {
      entry: ["src/index.ts"],
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: ["solid-js", "@tanstack/solid-query"],
    },
  },
});
