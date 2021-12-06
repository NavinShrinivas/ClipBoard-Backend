const mongoose = require("mongoose");

//for ref :
/*
 *type Todo {
 *    id: ID!
 *    title: String!
 *    description: String!
 *    status: Boolean!
 *    createdAt: Date!
 *    deadLine: Date!
 *  }
 *  type User {
 *    id: ID!
 *    username: String!
 *    passwordhash: String!
 *    todos: [Todo]
 *  }
 */

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: Boolean,
  createdAt: String,
  date: String,
});
const UserSchema = new mongoose.Schema({
  username: String,
  authID: String,
  todos: [TodoSchema],
  trello: String,
});

module.exports = {
  User: mongoose.model("User", UserSchema),
  Todo: mongoose.model("Todo", TodoSchema),
};
