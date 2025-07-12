// Cypress types for Mi Aplicación de Salud
// Simplified types to avoid resolution conflicts

declare namespace Cypress {
  interface Chainable {
    visit(url: string): Chainable;
    get(selector: string): Chainable;
    contains(text: string): Chainable;
    click(): Chainable;
    type(text: string): Chainable;
    should(assertion: string, value?: any): Chainable;
    url(): Chainable;
  }
}

declare const cy: Cypress.Chainable;
