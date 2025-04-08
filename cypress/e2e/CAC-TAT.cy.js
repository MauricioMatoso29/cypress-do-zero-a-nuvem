describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(()=>{
    cy.visit('./src/index.html');
  })

  it('CT1 - verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  })

  it('CT2 - preenche os campos obrigatórios e envia o formalário, validando a msg de sucesso', () => {
    const longText = Cypress._.repeat('teste!',20)//vai repetir 10x a string

    cy.get('#firstName').type('Mauricio')
    cy.get('#lastName').type('Matoso')
    cy.get('#email').type('MauriciomATOSO29@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 10})
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('CT3 - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = Cypress._.repeat('teste!',10)

    cy.get('#firstName').type('Mauricio')
    cy.get('#lastName').type('Matoso')
    cy.get('#email').type('MauriciomATOSO29')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('CT4 - validar que o campo phone nao aceita letras', () => {

    cy.get('#phone')
      .type('teste')
      .should('have.value', '')

  })

  it('CT5 - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

    cy.get('#firstName').type('Mauricio')
    cy.get('#lastName').type('Matoso')
    cy.get('#email').type('MauriciomATOSO29@gmail.com')
    cy.get('#phone-checkbox').click() //este checbox é o ponto chave deste cenario
    cy.get('#open-text-area').type('teste mensagem!')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('CT6 - preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.get('#firstName')
      .type('Mauricio')
      .should('have.value', 'Mauricio')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Matoso')
      .should('have.value', 'Matoso')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('mauricioMatoso29@gmail.com')
      .should('have.value', 'mauricioMatoso29@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('88998055077')
      .should('have.value', '88998055077')
      .clear()
      .should('have.value', '')

  })

  it('CT7 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')

  })

  it('CT8 - envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit('Mauricio','Matoso','MauriciomATOSO29@gmail.com','teste msg')// para nao repetir sempre a parte de preencher o formulario, add no ./support/commands.js

    cy.get('button[type="submit"]').click() 

    cy.get('.success').should('be.visible')
  })

  it('CT9 - envia o formuário com sucesso usando o contains', () => {
    cy.fillMandatoryFieldsAndSubmit('Mauricio','Matoso','MauriciomATOSO29@gmail.com','teste msg')

    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('CT10 - seleciona um produto (YouTube) por seu texto', () => {

    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')

  })

  it('CT11 - seleciona um produto (YouTube) por seu texto', () => {

    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')

  })

  it('CT12 - seleciona um produto (Blog) por seu índice', () => {

    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')

  })

  it('CT13 - marca o tipo de atendimento "Feedback"', () => {

    cy.get('input[name="atendimento-tat"]')
      .check('feedback')
      .should('have.value', 'feedback')

  })

  it('CT14 - validando que o radio "Feedback" nao foi selecionado', () => {

    cy.get('input[type="radio"][value="elogio"]')//outra forma de selecionar é indo direto no ponto que quero selcionar
      .check()
      .should('be.checked')

      cy.get('input[type="radio"][value="feedback"]').should('not.be.checked')

  })

  it('CT15 - marcar cada tipo de atendimento, usando o each()', () => {

    cy.get('input[name="atendimento-tat"]')
      .each(typeOfServices => {//each é uma funcao que aplicamos para cada item, no caso o radio tem tres opcoes entao sao 3 itens.
        cy.wrap(typeOfServices)
          .check()
          .should('be.checked')

      })

  })

  it('CT16 - marca ambos checkboxes, depois desmarca o último', () => {

    cy.get('input[type="checkbox"]')
      .check()// esta marcando todos os checkboxs existentes na pagina
      .should('be.checked')
      .last()//pega o ultimo
      .uncheck()//e desmarca o ultimo
      .should('not.be.checked')

  })

  it('CT17 - recriando teste CT5 agora usando o check', () => {

    cy.fillMandatoryFieldsAndSubmit('Mauricio','Matoso','MauriciomATOSO29@gmail.com','teste msg')
    cy.get('#phone-checkbox').check() //este checbox é o ponto chave deste cenario
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })
    
  it('CT18 - seleciona um arquivo da pasta fixtures', () => {

    cy.get('#file-upload')
      .selectFile('cypress/fixtures/arquivo_teste.pdf')
      .should(input => {
        expect(input[0].files[0].name).to.equal('arquivo_teste.pdf')
      })

  })

  //para simular que usuario vai arrastar o arquivo(drag-drop)
  it('CT19 - seleciona um arquivo simulando um drag-and-drop', () => {

    cy.get('#file-upload')
      .selectFile('cypress/fixtures/arquivo_teste.pdf', { action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('arquivo_teste.pdf')
      })

  })

  //para acessar uma pagina sem criar uma nova aba
  it('CT20 - acessa a página da política de privacidade removendo o target e então clicando no link', () => {

    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')

  })

  

})
