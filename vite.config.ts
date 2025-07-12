import { defineConfig, type AliasOptions } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export const alias: AliasOptions = {
  "@": path.resolve(__dirname, "./src"),
  $lib: path.resolve(__dirname, "./src/lib"),
  $store: path.resolve(__dirname, "./src/store"),
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: alias,
  },
});
