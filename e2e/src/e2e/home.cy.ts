describe('Home Page', () => {
    beforeEach(() => {
        cy.visit('/home');
    });

    it('should display the home page title', () => {
        cy.get('h1').should('contain', 'Home');
    });

    it('should navigate to the login page when the login button is clicked', () => {
        cy.get('button.login').click();
        cy.url().should('include', '/login');
    });

    it('should display user information when logged in', () => {
        cy.login(); // Custom command to log in
        cy.get('.user-info').should('be.visible');
    });
});