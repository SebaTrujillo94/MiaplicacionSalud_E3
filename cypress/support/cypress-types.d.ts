// Cypress types for Mi Aplicación de Salud
// Complete types to avoid resolution conflicts

declare namespace Cypress {
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

declare const cy: Cypress.Chainable;
declare function describe(name: string, fn: () => void): void;
declare function it(name: string, fn: () => void): void;
declare function beforeEach(fn: () => void): void;
declare function afterEach(fn: () => void): void;
declare function before(fn: () => void): void;
declare function after(fn: () => void): void;
