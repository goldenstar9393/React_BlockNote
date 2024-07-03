import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      // Add the dependencies causing issues here
      "chunk-6GW26UXL",
      "chunk-UUU2UKCP",
      "chunk-COB6Y5YM",
      "chunk-QRFVOVH2",
    ],
  },
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
