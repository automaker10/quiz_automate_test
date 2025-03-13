Cypress.Commands.add('loginUser', (username, password) => {
    cy.get('input[id="user-name"]').should('be.visible').type(username);
    cy.get('input[id="password"]').should('be.visible').type(password);
    cy.get('input[id="login-button"]').contains('Login').should('be.enabled').click();
})

Cypress.Commands.add('checkoutInformation', (firstname, lastname, zipcode) => {
    cy.get('input[id="first-name"]').should('be.visible').type(firstname);
    cy.get('input[id="last-name"]').should('be.visible').type(lastname);
    cy.get('input[id="postal-code"]').should('be.visible').type(zipcode);
})
