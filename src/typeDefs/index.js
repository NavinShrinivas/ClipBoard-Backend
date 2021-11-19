const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    description: String!
    status: Boolean!
    createdAt: String!
    date: String!
  }
  input TodoInput {
    title: String!
    description: String!
    status: Boolean!
    createdAt: String!
    date: String!
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
    addTodo(
      user_id: ID!
      title: String!
      description: String!
      status: Boolean!
      date: String!
    ): Todo!
  }
`;

module.exports = typeDefs;
