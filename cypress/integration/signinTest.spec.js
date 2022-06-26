/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("signin, signout etc", () => {
  it("Création de compte utilisateur", () => {
    cy.visit("/");
    cy.get("[data-cy=userBar]").should("not.exist");
    cy.visit("signup");
    cy.get("#firstname").type("utilisateur");
    cy.get("#lastname").type("test");
    cy.get("#email").type("email@gmail.com");
    cy.get("#password").type("12345");
    cy.get(".css-binzgt > .MuiBox-root > .MuiButton-root").click();
    cy.url().should("include", "signin");
  });

  it("Connexion utilisateur, modification des données et suppression du compte", () => {
    cy.visit("signin");
    cy.get("#email").type("email@gmail.com");
    cy.get("#password").type("12345");
    cy.get("[data-cy=submitLogin]").click();
    // cy.get('[data-cy=userBar]').should('be.visible')
    cy.url().should("include", "dashboard");

    cy.visit("dashboard/informations");

    cy.get("#firstname").clear().type("NewFirstName");
    cy.get("#lastname").clear().type("NewLastName");
    cy.get("#email").clear().type("newemail@gmail.com");

    cy.get('[data-cy="submitButton"]').click();
    cy.url().should("include", "dashboard");

    cy.visit("dashboard/informations");
    // cy.get('#email').should('have.text', 'newemail@gmail.com')
    // cy.get('#firstname').should('have.text', 'NewFirstName')
    // cy.get('#lastname').should('have.text', 'NewLastName')
    cy.get("[data-cy=deleteAccountButton]").should('exist');

    cy.get("[data-cy=deleteAccountButton]").click();
    cy.get("[data-cy=alertDialog]").should("exist");
    cy.get("[data-cy = okButton]").click();
    cy.url().should("equal", "http://localhost:3000/");
  });
});
