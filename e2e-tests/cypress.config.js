const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  videoCompression: true,
  env: {
    jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoibWFyY29AdGVjaHN0YXJ0ZXIuZGUiLCJpYXQiOjE3MDkyOTAyODMsImV4cCI6MTcwOTU0OTQ4M30.VvaUvTcTggG8S1Vn1GuEyDd4wFENhLbzxsbHfgqSxAw'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
