const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

// Schema
const schema = buildSchema(`
  type User {
    id: ID
    name: String
    email: String
  }

  type Query {
    users: [User]
  }
`);

// Sample Data
const users = [
  { id: "1", name: "Mudassir", email: "mudassir@example.com" },
  { id: "2", name: "Ali", email: "ali@example.com" },
];

// Resolvers
const root = {
  users: () => users,
};

// App Setup
const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // GraphiQL UI for testing
}));

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/graphql');
});
