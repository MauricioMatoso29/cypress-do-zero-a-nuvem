Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (nome,lastName,email,msg) => {
    cy.get('#firstName').type(nome)
    cy.get('#lastName').type(lastName)
    cy.get('#email').type(email)
    cy.get('#open-text-area').type(msg)
})