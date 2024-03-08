import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportHeight: 960,
    viewportWidth: 1536,
    baseUrl: "http://localhost:5174",
    video: true,
    defaultCommandTimeout: 5000,
  },
});
