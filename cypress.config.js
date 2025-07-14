import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://reactive-api-console.vercel.app/",
    supportFile: "cypress/support/e2e.{js,jsx,ts,tsx}",
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
