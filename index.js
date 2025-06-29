const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Usuario {
    id: ID
    nome: String
    email: String
  }

  type Cliente{
    conta : ID
    nome: String
    saldo: Float


  }

  type Query{
    usuarios: [Usuario]
    clientes: [Cliente]
  }


    type Mutation {
    criarUsuario(nome: String!, email: String!): Usuario
    adicionarCliente(nome: String!, saldo: Float!): Cliente
  }

`;

const resolvers = {
  Query: {
    usuarios: () => usuarios,
    clientes: () => clientes
  },

   Mutation: {
    criarUsuario: (_, { nome, email }) => {
      const novoUsuario = {
        id: usuarios.length + 1,
        nome,
        email
      };
      usuarios.push(novoUsuario);
      return novoUsuario;
    },

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

const usuarios = [
  { id: 1, nome: 'Ana', email: 'ana@email.com' },
  { id: 2, nome: 'Carlos', email: 'carlos@email.com' },
];

const clientes = [
  { conta: 1, nome: 'Ana', saldo: 105.10 },
  { conta: 2, nome: 'Carlos', saldo: 90.0 },
  { conta: 3, nome: 'Be', saldo: 10000.0 },
];




startServer();