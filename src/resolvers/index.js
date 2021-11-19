const { User } = require("./../models/user.js");
const { Todo } = require("./../models/user.js");
const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },

  Mutation: {
    createUser: async (parent, args) => {
      const c1 = await new User(args).save();
      c1._id = c1._id.toString();
      return c1;
    },
    addTodo: async (parent, { user_id, title, description, status, date }) => {
      //dates is auto genrated :
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      var today = dd + mm + yyyy;
      let newtodo = await new Todo({
        title,
        description,
        status,
        createdAt: today,
        date,
      });
      console.log(newtodo);
      const record1 = await User.findOneAndUpdate(
        { _id: user_id },
        {
          $push: { todos: newtodo },
          //todos: [...(todos + newtodo)],
        }
      );
      console.log(record1);
      record1._id = record1._id.toString();
      return record1;
    },
  },
};

module.exports = resolvers;
