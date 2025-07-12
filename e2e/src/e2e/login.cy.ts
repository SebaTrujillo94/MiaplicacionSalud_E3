describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('should display the login form', () => {
        cy.get('form').should('be.visible');
        cy.get('input[name="username"]').should('exist');
        cy.get('input[name="password"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
    });

    it('should show an error message for invalid credentials', () => {
        cy.get('input[name="username"]').type('invalidUser');
        cy.get('input[name="password"]').type('invalidPass');
        cy.get('button[type="submit"]').click();
        cy.get('.error-message').should('contain', 'Invalid username or password');
    });

    it('should redirect to home page on successful login', () => {
        cy.get('input[name="username"]').type('validUser');
        cy.get('input[name="password"]').type('validPass');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/home');
    });
});