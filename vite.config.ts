// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "Countdown3D",
      formats: ["es"], // ✅ ONLY ESM
      fileName: () => "index.js",
    },
    rollupOptions: {
      external: ["react", "react-dom"], // ✅ Do NOT bundle React
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        exports: "named", // ensure named exports
      },
    },
  },
});
