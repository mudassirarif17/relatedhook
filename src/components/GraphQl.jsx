import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

// Apollo Client Setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Backend URL
  cache: new InMemoryCache(),
});

// GraphQL Query
const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

// Users Component
const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

// App Component
const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h1>GraphQL with MERN</h1>
      <Users />
    </div>
  </ApolloProvider>
);

export default App;
