const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`


  type Cliente{
    conta : ID
    nome: String
    saldo: Float


  }

  type Query{

    clientes: [Cliente]
  }


    type Mutation {

    adicionarCliente(nome: String!, saldo: Float!): Cliente
  }

`;

const resolvers = {
  Query: {

    clientes: () => clientes
  },

   Mutation: {
    
    adicionarCliente: (_, {nome, saldo}) =>{
      const novoCliente ={
        conta: clientes.length + 1,
        nome,
        saldo
      };
      clientes.push(novoCliente);
      return novoCliente;
    }

  }
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Servidor rodando em http://localhost:4000/graphql');
  });
}
const clientes = [
  { conta: 1, nome: 'Ana', saldo: 105.10 },
  { conta: 2, nome: 'Carlos', saldo: 90.0 },
  { conta: 3, nome: 'Be', saldo: 10000.0 },
];




startServer();