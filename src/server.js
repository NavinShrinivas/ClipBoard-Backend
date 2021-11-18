const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

const typeDefs = require('./typeDefs/index.js')
const resolvers = require('./resolvers/index.js')

// environment variables
require('dotenv').config();
const {
    PORT,
    CONNECTION_URI
} = process.env;


// connect to MongoDB


(async () => {

    await mongoose.connect(CONNECTION_URI);

    const server = new ApolloServer({ typeDefs, resolvers });

    const app = express();
    app.use(cors());
    await server.start();

    server.applyMiddleware({ app });

    app.listen({ port: PORT }, () =>
      console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    );

})().catch(error => console.error(error));
