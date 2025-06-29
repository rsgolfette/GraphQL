describe('Testes em API GraphQL de Clientes', () => {

  const graphqlEndpoint = 'http://localhost:4000/graphql';

  it('Consulta um cliente pelo ID', () => {
        const query = `
      query {
        clientes {
          conta
          nome
          saldo
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: graphqlEndpoint,
      body: { query },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
       expect(response.body.data.clientes).to.be.an('array');
      expect(response.body.data.clientes[0]).to.have.all.keys('conta', 'nome', 'saldo');
    });
  });

  it('Adiciona um novo cliente com mutation', () => {
    const mutation = `
      mutation {
        adicionarCliente(nome: "Rodrigo", saldo: 1500.00) {
          conta
          nome
          saldo
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: graphqlEndpoint,
      body: { query: mutation },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.adicionarCliente.nome).to.eq("Rodrigo");
      expect(response.body.data.adicionarCliente.saldo).to.eq(1500.00);
    });
  });

});
