const { User, Todo } = require("./../models/user.js");
const { Files } = require("./../models/files.js");

const resolvers = {
  Query: {
    hello: () => "Hello world!",

    getFiles: async (parent, { authID }) => {
      const fileList = await Files.find({
        authID: authID,
      });
      let needed_list = [];
      fileList.map((user) => {
        console.log(user.files);
        user.files.map((file) => {
          file._id = file._id.toString();
          if (file.date === searchdate) needed_list.push(file);
        });
      });
      return needed_list;
    },

    getTodos: async (parent, { username, searchdate }) => {
      const worklist = await User.find({
        username: username,
      });
      let needed_list = [];
      worklist.map((work) => {
        console.log(work.todos);
        work.todos.map((list) => {
          console.log(list);
          list._id = list._id.toString();
          if (list.date === searchdate) needed_list.push(list);
        });
      });
      return needed_list;
    },
    getTrello: async (parent, { authID }) => {
      console.log(authID);
      const worklist = await User.find({
        authID: authID,
      });
      console.log(worklist[0].trello);
      return worklist[0].trello;
    },
  },

  Mutation: {
    CreateUser: async (parent, args) => {
      const emptytrello = {
        lanes: [
          {
            id: "PLANNED",
            title: "Planned Tasks",
            label: "20/70",
            cards: [],
          },
          {
            id: "WIP",
            title: "Work In Progress",
            label: "10/20",
            cards: [],
          },
          {
            id: "BLOCKED",
            title: "Blocked",
            label: "0/0",
            cards: [],
          },
          {
            id: "COMPLETED",
            title: "Completed",
            label: "2/5",
            cards: [],
          },
          {
            id: "REPEAT",
            title: "Repeat",
            label: "1/1",
            cards: [],
          },
          {
            id: "ARCHIVED",
            title: "Archived",
            label: "1/1",
            cards: [],
          },
          {
            id: "ARCHIVED2",
            title: "Archived2",
            label: "1/1",
            cards: [],
          },
          {
            id: "ARCHIVED3",
            title: "Archived3",
            label: "1/1",
            cards: [],
          },
        ],
      };

      const t1 = await User.findOne({ authID: args.authID });
      if (t1) {
        console.log("user exists");
        return null;
      } else {
        const c1 = await new User(args);
        c1.trello = JSON.stringify(emptytrello);
        c1.save();
        console.log(c1.trello);
        const c2 = await new Files(args).save();
        c1._id = c1._id.toString();
        return c1;
      }
    },

    AddFile: async (parent, args) => {
      console.log(args);
      const record1 = await Files.findOneAndUpdate(
        { authID: args.authID },
        {
          $push: { files: args.files },
        }
      );
      record1._id = record1._id.toString();
      record1.save();
      console.log(record1);
      return args;
    },

    // DeleteFile: async (parent, args) => {
    //   const record1 = await Files.findOneAndUpdate(
    //     { username: username },
    //     {
    //       $pull: { files: { _id: id } },
    //     }
    //   );
    //   record1._id = record1._id.toString();
    //   let record2 = await File.findOne({ username: username }).todo;
    //   console.log("delete request");
    //   return record2;
    // },

    AddTodo: async (parent, { username, title, description, status, date }) => {
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
        title: title,
        description: description,
        status: status,
        createdAt: today,
        date,
      });
      console.log(newtodo);
      const record1 = await User.findOneAndUpdate(
        { username: username },
        {
          $push: { todos: newtodo },
          //todos: [...(todos + newtodo)],
        }
      );
      console.log(record1);
      record1._id = record1._id.toString();
      return newtodo;
    },
    DeleteTodo: async (parent, { username, id }) => {
      const record1 = await User.findOneAndUpdate(
        { username: username },
        {
          $pull: { todos: { _id: id } },
        }
      );
      record1._id = record1._id.toString();
      let record2 = await User.findOne({ username: username }).todo;
      console.log("delete request");
      return record2;
    },
  },
};

module.exports = resolvers;
