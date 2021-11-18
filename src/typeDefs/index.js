const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    description: String!
    status: Boolean!
    createdAt: String!
    deadLine: String!
  }
  input TodoInput {
    title: String!
    description: String!
    status: Boolean!
    createdAt: String!
    deadLine: String!
    #dates in both graphql and mongo get messy , so les handle string this is a hack
  }
  type User {
    id: ID!
    username: String!
    passwordhash: String!
    todos: [Todo]
  }
  type Query {
    hello: String!
  }

  type Mutation {
    createUser(
      username: String!
      passwordhash: String!
      todos: [TodoInput!]
    ): User!
  }
`;

module.exports = typeDefs;
