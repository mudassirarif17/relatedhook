import express from "express";
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import cors from 'cors';
import User from "./models/User.js";
import connectToMongo from "./db.js";

// Connect to MongoDB

connectToMongo();

// GraphQL Schema
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  input UserInput {
    name: String!
    email: String!
    age: Int
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
    deleteUser(id: ID!): String
  }
`);

// GraphQL Resolvers
const root = {
  users: async () => {
    return await User.find();
  },
  user: async ({ id }) => {
    return await User.findById(id);
  },
  createUser: async ({ input }) => {
    const newUser = new User(input);
    return await newUser.save();
  },
  updateUser: async ({ id, input }) => {
    return await User.findByIdAndUpdate(id, input, { new: true });
  },
  deleteUser: async ({ id }) => {
    await User.findByIdAndDelete(id);
    return 'User deleted successfully';
  },
};

// Express App Setup
const app = express();
app.use(cors());
app.use(express.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

// Start Server
app.listen(4000, () => {
  console.log('Server running at http://localhost:4000/graphql');
});
