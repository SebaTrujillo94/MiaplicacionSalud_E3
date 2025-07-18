// Cypress configuration for Mi Aplicación de Salud
// Compatible configuration that avoids tsconfig-paths issues

const config = {
  e2e: {
    baseUrl: 'http://localhost:8100',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    viewportWidth: 375,
    viewportHeight: 667,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    video: false,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    experimentalStudio: true,
    setupNodeEvents(on: any, config: any) {
      // Configuración de eventos para la app de salud
      return config;
    },
  },
};

export default config;
