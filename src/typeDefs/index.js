const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Todo {
    title: String!
    description: String!
    status: Boolean!
    createdAt: String!
    date: String
    id: ID!
  }
  input TodoInput {
    title: String!
    description: String!
    status: Boolean!
    createdAt: String!
    date: String
    #dates in both graphql and mongo get messy , so les handle string this is a hack
  }

  type User {
    id: ID!
    username: String!
    authID: String!
    todos: [Todo]
    trello: String!
  }

  type file {
    name: String!
    size: String!
    type: String!
    lastModified: String!
  }

  type Files {
    id: ID!
    username: String!
    authID: String!
    files: [file]
  }

  input fileInput {
    name: String!
    size: String!
    type: String!
    lastModified: String!
  }

  type Query {
    hello: String!
    getFiles(authID: String!): [file]
    getTodos(username: String!, searchdate: String!): [Todo]
    getTrello(authID: String!): String!
  }

  type Mutation {
    CreateUser(username: String!, authID: String!, todos: [TodoInput]): User
    AddFile( 
      username: String!
      authID : String!
      files: fileInput
    ): Files!
    AddTodo(
      username: String!
      title: String!
      description: String!
      status: Boolean!
      date: String
    ): Todo!
    DeleteTodo(username: String, id: ID!): [Todo]
  }
`;

module.exports = typeDefs;
