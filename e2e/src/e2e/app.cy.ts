describe('App End-To-End Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should load the login page', () => {
        cy.get('h1').contains('Login');
    });

    it('should log in successfully', () => {
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/home');
    });

    it('should navigate to home page after login', () => {
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();
        cy.get('h1').contains('Home');
    });

    it('should log out successfully', () => {
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();
        cy.get('button.logout').click();
        cy.url().should('include', '/login');
    });
});