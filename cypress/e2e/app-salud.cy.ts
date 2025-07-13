/// <reference path="../support/cypress-types.d.ts" />

describe('Mi Aplicación de Salud - Pruebas E2E', () => {
    beforeEach(() => {
        // Visitar página principal (redirige a login)
        cy.visit('/');
    });

    it('debería cargar la página de login por defecto', () => {
        // Verificar que carga el título "Iniciar Sesión" (la app redirige a login)
        cy.get('ion-title').should('be.visible');
        cy.get('ion-title').should('contain', 'Iniciar Sesión');
        // Verificar que hay contenido en la página
        cy.get('ion-content').should('be.visible');
    });

    it('debería mostrar contenido de login', () => {
        // Verificar que se muestra contenido de acceso
        cy.contains('Acceso a SaludApp');
        cy.get('ion-card').should('have.length.greaterThan', 0);
    });

    it('debería permitir navegar a la página de inicio', () => {
        cy.visit('/home');
        cy.get('ion-title').should('contain', 'Inicio');
        // Verificar que hay contenido de bienvenida en home
        cy.get('ion-content').should('be.visible');
    });

    it('debería permitir navegar a la página de login', () => {
        cy.visit('/login');
        cy.get('ion-title').should('contain', 'Iniciar Sesión');
        cy.contains('Acceso a SaludApp');
    });

    it('debería mostrar formulario de login', () => {
        cy.visit('/login');
        
        // Verificar elementos del formulario
        cy.get('ion-input').should('have.length', 2);
        cy.contains('Usuario');
        cy.contains('Contraseña');
        cy.get('ion-button').contains('Ingresar');
    });

    it('debería permitir navegar a contacto', () => {
        cy.visit('/contacto');
        cy.get('ion-title').should('contain', 'Contacto Médico');
        cy.contains('Últimas Consultas');
    });

    it('debería mostrar información de contacto', () => {
        cy.visit('/contacto');
        
        // Verificar que se muestra información de contacto
        cy.get('ion-card').should('have.length.greaterThan', 0);
        cy.contains('Últimas Consultas');
        cy.contains('Próximas Consultas');
    });

    it('debería permitir navegar a FAQ', () => {
        cy.visit('/faq');
        cy.contains('Quiénes Somos');
        cy.contains('Preguntas Frecuentes');
    });

    it('debería mostrar preguntas frecuentes', () => {
        cy.visit('/faq');
        
        // Verificar que hay preguntas
        cy.get('ion-card').should('have.length.greaterThan', 0);
        cy.contains('¿Cómo agendo una cita médica?');
    });

    it('debería permitir navegar a registro', () => {
        cy.visit('/registrarse');
        
        // Verificar página de registro
        cy.get('ion-title').should('contain', 'Registrarse');
        cy.contains('Nombre de usuario');
        cy.contains('Correo electrónico');
    });

    it('debería permitir ver perfil', () => {
        cy.visit('/perfil');
        cy.get('ion-title').should('contain', 'Mi Perfil');
        
        // Verificar información del perfil
        cy.contains('Datos del Paciente');
        cy.get('ion-button').contains('Volver a Inicio');
    });
});
