const { User } = require("./../models/user.js");
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
  },
};

module.exports = resolvers;
