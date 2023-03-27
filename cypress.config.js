const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } =  require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

const pg = require("pg")

module.exports = defineConfig({
  e2e: {
    specPattern: [
      "cypress/e2e/**/features/*.feature",
      "cypress/e2e/**/features/**/*.feature"
    ],
    async setupNodeEvents(on, config) {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      //DATABASE
      on("task", {
        DATABASE({ dbConfig, sql }) {
          const client = new pg.Pool(dbConfig);
          return client.query(sql);
        },
      });

      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});