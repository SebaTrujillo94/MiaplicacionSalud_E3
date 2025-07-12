import { addMatchImageSnapshot } from 'cypress-plugin-snapshots';
import 'cypress-real-events/support';

Cypress.Commands.add('login', (username, password) => {
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('logout', () => {
    cy.get('button.logout').click();
});

Cypress.Commands.add('visitHomePage', () => {
    cy.visit('/home');
});

Cypress.Commands.add('visitLoginPage', () => {
    cy.visit('/login');
});

addMatchImageSnapshot();