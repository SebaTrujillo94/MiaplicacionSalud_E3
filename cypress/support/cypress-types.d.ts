// Cypress types for Mi Aplicación de Salud
// Complete types to avoid resolution conflicts

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      visit(url: string, options?: any): Chainable<Subject>;
      get(selector: string, options?: any): Chainable<Subject>;
      contains(text: string, options?: any): Chainable<Subject>;
      click(options?: any): Chainable<Subject>;
      type(text: string, options?: any): Chainable<Subject>;
      should(assertion: string, value?: any): Chainable<Subject>;
      url(): Chainable<Subject>;
      wait(ms: number): Chainable<Subject>;
      then(fn: Function): Chainable<Subject>;
    }
  }

  const cy: Cypress.Chainable;
  function describe(name: string, fn: () => void): void;
  function it(name: string, fn: () => void): void;
  function beforeEach(fn: () => void): void;
  function afterEach(fn: () => void): void;
  function before(fn: () => void): void;
  function after(fn: () => void): void;
}

export {};
