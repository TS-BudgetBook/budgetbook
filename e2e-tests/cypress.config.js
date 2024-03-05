const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  videoCompression: true,
  env: {
    jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoib25zLmJlbi15b3Vzc2VmQGRvY2MudGVjaHN0YXJ0ZXIuZGUiLCJpYXQiOjE3MDk2NDkyNTYsImV4cCI6MTcwOTkwODQ1Nn0.bUxAcJvkd1xjCY_x9hACduQCxW2Op5pKd5fRVwSjElc'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
