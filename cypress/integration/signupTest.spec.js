/// <reference types="cypress" />
import {SignupPage} from '../page_objects/SignupPage'

describe("signup nouvel utilisateur", () => {
    const signupPage = new SignupPage();

    it("Création de compte utilisateur", () => {
        signupPage.navigateTo();  
        signupPage.isNotUserBar();
        signupPage.fillAndSubmit();
  
    })
})