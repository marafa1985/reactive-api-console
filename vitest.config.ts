import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { alias } from "./vite.config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
  resolve: {
    alias: { ...alias },
  },
});
