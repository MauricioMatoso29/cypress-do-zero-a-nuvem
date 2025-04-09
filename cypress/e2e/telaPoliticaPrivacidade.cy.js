Cypress._.times(3, () => {//dessa forma podemos repetir o teste 3x em sequencia
  it('testa a pagina de politica de privacidade de forma independente', () => {

    cy.visit('./src/privacy.html');
  
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  
  })
})