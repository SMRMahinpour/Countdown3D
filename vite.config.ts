import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"), // your main export file
      name: "Countdown3D",
      formats: ["es", "cjs"], // ESM + CommonJS
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // <-- critical: externalize react and react-dom
      external: ["react", "react-dom"],
      output: {
        exports: "named",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
