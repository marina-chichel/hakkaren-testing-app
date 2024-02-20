import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportHeight: 1024,
    baseUrl: "http://localhost:5173",
    video: true,
  },
});
