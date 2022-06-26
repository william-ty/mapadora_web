/// <reference types="cypress" />

import { base_url } from "./utils";

export class SignupPage {
  navigateTo() {
    cy.visit(`${base_url}/signup`);
    cy.get('[data-cy="signupText"]').should("be.visible");
  }

  isNotUserBar() {
    cy.get("[data-cy=userBar]").should("not.exist");
  }

  fillAndSubmit() {
    cy.get("#firstname").type("utilisateur");
    cy.get("#lastname").type("test");
    cy.get("#email").type("email@gmail.com");
    cy.get("#password").type("12345");
    cy.get(".css-binzgt > .MuiBox-root > .MuiButton-root").click();
    cy.url().should("include", "signin");
  }
}
