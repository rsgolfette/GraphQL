describe('Testes em API GraphQL de Clientes', () => {

  const url = 'http://localhost:5174/'

  it('Acessa a página inicial', () => {
    cy.visit(url)

    cy.get('[data-testid="Titulo"]').should('be.visible')
    cy.get('[data-testid="insereNome"]')
  .type('Jose')
  .should('have.value', 'Jose')



  });

})