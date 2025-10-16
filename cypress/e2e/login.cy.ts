describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display error when email is empty', () => {
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login').as('login');
    cy.get('button').contains(/^Login$/).click();
    cy.wait('@login');
    cy.get('.p-inline-message-text').should('be.visible').and('contain.text', '"email" is not allowed to be empty');
  });

  it('should display error when password is empty', () => {
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login').as('login');
    cy.get('input[placeholder="Email"]').type('abc@gmail.com');
    cy.get('button').contains(/^Login$/).click();
    cy.wait('@login');
    cy.get('.p-inline-message-text').should('be.visible').and('contain.text', '"password" is not allowed to be empty');
  });

  it('should display alert when email and password are wrong', () => {
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login').as('login');
    cy.get('input[placeholder="Email"]').type('abc@gmail.com');
    cy.get('input[placeholder="Password"]').type('1245');
    cy.get('button').contains(/^Login$/).click();
    cy.wait('@login');
    cy.get('.p-inline-message-text').should('be.visible').and('contain.text', 'email or password is wrong');
  });

  it('should display homepage when email and password are correct', () => {
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login').as('login');
    cy.get('input[placeholder="Email"]').type('abc@gmail.com');
    cy.get('input[placeholder="Password"]').type('1234');
    cy.get('button').contains(/^Login$/).click();
    cy.wait('@login');
    cy.get('h2').contains(/^Aplikasi Diskusi$/).should('be.visible');
  });
});