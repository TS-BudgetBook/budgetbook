const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  videoCompression: true,
  env: {
    jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoib25zLmJlbi15b3Vzc2VmQGRvY2MudGVjaHN0YXJ0ZXIuZGUiLCJpYXQiOjE3MDk1NjMyODIsImV4cCI6MTcwOTgyMjQ4Mn0.rgfPEskTRvAyhYxfN191WNuAP5k5eWfHZvJuJgb7vKM'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
