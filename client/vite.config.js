import { defineConfig } from "vite";
import path from "path"
import react from "@vitejs/plugin-react";
import vercel from 'vite-plugin-vercel';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),vercel()],
  server: {
    port: process.env.PORT,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),                          
    },
  },
});
