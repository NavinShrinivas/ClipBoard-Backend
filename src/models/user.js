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
  deadLine: String,
});
const UserSchema = new mongoose.Schema({
  username: String,
  passwordhash: String,
  todos: [TodoSchema],
});

module.exports = {
  User: mongoose.model("User", UserSchema),
};
