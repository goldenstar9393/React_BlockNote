import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    open: true, // Automatically open the app in the browser
    host: 'localhost', // Change this to your desired port
  },
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
    "process.env": {}//process.env,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
